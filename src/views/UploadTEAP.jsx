import { uploadTEAP } from "../api";

export default function UploadTEAP({ onResult }) {
  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const result = await uploadTEAP(file);
      onResult(result);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <h2>Upload TEAP Excel</h2>
      <input type="file" accept=".xlsx" onChange={handleFile} />
    </div>
  );
}
