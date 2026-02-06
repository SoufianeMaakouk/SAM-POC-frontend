const API_URL = import.meta.env.VITE_API_URL;

export async function uploadTEAP(file) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_URL}/upload`, {
    method: "POST",
    body: formData
  });

  if (!res.ok) {
    throw new Error("Upload failed");
  }

  return res.json();
}
