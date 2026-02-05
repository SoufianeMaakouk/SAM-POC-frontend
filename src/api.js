const API_BASE = "https://sam-poc-backend.onrender.com";

export async function getPlans() {
  return fetch(`${API_BASE}/plans`).then(r => r.json());
}

export async function createPlan(data) {
  return fetch(`${API_BASE}/plans`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then(r => r.json());
}

export async function uploadTEAP(formData) {
  return fetch(`${API_BASE}/upload`, {
    method: "POST",
    body: formData
  }).then(r => r.json());
}

export async function getItems() {
  return fetch(`${API_BASE}/items`).then(r => r.json());
}

export async function getVenues() {
  return fetch(`${API_BASE}/venues`).then(r => r.json());
}

export async function getAllocations() {
  return fetch(`${API_BASE}/allocations`).then(r => r.json());
}
