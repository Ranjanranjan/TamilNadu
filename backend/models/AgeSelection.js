import mongoose from "mongoose";

const AgeSelectionSchema = new mongoose.Schema(
  {
    sessionId: { type: String, index: true },
    ageRange: {
      type: String,
      enum: ["10-15", "16-19", "20-30", "31-45", "46+"],
    },
  },
  { timestamps: true }
);

export default mongoose.model(
  "AgeSelection",
  AgeSelectionSchema
);
