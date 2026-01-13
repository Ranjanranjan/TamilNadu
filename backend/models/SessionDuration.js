import mongoose from "mongoose";

const SessionDurationSchema = new mongoose.Schema(
  {
    sessionId: { type: String, index: true },
    duration: { type: Number }, // seconds
  },
  { timestamps: true }
);

export default mongoose.model(
  "SessionDuration",
  SessionDurationSchema
);
