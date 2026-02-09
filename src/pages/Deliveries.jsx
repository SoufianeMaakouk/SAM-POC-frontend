import { useEffect, useState } from "react";
import { getDeliverySheet } from "../services/api";

export default function Deliveries() {
  const [sheet, setSheet] = useState({});

  useEffect(() => {
    getDeliverySheet().then(setSheet);
  }, []);

  return (
    <div>
      <h2>Delivery Sheet</h2>

      {Object.entries(sheet).map(([venue, subVenues]) => (
        <div key={venue}>
          <h3>{venue}</h3>

          {Object.entries(subVenues).map(([sv, spaces]) => (
            <div key={sv} style={{ marginLeft: 20 }}>
              <h4>{sv}</h4>

              {Object.entries(spaces).map(([space, items]) => (
                <div key={space} style={{ marginLeft: 40 }}>
                  <strong>{space}</strong>
                  <ul>
                    {items.map((i, idx) => (
                      <li key={idx}>{i.item} — {i.quantity}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
