const API = "https://sam-poc-backend.onrender.com";

/* ITEMS */
export const getItems = async () =>
  (await fetch(`${API}/items`)).json();

/* FUNCTIONAL AREAS */
export const getFAs = async () =>
  (await fetch(`${API}/functional-areas`)).json();

/* VENUES */
export const getVenues = async () =>
  (await fetch(`${API}/venues`)).json();

/* ALLOCATIONS */
export const getAllocations = async () =>
  (await fetch(`${API}/allocations`)).json();

export const createAllocation = async (data) =>
  fetch(`${API}/allocations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

/* DELIVERIES */
export const getDeliveries = async () => {
  const res = await fetch(`${API}/deliveries`);
  return res.json();
};

/* CREATE */
export const createItem = async (data) =>
  fetch(`${API}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

export const createFA = async (data) =>
  fetch(`${API}/functional-areas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

export const createVenue = async (data) =>
  fetch(`${API}/venues`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

