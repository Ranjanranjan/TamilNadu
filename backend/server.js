import http from "http";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";

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

/* ---------------- CORS (SAFE FOR RENDER) ---------------- */

// ✅ NEVER throw errors inside CORS
app.use(
  cors({
    origin: true, // allow all origins (safe for API)
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Explicitly handle preflight
app.options("*", cors());

app.use(express.json());

/* ---------------- SOCKET.IO ---------------- */

const io = new Server(server, {
  cors: {
    origin: true,
    credentials: true,
  },
});

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

app.get("/", (req, res) => {
  res.send("✅ TamilNadu Gospel Backend Running");
});

app.use("/api/admin", adminRoutes);
app.use("/api/prayers", prayerRoutes);
app.use("/api/analytics", analyticsRoutes);
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
  console.log(`🚀 Server running on port ${PORT}`);
});
