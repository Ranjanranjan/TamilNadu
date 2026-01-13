export type AgeRange =
  | "10-15"
  | "16-19"
  | "20-30"
  | "31-45"
  | "46+";

export type SessionInfo = {
  sessionId: string;
  isNewSession: boolean;
  startTime: number;
  ageRange?: AgeRange;
};

/* -----------------------------
   GENERATE SESSION ID
-------------------------------- */
const generateSessionId = (): string => {
  return (
    "sess_" +
    Math.random().toString(36).substring(2, 10) +
    "_" +
    Date.now()
  );
};

/* -----------------------------
   GET OR CREATE SESSION
-------------------------------- */
export const getSession = (): SessionInfo => {
  const sessionId = sessionStorage.getItem("sessionId");
  const startTime = sessionStorage.getItem("sessionStartTime");
  const ageRange = sessionStorage.getItem("ageRange") as AgeRange | null;

  if (sessionId && startTime) {
    return {
      sessionId,
      isNewSession: false,
      startTime: Number(startTime),
      ageRange: ageRange ?? undefined,
    };
  }

  const newSessionId = generateSessionId();
  const newStartTime = Date.now();

  sessionStorage.setItem("sessionId", newSessionId);
  sessionStorage.setItem("sessionStartTime", newStartTime.toString());

  return {
    sessionId: newSessionId,
    isNewSession: true,
    startTime: newStartTime,
  };
};

/* -----------------------------
   SAVE AGE RANGE
-------------------------------- */
export const setAgeRange = (age: AgeRange) => {
  sessionStorage.setItem("ageRange", age);
};

/* -----------------------------
   SESSION DURATION
-------------------------------- */
export const getSessionDuration = (): number => {
  const startTime = sessionStorage.getItem("sessionStartTime");
  if (!startTime) return 0;
  return Math.floor((Date.now() - Number(startTime)) / 1000);
};
