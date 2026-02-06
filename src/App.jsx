import { useState } from "react";
import UploadTEAP from "./components/UploadTEAP";
import Summary from "./components/Summary";
import EquipmentTable from "./components/EquipmentTable";
import DemandTable from "./components/DemandTable";

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
