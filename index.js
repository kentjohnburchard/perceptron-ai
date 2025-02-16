const express = require('express');
const fetch = require('node-fetch'); // Import node-fetch
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('.')); // Serve static files (like index.html) from the current directory

// Store conversation history (in-memory for this example)
const conversations = new Map(); // key is client IP, Value is array of messages

app.post('/chat', async (req, res) => {
    const clientIP = req.ip; // Or a more robust unique identifier
    const prompt = req.body.prompt;

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required.' });
    }

    // Retrieve or initialize conversation history
    if (!conversations.has(clientIP)) {
        conversations.set(clientIP, []);
    }
    const history = conversations.get(clientIP);


    // Add user's message to history
    history.push({ role: 'user', content: prompt });


    const ollamaData = {
        prompt: "", //build prompt from history below
        model: 'llama2',  // Replace with your model name
        stream: true, // Enable streaming
        format: "json",
        options: {}, // Add any Ollama options you need here
    };

    //build prompt string from history
    let prompt_string = "";
    for(const turn of history){
        prompt_string += turn.content + "\n"; //add newlines
    }
    ollamaData.prompt = prompt_string;


    try {
        const ollamaResponse = await fetch('http://localhost:11434/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ollamaData),
        });

        if (!ollamaResponse.ok) {
            throw new Error(`Ollama API error! status: ${ollamaResponse.status}`);
        }

        // Set headers for streaming
        res.setHeader('Content-Type', 'text/plain');
        res.setHeader('Transfer-Encoding', 'chunked');
        res.setHeader('Access-Control-Allow-Origin', '*'); // For development only!  Restrict in production.
        
        const reader = ollamaResponse.body.getReader();
        let aiResponse = "";
        const neuralNet = require('./neural-network');
const evolution = require('./neuroevolution');

console.log("Running evolved AI...");
evolution.run();

        
        //handle streamed response
        while (true) {
            const { done, value } = await reader.read();
            if (done) {
                break;
            }
             res.write(value); // Send the raw chunk to the client.
            //accumulate response for history
            try{
                const decoder = new TextDecoder();
                const chunk = decoder.decode(value);
                const jsonChunks = chunk.trim().split('\n');
                for(const jsonChunk of jsonChunks){
                    const parsedChunk = JSON.parse(jsonChunk);
                    aiResponse += parsedChunk.response;
                }
            } catch(error){
                //if parsing fails, its not a big deal in this context, we still sent to client
                console.error("Parsing chunk failed: ", error);
            }
        }
         res.end();  //end the response


        // Add AI's *complete* response to history, after streaming is complete
        history.push({ role: 'assistant', content: aiResponse });
        conversations.set(clientIP, history); //update history

    } catch (error) {
        console.error('Error calling Ollama API:', error);
        res.status(500).json({ error: 'Error communicating with Ollama API.' });
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});