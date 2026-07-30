const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
);

async function askAI(message) {

   const model = genAI.getGenerativeModel({
    model: "gemini-3.6-flash"
});

    const result = await model.generateContent(message);

    const response = result.response.text();

    return response;
}

module.exports = {
    askAI
};