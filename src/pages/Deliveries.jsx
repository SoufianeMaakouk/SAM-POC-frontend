import { useEffect, useState } from "react";
import { getDeliverySheet } from "../services/api";

export default function Deliveries() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await getDeliverySheet();
    setRows(data);
  };

  return (
    <div>
      <h2>Delivery Sheet</h2>

      {rows.length === 0 && <p>No deliveries yet</p>}

      <table border="1" cellPadding="6" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Location</th>
            <th>Status</th>
            <th>Updated</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r._id}>
              <td>{r.item?.name}</td>
              <td>{r.quantity}</td>
              <td>
                {r.space?.name ||
                  r.subVenue?.name ||
                  r.venue?.name}
              </td>
              <td>
                <strong>{r.status}</strong>
              </td>
              <td>
                {new Date(r.updatedAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
