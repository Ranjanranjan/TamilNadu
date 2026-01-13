import mongoose from "mongoose";

const PageViewSchema = new mongoose.Schema(
  {
    sessionId: { type: String, index: true },
    page: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("PageView", PageViewSchema);
