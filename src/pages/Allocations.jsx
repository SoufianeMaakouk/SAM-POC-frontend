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
    quantity: "",
    deliveryDay: "Day 1"
  });

  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    try {
      const [
        itemsData,
        fasData,
        venuesData,
        allocationsData
      ] = await Promise.all([
        getItems(),
        getFAs(),
        getVenues(),
        getAllocations()
      ]);

      setItems(itemsData);
      setFAs(fasData);
      setVenues(venuesData);
      setAllocations(allocationsData);
    } catch (err) {
      setError("Failed loading data");
    }
  };

  const refreshAllocations = async () => {
    const data = await getAllocations();
    setAllocations(data);
  };

  const selectItem = async (itemId) => {
    setForm(prev => ({ ...prev, item: itemId }));

    if (!itemId) {
      setItemDetails(null);
      return;
    }

    const summary = await getItemSummary(itemId);
    setItemDetails(summary);
  };

  const selectVenue = async (venueId) => {
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

    const subs = await getSubVenues(venueId);
    setSubVenues(subs);
    setSpaces([]);
  };

  const selectSubVenue = async (subVenueId) => {
    setForm(prev => ({
      ...prev,
      subVenue: subVenueId,
      space: ""
    }));

    if (!subVenueId) {
      setSpaces([]);
      return;
    }

    const sp = await getSpaces(subVenueId);
    setSpaces(sp);
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
        quantity: "",
        deliveryDay: "Day 1"
      });

      setItemDetails(null);
      refreshAllocations();

    } catch (e) {
      setError(e.message || "Allocation failed");
    }
  };

  const updateQuantity = async (id) => {
    try {
      const res = await fetch(`${API}/allocations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: Number(editQuantity) })
      });

      if (!res.ok) throw new Error("Update failed");

      setEditingId(null);
      setEditQuantity("");
      refreshAllocations();
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteAllocation = async (id) => {
    if (!window.confirm("Delete allocation?")) return;

    await fetch(`${API}/allocations/${id}`, { method: "DELETE" });
    refreshAllocations();
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

      <select value={form.item} onChange={e => selectItem(e.target.value)}>
        <option value="">Select Item</option>
        {items.map(i => (
          <option key={i._id} value={i._id}>{i.name}</option>
        ))}
      </select>

      {itemDetails && (
        <div style={{ margin: 12, padding: 12, border: "1px solid #ccc" }}>
          <div>Total: {itemDetails.totalQuantity}</div>
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

      <select
        value={form.deliveryDay}
        onChange={e => setForm(prev => ({ ...prev, deliveryDay: e.target.value }))}
      >
        <option value="Day 1">Day 1</option>
        <option value="Day 2">Day 2</option>
        <option value="Day 3">Day 3</option>
      </select>

      <input
        type="number"
        placeholder="Quantity"
        value={form.quantity}
        onChange={e => setForm(prev => ({ ...prev, quantity: e.target.value }))}
      />

      <button onClick={submit}>Allocate</button>

      <hr />

      <h3>Existing Allocations</h3>

      {allocations.map(a => (
        <div key={a._id} style={{ border: "1px solid #ddd", padding: 10, marginBottom: 10 }}>
          <strong>{a.item?.name}</strong>
          <div>Venue: {a.venue?.name}</div>
          <div>Delivery: {a.deliveryDay}</div>

          <div>
            Qty:
            {editingId === a._id ? (
              <>
                <input
                  type="number"
                  value={editQuantity}
                  onChange={e => setEditQuantity(e.target.value)}
                />
                <button onClick={() => updateQuantity(a._id)}>Save</button>
              </>
            ) : (
              <>
                {a.quantity}
                <button onClick={() => {
                  setEditingId(a._id);
                  setEditQuantity(a.quantity);
                }}>
                  Edit
                </button>
              </>
            )}
          </div>

          <select
            value={a.status || "ORDERED"}
            onChange={async e => {
              await updateAllocationStatus(a._id, e.target.value);
              refreshAllocations();
            }}
          >
            {STATUS_OPTIONS.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <button onClick={() => deleteAllocation(a._id)} style={{ background: "red", color: "white" }}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
