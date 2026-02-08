import { useState } from "react";

const API = "https://sam-poc-backend.onrender.com";

export default function Admin() {
  const [name, setName] = useState("");
  const [totalQuantity, setTotalQuantity] = useState("");

  const createItem = async () => {
    await fetch(`${API}/items`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        totalQuantity: Number(totalQuantity)
      })
    });

    setName("");
    setTotalQuantity("");
    alert("Item created");
  };

  const createSimple = async (path) => {
    await fetch(`${API}/${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name })
    });

    setName("");
    alert("Created");
  };

  return (
    <>
      <h2>Admin – Create Base Data</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <input
        placeholder="Total Quantity (for items)"
        type="number"
        value={totalQuantity}
        onChange={e => setTotalQuantity(e.target.value)}
      />

      <div style={{ marginTop: 10 }}>
        <button onClick={createItem}>Add Item</button>
        <button onClick={() => createSimple("functional-areas")}>
          Add Functional Area
        </button>
        <button onClick={() => createSimple("venues")}>
          Add Venue
        </button>
      </div>
    </>
  );
}
