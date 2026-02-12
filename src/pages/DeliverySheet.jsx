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

  useEffect(() => {
    loadAllocations();
  }, [selectedVenue, selectedDay]);

  const loadVenues = async () => {
    const data = await getVenues();
    setVenues(data);
  };

  const loadAllocations = async () => {
    if (!selectedVenue) {
      setAllocations([]);
      return;
    }

    const res = await fetch(
      `${API}/allocations/venue/${selectedVenue}?day=${selectedDay}`
    );

    const data = await res.json();
    setAllocations(data);
  };

  const grouped = allocations.reduce((acc, alloc) => {
    const name = alloc.item?.name || "Unknown Item";
    if (!acc[name]) acc[name] = 0;
    acc[name] += alloc.quantity;
    return acc;
  }, {});

  const total = Object.values(grouped).reduce((a, b) => a + b, 0);

  return (
    <div style={{ padding: 30 }}>
      <h1>📦 Delivery Sheet</h1>

      <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
        <select value={selectedVenue} onChange={e => setSelectedVenue(e.target.value)}>
          <option value="">Select Venue</option>
          {venues.map(v => (
            <option key={v._id} value={v._id}>{v.name}</option>
          ))}
        </select>

        <select value={selectedDay} onChange={e => setSelectedDay(e.target.value)}>
          <option>Day 1</option>
          <option>Day 2</option>
          <option>Day 3</option>
        </select>

        <button
          onClick={() =>
            window.open(
              `${API}/allocations/export/excel/${selectedVenue}?day=${selectedDay}`
            )
          }
        >
          Export Excel
        </button>

        <button
          onClick={() =>
            window.open(
              `${API}/allocations/export/pdf/${selectedVenue}?day=${selectedDay}`
            )
          }
        >
          Export PDF
        </button>
      </div>

      {Object.keys(grouped).length > 0 ? (
        <table border="1" cellPadding="10" style={{ width: "100%" }}>
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
              <td><strong>{total}</strong></td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>No allocations found.</p>
      )}
    </div>
  );
}
