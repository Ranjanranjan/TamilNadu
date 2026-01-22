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

/* ---------------- CORS (SAFE FIX) ---------------- */

const allowedOrigins = [
  "http://localhost:8080",
  process.env.FRONTEND_URL,
];

// ✅ Handle preflight FIRST
app.options("*", cors());

app.use(
  cors({
    origin: (origin, callback) => {
      // allow server-to-server & preflight
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // ❌ DO NOT throw errors
      return callback(null, false);
    },
    credentials: true,
  })
);

app.use(express.json());

/* ---------------- SOCKET.IO ---------------- */

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
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
  .catch((err) => console.error("MongoDB error ❌", err));

/* ---------------- START SERVER ---------------- */

const PORT = process.env.PORT || 5001;

server.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
