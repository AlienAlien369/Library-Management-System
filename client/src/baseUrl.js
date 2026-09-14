// In production (Vercel) this must be set via the REACT_APP_API_URL env var
// to point at the deployed backend, e.g. https://your-api.onrender.com/api/
// Falls back to the local dev API for `npm start`.
export const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:5000/api/";
