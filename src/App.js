import { useState } from "react";
import UploadTEAP from "./UploadTEAP";
import ConflictView from "./ConflictView";

export default function App() {
  const [ready, setReady] = useState(false);

  return (
    <div>
      <h1>SAM POC – TEAP Allocation</h1>
      <UploadTEAP onUploaded={() => setReady(true)} />
      {ready && <ConflictView />}
    </div>
  );
}
