import { useState } from "react";
import Navbar from "./components/Navbar.jsx";

import UploadTEAP from "./views/UploadTEAP.jsx";
import ConflictView from "./views/ConflictView.jsx";
import CatalogueView from "./views/CatalogueView.jsx";
import VenuesView from "./views/VenuesView.jsx";
import PlansView from "./views/PlansView.jsx";

export default function App() {
  const [view, setView] = useState("upload");

  return (
    <>
      <Navbar setView={setView} />
      {view === "upload" && <UploadTEAP />}
      {view === "conflicts" && <ConflictView />}
      {view === "catalogue" && <CatalogueView />}
      {view === "venues" && <VenuesView />}
      {view === "plans" && <PlansView />}
    </>
  );
}
