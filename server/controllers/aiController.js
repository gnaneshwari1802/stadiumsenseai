const axios = require("axios");
const ChatHistory = require("../models/ChatHistory");

exports.askAI = async (req, res) => {
  try {
    const { question } = req.body;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: question,
              },
            ],
          },
        ],
      }
    );

    const aiResponse =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response generated.";

    await ChatHistory.create({
      userMessage: question,
      aiResponse,
    });

    res.json({
      success: true,
      response: aiResponse,
    });
  } catch (err) {
    console.log("========== AI ERROR ==========");
    console.log(err.response?.status);
    console.log(err.response?.data);
    console.log(err.message);
    console.log("==============================");

    res.status(500).json({
      success: false,
      message: "AI Error",
    });
  }
};
