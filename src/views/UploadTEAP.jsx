import { useState } from "react";
import { uploadTEAP } from "../api";

export default function UploadTEAP() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await uploadTEAP(file);
      setResult(res);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Upload TEAP</h2>

      <input
        type="file"
        accept=".xlsx"
        onChange={e => setFile(e.target.files[0])}
      />

      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>

      {result && (
        <pre style={{ marginTop: 16 }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}

      {error && (
        <p style={{ color: "red", marginTop: 16 }}>{error}</p>
      )}
    </div>
  );
}
