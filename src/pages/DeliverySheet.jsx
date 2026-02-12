import React, { useEffect, useState } from "react";

export default function DeliverySheet() {
  const [allocations, setAllocations] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState("All");
  const [selectedDay, setSelectedDay] = useState("All");

  // 🔹 TEMP MOCK DATA (replace later with backend API)
  useEffect(() => {
    const mockData = [
      { venue: "Stadium A", item: "Water Bottles", quantity: 200, day: "Day 1" },
      { venue: "Stadium A", item: "T-Shirts", quantity: 50, day: "Day 2" },
      { venue: "Arena B", item: "Water Bottles", quantity: 150, day: "Day 1" },
      { venue: "Arena B", item: "Caps", quantity: 40, day: "Day 2" },
      { venue: "Hall C", item: "Flags", quantity: 30, day: "Day 1" },
    ];

    setAllocations(mockData);
  }, []);

  // 🔹 Filter logic
  const filteredAllocations = allocations.filter((alloc) => {
    const venueMatch =
      selectedVenue === "All" || alloc.venue === selectedVenue;

    const dayMatch =
      selectedDay === "All" || alloc.day === selectedDay;

    return venueMatch && dayMatch;
  });

  // 🔹 Get unique venues
  const venues = ["All", ...new Set(allocations.map((a) => a.venue))];

  // 🔹 Group by venue
  const groupedByVenue = filteredAllocations.reduce((acc, curr) => {
    if (!acc[curr.venue]) {
      acc[curr.venue] = [];
    }
    acc[curr.venue].push(curr);
    return acc;
  }, {});

  return (
    <div style={{ padding: "30px" }}>
      <h1>📦 Per Venue Delivery Sheets</h1>

      {/* ================= FILTERS ================= */}
      <div style={{ marginBottom: "20px", display: "flex", gap: "20px" }}>
        {/* Venue Filter */}
        <div>
          <label>Venue: </label>
          <select
            value={selectedVenue}
            onChange={(e) => setSelectedVenue(e.target.value)}
          >
            {venues.map((venue) => (
              <option key={venue} value={venue}>
                {venue}
              </option>
            ))}
          </select>
        </div>

        {/* Day Filter */}
        <div>
          <label>Delivery Day: </label>
          <select
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Day 1">Day 1</option>
            <option value="Day 2">Day 2</option>
          </select>
        </div>
      </div>

      {/* ================= DELIVERY TABLE ================= */}
      {Object.keys(groupedByVenue).length === 0 && (
        <p>No allocations found.</p>
      )}

      {Object.entries(groupedByVenue).map(([venue, items]) => {
        const total = items.reduce((sum, i) => sum + i.quantity, 0);

        return (
          <div
            key={venue}
            style={{
              marginBottom: "40px",
              border: "1px solid #ddd",
              padding: "15px",
              borderRadius: "8px",
            }}
          >
            <h2>🏟 {venue}</h2>

            <table
              width="100%"
              border="1"
              cellPadding="8"
              style={{ borderCollapse: "collapse", marginTop: "10px" }}
            >
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Day</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.item}</td>
                    <td>{item.quantity}</td>
                    <td>{item.day}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3 style={{ marginTop: "15px" }}>
              Total for {venue}: {total} units
            </h3>
          </div>
        );
      })}
    </div>
  );
}
