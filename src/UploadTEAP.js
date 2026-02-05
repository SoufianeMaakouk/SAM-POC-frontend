import { uploadTEAP } from "./api";

export default function UploadTEAP({ onUploaded }) {
  const handleUpload = async e => {
    const file = e.target.files[0];
    const result = await uploadTEAP(file);
    alert("TEAP imported");
    onUploaded();
  };

  return <input type="file" onChange={handleUpload} />;
}
