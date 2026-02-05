import { useState } from "react";
import Navbar from "./components/Navbar";
import UploadTEAP from "./views/UploadTEAP";
import ConflictView from "./views/ConflictView";
import PlansView from "./views/PlansView";
import CatalogueView from "./views/CatalogueView";
import VenuesView from "./views/VenuesView";

export default function App() {
  const [view, setView] = useState("plans");

  return (
    <>
      <Navbar setView={setView} />

      {view === "plans" && <PlansView />}
      {view === "upload" && <UploadTEAP />}
      {view === "conflicts" && <ConflictView />}
      {view === "catalogue" && <CatalogueView />}
      {view === "venues" && <VenuesView />}
    </>
  );
}
