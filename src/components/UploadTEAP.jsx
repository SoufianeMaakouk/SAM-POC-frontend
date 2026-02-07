import { useState } from "react";
import { uploadTEAP } from "../api";

export default function UploadTEAP({ onResult }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    setError("");

    try {
      const result = await uploadTEAP(file);
      onResult(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept=".xlsx,.xls"
        onChange={e => setFile(e.target.files[0])}
      />

      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload TEAP"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
