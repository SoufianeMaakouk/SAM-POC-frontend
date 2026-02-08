import { useEffect, useState } from "react";
import { getDeliveries } from "../services/api.js";

export default function Deliveries() {
  const [sheet, setSheet] = useState({});

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await getDeliveries();
    setSheet(data);
  };

  return (
    <>
      <h2>Delivery Sheet</h2>

      {Object.keys(sheet).length === 0 && (
        <p>No deliveries yet</p>
      )}

      {Object.entries(sheet).map(([venue, items]) => (
        <div key={venue} style={{ marginBottom: 20 }}>
          <h3>{venue}</h3>
          <ul>
            {Object.entries(items).map(([item, qty]) => (
              <li key={item}>
                {item}: {qty}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}
