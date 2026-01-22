import http from "http";
import { Server } from "socket.io";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

/* ROUTES */
import adminRoutes from "./routes/admin.js";
import prayerRoutes from "./routes/prayerRequests.js";
import analyticsRoutes from "./routes/analytics.js";
import analyticsReports from "./routes/analyticsReports.js";
import adminAnalyticsRoutes from "./routes/adminAnalytics.js";

dotenv.config();

/* ---------------- APP & SERVER ---------------- */

const app = express();
const server = http.createServer(app);

/* ---------------- CORS (SAFE FOR RENDER + VERCEL) ---------------- */

// Allow ALL origins safely (recommended for APIs)
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// IMPORTANT: handle preflight requests
app.options("*", cors());

app.use(express.json());

/* ---------------- SOCKET.IO ---------------- */

const io = new Server(server, {
  cors: {
    origin: true,
    credentials: true,
  },
});

/*
  liveUsers Map structure:
  socket.id => {
    sessionId,
    page,
    device,
    timestamp
  }
*/
const liveUsers = new Map();

io.on("connection", (socket) => {
  console.log("🟢 Socket connected:", socket.id);

  socket.on("page:view", (data) => {
    liveUsers.set(socket.id, {
      ...data,
      timestamp: Date.now(),
    });

    io.emit("live:users", Array.from(liveUsers.values()));
  });

  socket.on("disconnect", () => {
    console.log("🔴 Socket disconnected:", socket.id);
    liveUsers.delete(socket.id);
    io.emit("live:users", Array.from(liveUsers.values()));
  });
});

/* ---------------- ROUTES ---------------- */

// Health check
app.get("/", (req, res) => {
  res.send("✅ TamilNadu Gospel Backend Running");
});

app.use("/api/admin", adminRoutes);
app.use("/api/prayers", prayerRoutes);
app.use("/api/analytics", analyticsRoutes);

/* Admin analytics (reports + realtime data) */
app.use("/api/admin/analytics", analyticsReports);
app.use("/api/admin/analytics", adminAnalyticsRoutes);

/* ---------------- DATABASE ---------------- */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => {
    console.error("MongoDB error ❌", err);
    process.exit(1);
  });

/* ---------------- START SERVER ---------------- */

const PORT = process.env.PORT || 10000;

server.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
