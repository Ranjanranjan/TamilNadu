import express from "express";
import {
  trackVisit,
  trackPageView,
  trackSessionDuration,
  trackEmotionClick,
  trackAgeSelection,
} from "../controllers/analyticsController.js";

const router = express.Router();

router.post("/visit", trackVisit);
router.post("/page", trackPageView);
router.post("/session-duration", trackSessionDuration);
router.post("/emotion", trackEmotionClick);
router.post("/age", trackAgeSelection);

export default router;
