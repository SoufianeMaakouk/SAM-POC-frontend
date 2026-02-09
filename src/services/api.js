const API = "https://sam-poc-backend.onrender.com";

/* =========================
   ITEMS
   ========================= */

/* Basic list (used for dropdowns) */
export const getItems = async () =>
  (await fetch(`${API}/items`)).json();

/* All items with allocation summary */
export const getItemsSummary = async () =>
  (await fetch(`${API}/items/summary`)).json();

/* Single item summary (remaining / allocated) */
export const getItemSummary = async (itemId) =>
  (await fetch(`${API}/items/${itemId}/summary`)).json();

/* Create item (Admin) */
export const createItem = async (data) =>
  fetch(`${API}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

/* =========================
   FUNCTIONAL AREAS
   ========================= */

export const getFAs = async () =>
  (await fetch(`${API}/functional-areas`)).json();

export const createFA = async (data) =>
  fetch(`${API}/functional-areas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

/* =========================
   VENUES
   ========================= */

export const getVenues = async () =>
  (await fetch(`${API}/venues`)).json();

export const createVenue = async (data) =>
  fetch(`${API}/venues`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

/* =========================
   ALLOCATIONS
   ========================= */

export const getAllocations = async () =>
  (await fetch(`${API}/allocations`)).json();

export const createAllocation = async (data) =>
  fetch(`${API}/allocations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

/* =========================
   DELIVERIES
   ========================= */

export const getDeliveries = async () =>
  (await fetch(`${API}/deliveries`)).json();

export const getDeliverySheet = async () =>
  (await fetch(`${API}/deliveries/sheet`)).json();
