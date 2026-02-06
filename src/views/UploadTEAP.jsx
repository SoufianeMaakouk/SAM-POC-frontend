import { useState } from "react";
import { uploadTEAP } from "../api.js";

export default function UploadTEAP() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const submit = async () => {
    if (!file) return;
    setStatus("Uploading...");
    const res = await uploadTEAP(file);
    setStatus(res.message || "Done");
  };

  return (
    <div>
      <h2>Upload TEAP</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={submit}>Upload</button>
      <p>{status}</p>
    </div>
  );
}
