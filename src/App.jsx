import { useState } from "react";
import Allocations from "./pages/Allocations.jsx";
import Deliveries from "./pages/Deliveries.jsx";

export default function App() {
  const [page, setPage] = useState("allocations");

  return (
    <div style={{ padding: 20 }}>
      <h1>SAM – Logistics Platform</h1>

      <button onClick={() => setPage("allocations")}>Allocations</button>
      <button onClick={() => setPage("deliveries")}>Delivery Sheet</button>

      <hr />

      {page === "allocations" && <Allocations />}
      {page === "deliveries" && <Deliveries />}
    </div>
  );
}
