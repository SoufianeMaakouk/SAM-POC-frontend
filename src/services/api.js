const API = import.meta.env.VITE_API_URL || "https://sam-poc-backend.onrender.com";

/* =========================
   ITEMS
========================= */

export const getItems = async () => {
  const res = await fetch(`${API}/items`);
  return res.json();
};

export const getItemSummary = async (id) => {
  const res = await fetch(`${API}/items/${id}/summary`);
  return res.json();
};

export const createItem = async (data) => {
  const res = await fetch(`${API}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
};

/* =========================
   FUNCTIONAL AREAS
========================= */

export const getFAs = async () => {
  const res = await fetch(`${API}/functional-areas`);
  return res.json();
};

export const createFA = async (data) => {
  const res = await fetch(`${API}/functional-areas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
};

/* =========================
   VENUES
========================= */

export const getVenues = async () => {
  const res = await fetch(`${API}/venues`);
  return res.json();
};

export const createVenue = async (data) => {
  const res = await fetch(`${API}/venues`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
};

/* =========================
   SUB VENUES
========================= */

export const getSubVenues = async (venueId) => {
  const res = await fetch(`${API}/subvenues/${venueId}`);
  return res.json();
};

/* =========================
   SPACES
========================= */

export const getSpaces = async (subVenueId) => {
  const res = await fetch(`${API}/spaces/${subVenueId}`);
  return res.json();
};

/* =========================
   ALLOCATIONS
========================= */

export const getAllocations = async () => {
  const res = await fetch(`${API}/allocations`);
  return res.json();
};

export const createAllocation = async (data) => {
  const res = await fetch(`${API}/allocations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
};

export const updateAllocationStatus = async (id, status) => {
  const res = await fetch(`${API}/allocations/${id}/status`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status })
  });
  return res.json();
};

/* =========================
   DELIVERY SHEET
========================= */

export const getDeliverySheet = async () => {
  const res = await fetch(`${API}/allocations/delivery-sheet`);
  return res.json();
};
