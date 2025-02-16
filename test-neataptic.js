const neataptic = require('neataptic');

console.log("Neataptic object:", neataptic);

if (neataptic && neataptic.architect) { // Changed to lowercase 'architect'
    console.log("architect object:", neataptic.architect); // Changed to lowercase 'architect'
    console.log("Perceptron constructor:", neataptic.architect.Perceptron); // Changed to lowercase 'architect'
} else {
    console.log("Neataptic or architect is not properly loaded.");
}