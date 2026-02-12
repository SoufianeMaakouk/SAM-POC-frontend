import { useEffect, useState } from "react";
import { getVenues } from "../services/api";

const API = import.meta.env.VITE_API_URL;

export default function DeliverySheet() {
  const [venues, setVenues] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState("");
  const [allocations, setAllocations] = useState([]);

  useEffect(() => {
    loadVenues();
  }, []);

  const loadVenues = async () => {
    const data = await getVenues();
    setVenues(data);
  };

  const loadAllocations = async (venueId) => {
    if (!venueId) {
      setAllocations([]);
      return;
    }

    const res = await fetch(`${API}/allocations/venue/${venueId}`);
    const data = await res.json();
    setAllocations(data);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Per-Venue Delivery Sheet</h2>

      <select
        value={selectedVenue}
        onChange={e => {
          setSelectedVenue(e.target.value);
          loadAllocations(e.target.value);
        }}
      >
        <option value="">Select Venue</option>
        {venues.map(v => (
          <option key={v._id} value={v._id}>{v.name}</option>
        ))}
      </select>

      <hr style={{ margin: "20px 0" }} />

      {allocations.length > 0 && (
        <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Item</th>
              <th>Functional Area</th>
              <th>SubVenue</th>
              <th>Space</th>
              <th>Quantity</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {allocations.map(a => (
              <tr key={a._id}>
                <td>{a.item?.name}</td>
                <td>{a.functionalArea?.name}</td>
                <td>{a.subVenue?.name || "—"}</td>
                <td>{a.space?.name || "—"}</td>
                <td>{a.quantity}</td>
                <td>{a.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedVenue && allocations.length === 0 && (
        <p>No allocations for this venue.</p>
      )}
    </div>
  );
}
