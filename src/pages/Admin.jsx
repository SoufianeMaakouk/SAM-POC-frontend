import { useEffect, useState } from "react";
import { getItems, getFAs, getVenues } from "../services/api";

export default function Admin() {
  const [items, setItems] = useState([]);
  const [fas, setFAs] = useState([]);
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setItems(await getItems());
    setFAs(await getFAs());
    setVenues(await getVenues());
  };

  return (
    <div>
      <h2>Admin</h2>

      <section>
        <h3>Items</h3>
        <ul>
          {items.map(i => (
            <li key={i._id}>{i.name}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Functional Areas</h3>
        <ul>
          {fas.map(f => (
            <li key={f._id}>{f.name}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Venues</h3>
        <ul>
          {venues.map(v => (
            <li key={v._id}>{v.name}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
