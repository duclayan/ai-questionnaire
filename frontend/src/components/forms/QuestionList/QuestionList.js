import React, { useState } from "react";
import { Box, Typography, Grid, TextField, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MicIcon from "@mui/icons-material/Mic";
import ErrorIcon from "@mui/icons-material/Error";
import axios from "axios"; // Import axios for API requests
import { questions } from "../Questions/Questions";

function QuestionList({ currentStep }) {
  const currentCategory = [
    "General Information",
    "Authentication Authorization Concept",
    "Application Design",
    "Cloud Architecture",
    "Interface",
    "Report",
  ][currentStep];

  // Filter questions based on the current category
  const filteredQuestions = questions.filter(
    (question) => question.category === currentCategory
  );

  const [answers, setAnswers] = useState({});

  const handleInputChange = (id, value, category, currentStep) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [id]: value,
      [category]: currentStep,
    }));
    console.log(answers);
  };

  const handleAutoCorrect = async (id) => {
    const text = answers[id];
    const prompt_strategy = "Write in German";
    try {
      const response = await axios.post("http://localhost:8000/", {
        text,
        prompt_strategy,
      });
      const correctedText = response.data.generated_text;
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [id]: correctedText,
      }));
    } catch (error) {
      console.error("Error during auto-correct:", error);
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      {filteredQuestions.map((question) => (
        <Box key={question.id} sx={{ mb: 4 }}>
          <Typography variant="h6">{question.question}</Typography>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth
                multiline
                value={answers[question.id] || ""}
                label={question.question}
                onChange={(e) =>
                  handleInputChange(
                    question.id,
                    e.target.value,
                    question.category,
                    currentStep
                  )
                }
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Grid container spacing={1} justifyContent="center">
                <Grid item>
                  <Button
                    variant="contained"
                    startIcon={<CheckCircleIcon />}
                    onClick={() => handleAutoCorrect(question.id)}
                  >
                    Auto Correct
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" startIcon={<MicIcon />} />
                </Grid>
                <Grid item>
                  <Button variant="contained" startIcon={<ErrorIcon />} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      ))}
    </Box>
  );
}

export default QuestionList;
