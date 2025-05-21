import React, { useState, useEffect } from 'react';
import axios from 'axios';
import mermaid from 'mermaid';
import {
  Box,
  TextField,
  Button,
  Container,
  Typography,
  Grid
} from '@mui/material';
import { DocumentLoader } from '../forms/DocumentLoader/DocumentLoader';
import { MermaidDiagram } from '../forms/MermaidDiagram/MermaidDiagram';
import AudioRecorderComponent from '../voice/AudioRecorder';
export const MermaidWithInputBox = () => {
  const [prompt, setPrompt] = useState('');
  const [mermaidCode, setMermaidCode] = useState('');
  const [currentlyRecordingId, setCurrentlyRecordingId] = useState(123);
  
  const [svgCode, setSvgCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('Note: This will give you a sneak peek of the diagram, but you would not be able to save it');

  const token = localStorage.getItem('token');
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT
  const apiUrl = `${apiEndpoint}/api/gpt-omini/`;


  const generateMermaidJS = async (userPrompt) => {
    const prompt = `
    Convert the following description into Mermaid JS code for a graph diagram. 
    Provide only the code content without any Mermaid JS tags 
    or code block formatting. The code should start directly with the graph definition`
    const finalPrompt = `${prompt}. This is the data: ${userPrompt}`
    const response = await axios.post(apiUrl,
      { text: finalPrompt },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const result = response.data.generated_text

    return result
  };
  const handleInputChange = async (question_id, response, category) => {
    setPrompt(response)
  };

  const showDiagram = async () => {
    try {
      const { svg } = await mermaid.render('mermaid-svg', mermaidCode);
      setSvgCode(svg);
      setTitle("Diagram Preview:")
    } catch (err) {
      setTitle("Please revise your input and try generating the diagram again.")
    }
  };

  const generateDiagram = async () => {
    setIsLoading(true)
    try {
      setMermaidCode(await generateMermaidJS(prompt));
    } catch (error) {
      setTitle("We faced some problems in generating your diagram. Please generate again.")
    } finally {
      setIsLoading(false)
    }
  };

  useEffect(() => {
    if (mermaidCode){
      mermaid.initialize({ startOnLoad: true, suppressErrorRendering: true });
      showDiagram()
    }
  }, [mermaidCode]);

  const question = {
    question_id: 123,
    category: "general",
    prompt: "",
    question:""
  }
  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4">Get a preview of your Diagram</Typography>
        <Box my={2}>
          <TextField
            fullWidth
            label="Enter diagram description"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            multiline
            rows={3}
            InputProps={{
              endAdornment: (
                <Box sx={{ display: "flex" }}>
                  <AudioRecorderComponent  question={question} handleInputChange={handleInputChange} currentlyRecordingId={currentlyRecordingId}
                    setCurrentlyRecordingId={setCurrentlyRecordingId} />
                </Box>
              ),
            }}
          />
        </Box>

        <MermaidDiagram
          isReportPage={false}
          isDiagram={false}
          token={token}
          requireGPT={true}
          answers={prompt}
          apiEndpoint={apiEndpoint}
        />
      </Box>
    </Container>
  );
};