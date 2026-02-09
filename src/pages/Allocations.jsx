import { useEffect, useState } from "react";
import {
  getItems,
  getFAs,
  getVenues,
  getAllocations,
  createAllocation,
  getItemSummary
} from "../services/api";

export default function Allocations() {
  const [items, setItems] = useState([]);
  const [fas, setFAs] = useState([]);
  const [venues, setVenues] = useState([]);
  const [allocations, setAllocations] = useState([]);

  const [itemSummary, setItemSummary] = useState(null);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    item: "",
    functionalArea: "",
    venue: "",
    quantity: ""
  });

  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    setItems(await getItems());
    setFAs(await getFAs());
    setVenues(await getVenues());
    setAllocations(await getAllocations());
  };

  /* When item changes → load availability */
  const onItemChange = async (itemId) => {
    setForm({ ...form, item: itemId, quantity: "" });
    setError("");

    if (!itemId) {
      setItemSummary(null);
      return;
    }

    const summary = await getItemSummary(itemId);
    setItemSummary(summary);
  };

  /* Quantity validation */
  const onQuantityChange = (value) => {
    if (!itemSummary) return;

    if (Number(value) > itemSummary.remaining) {
      setError("Quantity exceeds remaining stock");
    } else {
      setError("");
    }

    setForm({ ...form, quantity: value });
  };

  const submit = async () => {
    if (error) return;
    if (!form.item || !form.functionalArea || !form.venue || !form.quantity) {
      alert("All fields required");
      return;
    }

    await createAllocation({
      ...form,
      quantity: Number(form.quantity)
    });

    setForm({ item: "", functionalArea: "", venue: "", quantity: "" });
    setItemSummary(null);
    loadAll();
  };

  return (
    <div>
      <h2>Create Allocation</h2>

      {/* ITEM */}
      <select value={form.item} onChange={e => onItemChange(e.target.value)}>
        <option value="">Select Item</option>
        {items.map(i => (
          <option key={i._id} value={i._id}>{i.name}</option>
        ))}
      </select>

      {/* ITEM AVAILABILITY */}
      {itemSummary && (
        <div style={{ margin: "10px 0", padding: 10, border: "1px solid #ccc" }}>
          <strong>Item Availability</strong>
          <div>Total: {itemSummary.totalQuantity}</div>
          <div>Allocated: {itemSummary.allocated}</div>
          <div>Remaining: {itemSummary.remaining}</div>
        </div>
      )}

      {/* FUNCTIONAL AREA */}
      <select
        value={form.functionalArea}
        onChange={e => setForm({ ...form, functionalArea: e.target.value })}
      >
        <option value="">Select Functional Area</option>
        {fas.map(f => (
          <option key={f._id} value={f._id}>{f.name}</option>
        ))}
      </select>

      {/* VENUE */}
      <select
        value={form.venue}
        onChange={e => setForm({ ...form, venue: e.target.value })}
      >
        <option value="">Select Venue</option>
        {venues.map(v => (
          <option key={v._id} value={v._id}>{v.name}</option>
        ))}
      </select>

      {/* QUANTITY */}
      <input
        type="number"
        placeholder="Quantity"
        value={form.quantity}
        onChange={e => onQuantityChange(e.target.value)}
      />

      {error && <div style={{ color: "red" }}>{error}</div>}

      <button
        onClick={submit}
        disabled={!!error || (itemSummary && itemSummary.remaining === 0)}
      >
        Allocate
      </button>

      <hr />

      <h3>Existing Allocations</h3>

      <ul>
        {allocations.map(a => (
          <li key={a._id}>
            {a.item?.name} – {a.functionalArea?.name} – {a.venue?.name} – {a.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}
