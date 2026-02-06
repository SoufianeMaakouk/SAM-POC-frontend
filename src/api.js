const API_BASE = "https://sam-poc-backend.onrender.com";

export async function uploadTEAP(file) {
  const form = new FormData();
  form.append("file", file);

  const res = await fetch(`${API_BASE}/upload`, {
    method: "POST",
    body: form
  });

  return res.json();
}
