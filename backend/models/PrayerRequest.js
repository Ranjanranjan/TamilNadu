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
    status: {
      type: String,
      enum: ["pending", "prayed", "archived"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("PrayerRequest", prayerRequestSchema);
