import { useState } from "react";
import { uploadTEAP } from "../api";

export default function UploadTEAP({ onResult }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a TEAP Excel file first.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await uploadTEAP(file);
      onResult(result);
    } catch (err) {
      setError(err.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <h3>Upload TEAP Excel</h3>

      <input
        type="file"
        accept=".xlsx,.xls"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br /><br />

      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>

      {error && (
        <p style={{ color: "red", marginTop: 10 }}>
          {error}
        </p>
      )}
    </div>
  );
}
