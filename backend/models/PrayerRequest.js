import mongoose from "mongoose";

const prayerRequestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "Anonymous",
    },
    message: {
      type: String,
      required: true,
    },
    ageRange: {
      type: String,
      default: null,
    },
    phoneNumber: {
      type: String,
      default: null,
    },
    location: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: ["pending", "prayed", "archived"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("PrayerRequest", prayerRequestSchema);
