import AnalyticsVisit from "../models/AnalyticsVisit.js";
import PageView from "../models/PageView.js";
import SessionDuration from "../models/SessionDuration.js";
import EmotionClick from "../models/EmotionClick.js";
import AgeSelection from "../models/AgeSelection.js";

/* ================================
   OVERALL STATS
================================ */
export const getOverallStats = async (req, res) => {
  try {
    const totalVisits = await AnalyticsVisit.countDocuments();
    const uniqueSessions = await AnalyticsVisit.distinct("sessionId");

    const durations = await SessionDuration.find();
    const avgSessionDuration =
      durations.reduce((sum, d) => sum + d.duration, 0) /
      (durations.length || 1);

    res.json({
      totalVisits,
      uniqueSessions: uniqueSessions.length,
      avgSessionDuration: Math.round(avgSessionDuration),
    });
  } catch (error) {
    console.error("❌ getOverallStats error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================================
   DEVICE ANALYTICS
================================ */
export const getDeviceAnalytics = async (req, res) => {
  try {
    const visits = await AnalyticsVisit.find();

    const deviceStats = {};
    const osStats = {};
    const browserStats = {};

    visits.forEach(({ device }) => {
      if (!device) return;

      deviceStats[device.deviceType] =
        (deviceStats[device.deviceType] || 0) + 1;

      osStats[device.os] = (osStats[device.os] || 0) + 1;
      browserStats[device.browser] =
        (browserStats[device.browser] || 0) + 1;
    });

    res.json({ deviceStats, osStats, browserStats });
  } catch (error) {
    console.error("❌ getDeviceAnalytics error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================================
   PAGE ANALYTICS
================================ */
export const getPageAnalytics = async (req, res) => {
  try {
    const pages = await PageView.aggregate([
      { $group: { _id: "$page", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    res.json(pages);
  } catch (error) {
    console.error("❌ getPageAnalytics error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================================
   EMOTION ANALYTICS
================================ */
export const getEmotionAnalytics = async (req, res) => {
  try {
    const emotions = await EmotionClick.aggregate([
      { $group: { _id: "$emotion", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    res.json(emotions);
  } catch (error) {
    console.error("❌ getEmotionAnalytics error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================================
   AGE ANALYTICS
================================ */
export const getAgeAnalytics = async (req, res) => {
  try {
    const ages = await AgeSelection.aggregate([
      { $group: { _id: "$ageRange", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    res.json(ages);
  } catch (error) {
    console.error("❌ getAgeAnalytics error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
