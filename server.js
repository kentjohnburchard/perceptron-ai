require("dotenv").config();
const express = require("express");
const { analyzeQuery } = require("./services/aiService"); // Ensure aiService.js exists
const Compliance = require("./models/Compliance");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors()); // Allow frontend requests

// ✅ 🟢 NLP-powered Compliance Query Analysis
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
        console.error("Error in /api/analyze:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ✅ 🟢 Fetch all compliance policies
app.get("/api/compliance", async (req, res) => {
    try {
        const policies = await Compliance.find();
        res.json(policies);
    } catch (error) {
        console.error("Error fetching compliance policies:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ✅ 🟢 Add a compliance policy
app.post("/api/compliance", async (req, res) => {
    try {
        const { policy, severity, description } = req.body;
        if (!policy || !severity || !description) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const newPolicy = new Compliance({ policy, severity, description });
        await newPolicy.save();
        res.json(newPolicy);
    } catch (error) {
        console.error("Error adding compliance policy:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ✅ **Fix Port Issue**
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Clara AI Backend Running on Port ${PORT}`));
