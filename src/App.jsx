import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Admin from "./pages/Admin.jsx";
import Allocations from "./pages/Allocations.jsx";
import AllocationStatus from "./pages/AllocationStatus.jsx";
import DeliverySheet from "./pages/DeliverySheet.jsx";
import DeliveryDashboard from "./pages/DeliveryDashboard";


export default function App() {
  return (
    <BrowserRouter>
      <nav style={{ marginBottom: 20 }}>
        <Link to="/">Allocations</Link>{" | "}
        <Link to="/admin">Admin</Link>{" | "}
        <Link to="/delivery-sheet">Delivery Sheet</Link>{" | "}
        <Link to="/status">Allocation Status</Link>{" | "}
        <Link to="/dashboard">Dashboard</Link>{" | "}
      </nav>

      <Routes>
        <Route path="/" element={<Allocations />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/delivery-sheet" element={<DeliverySheet />} />
        <Route path="/status" element={<AllocationStatus />} />
        <Route path="/dashboard" element={<DeliveryDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
