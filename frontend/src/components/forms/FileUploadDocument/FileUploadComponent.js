import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DocumentLoader } from '../DocumentLoader/DocumentLoader';
import { 
  Button, 
  Grid, 
  Typography, 
  Box, 
  Container,
  TextField,
  Tooltip
} from '@mui/material';

export const FileUploadComponent = ({
project_id,
onAnswersChange
}) => {
  const [file, setFile] = useState(null);
  const [questionList, setQuestionList] = useState([]);
  const [refAnswers, setRefAnswers] = useState([]);
  const [question, setQuestion] = useState('');
  const [result, setResult] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      await fetchQuestions()
    };
    fetchData();
  }, []);

  useEffect(() => {
    // category, prompt, question, question_id, sample_answer
    console.log("Question List", questionList)
    const obj = JSON.stringify(questionList)
    const prompt = `
    Return in JSON Format (just return the json do not include 'json' return as plaintext).
    In reference to the file, Add the 'ref_answer' and remove other attributes aside from 'question_id' and 'category' for each of these question in this list answer the question : ${obj}`
    setQuestion(prompt)
  }, [questionList]);

  const fetchQuestions = async (category) => {
    try {
      const response = await axios.get(
        `${apiEndpoint}/api/questions`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { currentCategory: `all` },
        },
      );
      const question_list = response.data.question_list;

      setQuestionList(question_list);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  function cleanChatGPTResponse(text) {
    let cleanedText= text.trim();
    const lastBraceIndex = cleanedText.lastIndexOf('}');
    


    if (cleanedText.startsWith('```json') && cleanedText.endsWith('```')) {
        cleanedText = cleanedText.slice(7, -3).trim();
    } 
    else if (cleanedText.startsWith('```') && cleanedText.endsWith('```')) {
        cleanedText = cleanedText.slice(3, -3).trim();
    }
    else if (cleanedText.startsWith('```json')) {
      cleanedText = cleanedText.slice(7).trim();
      if (lastBraceIndex !== -1) {
        cleanedText = cleanedText.substring(0, lastBraceIndex + 1) + ']';
      }
    }

    else if (cleanedText.startsWith('```')) {
      cleanedText = cleanedText.slice(3).trim();
      if (lastBraceIndex !== -1) {
        cleanedText = cleanedText.substring(0, lastBraceIndex + 1) + ']';
      }
    }

    try {
        cleanedText = JSON.parse(cleanedText)
        setStatusMessage(`Success in processing ${file.name}`)
        setResult(true)
        return cleanedText;
    } catch (error) {
        // If parsing fails, return the cleaned text as is
        setStatusMessage("Please try processing again, I'm having a hard time to undesrtand it.")
        setResult(false)
        return cleanedText;
    }
  }

  const handleSubmit = async (event) => {
    setIsLoading(true);
    setResult(false);
    setStatusMessage('');
    event.preventDefault();
    // Handle Empty File
    if (!file) {
      alert('Please select a file');
      setIsLoading(false);
      return;
    }
    // Check file type
    const allowedExtensions = ['.docx', '.pdf', '.pptx', '.txt', '.md'];
    const fileExtension = file.name.split('.').pop().toLowerCase();
    
    if (!allowedExtensions.includes(`.${fileExtension}`)) {
      alert('Please select a Word document, PDF, PowerPoint presentation, or text file.');
      setIsLoading(false);
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('question', question);
  
      const response = await axios.post(`${apiEndpoint}/api/process-document/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      const cleaned_text = cleanChatGPTResponse(response.data.generated_text);
      setRefAnswers(cleaned_text);
    } catch (error) {
      setStatusMessage("Please try processing again, I'm having a hard time understanding it");
      console.error('Error processing file:', error);
      alert('Error processing file');
    } finally {
      setIsLoading(false);
    }
  };
  const handleAnswerFilling = async (fill_all) => {
    setIsLoading(true)
    try {
      const response = await axios.put(`${apiEndpoint}/api/process-document/`, 
        {
          project_id: project_id, 
          ref_answers: refAnswers,
          fill_all: fill_all,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      onAnswersChange(response.data.updated_answers)
      setStatusMessage("Update is successful")
      setResult(false)
    } catch (error) {
      console.error('Error processing file:', error);
      alert('Error processing file');
      setIsLoading(false)
    }      

    setIsLoading(false)
  };

  return (
      <Container maxWidth="sm">
        <Box sx={{ mt: 4 }}>
          <Grid container direction="column" spacing={3} alignItems="center">
            <Grid item xs={12}>
              <form onSubmit={handleSubmit}>
                <Grid container direction="column" spacing={2} alignItems="center">
                  <Grid item>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                      id="contained-button-file"
                    />
                    <label htmlFor="contained-button-file">
                      <Tooltip title="Select a document to upload. The current version only accepts .txt file format" arrow>
                        <Button variant="contained" component="span">
                          Upload File
                        </Button>
                      </Tooltip>
                    </label>
                  </Grid>

                  {file && (
                    <Grid item>
                      <TextField
                        variant="outlined"
                        size="small"
                        value={file.name}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                  )}
                  <Grid item>
                    <Button 
                      type="submit"
                      variant="outlined" 
                      color="primary" 
                      size="medium"
                    >
                      Process Document
                    </Button>
                  </Grid> 
                </Grid>
              </form>
            </Grid>
  
            <Grid item xs={12}>
              <DocumentLoader isLoading={isLoading} text={"Processing the Data"} />
            </Grid>
  
            {result && (
              <Grid item xs={12}>
                <Grid container spacing={2} justifyContent="center">
                  <Grid item>
                    <Button 
                      variant="outlined" 
                      color="primary" 
                      size="medium" 
                      onClick={() => handleAnswerFilling(true)}
                    >
                      Overwrite Answers
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button 
                      variant="outlined" 
                      color="primary" 
                      size="medium" 
                      onClick={() => handleAnswerFilling(false)}
                    >
                      Fill Empty Input Fields
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            )}
  
            {statusMessage && (
              <Grid item xs={12}>
                <Typography align="center">{statusMessage}</Typography>
              </Grid>
            )}
          </Grid>
        </Box>
      </Container>
  );
}

export default FileUploadComponent;