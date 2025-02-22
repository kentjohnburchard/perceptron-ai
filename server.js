require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors()); // Allow frontend to access backend

const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;
const HUGGINGFACE_API_URL = "https://api-inference.huggingface.co/models/meta-llama/Llama-3-8B";

app.post("/api/analyze", async (req, res) => {
    try {
        const { query } = req.body;
        if (!query) {
            return res.status(400).json({ error: "Query is required" });
        }

        const response = await axios.post(
            HUGGINGFACE_API_URL,
            { inputs: query },
            { headers: { Authorization: `Bearer ${HUGGINGFACE_API_KEY}` } }
        );

        if (response.data && response.data.length > 0) {
            res.json({ answer: response.data[0].generated_text });
        } else {
            res.json({ answer: "No response from AI." });
        }
    } catch (error) {
        console.error("Error querying Hugging Face:", error);
        res.status(500).json({ error: "Failed to process query with LLaMA 3." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
