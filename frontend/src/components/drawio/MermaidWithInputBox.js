import { useEffect, useState } from 'react';
import { Box, TextField, Container, Typography } from '@mui/material';
import { MermaidDiagram } from '../forms/MermaidDiagram/MermaidDiagram';
import AudioRecorderComponent from '../voice/AudioRecorder';

export const MermaidWithInputBox = ({ version }) => {
  const [prompt, setPrompt] = useState('');
  const [recordingId, setRecordingId] = useState(123);
  const token = localStorage.getItem('token');
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;

  // Dynamic title based on version
  const title = version === 'aws' ? 'Aqua Editor - AWS' : version === 'basic' ? 'Aqua Editor - Basic' : 'Aqua Editor';

  // AudioRecorder expects a question object and a handler
  const question = { question_id: 123, category: 'general', prompt: '', question: '' };
  const handleInputChange = (_, response) => setPrompt(response);

  useEffect(() => { setPrompt(''); }, [version]);

  return (
    <Container>
      <Box my={4} textAlign="left">
        <Typography variant="h4">{title}</Typography>
        <Typography variant="body1" sx={{ color: '#475569', marginTop: 1 }}>
          {version === 'basic' ? (
            <>
              <Typography variant="body1" sx={{ color: '#475569', marginTop: 1 }}>
                Enter a description for your diagram below to create a basic diagram. Supported diagrams include:
              </Typography>
              <Box component="ul" sx={{ color: '#475569', marginTop: 1, paddingLeft: 2 }}>
                <li>Flowcharts</li>
                <li>Sequence Diagrams</li>
                <li>Class Diagrams</li>
                <li>State Diagrams</li>
                <li>Entity Relationship Diagrams</li>
                <li>Gantt Charts</li>
                <li>User Journey Diagrams</li>
              </Box>
              <Typography variant="body1" sx={{ color: '#475569', marginTop: 2 }}>
                Enter a description for your diagram below and use the tools provided to generate and interact with it. You can also use the microphone feature to record your voice and convert it to text. Once the diagram is generated, you can update it later, and save it as PNG or SVG for future use.
              </Typography>

              <Typography variant="body1" sx={{ color: '#475569', marginTop: 2, fontStyle: 'italic' }}>
                Example: "Create a flowchart showing the process of user registration, starting from the login page to account creation. Include decision points for invalid inputs."
              </Typography>

            </>
          ) : version === 'aws' ? (
            <>

              <Typography variant="body1" sx={{ color: '#475569', marginTop: 2 }}>
                Enter a description for your diagram below and use the tools provided to generate and interact with it. You can also use the microphone feature to record your voice and convert it to text. Once the diagram is generated, you can update it later, and save it as PNG or SVG for future use.
              </Typography>
              <Typography variant="body1" sx={{ color: '#475569', marginTop: 2 }}>
                Describe AWS services in the input box below. If matching icons are available, they will be rendered in the diagram. You can update the diagram later and save it as PNG or SVG.
              </Typography>
              <Typography variant="body1" sx={{ color: '#475569', marginTop: 2, fontStyle: 'italic' }}>
                Example: "Create an architecture diagram for an AWS-based application. Include an EC2 instance for hosting, an S3 bucket for storage, and a Lambda function for processing incoming requests. Connect these components using an API Gateway."
              </Typography>
            </>
          ) : (
            ''
          )}
        </Typography>
      </Box>
      <Box my={2}>
        <TextField
          fullWidth
          label="Enter diagram description"
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          multiline
          rows={3}
          sx={{ backgroundColor: '#ffffff', borderRadius: 1 }}
          InputProps={{
            endAdornment: (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AudioRecorderComponent
                  question={question}
                  handleInputChange={handleInputChange}
                  currentlyRecordingId={recordingId}
                  setCurrentlyRecordingId={setRecordingId}
                />
              </Box>
            ),
          }}
        />
      </Box>
      <Box mt={4}>
        <MermaidDiagram
          version={version}
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