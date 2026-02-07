const API_URL = import.meta.env.VITE_API_URL;

export async function uploadTEAP(file) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_URL}/upload/teap`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Upload failed");
  }

  return res.json();
}
