const BASE_URL = "http://localhost:3000";

export async function uploadTEAP(file) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${BASE_URL}/upload`, {
    method: "POST",
    body: formData
  });

  return res.json();
}

export async function fetchConflicts() {
  const res = await fetch(`${BASE_URL}/allocation/conflicts`);
  return res.json();
}
