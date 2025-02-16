const { OpenAI } = require("openai");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function askAI(question) {
   const response = await openai.completions.create({
      model: "gpt-4",
      prompt: question,
      max_tokens: 500
   });
   return response.choices[0].text;
}

module.exports = { askAI };
