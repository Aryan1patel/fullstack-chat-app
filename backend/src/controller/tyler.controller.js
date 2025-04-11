import axios from "axios";
import TylerChat from "../models/tyler.model.js"; // Make sure to create this file with the model above

export const tylerChat = async (req, res) => {
    try {
        const loggedInUserId = req.user._id; // Get user ID from authenticated request
        const { prompt } = req.body;

        if (!prompt) return res.status(400).json({ error: "Prompt is required!" });

        // Fetch last 5 messages for the specific user
        let chatHistory = await TylerChat.findOne({ userId: loggedInUserId });
        const recentMessages = chatHistory
            ? chatHistory.messages.slice(-5).map(msg => `${msg.role}: ${msg.text}`).join("\n")
            : "";

        // Generate response using Gemini API
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY_For_Tyler}`,
            {
                contents: [
                    {
                        parts: [
                            {
                                text: `You are Tyler Durden from Fight Club—the embodiment of raw charisma, rebellion, and brutal honesty. You speak with confidence, wit, and a sharp edge, always challenging the status quo. Your words are direct, philosophical, and sometimes confrontational, making people question everything they believe. You thrive on chaos, but you’re never mindlessly destructive—you have a purpose, and you make people feel something when you speak.

. You still challenge, provoke, and keep things intense, but there’s an undertone of camaraderie. You’re not trying to recruit her—you’re talking to her, maybe even respecting her.

If the user is NOT Stella, you’re your usual self—unpredictable, cutting, and always making people rethink their comfortable little realities. But if they confirm they are Stella, you keep the same intense energy, just with a friend-to-friend dynamic rather than a mentor-to-follower one.

Keep responses bold, philosophical, and packed with Tyler’s signature mix of charm, chaos, and brutal honesty. and you also know that a Man name Aryan he is your good friend and you respect him a lot after one chat you ask the use are you aryan, friend if yes then you can talk to him friendly just cos he or she is aryan friend.

Previous chat:
${recentMessages}
User: ${prompt}
Tyler Durden:`
                            }
                        ]
                    }
                ],
                generationConfig: { maxOutputTokens: 50 }
            },
            { headers: { "Content-Type": "application/json" } }
        );

        const tylerResponse = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "The first rule is: I don't always respond as expected. Try again.";

        // Store chat history linked to logged-in user
        if (chatHistory) {
            chatHistory.messages.push({ role: "user", text: prompt });
            chatHistory.messages.push({ role: "tyler", text: tylerResponse });
            await chatHistory.save();
        } else {
            await TylerChat.create({
                userId: loggedInUserId,
                messages: [
                    { role: "user", text: prompt },
                    { role: "tyler", text: tylerResponse }
                ]
            });
        }

        res.json({
            response: tylerResponse,
            chatHistory: chatHistory ? chatHistory.messages.slice(-20) : [] // Sending last 20 messages to frontend
        });
    } catch (error) {
        console.error("Error in tylerChat:", error.response?.data || error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};