import { API_BASE } from "@/config/api";
const API_URL = `${API_BASE}/analytics`;

/* =============================
   TYPES
============================= */

export type DeviceInfoPayload = {
  deviceType: "Mobile" | "Tablet" | "Desktop";
  os: string;
  browser: string;
  screen: string;
  language: string;
  userAgent: string;
};

export type VisitPayload = {
  sessionId: string;
  isNewSession: boolean;
  device: DeviceInfoPayload;
  startTime: number;
};

export type PageViewPayload = {
  sessionId: string;
  page: string;
};

export type SessionDurationPayload = {
  sessionId: string;
  duration: number; // seconds
};

export type AgePayload = {
  sessionId: string;
  ageRange: string; // "10-15", "16-19", etc
};

export type EmotionPayload = {
  sessionId: string;
  emotion: string;
};

/* =============================
   VISIT TRACKING
============================= */

export const trackVisit = async (data: VisitPayload) => {
  try {
    await fetch(`${API_URL}/visit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (err) {
    console.error("❌ Analytics visit error:", err);
  }
};

/* =============================
   PAGE VIEW TRACKING
============================= */

export const trackPageView = async (
  page: string,
  sessionId: string
) => {
  try {
    const payload: PageViewPayload = { page, sessionId };

    await fetch(`${API_URL}/page`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error("❌ Page view error:", err);
  }
};

/* =============================
   SESSION DURATION TRACKING
============================= */

export const trackSessionDuration = async (
  data: SessionDurationPayload
) => {
  try {
    await fetch(`${API_URL}/session-duration`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (err) {
    console.error("❌ Session duration error:", err);
  }
};

/* =============================
   AGE GROUP TRACKING
============================= */

export const trackAgeSelection = async (
  data: AgePayload
) => {
  try {
    await fetch(`${API_URL}/age`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (err) {
    console.error("❌ Age tracking error:", err);
  }
};

/* =============================
   EMOTION CLICK TRACKING
============================= */

export const trackEmotionClick = async (
  data: EmotionPayload
) => {
  try {
    await fetch(`${API_URL}/emotion`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (err) {
    console.error("❌ Emotion tracking error:", err);
  }
};
