import express from "express";
import adminAuth from "../middleware/adminAuth.js";

import {
  getOverallStats,
  getDeviceAnalytics,
  getPageAnalytics,
  getEmotionAnalytics,
  getAgeAnalytics,
} from "../controllers/analyticsReportController.js";

const router = express.Router();

/* Protect all admin analytics routes */
router.use(adminAuth);

/* Analytics endpoints */
router.get("/overview", getOverallStats);
router.get("/device", getDeviceAnalytics);
router.get("/page", getPageAnalytics);
router.get("/emotion", getEmotionAnalytics);
router.get("/age", getAgeAnalytics);

export default router;
