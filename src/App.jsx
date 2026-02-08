import Allocations from "./pages/Allocations.jsx";
import Deliveries from "./pages/Deliveries.jsx";
import Admin from "./pages/Admin.jsx";

export default function App() {
  return (
    <>
      <h1>SAM – Logistics Platform</h1>

      <nav style={{ marginBottom: 20 }}>
        <a href="/">Allocations</a> |{" "}
        <a href="/deliveries">Delivery Sheet</a> |{" "}
        <a href="/admin">Admin</a>
      </nav>

      {window.location.pathname === "/deliveries" && <Deliveries />}
      {window.location.pathname === "/admin" && <Admin />}
      {window.location.pathname === "/" && <Allocations />}
    </>
  );
}
