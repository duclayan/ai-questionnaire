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
    }, [text]);

    const handleAutoCorrect = async () => {
        const response = await axios.post('http://localhost:8000/api/', { text });
        setText(response.data.corrected_text);
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