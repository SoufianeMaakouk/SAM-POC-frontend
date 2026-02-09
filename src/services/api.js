const API = "https://sam-poc-backend.onrender.com";

/* ---------- HELPERS ---------- */
const get = async (url) => {
  const res = await fetch(url);
  return res.json();
};

const post = async (url, data) => {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const json = await res.json();
  if (!res.ok) throw json;
  return json;
};

/* ---------- ITEMS ---------- */
export const getItems = () => get(`${API}/items`);

export const createItem = (data) =>
  post(`${API}/items`, data);

/* ---------- FUNCTIONAL AREAS ---------- */
export const getFAs = () => get(`${API}/functional-areas`);

export const createFA = (data) =>
  post(`${API}/functional-areas`, data);

/* ---------- VENUES ---------- */
export const getVenues = () => get(`${API}/venues`);

export const createVenue = (data) =>
  post(`${API}/venues`, data);

/* ---------- SUB VENUES ---------- */
export const getSubVenues = (venueId) =>
  get(`${API}/sub-venues/${venueId}`);

/* ---------- SPACES ---------- */
export const getSpaces = (subVenueId) =>
  get(`${API}/spaces/${subVenueId}`);

/* ---------- ALLOCATIONS ---------- */
export const getAllocations = () =>
  get(`${API}/allocations`);

export const createAllocation = (data) =>
  post(`${API}/allocations`, data);

/* ---------- DELIVERIES ---------- */
export const getDeliveries = () =>
  get(`${API}/deliveries`);
