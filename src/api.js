const API_URL = import.meta.env.VITE_API_URL;

export async function uploadTEAP(file) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_URL}/api/upload`, {
    method: "POST",
    body: formData
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Upload failed");
  }

  return res.json();
}
