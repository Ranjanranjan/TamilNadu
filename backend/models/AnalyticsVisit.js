import mongoose from "mongoose";

const AnalyticsVisitSchema = new mongoose.Schema(
  {
    /* -----------------------------
       SESSION INFO
    -------------------------------- */
    sessionId: {
      type: String,
      required: true,
      index: true,
    },

    isNewSession: {
      type: Boolean,
      default: true,
    },

    startTime: {
      type: Number, // Date.now() from frontend
      required: true,
    },

    sessionDuration: {
      type: Number, // seconds
      default: 0,
    },

    /* -----------------------------
       DEVICE INFO
    -------------------------------- */
    device: {
      deviceType: {
        type: String, // Mobile / Tablet / Desktop
        index: true,
      },
      os: {
        type: String, // Android, iOS, Windows, macOS, Linux
        index: true,
      },
      browser: {
        type: String, // Chrome, Safari, Edge, Firefox
      },
      screen: {
        type: String, // 1920x1080
      },
      language: {
        type: String, // en-IN, ta-IN
        index: true,
      },
      userAgent: {
        type: String,
      },
    },

    /* -----------------------------
       LOCATION INFO (IP BASED)
    -------------------------------- */
    ipAddress: {
      type: String,
    },

    country: {
      type: String,
      default: "India",
      index: true,
    },

    state: {
      type: String,
      default: "Tamil Nadu",
      index: true,
    },

    district: {
      type: String,
      index: true, // VERY IMPORTANT for district analytics
    },

    /* -----------------------------
       OPTIONAL FUTURE EXTENSIONS
       (safe to keep empty)
    -------------------------------- */
    ageRange: {
      type: String, // 10–15, 16–19, 20–30, etc.
      index: true,
    },
  },
  {
    timestamps: true, // createdAt & updatedAt
  }
);

/* -----------------------------
   COMPOUND INDEXES (PERFORMANCE)
-------------------------------- */
AnalyticsVisitSchema.index({ district: 1, createdAt: -1 });
AnalyticsVisitSchema.index({ "device.os": 1 });
AnalyticsVisitSchema.index({ ageRange: 1 });

export default mongoose.model(
  "AnalyticsVisit",
  AnalyticsVisitSchema
);
