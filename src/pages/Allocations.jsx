import { useEffect, useState } from "react";
import {
  getItemAvailability,
  getFAs,
  getVenues,
  getAllocations,
  createAllocation
} from "../services/api";

export default function Allocations() {
  const [items, setItems] = useState([]);
  const [fas, setFAs] = useState([]);
  const [venues, setVenues] = useState([]);
  const [allocations, setAllocations] = useState([]);

  const [form, setForm] = useState({
    item: "",
    functionalArea: "",
    venue: "",
    quantity: ""
  });

  const selectedItem = items.find(i => i._id === form.item);

  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    setItems(await getItemAvailability());
    setFAs(await getFAs());
    setVenues(await getVenues());
    setAllocations(await getAllocations());
  };

  const submit = async () => {
    if (
      !form.item ||
      !form.functionalArea ||
      !form.venue ||
      !form.quantity
    ) {
      alert("All fields required");
      return;
    }

    if (form.quantity > selectedItem.available) {
      alert("Quantity exceeds available stock");
      return;
    }

    const res = await createAllocation(form);

    if (!res.ok) {
      const err = await res.json();
      alert(err.error);
      return;
    }

    setForm({ item: "", functionalArea: "", venue: "", quantity: "" });
    loadAll();
  };

  return (
    <>
      <h2>Create Allocation</h2>

      <select
        value={form.item}
        onChange={e => setForm({ ...form, item: e.target.value })}
      >
        <option value="">Select Item</option>
        {items.map(i => (
          <option key={i._id} value={i._id}>
            {i.name} (available: {i.available})
          </option>
        ))}
      </select>

      <select
        value={form.functionalArea}
        onChange={e => setForm({ ...form, functionalArea: e.target.value })}
      >
        <option value="">Select Functional Area</option>
        {fas.map(f => (
          <option key={f._id} value={f._id}>{f.name}</option>
        ))}
      </select>

      <select
        value={form.venue}
        onChange={e => setForm({ ...form, venue: e.target.value })}
      >
        <option value="">Select Venue</option>
        {venues.map(v => (
          <option key={v._id} value={v._id}>{v.name}</option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Quantity"
        value={form.quantity}
        onChange={e => setForm({ ...form, quantity: Number(e.target.value) })}
      />

      {selectedItem && (
        <p style={{ color: "#555" }}>
          Available: {selectedItem.available} / {selectedItem.totalQuantity}
        </p>
      )}

      <button onClick={submit}>Allocate</button>

      <hr />

      <h3>Existing Allocations</h3>

      <ul>
        {allocations.map(a => (
          <li key={a._id}>
            {a.item?.name} — {a.functionalArea?.name} — {a.venue?.name} — {a.quantity}
          </li>
        ))}
      </ul>
    </>
  );
}
