import { useState } from "react";
import UploadTEAP from "./components/UploadTEAP";

export default function App() {
  const [data, setData] = useState(null);

  return (
    <div style={{ padding: 20 }}>
      <h1>SAM – TEAP Analyzer</h1>

      <UploadTEAP onResult={setData} />

      {data && (
        <>
          <h2>Summary</h2>
          <pre>{JSON.stringify(data.summary, null, 2)}</pre>

          <h2>Equipment</h2>
          <table border="1">
            <thead>
              <tr>
                <th>Code</th>
                <th>Name</th>
                <th>Total Qty</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(data.equipment).map(([code, e]) => (
                <tr key={code}>
                  <td>{code}</td>
                  <td>{e.name}</td>
                  <td>{e.totalQty}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2>Demand (first 50 rows)</h2>
          <pre>{JSON.stringify(data.demands.slice(0, 50), null, 2)}</pre>
        </>
      )}
    </div>
  );
}
