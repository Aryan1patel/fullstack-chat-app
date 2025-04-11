import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Linking chat to a user
        messages: [
            {
                role: { type: String, enum: ["user", "dexter"], required: true },
                text: { type: String, required: true },
                timestamp: { type: Date, default: Date.now },
            },
        ],
    },
    { timestamps: true }
);

export default mongoose.model("Chat", chatSchema);
