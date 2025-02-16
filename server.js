require("dotenv").config();
const express = require("express");
const { askAI } = require("./services/aiService");

const app = express();
app.use(express.json());

app.post("/api/ask-ai", async (req, res) => {
    try {
        const question = req.body.question;
        const answer = await askAI(question);
        res.json({ answer });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.post('/compliance-check', async (req, res) => {
   const { policyText } = req.body;
 
   const prompt = `Evaluate the following policy text for compliance with clinical governance regulations:\n\n${policyText}`;
 
   try {
     const response = await axios.post(ollamaAPI, {
       model: 'llama',
       messages: [{ role: 'user', content: prompt }],
     });
 
     res.json({
       complianceAssessment: response.data.choices[0].message.content,
     });
   } catch (error) {
     res.status(500).send("Error evaluating compliance.");
   }
 });
 