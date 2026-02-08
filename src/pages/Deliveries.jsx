import { useEffect, useState } from "react";
import { getDeliveries } from "../services/api.js";

export default function Deliveries() {
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    getDeliveries().then(setDeliveries);
  }, []);

  return (
    <>
      <h2>Delivery Sheet</h2>

      {deliveries.map(venue => (
        <div key={venue.venueId} style={{ marginBottom: 20 }}>
          <h3>{venue.venue}</h3>

          <table border="1" cellPadding="6">
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Functional Areas</th>
              </tr>
            </thead>
            <tbody>
              {venue.items.map((i, idx) => (
                <tr key={idx}>
                  <td>{i.item}</td>
                  <td>{i.quantity}</td>
                  <td>{i.functionalAreas.join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </>
  );
}
