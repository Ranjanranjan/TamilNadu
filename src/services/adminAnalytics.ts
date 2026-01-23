import { API_BASE } from "@/config/api";

const API = `${API_BASE}/admin/analytics`;

const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
});

/* ================= OVERVIEW ================= */

export const fetchOverview = async () => {
  const res = await fetch(`${API}/overview`, {
    headers: authHeader(),
  });

  if (!res.ok) throw new Error("Failed to fetch overview");
  return res.json();
};

/* ================= DEVICES ================= */

export const fetchDevices = async () => {
  const res = await fetch(`${API}/devices`, {
    headers: authHeader(),
  });

  if (!res.ok) throw new Error("Failed to fetch devices");
  return res.json();
};

/* ================= PAGES ================= */

export const fetchPages = async () => {
  const res = await fetch(`${API}/pages`, {
    headers: authHeader(),
  });

  if (!res.ok) throw new Error("Failed to fetch pages");
  return res.json();
};

/* ================= EMOTIONS ================= */

export const fetchEmotions = async () => {
  const res = await fetch(`${API}/emotions`, {
    headers: authHeader(),
  });

  if (!res.ok) throw new Error("Failed to fetch emotions");
  return res.json();
};

/* ================= AGE ================= */

export const fetchAges = async () => {
  const res = await fetch(`${API}/ages`, {
    headers: authHeader(),
  });

  if (!res.ok) throw new Error("Failed to fetch ages");
  return res.json();
};

