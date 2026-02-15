import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

import Admin from "./pages/Admin";
import Allocations from "./pages/Allocations";
import Deliveries from "./pages/Deliveries";
import AllocationStatus from "./pages/AllocationStatus";
import DeliveryDashboard from "./pages/DeliveryDashboard";
import DeliverySheet from "./pages/DeliverySheet";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen bg-gray-100">

        {/* Sidebar */}
        <aside className="w-64 bg-secondary text-white flex flex-col">
          <div className="p-6 text-2xl font-bold border-b border-gray-700">
            SAM Logistics
          </div>

          <nav className="flex-1 p-4 space-y-2">

            <SidebarLink to="/">Allocations</SidebarLink>
            <SidebarLink to="/admin">Admin</SidebarLink>
            <SidebarLink to="/deliveries">Deliveries</SidebarLink>
            <SidebarLink to="/delivery-sheet">Delivery Sheet</SidebarLink>
            <SidebarLink to="/dashboard">Dashboard</SidebarLink>
            <SidebarLink to="/status">Status</SidebarLink>

          </nav>

          <div className="p-4 text-sm text-gray-400 border-t border-gray-700">
            © 2026 SAM System
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-8">
          <Routes>
            <Route path="/" element={<Allocations />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/deliveries" element={<Deliveries />} />
            <Route path="/delivery-sheet" element={<DeliverySheet />} />
            <Route path="/dashboard" element={<DeliveryDashboard />} />
            <Route path="/status" element={<AllocationStatus />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

function SidebarLink({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block px-4 py-2 rounded-lg transition ${
          isActive
            ? "bg-primary"
            : "hover:bg-gray-700"
        }`
      }
    >
      {children}
    </NavLink>
  );
}
