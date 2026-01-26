const isProd = import.meta.env.PROD;

// Always ensure /api is present in production
export const API_BASE = isProd
  ? "https://tamilnadu.onrender.com/api"
  : "http://localhost:5001/api";
