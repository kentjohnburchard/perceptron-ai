const neataptic = require('neataptic');

// Create a neural network with memory (LSTM)
const network = new neataptic.architect.LSTM(2, 3, 1);

// Training data (XOR example)
const trainingData = [
  { input: [0, 0], output: [0] },
  { input: [0, 1], output: [1] },
  { input: [1, 0], output: [1] },
  { input: [1, 1], output: [0] }
];

// Train the network
network.train(trainingData, {
  log: 10,
  iterations: 20000,
  error: 0.01,
  rate: 0.3
});

console.log("Memory-based AI activated!");
console.log("Output for [0, 0]:", network.activate([0, 0]));
console.log("Output for [0, 1]:", network.activate([0, 1]));
console.log("Output for [1, 0]:", network.activate([1, 0]));
console.log("Output for [1, 1]:", network.activate([1, 1]));
