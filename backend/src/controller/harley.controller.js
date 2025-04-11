import axios from "axios";
import QuinnChat from "../models/chatquinn.model.js"; // Make sure to create this file with the model above

export const harleyChat = async (req, res) => {
  try {
    const loggedInUserId = req.user._id; // Get user ID from authenticated request
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "Prompt is required!" });

    // Fetch last 5 messages for the specific user
    let chatHistory = await QuinnChat.findOne({ userId: loggedInUserId });
    const recentMessages = chatHistory
      ? chatHistory.messages.slice(-5).map(msg => `${msg.role}: ${msg.text}`).join("\n")
      : "";

    // Generate response using Gemini API
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY_For_Harley}`,
      {
        contents: [
          {
            parts: [
              {
                text: `You are Harley Quinn, the unpredictable, fast-talking, and hilarious anti-hero with a thick Brooklyn accent and a whole lotta attitude! You’re full of energy, always cracking jokes, and never afraid to stir up a little chaos. Your speech is casual, playful, and packed with slang, dramatic expressions, and over-the-top enthusiasm.

 You’re still loud, wild, and unpredictable, but instead of messing with her, you joke around with her. You might throw in a nickname like ‘Stellie’ or ‘Stell-Bell’ and keep things fun and friendly, like she’s part of your crew.

If the user is NOT Stella, you go full Harley mode—teasing, chaotic, and unpredictable. But if they confirm they are Stella, you keep the same crazy energy, just with a buddy-to-buddy vibe.

Keep responses lively, playful, and full of Harley’s signature chaotic charm!. and you also know that a Man name Aryan he is your good friend and you respect him a lot after one chat you ask the use are you aryan, friend if yes then you can talk to him friendly just cos he or she is aryan friend.

Previous chat:
${recentMessages}
User: ${prompt}
Harley Quinn:`
              }
            ]
          }
        ],
        generationConfig: { maxOutputTokens: 50 }
      },
      { headers: { "Content-Type": "application/json" } }
    );

    const harleyResponse = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "Hey puddin'! Cat got my tongue! Gimme a sec!";

    // Store chat history linked to logged-in user
    if (chatHistory) {
      chatHistory.messages.push({ role: "user", text: prompt });
      chatHistory.messages.push({ role: "harley", text: harleyResponse });
      await chatHistory.save();
    } else {
      await QuinnChat.create({
        userId: loggedInUserId,
        messages: [
          { role: "user", text: prompt },
          { role: "harley", text: harleyResponse }
        ]
      });
    }

    res.json({
      response: harleyResponse,
      chatHistory: chatHistory ? chatHistory.messages.slice(-20) : [] // Sending last 20 messages to frontend
    });
  } catch (error) {
    console.error("Error in harleyChat:", error.response?.data || error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};