import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Admin from "./pages/Admin.jsx";
import Allocations from "./pages/Allocations.jsx";
import Deliveries from "./pages/Deliveries.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <nav style={{ marginBottom: 20 }}>
        <Link to="/">Allocations</Link>{" | "}
        <Link to="/admin">Admin</Link>{" | "}
        <Link to="/deliveries">Delivery Sheet</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Allocations />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/deliveries" element={<Deliveries />} />
      </Routes>
    </BrowserRouter>
  );
}
