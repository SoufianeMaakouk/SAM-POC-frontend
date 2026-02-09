import { useEffect, useState } from "react";
import {
  getItems,
  getFAs,
  getVenues,
  getAllocations,
  createAllocation,
  getItemSummary
} from "../services/api.js";

export default function Allocations() {
  const [items, setItems] = useState([]);
  const [fas, setFAs] = useState([]);
  const [venues, setVenues] = useState([]);
  const [allocations, setAllocations] = useState([]);
  const [itemSummary, setItemSummary] = useState(null);

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

  const onItemChange = async (itemId) => {
    setForm({ ...form, item: itemId });
    const summary = await getItemSummary(itemId);
    setItemSummary(summary);
  };

  const submit = async () => {
    if (
      itemSummary &&
      Number(form.quantity) > itemSummary.remainingQuantity
    ) {
      alert("Not enough remaining quantity");
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
    <>
      <h2>Create Allocation</h2>

      <select onChange={e => onItemChange(e.target.value)} value={form.item}>
        <option value="">Select Item</option>
        {items.map(i => (
          <option key={i._id} value={i._id}>
            {i.name}
          </option>
        ))}
      </select>

      {itemSummary && (
        <div style={{ margin: "10px 0", padding: 10, border: "1px solid #ccc" }}>
          <strong>Item Details</strong>
          <div>Code: {itemSummary.code || "—"}</div>
          <div>Total: {itemSummary.totalQuantity}</div>
          <div>Allocated: {itemSummary.allocatedQuantity}</div>
          <div>
            Remaining: <b>{itemSummary.remainingQuantity}</b>
          </div>
        </div>
      )}

      <select
        onChange={e =>
          setForm({ ...form, functionalArea: e.target.value })
        }
        value={form.functionalArea}
      >
        <option value="">Select Functional Area</option>
        {fas.map(f => (
          <option key={f._id} value={f._id}>
            {f.name}
          </option>
        ))}
      </select>

      <select
        onChange={e => setForm({ ...form, venue: e.target.value })}
        value={form.venue}
      >
        <option value="">Select Venue</option>
        {venues.map(v => (
          <option key={v._id} value={v._id}>
            {v.name}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Quantity"
        value={form.quantity}
        onChange={e =>
          setForm({ ...form, quantity: e.target.value })
        }
      />

      <button onClick={submit}>Allocate</button>

      <hr />

      <h3>Existing Allocations</h3>
      <ul>
        {allocations.map(a => (
          <li key={a._id}>
            {a.item?.name} – {a.functionalArea?.name} –{" "}
            {a.venue?.name} – {a.quantity}
          </li>
        ))}
      </ul>
    </>
  );
}
