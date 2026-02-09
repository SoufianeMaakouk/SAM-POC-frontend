import { useEffect, useState } from "react";
import {
  getItems,
  getFAs,
  getVenues,
  createItem,
  createFA,
  createVenue
} from "../services/api";

const API = "https://sam-poc-backend.onrender.com";

export default function Admin() {
  const [items, setItems] = useState([]);
  const [fas, setFAs] = useState([]);
  const [venues, setVenues] = useState([]);

  /* MANUAL INPUT STATES */
  const [itemName, setItemName] = useState("");
  const [itemQty, setItemQty] = useState("");

  const [faName, setFaName] = useState("");
  const [venueName, setVenueName] = useState("");

  /* TEAP UPLOAD STATE */
  const [teapFile, setTeapFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    setItems(await getItems());
    setFAs(await getFAs());
    setVenues(await getVenues());
  };

  /* =========================
     MANUAL CREATION
     ========================= */

  const addItem = async () => {
    if (!itemName || !itemQty) {
      alert("Item name & quantity required");
      return;
    }

    await createItem({
      name: itemName,
      totalQuantity: Number(itemQty)
    });

    setItemName("");
    setItemQty("");
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

  /* =========================
     TEAP EXCEL UPLOAD
     ========================= */

  const uploadTEAP = async () => {
    if (!teapFile) {
      alert("Please select a TEAP Excel file");
      return;
    }

    const formData = new FormData();
    formData.append("file", teapFile);

    try {
      setUploading(true);

      const res = await fetch(`${API}/admin/teap-upload`, {
        method: "POST",
        body: formData
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }

      alert(
        `TEAP Imported\nNew items: ${data.created}\nUpdated items: ${data.updated}`
      );

      setTeapFile(null);
      loadAll();
    } catch (err) {
      alert(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h2>Admin</h2>

      {/* =========================
          TEAP UPLOAD
          ========================= */}
      <section style={{ border: "1px solid #ccc", padding: 10, marginBottom: 20 }}>
        <h3>Upload TEAP Excel</h3>

        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={e => setTeapFile(e.target.files[0])}
        />

        <br /><br />

        <button onClick={uploadTEAP} disabled={uploading}>
          {uploading ? "Uploading..." : "Upload TEAP"}
        </button>

        <p style={{ fontSize: 12, color: "#666" }}>
          Expected columns: <b>Product Code</b>, <b>Product Name</b>, <b>Quantity</b>
        </p>
      </section>

      {/* =========================
          ITEMS (MANUAL)
          ========================= */}
      <section>
        <h3>Items (Manual)</h3>

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

      {/* =========================
          FUNCTIONAL AREAS
          ========================= */}
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

      {/* =========================
          VENUES
          ========================= */}
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
