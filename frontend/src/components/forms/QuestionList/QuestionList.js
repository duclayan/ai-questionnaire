import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, TextField, IconButton } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MicIcon from "@mui/icons-material/Mic";
import ErrorIcon from "@mui/icons-material/Error";
import axios from "axios";
import { InputLabel, FormControl } from "@mui/material";

export const QuestionList = ({ currentStep, onAnswersChange })=> {
  const categories = [
    "General Information",
    "Authentication and Authorization",
    "Application Architecture",
    "Cloud Architecture",
    "Report",
  ];

  const currentCategory = categories[currentStep];

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    fetchQuestions(currentCategory);
  }, [currentStep, currentCategory]);

  useEffect(() => {
    // Whenever answers change, call the onAnswersChange prop
    onAnswersChange(answers);
  }, [answers, onAnswersChange]);

  const fetchQuestions = async (category) => {
    try {
      const response = await axios.get("http://localhost:8000/questions", {
        params: { currentCategory: category },
      });
      const question_list = response.data.question_list;
      setQuestions(question_list);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleInputChange = (id, value, category, currentStep) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [id]: {
        input_text: value,
        question_id: id,
      },
    }));
  };

  const giveSampleAnswer = (currentQuestion) => {
    const id = currentQuestion.question_id;
    const sample_answer = currentQuestion.sample_answer;
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [id]: {
        input_text: sample_answer,
        question_id: id,
      },
    }));
  };

  const handleAutoCorrect = async (currentQuestion) => {
    const text = answers[currentQuestion.question_id];
    const prompt_strategy = currentQuestion.prompt;
    const question = currentQuestion.question;
    const sample_answer = currentQuestion.sample_answer;

    try {
      const response = await axios.post("http://localhost:8000/", {
        text,
        prompt_strategy,
        question,
        sample_answer,
      });

      const correctedText = response.data.generated_text;
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [currentQuestion.question_id]: {
          input_text: correctedText,
          question_id: currentQuestion.question_id,
        },
      }));
    } catch (error) {
      console.error("Error during auto-correct:", error);
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      {questions.map((question) => (
        <Box
          key={question.question_id}
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
          <Grid
            container
            spacing={1}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12} md={8}>
              <FormControl fullWidth variant="outlined">
                <InputLabel
                  htmlFor={`multiline-label-${question.question_id}`}
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
                  id={`multiline-label-${question.question_id}`}
                  fullWidth
                  multiline
                  value={answers[question.question_id]?.input_text || ""}
                  onChange={(e) =>
                    handleInputChange(
                      question.question_id,
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
                        <IconButton onClick={() => giveSampleAnswer(question)}>
                          <ErrorIcon />
                        </IconButton>
                      </Box>
                    ),
                  }}
                  sx={{ mt: 1 }}
                />
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      ))}
    </Box>
  );
}
