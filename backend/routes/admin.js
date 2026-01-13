import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import PrayerRequest from "../models/PrayerRequest.js";

const router = express.Router();

console.log("🔥 admin.js route file loaded");

/* ================================
   🔐 JWT MIDDLEWARE
================================ */
const adminAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    console.error("❌ JWT error:", err);
    return res.status(401).json({ message: "Invalid token" });
  }
};

/* ================================
   🔑 ADMIN LOGIN (FIXED)
================================ */
/* 🔑 LOGIN */
router.post("/login", async (req, res) => {
  console.log("🚨 LOGIN ROUTE HIT");

  try {
    const { secretKey, username, password } = req.body;

    console.log("🔐 Login attempt:", { username });

    if (!process.env.ADMIN_SECRET_KEY) {
      console.error("❌ ADMIN_SECRET_KEY missing");
      return res.status(500).json({ message: "Server config error" });
    }

    if (!process.env.JWT_SECRET) {
      console.error("❌ JWT_SECRET missing");
      return res.status(500).json({ message: "Server config error" });
    }

    if (secretKey !== process.env.ADMIN_SECRET_KEY) {
      return res.status(403).json({ message: "Invalid secret key" });
    }

    const admin = await Admin.findOne({ username });
    console.log("👤 Admin found:", !!admin);

    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, admin.password);
    console.log("🔑 Password match:", match);

    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({ token });
  } catch (err) {
    console.error("❌ LOGIN ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});


/* ================================
   📥 GET PRAYER REQUESTS
================================ */
router.get("/prayers", adminAuth, async (req, res) => {
  try {
    const prayers = await PrayerRequest.find().sort({ createdAt: -1 });
    res.json(prayers);
  } catch (err) {
    console.error("❌ Fetch prayers error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ================================
   🟡 MARK AS PRAYED
================================ */
router.put("/prayers/:id/prayed", adminAuth, async (req, res) => {
  try {
    const prayer = await PrayerRequest.findByIdAndUpdate(
      req.params.id,
      { status: "prayed" },
      { new: true }
    );

    if (!prayer) {
      return res.status(404).json({ message: "Prayer request not found" });
    }

    res.json(prayer);
  } catch (err) {
    console.error("❌ Mark prayed error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ================================
   📦 ARCHIVE PRAYER
================================ */
router.put("/prayers/:id/archive", adminAuth, async (req, res) => {
  try {
    const prayer = await PrayerRequest.findByIdAndUpdate(
      req.params.id,
      { status: "archived" },
      { new: true }
    );

    if (!prayer) {
      return res.status(404).json({ message: "Prayer request not found" });
    }

    res.json(prayer);
  } catch (err) {
    console.error("❌ Archive error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ================================
   ❌ DELETE PRAYER
================================ */
router.delete("/prayers/:id", adminAuth, async (req, res) => {
  try {
    await PrayerRequest.findByIdAndDelete(req.params.id);
    res.json({ message: "Prayer request deleted" });
  } catch (err) {
    console.error("❌ Delete error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
