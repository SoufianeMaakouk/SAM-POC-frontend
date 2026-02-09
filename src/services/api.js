const API = "https://sam-poc-backend.onrender.com";

/* BASE */
const get = url => fetch(url).then(r => r.json());

/* CATALOG */
export const getItems = () => get(`${API}/items`);
export const getFAs = () => get(`${API}/functional-areas`);
export const getVenues = () => get(`${API}/venues`);
export const getSubVenues = venueId =>
  get(`${API}/sub-venues/${venueId}`);
export const getSpaces = subVenueId =>
  get(`${API}/spaces/${subVenueId}`);

/* ALLOCATIONS */
export const getAllocations = () => get(`${API}/allocations`);

export const createAllocation = async data => {
  const res = await fetch(`${API}/allocations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const json = await res.json();
  if (!res.ok) throw json;
  return json;
};
