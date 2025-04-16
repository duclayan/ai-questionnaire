import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { MermaidDiagram } from './MermaidDiagram';

function MermaidInput() {
    const [inputValue, setInputValue] = useState('');
    const token = localStorage.getItem('token');
    const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    return (
        <Container>
            <Box my={4}>
                <Typography variant="h4">Diagram Generator</Typography>
                <Box my={2}>
                    <TextField
                        fullWidth
                        label="Enter Mermaid diagram text"
                        value={inputValue}
                        onChange={handleInputChange}
                        multiline
                        rows={4}
                        variant="outlined"
                    />
                </Box>
                <MermaidDiagram
                    diagramName='diagram'
                    question={{ question_id: 192 }}
                    answers={inputValue}
                    token={token}
                    apiEndpoint={apiEndpoint}
                />
            </Box>
        </Container>
    );
}

export default MermaidInput;
