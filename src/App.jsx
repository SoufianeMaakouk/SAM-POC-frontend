import UploadTEAP from "./views/UploadTEAP.jsx";
import ConflictView from "./views/ConflictView.jsx";
import CatalogueView from "./views/CatalogueView.js";
import VenuesView from "./views/VenuesView.js";
import PlansView from "./views/PlansView.js";

function App() {
  const [view, setView] = useState("upload");

  return (
    <>
      <h1>SAM – TEAP POC</h1>

      <button onClick={() => setView("upload")}>Upload TEAP</button>
      <button onClick={() => setView("conflicts")}>Conflicts</button>

      {view === "upload" && <UploadTEAP />}
      {view === "conflicts" && <ConflictView />}
    </>
  );
}

export default App;
