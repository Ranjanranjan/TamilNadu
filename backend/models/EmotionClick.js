import mongoose from "mongoose";

const EmotionClickSchema = new mongoose.Schema(
  {
    sessionId: { type: String, index: true },
    emotion: { type: String }, // Fear, Loneliness, Depression, etc.
  },
  { timestamps: true }
);

export default mongoose.model(
  "EmotionClick",
  EmotionClickSchema
);
