export type DeviceInfo = {
  deviceType: "Mobile" | "Tablet" | "Desktop";
  os: string;
  browser: string;
  screen: string;        // ✅ ADD THIS
  language: string;
  userAgent: string;
};

/* -----------------------------
   DEVICE TYPE
-------------------------------- */
const getDeviceType = (): DeviceInfo["deviceType"] => {
  const width = window.innerWidth;

  if (width <= 768) return "Mobile";
  if (width <= 1024) return "Tablet";
  return "Desktop";
};

/* -----------------------------
   OPERATING SYSTEM
-------------------------------- */
const getOS = (): string => {
  const ua = navigator.userAgent;

  if (/android/i.test(ua)) return "Android";
  if (/iphone|ipad|ipod/i.test(ua)) return "iOS";
  if (/windows/i.test(ua)) return "Windows";
  if (/mac os/i.test(ua)) return "macOS";
  if (/linux/i.test(ua)) return "Linux";

  return "Unknown";
};

/* -----------------------------
   BROWSER
-------------------------------- */
const getBrowser = (): string => {
  const ua = navigator.userAgent;

  if (ua.includes("Chrome") && !ua.includes("Edg")) return "Chrome";
  if (ua.includes("Firefox")) return "Firefox";
  if (ua.includes("Safari") && !ua.includes("Chrome")) return "Safari";
  if (ua.includes("Edg")) return "Edge";

  return "Unknown";
};

/* -----------------------------
   MAIN EXPORT
-------------------------------- */
export const getDeviceInfo = (): DeviceInfo => {
  return {
    deviceType: getDeviceType(),
    os: getOS(),
    browser: getBrowser(),
    screen: `${window.innerWidth}x${window.innerHeight}`, // ✅ FIX
    language: navigator.language,
    userAgent: navigator.userAgent,
  };
};
