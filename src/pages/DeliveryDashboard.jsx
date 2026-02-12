import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL;

export default function DeliveryDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${API}/allocations/dashboard/summary`)
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div style={{ padding: 30 }}>
      <h1>📊 Delivery Progress Dashboard</h1>

      <h2>Overall Completion: {data.progress}%</h2>

      <p>Total Allocated: {data.total}</p>
      <p>Delivered: {data.delivered}</p>
      <p>Ordered: {data.ordered}</p>
      <p>Fulfilled: {data.fulfilled}</p>
      <p>Returned: {data.returned}</p>
      <p>Missing: {data.missing}</p>

      <div
        style={{
          marginTop: 20,
          width: "100%",
          height: 30,
          background: "#ddd",
          borderRadius: 10
        }}
      >
        <div
          style={{
            width: `${data.progress}%`,
            height: "100%",
            background: "green",
            borderRadius: 10
          }}
        />
      </div>
    </div>
  );
}
