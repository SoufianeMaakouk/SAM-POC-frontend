import { useState } from "react";

const API = "https://sam-poc-backend.onrender.com";

export default function Admin() {
  const [name, setName] = useState("");

  const create = async (path) => {
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

      <div style={{ marginTop: 10 }}>
        <button onClick={() => create("items")}>Add Item</button>
        <button onClick={() => create("functional-areas")}>Add Functional Area</button>
        <button onClick={() => create("venues")}>Add Venue</button>
      </div>

      <p style={{ marginTop: 10, color: "#555" }}>
        (Temporary admin panel – will be improved later)
      </p>
    </>
  );
}
