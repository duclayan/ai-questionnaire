import React, { useState } from "react";
import { Box, Typography, Grid, TextField, IconButton } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MicIcon from "@mui/icons-material/Mic";
import ErrorIcon from "@mui/icons-material/Error";
import axios from "axios"; // Import axios for API requests
import { questions } from "../Questions/Questions";
import { InputLabel, FormControl } from "@mui/material";

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

  const giveSampleAnswer = (id) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [id]: "Here is the sample pasted text",
    }));
  };

  const handleAutoCorrect = async (question) => {
    const text = answers[question.id];
    const prompt_strategy = question.prompt_help;
    const question = question.question
    try {
      const response = await axios.post("https://friendly-system-wr96v7rg9pwjc6qq-8000.app.github.dev/", {
        text,
        prompt_strategy,
        question
      });
      const correctedText = response.data.generated_text;
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [question.id]: correctedText,
      }));
    } catch (error) {
      console.error("Error during auto-correct:", error);
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      {filteredQuestions.map((question) => (
        <Box
          key={question.id}
          sx={{
            mb: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
            width: "100%",
            paddingTop: "1.5rem",
            maxWidth: "100rem",
            margin: "0 auto",
          }}
        >
          {/* <Typography variant="h6" align="left" sx={{ mb: 2 }} maxWidt="80rem">
            {question.question}
          </Typography> */}
          <Grid
            container
            spacing={1}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12} md={8}>
              <FormControl fullWidth variant="outlined">
                <InputLabel
                  htmlFor={`multiline-label-${question.id}`}
                  sx={{
                    whiteSpace: "break-spaces",
                    position: "relative",
                    transform: "none",
                    marginBottom: 1,
                  }}
                >
                  {question.question}
                </InputLabel>
                <TextField
                  id={`multiline-label-${question.id}`}
                  fullWidth
                  multiline
                  value={answers[question.id] || ""}
                  onChange={(e) =>
                    handleInputChange(
                      question.id,
                      e.target.value,
                      question.category,
                      currentStep
                    )
                  }
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <Box sx={{ display: "flex" }}>
                        <IconButton onClick={() => handleAutoCorrect(question)}>
                          <CheckCircleIcon />
                        </IconButton>
                        <IconButton>
                          <MicIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => giveSampleAnswer(question.id)}
                        >
                          <ErrorIcon />
                        </IconButton>
                      </Box>
                    ),
                  }}
                  sx={{ mt: 1 }} // Add top margin to separate from label
                />
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      ))}
    </Box>
  );
}

export default QuestionList;
