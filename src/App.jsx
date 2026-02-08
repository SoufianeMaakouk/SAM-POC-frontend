import { useState } from "react";
import Allocations from "./pages/Allocations.jsx";
import Deliveries from "./pages/Deliveries.jsx";
import Admin from "./pages/Admin.jsx";

export default function App() {
  const [page, setPage] = useState("admin");

  return (
    <div style={{ padding: 20 }}>
      <h1>SAM – Logistics Platform</h1>

      <button onClick={() => setPage("admin")}>Admin</button>
      <button onClick={() => setPage("allocations")}>Allocations</button>
      <button onClick={() => setPage("deliveries")}>Delivery Sheet</button>

      <hr />

      {page === "admin" && <Admin />}
      {page === "allocations" && <Allocations />}
      {page === "deliveries" && <Deliveries />}
    </div>
  );
}
