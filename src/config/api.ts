const isProd = import.meta.env.PROD;

export const API_BASE = isProd
  ? import.meta.env.VITE_API_URL
  : "http://localhost:5001/api";
