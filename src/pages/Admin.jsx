import { useEffect, useState } from "react";
import {
  getItems,
  getFAs,
  getVenues,
  createItem,
  createFA,
  createVenue
} from "../services/api";

export default function Admin() {
  const [items, setItems] = useState([]);
  const [fas, setFAs] = useState([]);
  const [venues, setVenues] = useState([]);

  const [itemName, setItemName] = useState("");
  const [faName, setFaName] = useState("");
  const [venueName, setVenueName] = useState("");

  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    setItems(await getItems());
    setFAs(await getFAs());
    setVenues(await getVenues());
  };

  const addItem = async () => {
    if (!itemName) return;
    await createItem({ name: itemName });
    setItemName("");
    loadAll();
  };

  const addFA = async () => {
    if (!faName) return;
    await createFA({ name: faName });
    setFaName("");
    loadAll();
  };

  const addVenue = async () => {
    if (!venueName) return;
    await createVenue({ name: venueName });
    setVenueName("");
    loadAll();
  };

  return (
    <div>
      <h2>Admin</h2>

      <section>
        <h3>Items</h3>
        <input
          placeholder="New item"
          value={itemName}
          onChange={e => setItemName(e.target.value)}
        />
        <button onClick={addItem}>Add</button>

        <ul>
          {items.map(i => (
            <li key={i._id}>{i.name}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Functional Areas</h3>
        <input
          placeholder="New functional area"
          value={faName}
          onChange={e => setFaName(e.target.value)}
        />
        <button onClick={addFA}>Add</button>

        <ul>
          {fas.map(f => (
            <li key={f._id}>{f.name}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Venues</h3>
        <input
          placeholder="New venue"
          value={venueName}
          onChange={e => setVenueName(e.target.value)}
        />
        <button onClick={addVenue}>Add</button>

        <ul>
          {venues.map(v => (
            <li key={v._id}>{v.name}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
