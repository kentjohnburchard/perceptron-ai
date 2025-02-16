const response = await fetch('http://localhost:11434/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: 'mistral', prompt: 'Hello AI' })
});

const data = await response.json(); // Read as JSON
console.log('Parsed JSON:', data);
