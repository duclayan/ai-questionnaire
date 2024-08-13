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
        try {
            const response = await axios.post(
                'https://studious-cod-46v7wqwvwx725j66-8000.app.github.dev/api/', // Ensure this is the correct endpoint
                { text },
                {
                    headers: {
                        'Content-Type': 'application/json', // Specify content type
                    }
                }
            );
            setText(response.data.corrected_text);
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

export default App;