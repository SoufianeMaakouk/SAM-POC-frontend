const API = "https://sam-poc-backend.onrender.com";

export const getItems = async () =>
  (await fetch(`${API}/items`)).json();

export const getFAs = async () =>
  (await fetch(`${API}/functional-areas`)).json();

export const getVenues = async () =>
  (await fetch(`${API}/venues`)).json();

export const getAllocations = async () =>
  (await fetch(`${API}/allocations`)).json();

export const createAllocation = async (data) =>
  fetch(`${API}/allocations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

export const getDeliveries = async () =>
  (await fetch(`${API}/deliveries`)).json();

export const getDeliveries = async () => {
  const res = await fetch(`${API}/deliveries`);
  return res.json();
};

