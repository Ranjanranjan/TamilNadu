import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import { getSession, getSessionDuration } from "@/utils/session";
import { getDeviceInfo } from "@/utils/deviceInfo";
import { API_BASE } from "@/config/api";

import {
  trackVisit,
  trackPageView,
  trackSessionDuration,
  trackAgeSelection,
} from "@/services/analytics";

export default function useAnalytics() {
  const location = useLocation();

  const visitTrackedRef = useRef(false);
  const ageTrackedRef = useRef(false);

  /* -----------------------------
     INITIAL VISIT (ONCE)
  ------------------------------ */
  useEffect(() => {
    // ❌ Disable analytics on localhost
    if (import.meta.env.DEV) return;

    if (visitTrackedRef.current) return;

    const session = getSession();
    const device = getDeviceInfo();

    trackVisit({
      sessionId: session.sessionId,
      isNewSession: session.isNewSession,
      device,
      startTime: session.startTime,
    });

    visitTrackedRef.current = true;
  }, []);

  /* -----------------------------
     AGE SELECTION (ONCE)
  ------------------------------ */
  useEffect(() => {
    if (import.meta.env.DEV) return;

    if (ageTrackedRef.current) return;

    const session = getSession();

    if (session.ageRange) {
      trackAgeSelection({
        sessionId: session.sessionId,
        ageRange: session.ageRange,
      });

      ageTrackedRef.current = true;
    }
  }, []);

  /* -----------------------------
     PAGE VIEWS
  ------------------------------ */
  useEffect(() => {
    if (import.meta.env.DEV) return;

    const session = getSession();
    trackPageView(location.pathname, session.sessionId);
  }, [location.pathname]);

  /* -----------------------------
     SESSION DURATION (ON EXIT)
  ------------------------------ */
  useEffect(() => {
    if (import.meta.env.DEV) return;

    const handleUnload = () => {
      const session = getSession();
      const duration = getSessionDuration();

      trackSessionDuration({
        sessionId: session.sessionId,
        duration,
      });
    };

    window.addEventListener("beforeunload", handleUnload);
    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);
}
