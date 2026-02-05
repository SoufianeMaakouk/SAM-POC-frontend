import { useEffect, useState } from "react";
import { getVenues } from "../api";

export default function VenuesView() {
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    getVenues().then(setVenues);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Venues</h2>

      <ul>
        {venues.map(v => (
          <li key={v._id}>
            {v.name} — {v.sport}
          </li>
        ))}
      </ul>
    </div>
  );
}
