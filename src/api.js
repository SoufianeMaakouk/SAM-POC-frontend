const API_BASE = "https://sam-poc-backend.onrender.com";

export const getPlans = () =>
  fetch(`${API_BASE}/plans`).then(r => r.json());

export const createPlan = data =>
  fetch(`${API_BASE}/plans`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then(r => r.json());

export const uploadTEAP = formData =>
  fetch(`${API_BASE}/upload`, {
    method: "POST",
    body: formData
  }).then(r => r.json());

export const getItems = () =>
  fetch(`${API_BASE}/items`).then(r => r.json());

export const getVenues = () =>
  fetch(`${API_BASE}/venues`).then(r => r.json());

export const getAllocations = () =>
  fetch(`${API_BASE}/allocations`).then(r => r.json());
