import { useEffect, useState } from "react";
import {
  getItems,
  getItemSummary,
  getFAs,
  getVenues,
  getSubVenues,
  getSpaces,
  getAllocations,
  createAllocation,
  updateAllocationStatus
} from "../services/api";

const API = import.meta.env.VITE_API_URL;

export default function Allocations() {
  const [items, setItems] = useState([]);
  const [fas, setFAs] = useState([]);
  const [venues, setVenues] = useState([]);
  const [subVenues, setSubVenues] = useState([]);
  const [spaces, setSpaces] = useState([]);
  const [allocations, setAllocations] = useState([]);
  const [itemDetails, setItemDetails] = useState(null);
  const [error, setError] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editQuantity, setEditQuantity] = useState("");

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

  const selectItem = async itemId => {
    setForm(prev => ({ ...prev, item: itemId }));

    if (!itemId) {
      setItemDetails(null);
      return;
    }

    const summary = await getItemSummary(itemId);
    setItemDetails(summary);
  };

  const selectVenue = async venueId => {
    setForm(prev => ({
      ...prev,
      venue: venueId,
      subVenue: "",
      space: ""
    }));

    if (!venueId) {
      setSubVenues([]);
      setSpaces([]);
      return;
    }

    setSubVenues(await getSubVenues(venueId));
    setSpaces([]);
  };

  const selectSubVenue = async subVenueId => {
    setForm(prev => ({
      ...prev,
      subVenue: subVenueId,
      space: ""
    }));

    if (!subVenueId) {
      setSpaces([]);
      return;
    }

    setSpaces(await getSpaces(subVenueId));
  };

  const submit = async () => {
    try {
      setError("");

      if (!form.item || !form.functionalArea || !form.venue || !form.quantity) {
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

  const updateQuantity = async id => {
    try {
      setError("");

      const res = await fetch(`${API}/allocations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: Number(editQuantity) })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Update failed");
      }

      setEditingId(null);
      setEditQuantity("");
      loadBase();

    } catch (err) {
      setError(err.message);
    }
  };

  const deleteAllocation = async id => {
    if (!window.confirm("Are you sure you want to delete this allocation?")) {
      return;
    }

    try {
      await fetch(`${API}/allocations/${id}`, {
        method: "DELETE"
      });

      loadBase();
    } catch (err) {
      setError("Delete failed");
    }
  };

  const STATUS_OPTIONS = [
    "ORDERED",
    "FULFILLED",
    "DELIVERED",
    "RETURNED",
    "MISSING"
  ];

  return (
    <div style={{ padding: 20 }}>
      <h2>Create Allocation</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* FORM SECTION (unchanged) */}
      {/* Item Select */}
      <select value={form.item} onChange={e => selectItem(e.target.value)}>
        <option value="">Select Item</option>
        {items.map(i => (
          <option key={i._id} value={i._id}>
            {i.name}
          </option>
        ))}
      </select>

      {itemDetails && (
        <div style={{ margin: "12px 0", padding: 12, border: "1px solid #ccc", borderRadius: 6 }}>
          <strong>Item details</strong>
          <div>Code: {itemDetails.code || "—"}</div>
          <div>Total quantity: {itemDetails.totalQuantity}</div>
          <div>Allocated: {itemDetails.allocated}</div>
          <div>Remaining: {itemDetails.remaining}</div>
        </div>
      )}

      <select
        value={form.functionalArea}
        onChange={e => setForm(prev => ({ ...prev, functionalArea: e.target.value }))}
      >
        <option value="">Functional Area</option>
        {fas.map(f => (
          <option key={f._id} value={f._id}>{f.name}</option>
        ))}
      </select>

      <select value={form.venue} onChange={e => selectVenue(e.target.value)}>
        <option value="">Venue</option>
        {venues.map(v => (
          <option key={v._id} value={v._id}>{v.name}</option>
        ))}
      </select>

      <select
        value={form.subVenue}
        onChange={e => selectSubVenue(e.target.value)}
        disabled={!subVenues.length}
      >
        <option value="">SubVenue</option>
        {subVenues.map(s => (
          <option key={s._id} value={s._id}>{s.name}</option>
        ))}
      </select>

      <select
        value={form.space}
        onChange={e => setForm(prev => ({ ...prev, space: e.target.value }))}
        disabled={!spaces.length}
      >
        <option value="">Space</option>
        {spaces.map(s => (
          <option key={s._id} value={s._id}>{s.name}</option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Quantity"
        value={form.quantity}
        onChange={e => setForm(prev => ({ ...prev, quantity: e.target.value }))}
      />

      <button onClick={submit}>Allocate</button>

      <hr style={{ margin: "30px 0" }} />

      <h3>Existing Allocations</h3>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {allocations.map(a => (
          <li key={a._id} style={{ padding: 12, marginBottom: 10, border: "1px solid #ddd", borderRadius: 6 }}>
            <strong>{a.item?.name}</strong>
            <div>Location: {a.space?.name || a.subVenue?.name || a.venue?.name || "—"}</div>

            <div>
              Quantity:{" "}
              {editingId === a._id ? (
                <>
                  <input
                    type="number"
                    value={editQuantity}
                    onChange={e => setEditQuantity(e.target.value)}
                    style={{ width: 60 }}
                  />
                  <button onClick={() => updateQuantity(a._id)}>Save</button>
                  <button onClick={() => setEditingId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  {a.quantity}
                  <button
                    style={{ marginLeft: 10 }}
                    onClick={() => {
                      setEditingId(a._id);
                      setEditQuantity(a.quantity);
                    }}
                  >
                    Edit
                  </button>
                </>
              )}
            </div>

            <div style={{ marginTop: 6 }}>
              Status:{" "}
              <select
                value={a.status || "ORDERED"}
                onChange={async e => {
                  await updateAllocationStatus(a._id, e.target.value);
                  loadBase();
                }}
              >
                {STATUS_OPTIONS.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <button
              style={{ marginTop: 8, background: "red", color: "white" }}
              onClick={() => deleteAllocation(a._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
