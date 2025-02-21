app.use(express.json()); // Enable JSON parsing
const synaptic = require('synaptic');
const Architect = synaptic.Architect;
const Trainer = synaptic.Trainer;
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Create and train the neural network
let myNetwork = new Architect.Perceptron(2, 10, 5, 1);
let trainer = new Trainer(myNetwork);

let trainingSet = [
    { input: [0, 0], output: [0] },
    { input: [0, 1], output: [1] },
    { input: [1, 0], output: [1] },
    { input: [1, 1], output: [0] }
];

// Train the neural network
trainer.train(trainingSet, {
    rate: 0.1,
    iterations: 20000,
    error: 0.005,
    shuffle: true
});

// Root route to confirm the server is running
app.get('/', (req, res) => {
    res.send("Neural Network API is running!");
});

// API Endpoint for predictions
app.post('/predict', (req, res) => {
    try {
        if (!req.body.input || !Array.isArray(req.body.input)) {
            return res.status(400).send({ error: "Invalid input. Expected an array of numbers." });
        }

        const input = req.body.input.map(Number); // Convert input to numbers if needed
        const output = myNetwork.activate(input);

        res.send({ output });
    } catch (error) {
        console.error("Prediction error:", error);
        res.status(500).send({ error: "Internal Server Error. Check server logs for details." });
    }
});
// Start the server
const PORT = process.env.PORT || 3000; // Use Render-provided port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

