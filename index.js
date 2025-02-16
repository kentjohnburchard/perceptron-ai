const express = require('express');
const cors = require('cors');
const synaptic = require('synaptic');

const app = express();
app.use(cors());
app.use(express.json()); // Enable JSON parsing

// ✅ Initialize and train a neural network
const Architect = synaptic.Architect;
const Trainer = synaptic.Trainer;

let myNetwork = new Architect.Perceptron(2, 10, 5, 1);
let trainer = new Trainer(myNetwork);

let trainingSet = [
    { input: [0, 0], output: [0] },
    { input: [0, 1], output: [1] },
    { input: [1, 0], output: [1] },
    { input: [1, 1], output: [0] }
];

trainer.train(trainingSet, {
    rate: 0.1,
    iterations: 20000,
    error: 0.005,
    shuffle: true
});

// ✅ Root Route (Health Check)
app.get('/', (req, res) => {
    res.send("✅ Clara AI Backend is Running!");
});

// ✅ Prediction Route
app.post('/predict', (req, res) => {
    try {
        if (!req.body.input || !Array.isArray(req.body.input)) {
            return res.status(400).send({ error: "Invalid input. Expected an array of numbers." });
        }

        const input = req.body.input.map(Number);
        const output = myNetwork.activate(input);

        res.send({ output });
    } catch (error) {
        console.error("❌ Prediction error:", error);
        res.status(500).send({ error: "Internal Server Error. Check logs for details." });
    }
});

// ✅ AI Chatbot Route
app.post('/chat', async (req, res) => {
    try {
        const userQuestion = req.body.question;
        if (!userQuestion) {
            return res.status(400).json({ error: "No question provided" });
        }

        // Simulated AI responses
        const responses = {
            "hello": "Hi there! I'm Clara AI, your assistant.",
            "who are you": "I'm Clara AI, an AI-powered assistant!",
            "how are you": "I'm just a bunch of code, but I'm feeling great!",
            "what is AI": "AI stands for Artificial Intelligence. It's what powers me!"
        };

        let aiResponse = responses[userQuestion.toLowerCase()] || "Hmm, I’m not sure about that. Ask me something else!";

        res.json({ answer: aiResponse });
    } catch (error) {
        console.error("❌ Chatbot error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ✅ Future Route Placeholder (For Expansion)
app.post('/future-feature', async (req, res) => {
    res.json({ message: "This endpoint is reserved for future AI enhancements!" });
});

// ✅ Ensure correct port for deployment
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Clara AI Backend is Live on Port ${PORT}`));
