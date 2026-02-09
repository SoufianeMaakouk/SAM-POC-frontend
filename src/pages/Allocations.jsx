import { useEffect, useState } from "react";
import {
  getItems,
  getFAs,
  getVenues,
  getSubVenues,
  getSpaces,
  getAllocations,
  createAllocation
} from "../services/api";

export default function Allocations() {
  const [items, setItems] = useState([]);
  const [fas, setFAs] = useState([]);
  const [venues, setVenues] = useState([]);
  const [subVenues, setSubVenues] = useState([]);
  const [spaces, setSpaces] = useState([]);
  const [allocations, setAllocations] = useState([]);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    item: "",
    functionalArea: "",
    venue: "",
    subVenue: "",
    space: "",
    quantity: ""
  });

  useEffect(() => {
    loadBase();
  }, []);

  const loadBase = async () => {
    setItems(await getItems());
    setFAs(await getFAs());
    setVenues(await getVenues());
    setAllocations(await getAllocations());
  };

  const selectVenue = async venueId => {
    setForm({ ...form, venue: venueId, subVenue: "", space: "" });
    setSubVenues(await getSubVenues(venueId));
    setSpaces([]);
  };

  const selectSubVenue = async subVenueId => {
    setForm({ ...form, subVenue: subVenueId, space: "" });
    setSpaces(await getSpaces(subVenueId));
  };

  const submit = async () => {
    try {
      setError("");
      await createAllocation({
        ...form,
        quantity: Number(form.quantity)
      });
      setForm({
        item: "",
        functionalArea: "",
        venue: "",
        subVenue: "",
        space: "",
        quantity: ""
      });
      loadBase();
    } catch (e) {
      setError(e.error || "Allocation failed");
    }
  };

  return (
    <div>
      <h2>Create Allocation</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <select onChange={e => setForm({ ...form, item: e.target.value })}>
        <option value="">Item</option>
        {items.map(i => <option key={i._id} value={i._id}>{i.name}</option>)}
      </select>

      <select onChange={e => setForm({ ...form, functionalArea: e.target.value })}>
        <option value="">Functional Area</option>
        {fas.map(f => <option key={f._id} value={f._id}>{f.name}</option>)}
      </select>

      <select onChange={e => selectVenue(e.target.value)}>
        <option value="">Venue</option>
        {venues.map(v => <option key={v._id} value={v._id}>{v.name}</option>)}
      </select>

      <select onChange={e => selectSubVenue(e.target.value)}>
        <option value="">SubVenue</option>
        {subVenues.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
      </select>

      <select onChange={e => setForm({ ...form, space: e.target.value })}>
        <option value="">Space</option>
        {spaces.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
      </select>

      <input
        type="number"
        placeholder="Quantity"
        value={form.quantity}
        onChange={e => setForm({ ...form, quantity: e.target.value })}
      />

      <button onClick={submit}>Allocate</button>

      <hr />

      <h3>Existing Allocations</h3>
      <ul>
        {allocations.map(a => (
          <li key={a._id}>
            {a.item?.name} → {a.space?.name || a.venue?.name} — {a.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}
