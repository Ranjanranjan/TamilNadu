import express from "express";
import {
  getOverallStats,
  getDeviceAnalytics,
  getPageAnalytics,
  getEmotionAnalytics,
  getAgeAnalytics,
} from "../controllers/analyticsReportController.js";

const router = express.Router();

router.get("/overview", getOverallStats);
router.get("/devices", getDeviceAnalytics);
router.get("/pages", getPageAnalytics);
router.get("/emotions", getEmotionAnalytics);
router.get("/ages", getAgeAnalytics);

export default router;
