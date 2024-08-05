export const getShop = (fetchFunction) => (
  fetchFunction(`/api/shop`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
);

export const createSubscription = (fetchFunction, payload) => (
  fetchFunction(`/api/subscriptions`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" },
  })
);

export const startImport = (fetchFunction, payload) => (
  fetchFunction(`/api/reviews/import`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" },
  })
);