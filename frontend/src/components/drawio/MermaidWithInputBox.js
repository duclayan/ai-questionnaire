import{useState} from 'react';
import {
  Box,
  TextField,
  Container,
  Typography
} from '@mui/material';
import { MermaidDiagram } from '../forms/MermaidDiagram/MermaidDiagram';
import AudioRecorderComponent from '../voice/AudioRecorder';
export const MermaidWithInputBox = () => {
  const [prompt, setPrompt] = useState('');
  const [currentlyRecordingId, setCurrentlyRecordingId] = useState(123);

  const token = localStorage.getItem('token');
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT
  const handleInputChange = async (question_id, response, category) => {
    setPrompt(response)
  };

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