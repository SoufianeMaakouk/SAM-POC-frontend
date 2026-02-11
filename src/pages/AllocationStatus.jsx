import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL;

export default function AllocationStatus() {
  const [allocations, setAllocations] = useState([]);
  const [loading, setLoading] = useState(true);

  const statuses = [
    "ORDERED",
    "FULFILLED",
    "DELIVERED",
    "RETURNED",
    "MISSING"
  ];

  const fetchAllocations = async () => {
    try {
      const res = await fetch(`${API}/allocations`);
      const data = await res.json();
      setAllocations(data);
    } catch (err) {
      console.error("Failed to fetch allocations:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await fetch(`${API}/allocations/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });

      fetchAllocations();
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  useEffect(() => {
    fetchAllocations();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Allocation Status Management</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Item</th>
            <th>FA</th>
            <th>Venue</th>
            <th>SubVenue</th>
            <th>Space</th>
            <th>Quantity</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {allocations.map((a) => (
            <tr key={a._id}>
              <td>{a.item?.name}</td>
              <td>{a.functionalArea?.name}</td>
              <td>{a.venue?.name}</td>
              <td>{a.subVenue?.name}</td>
              <td>{a.space?.name}</td>
              <td>{a.quantity}</td>
              <td>
                <select
                  value={a.status}
                  onChange={(e) =>
                    updateStatus(a._id, e.target.value)
                  }
                >
                  {statuses.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
