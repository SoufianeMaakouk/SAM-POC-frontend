import { useEffect, useState } from "react";
import { getVenues } from "../services/api";

const API = import.meta.env.VITE_API_URL;

export default function DeliverySheet() {
  const [venues, setVenues] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState("");
  const [selectedDay, setSelectedDay] = useState("Day 1");
  const [allocations, setAllocations] = useState([]);

  useEffect(() => {
    loadVenues();
  }, []);

  const loadVenues = async () => {
    const data = await getVenues();
    setVenues(data);
  };

  const loadAllocations = async (venueId, day) => {
    if (!venueId) {
      setAllocations([]);
      return;
    }

    const res = await fetch(
      `${API}/allocations/venue/${venueId}?day=${day}`
    );
    const data = await res.json();
    setAllocations(data);
  };

  const grouped = allocations.reduce((acc, a) => {
    const key = a.item?.name || "Unknown";
    if (!acc[key]) acc[key] = 0;
    acc[key] += a.quantity;
    return acc;
  }, {});

  const grandTotal = Object.values(grouped).reduce(
    (sum, val) => sum + val,
    0
  );

  return (
    <div style={{ padding: 20 }}>
      <h2>Delivery Sheet</h2>

      <select
        value={selectedVenue}
        onChange={e => {
          setSelectedVenue(e.target.value);
          loadAllocations(e.target.value, selectedDay);
        }}
      >
        <option value="">Select Venue</option>
        {venues.map(v => (
          <option key={v._id} value={v._id}>{v.name}</option>
        ))}
      </select>

      <select
        value={selectedDay}
        onChange={e => {
          setSelectedDay(e.target.value);
          loadAllocations(selectedVenue, e.target.value);
        }}
      >
        <option value="Day 1">Day 1</option>
        <option value="Day 2">Day 2</option>
        <option value="Day 3">Day 3</option>
      </select>

      <hr style={{ margin: "20px 0" }} />

      {Object.keys(grouped).length > 0 && (
        <>
          <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th>Item</th>
                <th>Total Quantity</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(grouped).map(([item, qty]) => (
                <tr key={item}>
                  <td>{item}</td>
                  <td>{qty}</td>
                </tr>
              ))}
              <tr>
                <td><strong>GRAND TOTAL</strong></td>
                <td><strong>{grandTotal}</strong></td>
              </tr>
            </tbody>
          </table>
        </>
      )}

      {selectedVenue && Object.keys(grouped).length === 0 && (
        <p>No allocations for this selection.</p>
      )}
    </div>
  );
}
