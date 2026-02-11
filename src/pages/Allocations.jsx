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

export default function Allocations() {
  const [items, setItems] = useState([]);
  const [fas, setFAs] = useState([]);
  const [venues, setVenues] = useState([]);
  const [subVenues, setSubVenues] = useState([]);
  const [spaces, setSpaces] = useState([]);
  const [allocations, setAllocations] = useState([]);
  const [itemDetails, setItemDetails] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
    setForm(prev => ({ ...prev, item: itemId }));

    if (!itemId) {
      setItemDetails(null);
      return;
    }

    const summary = await getItemSummary(itemId);
    setItemDetails(summary);
  };

  /* VENUE SELECT */
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

    const data = await getSubVenues(venueId);
    setSubVenues(data);
    setSpaces([]);
  };

  /* SUBVENUE SELECT */
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

    const data = await getSpaces(subVenueId);
    setSpaces(data);
  };

  /* SUBMIT */
  const submit = async () => {
    try {
      setError("");
      setLoading(true);

      // Required fields validation
      if (!form.item || !form.functionalArea || !form.venue) {
        setLoading(false);
        return setError("Item, Functional Area and Venue are required");
      }

      if (!form.quantity || Number(form.quantity) <= 0) {
        setLoading(false);
        return setError("Quantity must be greater than 0");
      }

      // 🔥 CRITICAL FIX: Never send empty strings as ObjectId
      const payload = {
        item: form.item,
        functionalArea: form.functionalArea,
        venue: form.venue,
        quantity: Number(form.quantity),
        subVenue: form.subVenue || undefined,
        space: form.space || undefined
      };

      await createAllocation(payload);

      // Reset form
      setForm({
        item: "",
        functionalArea: "",
        venue: "",
        subVenue: "",
        space: "",
        quantity: ""
      });

      setItemDetails(null);
      setSubVenues([]);
      setSpaces([]);

      await loadBase();
    } catch (e) {
      setError(e.message || "Allocation failed");
    } finally {
      setLoading(false);
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
        <div
          style={{
            margin: "12px 0",
            padding: 12,
            border: "1px solid #ccc",
            borderRadius: 6
          }}
        >
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
        onChange={e =>
          setForm(prev => ({ ...prev, functionalArea: e.target.value }))
        }
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
        <option value="">SubVenue (Optional)</option>
        {subVenues.map(s => (
          <option key={s._id} value={s._id}>
            {s.name}
          </option>
        ))}
      </select>

      {/* SPACE */}
      <select
        value={form.space}
        onChange={e =>
          setForm(prev => ({ ...prev, space: e.target.value }))
        }
        disabled={!spaces.length}
      >
        <option value="">Space (Optional)</option>
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
        onChange={e =>
          setForm(prev => ({ ...prev, quantity: e.target.value }))
        }
      />

      <button onClick={submit} disabled={loading}>
        {loading ? "Allocating..." : "Allocate"}
      </button>

      <hr style={{ margin: "30px 0" }} />

      <h3>Existing Allocations</h3>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {allocations.map(a => (
          <li
            key={a._id}
            style={{
              padding: 12,
              marginBottom: 10,
              border: "1px solid #ddd",
              borderRadius: 6
            }}
          >
            <div>
              <strong>{a.item?.name}</strong>
            </div>

            <div style={{ fontSize: 14, opacity: 0.8 }}>
              Location:{" "}
              {a.space?.name ||
                a.subVenue?.name ||
                a.venue?.name ||
                "—"}
            </div>

            <div>Quantity: {a.quantity}</div>

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
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
