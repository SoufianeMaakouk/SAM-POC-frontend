import { useEffect, useState } from "react";
import {
  getItems,
  getFAs,
  getVenues,
  getAllocations,
  createAllocation
} from "../services/api.js";

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

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    setItems(await getItems());
    setFAs(await getFAs());
    setVenues(await getVenues());
    setAllocations(await getAllocations());
  };

  const submit = async () => {
    setError("");
    setSuccess("");

    if (!form.item || !form.quantity) {
      setError("Please select an item and enter a quantity");
      return;
    }

    setLoading(true);

    try {
      await createAllocation({
        ...form,
        quantity: Number(form.quantity)
      });

      setSuccess("Allocation created successfully");
      setForm({
        item: "",
        functionalArea: "",
        venue: "",
        quantity: ""
      });

      loadAll();
    } catch (err) {
      setError(err.message || "Allocation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2>Create Allocation</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <select
        value={form.item}
        onChange={e => setForm({ ...form, item: e.target.value })}
      >
        <option value="">Select Item</option>
        {items.map(i => (
          <option key={i._id} value={i._id}>
            {i.name}
          </option>
        ))}
      </select>

      <select
        value={form.functionalArea}
        onChange={e =>
          setForm({ ...form, functionalArea: e.target.value })
        }
      >
        <option value="">Select Functional Area</option>
        {fas.map(f => (
          <option key={f._id} value={f._id}>
            {f.name}
          </option>
        ))}
      </select>

      <select
        value={form.venue}
        onChange={e => setForm({ ...form, venue: e.target.value })}
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
        min="1"
        value={form.quantity}
        onChange={e => setForm({ ...form, quantity: e.target.value })}
      />

      <butt
