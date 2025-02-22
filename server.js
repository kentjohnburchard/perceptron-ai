require("dotenv").config();
const express = require("express");
const { analyzeQuery } = require("./services/aiService");

const app = express();
app.use(express.json());

// ✅ API Status Check
app.get("/", (req, res) => {
    res.send("Clara AI Backend is running...");
});

// ✅ NLP-powered Compliance Query Analysis
app.post("/api/analyze", async (req, res) => {
    try {
        const { query } = req.body;
        if (!query) {
            return res.status(400).json({ error: "Query is required" });
        }

        // Use the local NLP function
        const result = analyzeQuery(query);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Test Route to Confirm API Works
app.get("/api/test", (req, res) => {
    res.json({ message: "API is working!" });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
