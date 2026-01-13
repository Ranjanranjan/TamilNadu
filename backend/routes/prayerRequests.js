import express from "express";
import PrayerRequest from "../models/PrayerRequest.js";

const router = express.Router();

// POST a new prayer request
router.post("/", async (req, res) => {
  try {
    const { name, message } = req.body;

    if (!name || !message) {
      return res.status(400).json({ message: "Name and message are required" });
    }

    const prayer = new PrayerRequest({
      name,
      message,
    });

    await prayer.save();

    res.status(201).json({
      message: "Prayer request submitted successfully",
    });
  } catch (error) {
    console.error("Prayer save error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
