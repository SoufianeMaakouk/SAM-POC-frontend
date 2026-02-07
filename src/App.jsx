import { useState } from "react";

import UploadTEAP from "./components/UploadTEAP.jsx";
import Summary from "./components/Summary.jsx";
import EquipmentTable from "./components/EquipmentTable.jsx";
import DemandTable from "./components/DemandTable.jsx";

export default function App() {
  const [result, setResult] = useState(null);

  return (
    <div style={{ padding: "20px" }}>
      <h1>SAM – TEAP Analyzer</h1>

      <UploadTEAP onResult={setResult} />

      {result && (
        <>
          <Summary summary={result.summary} />
          <EquipmentTable equipment={result.preview.equipment} />
          <DemandTable demands={result.preview.demands} />
        </>
      )}
    </div>
  );
}
