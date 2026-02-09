import { useEffect, useState } from "react";
import {
  getItems,
  getItemSummary,
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
  const [itemDetails, setItemDetails] = useState(null);
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

  /* ITEM SELECT */
  const selectItem = async itemId => {
    setForm({ ...form, item: itemId });

    if (!itemId) {
      setItemDetails(null);
      return;
    }

    const summary = await getItemSummary(itemId);
    setItemDetails(summary);
  };

  /* VENUE SELECT */
  const selectVenue = async venueId => {
    setForm({ ...form, venue: venueId, subVenue: "", space: "" });
    setSubVenues(await getSubVenues(venueId));
    setSpaces([]);
  };

  /* SUBVENUE SELECT */
  const selectSubVenue = async subVenueId => {
    setForm({ ...form, subVenue: subVenueId, space: "" });
    setSpaces(await getSpaces(subVenueId));
  };

  /* SUBMIT */
  const submit = async () => {
    try {
      setError("");

      if (
        !form.item ||
        !form.functionalArea ||
        !form.venue ||
        !form.quantity
      ) {
        return setError("Please fill all required fields");
      }

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

      setItemDetails(null);
      loadBase();
    } catch (e) {
      setError(e.message || "Allocation failed");
    }
  };

  return (
    <div>
      <h2>Create Allocation</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* ITEM */}
      <select value={form.item} onChange={e => selectItem(e.target.value)}>
        <option value="">Select Item</option>
        {items.map(i => (
          <option key={i._id} value={i._id}>
            {i.name}
          </option>
        ))}
      </select>

      {/* ITEM DETAILS */}
      {itemDetails && (
        <div style={{ margin: "10px 0", padding: 10, border: "1px solid #ccc" }}>
          <strong>Item details</strong>
          <div>Code: {itemDetails.code || "—"}</div>
          <div>Total quantity: {itemDetails.totalQuantity}</div>
          <div>Allocated: {itemDetails.allocated}</div>
          <div>Remaining: {itemDetails.remaining}</div>
        </div>
      )}

      {/* FUNCTIONAL AREA */}
      <select
        value={form.functionalArea}
        onChange={e => setForm({ ...form, functionalArea: e.target.value })}
      >
        <option value="">Functional Area</option>
        {fas.map(f => (
          <option key={f._id} value={f._id}>
            {f.name}
          </option>
        ))}
      </select>

      {/* VENUE */}
      <select value={form.venue} onChange={e => selectVenue(e.target.value)}>
        <option value="">Venue</option>
        {venues.map(v => (
          <option key={v._id} value={v._id}>
            {v.name}
          </option>
        ))}
      </select>

      {/* SUB VENUE */}
      <select
        value={form.subVenue}
        onChange={e => selectSubVenue(e.target.value)}
        disabled={!subVenues.length}
      >
        <option value="">SubVenue</option>
        {subVenues.map(s => (
          <option key={s._id} value={s._id}>
            {s.name}
          </option>
        ))}
      </select>

      {/* SPACE */}
      <select
        value={form.space}
        onChange={e => setForm({ ...form, space: e.target.value })}
        disabled={!spaces.length}
      >
        <option value="">Space</option>
        {spaces.map(s => (
          <option key={s._id} value={s._id}>
            {s.name}
          </option>
        ))}
      </select>

      {/* QUANTITY */}
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
            {a.item?.name} → {a.space?.name || a.subVenue?.name || a.venue?.name} —{" "}
            {a.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}
