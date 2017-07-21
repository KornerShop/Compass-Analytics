export const fetchConfig = (method, payload) => ({
  method,
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(payload)
});
