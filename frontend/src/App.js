import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [text, setText] = useState('');
    const [autoCorrectEnabled, setAutoCorrectEnabled] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (autoCorrectEnabled) {
                handleAutoCorrect();
            }
        }, 10000);
        return () => clearTimeout(timer);
    }, [text, autoCorrectEnabled]); // Added autoCorrectEnabled to dependencies

    const handleAutoCorrect = async () => {
        // 1. Post the current input
        // 2. Call OpenAI
        // 3. Gett the results
        try {
            const response = await axios.post(
                'https://studious-cod-46v7wqwvwx725j66-8000.app.github.dev/', // Ensure this is the correct endpoint
                { textinput: text }, // Changed 'inputtext' to 'textinput' to match Django's expected key
                {
                    headers: {
                        'Content-Type': 'application/json', // Specify content type
                    }
                }
            );
            setText("New response" + response.data.textinput); // Adjusted to access the correct response field
            console.log(response)
        } catch (error) {
            console.error('Error during auto-correct:', error);
            // Optionally, handle the error in the UI
        }
    };

    const handleVoiceToText = () => {
        // Implement Azure Speech Service here
    };

    const handleSampleText = () => {
        setText('This is a sample text.');
    };

    return (
        <div>
            <textarea value={text} onChange={(e) => setText(e.target.value)} />
            <button onClick={handleAutoCorrect}>Auto Correct</button>
            <button onClick={handleVoiceToText}>Voice to Text</button>
            <button onClick={handleSampleText}>Sample Text</button>
        </div>
    );
}

export default App