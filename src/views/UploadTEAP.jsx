import { uploadTEAP } from "../api";

export default function UploadTEAP() {
  async function handleUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await uploadTEAP(formData);
    alert(res.message || "TEAP uploaded");
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Upload TEAP Excel</h2>
      <input type="file" accept=".xlsx" onChange={handleUpload} />
    </div>
  );
}
