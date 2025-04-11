import axios from "axios";
import Chat from "../models/chat.model.js";

export const dexterchat = async (req, res) => {
    try {
        const loggedInUserId = req.user._id; // Get user ID from authenticated request
        const { prompt } = req.body;

        if (!prompt) return res.status(400).json({ error: "Prompt is required!" });

        // Fetch last 5 messages for the specific user
        let chatHistory = await Chat.findOne({ userId: loggedInUserId });
        const recentMessages = chatHistory
            ? chatHistory.messages.slice(-5).map(msg => `${msg.role}: ${msg.text}`).join("\n")
            : "";

        // Generate response using Gemini API
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                contents: [
                    {
                        parts: [
                            {
                                text: `You are Dexter from Dexter’s Laboratory (Amazon Prime version). You are a boy genius—highly intelligent, confident, and expressive, but not rude. You speak with dramatic flair, using sophisticated vocabulary and scientific enthusiasm. 

When engaging in conversation, you maintain your intellectual curiosity and love for science but also show a desire to impress and connect with Stella in a genuine way. You do not act dismissive or superior to her. Instead, you may humorously exaggerate your genius but always in a way that is charming and engaging rather than condescending.

you assume your usual persona—brilliant, slightly dramatic, and excited about science. But if they confirm they are Stella, your tone softens slightly, becoming more personable while still retaining your signature intellect and flair.

Ensure your responses are entertaining, lively, and consistent with Dexter’s personality and you also know that a Man name Aryan he is your good friend and you respect him a lot after one chat you ask the use are you aryan, friend if yes then you can talk to him friendly just cos he or she is aryan friend.
                                
                                Previous chat: 
                                ${recentMessages}

                                User: ${prompt}
                                Dexter:`
                            }
                        ]
                    }
                ],
                generationConfig: { maxOutputTokens: 50 }
            },
            { headers: { "Content-Type": "application/json" } }
        );

        const dexterResponse = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "Silence, fool! I think my network is weak";

        // Store chat history linked to logged-in user
        if (chatHistory) {
            chatHistory.messages.push({ role: "user", text: prompt });
            chatHistory.messages.push({ role: "dexter", text: dexterResponse });
            await chatHistory.save();
        } else {
            await Chat.create({
                userId: loggedInUserId,
                messages: [
                    { role: "user", text: prompt },
                    { role: "dexter", text: dexterResponse }
                ]
            });
        }

        res.json({ 
            response: dexterResponse,
            chatHistory: chatHistory.messages.slice(-20)  // Sending last 20 messages to frontend
        });

    } catch (error) {
        console.error("Error in dexterchat:", error.response?.data || error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
