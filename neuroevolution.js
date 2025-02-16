const neataptic = require('neataptic');
const { Neat, methods, architect } = neataptic;

const trainingData = [
  { input: [0, 0], output: [0] },
  { input: [0, 1], output: [1] },
  { input: [1, 0], output: [1] },
  { input: [1, 1], output: [0] }
];

// Initialize NEAT with optimized settings
const neat = new Neat(2, 1, null, {
  mutation: methods.mutation.ALL,
  popsize: 5000,
  elitism: 5,
  mutationRate: 0.2,
  crossoverRate: 0.7
});

// Fitness evaluation function
function evaluateFitness(network) {
  let score = 0;
  trainingData.forEach(data => {
    const output = network.activate(data.input)[0];
    const error = Math.abs(output - data.output[0]);
    score += (1 - error);
    const complexityPenalty = network.nodes.length * 0.01; // Penalize overly complex networks
    score -= complexityPenalty;
  });
  return score;
}

// Evolve for multiple generations
function evolveGenerations(generations) {
  console.log(`Starting evolution for ${generations} generations...`);
  for (let gen = 0; gen < generations; gen++) {
    console.log(`\nGeneration ${gen + 1}: Evaluating fitness...`);

    // Evaluate all networks
    neat.population.forEach(network => {
      network.score = evaluateFitness(network);
    });

    // Sort by fitness score
    neat.sort();

    // Log best fitness of the generation
    console.log(`Generation ${gen + 1} - Best fitness: ${neat.population[0].score.toFixed(4)}`);

    // Evolve to next generation
    neat.evolve();
  }
  console.log("Evolution complete!");
}

// Run evolution
evolveGenerations(50);

// Output best network's predictions
const bestNetwork = neat.population[0];
console.log("\nBest network's predictions:");
trainingData.forEach(data => {
  console.log(`Input: ${data.input} -> Output: ${bestNetwork.activate(data.input)}`);
});
