import { useState } from "react";
import UploadTEAP from "./UploadTEAP.jsx";
import ConflictView from "./ConflictView.jsx";

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
