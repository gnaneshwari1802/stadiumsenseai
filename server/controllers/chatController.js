const ChatHistory = require("../models/ChatHistory");
const axios = require("axios");

exports.askAI = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question || question.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Question is required",
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        success: false,
        message: "Gemini API key not found",
      });
    }

    const geminiResponse = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
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

    const answer =
      geminiResponse.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response generated.";

    // Save chat history
    await ChatHistory.create({
      userMessage: question,
      aiResponse: answer,
      user: "user",
    });

    return res.status(200).json({
      success: true,
      response: answer,
    });
  } catch (error) {
    console.error(
      "Gemini Error:",
      error.response?.data || error.message
    );

    return res.status(500).json({
      success: false,
      message: "AI request failed",
    });
  }
};

exports.getChatHistory = async (req, res) => {
  try {
    const history = await ChatHistory.find()
      .sort({ createdAt: -1 })
      .limit(20);

    return res.status(200).json({
      success: true,
      data: history,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};