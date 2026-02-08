import { useEffect, useState } from "react";
import { getDeliveries } from "../services/api.js";

export default function Deliveries() {
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await getDeliveries();
    setDeliveries(data);
  };

  return (
    <>
      <h2>Delivery Sheet</h2>

      {deliveries.length === 0 && <p>No deliveries yet</p>}

      {deliveries.map((d, idx) => (
        <div
          key={idx}
          style={{
            border: "1px solid #ccc",
            padding: 12,
            marginBottom: 16
          }}
        >
          <h3>Venue: {d.venue}</h3>

          <table width="100%" border="1" cellPadding="6">
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {d.items.map((i, index) => (
                <tr key={index}>
                  <td>{i.item}</td>
                  <td>{i.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </>
  );
}
