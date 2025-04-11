import mongoose from "mongoose";

const tylerChatSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    messages: [
      {
        role: { type: String, enum: ["user", "tyler"], required: true },
        text: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("TylerChat", tylerChatSchema);