const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const askAI = async (message) => {
  const response = await client.responses.create({
    model: "gpt-5.5",
    input: message,
  });

  return response.output_text;
};

module.exports = askAI;