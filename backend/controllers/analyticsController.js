import AnalyticsVisit from "../models/AnalyticsVisit.js";
import PageView from "../models/PageView.js";
import SessionDuration from "../models/SessionDuration.js";
import EmotionClick from "../models/EmotionClick.js";
import AgeSelection from "../models/AgeSelection.js";

/* ================================
   VISIT TRACKING
================================ */
export const trackVisit = async (req, res) => {
  try {
    const { sessionId, isNewSession, device, startTime } = req.body;

    if (!sessionId || !device) {
      return res.status(400).json({ message: "Invalid visit payload" });
    }

    const visit = await AnalyticsVisit.create({
      sessionId,
      isNewSession,
      device,
      startTime,
      ipAddress: req.ip || req.headers["x-forwarded-for"],
    });

    /* 🔴 REAL-TIME EVENT */
    const io = req.app.get("io");
    io.emit("visit:new", visit);

    res.status(201).json({ message: "Visit tracked" });
  } catch (error) {
    console.error("❌ trackVisit error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================================
   PAGE VIEW TRACKING
================================ */
export const trackPageView = async (req, res) => {
  try {
    const { page, sessionId } = req.body;

    if (!page || !sessionId) {
      return res.status(400).json({ message: "Invalid page view payload" });
    }

    const pageView = await PageView.create({
      page,
      sessionId,
    });

    /* 🔴 REAL-TIME EVENT */
    const io = req.app.get("io");
    io.emit("page:view", pageView);

    res.status(201).json({ message: "Page view tracked" });
  } catch (error) {
    console.error("❌ trackPageView error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================================
   SESSION DURATION TRACKING
================================ */
export const trackSessionDuration = async (req, res) => {
  try {
    const { sessionId, duration } = req.body;

    if (!sessionId || typeof duration !== "number") {
      return res
        .status(400)
        .json({ message: "Invalid session duration payload" });
    }

    await SessionDuration.create({
      sessionId,
      duration,
    });

    const updatedVisit = await AnalyticsVisit.findOneAndUpdate(
      { sessionId },
      { sessionDuration: duration },
      { new: true }
    );

    /* 🔴 REAL-TIME EVENT */
    const io = req.app.get("io");
    io.emit("session:update", {
      sessionId,
      duration,
    });

    res.status(201).json({ message: "Session duration tracked" });
  } catch (error) {
    console.error("❌ trackSessionDuration error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================================
   EMOTION CLICK TRACKING
================================ */
export const trackEmotionClick = async (req, res) => {
  try {
    const { sessionId, emotion } = req.body;

    if (!sessionId || !emotion) {
      return res
        .status(400)
        .json({ message: "Invalid emotion payload" });
    }

    const emotionClick = await EmotionClick.create({
      sessionId,
      emotion,
    });

    /* 🔴 REAL-TIME EVENT */
    const io = req.app.get("io");
    io.emit("emotion:click", {
      emotion,
    });

    res.status(201).json({ message: "Emotion click tracked" });
  } catch (error) {
    console.error("❌ trackEmotionClick error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================================
   AGE SELECTION TRACKING
================================ */
export const trackAgeSelection = async (req, res) => {
  try {
    const { sessionId, ageRange } = req.body;

    if (!sessionId || !ageRange) {
      return res
        .status(400)
        .json({ message: "Invalid age selection payload" });
    }

    const age = await AgeSelection.create({
      sessionId,
      ageRange,
    });

    /* 🔴 REAL-TIME EVENT */
    const io = req.app.get("io");
    io.emit("age:update", {
      ageRange,
    });

    res.status(201).json({ message: "Age selection tracked" });
  } catch (error) {
    console.error("❌ trackAgeSelection error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
