import express from "express";
import adminAuth from "../middleware/adminAuth.js";
const API_BASE = process.env.API_BASE || "http://localhost:5001";
import {
  getOverallStats,
  getDeviceAnalytics,
  getPageAnalytics,
  getEmotionAnalytics,
  getAgeAnalytics,
} from "../controllers/analyticsReportController.js";

const router = express.Router();
const API = `${API_BASE}/api/admin/analytics`;

router.use(adminAuth);

router.get("/overview", getOverallStats);
router.get("/device", getDeviceAnalytics);
router.get("/page", getPageAnalytics);
router.get("/emotion", getEmotionAnalytics);
router.get("/age", getAgeAnalytics);

export default router;
