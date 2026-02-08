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
  const [itemQty, setItemQty] = useState("");

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

  /* ITEMS */
  const addItem = async () => {
    if (!itemName || !itemQty) return alert("Item name & quantity required");

    await createItem({
      name: itemName,
      totalQuantity: Number(itemQty)
    });

    setItemName("");
    setItemQty("");
    loadAll();
  };

  /* FUNCTIONAL AREAS */
  const addFA = async () => {
    if (!faName) return;
    await createFA({ name: faName });
    setFaName("");
    loadAll();
  };

  /* VENUES */
  const addVenue = async () => {
    if (!venueName) return;
    await createVenue({ name: venueName });
    setVenueName("");
    loadAll();
  };

  return (
    <div>
      <h2>Admin</h2>

      {/* ITEMS */}
      <section>
        <h3>Items</h3>
        <input
          placeholder="Item name"
          value={itemName}
          onChange={e => setItemName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Total quantity"
          value={itemQty}
          onChange={e => setItemQty(e.target.value)}
        />
        <button onClick={addItem}>Add Item</button>

        <ul>
          {items.map(i => (
            <li key={i._id}>
              {i.name} — total: {i.totalQuantity}
            </li>
          ))}
        </ul>
      </section>

      {/* FUNCTIONAL AREAS */}
      <section>
        <h3>Functional Areas</h3>
        <input
          placeholder="FA name"
          value={faName}
          onChange={e => setFaName(e.target.value)}
        />
        <button onClick={addFA}>Add FA</button>

        <ul>
          {fas.map(f => (
            <li key={f._id}>{f.name}</li>
          ))}
        </ul>
      </section>

      {/* VENUES */}
      <section>
        <h3>Venues</h3>
        <input
          placeholder="Venue name"
          value={venueName}
          onChange={e => setVenueName(e.target.value)}
        />
        <button onClick={addVenue}>Add Venue</button>

        <ul>
          {venues.map(v => (
            <li key={v._id}>{v.name}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
