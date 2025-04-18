import React, { useEffect, useState } from "react";
import axios from "axios";
import { TextField, Button, Grid } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MicIcon from "@mui/icons-material/Mic";
import ErrorIcon from "@mui/icons-material/Error";

export const FormContainer = () => {
  const [questions, setQuestions] = useState([{ id: 23, text: "What is up" }]);
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [idleTimeout, setIdleTimeout] = useState(null);
  const token = localStorage.getItem('token');

  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `${apiEndpoint}/api/questions/`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
          
        );
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, []);

  const handleInputChange = (value) => {
    setText(value);
    resetIdleTimer(value);
  };

  const resetIdleTimer = (value) => {
    if (idleTimeout) clearTimeout(idleTimeout);
    setIdleTimeout(
      setTimeout(() => handleAutoCorrect(value), 5000) // 5 seconds idle time
    );
  };

  const handleAutoCorrect = async (inputText) => {
    try {
      const response = await axios.post(`${apiEndpoint}/api`, {
        inputText,
          headers: { Authorization: `Bearer ${token}` },
      });
      const correctedText = response.data.generated_text;
      setText(correctedText);
    } catch (error) {
      console.error("Error during autocorrect:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
          `${apiEndpoint}/api/submit/`, 
          { text }, // This is the data being sent
          {
              headers: { Authorization: `Bearer ${token}` } // Headers should be in the third argument
          }
      );
      setSummary(response.data.summary);
    } catch (error) {
      console.error("Error during submit:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {questions.map((question) => (
          <div key={question.id}>
            <label>{question.text}</label>
            <TextField
              type="text"
              maxLength="3000"
              value={text}
              onChange={(e) => handleInputChange(e.target.value)}
            />
            <Button type="button" onClick={() => handleAutoCorrect(text)}>
              Auto Correct
            </Button>
            <Button color="inherit" type="button">
              Text to Speech
            </Button>
            <Button type="button">Sample Item</Button>{" "}
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};