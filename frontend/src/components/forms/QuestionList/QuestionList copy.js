import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, TextField, IconButton } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MicIcon from "@mui/icons-material/Mic";
import ErrorIcon from "@mui/icons-material/Error";
import axios from "axios";
import { InputLabel, FormControl } from "@mui/material";

export const QuestionList = ({ currentStep, onAnswersChange, projectID })=> {
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
  const [loading, setLoading] = useState(true); // Loading state
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      await fetchAnswers(); // Fetch answers
      setLoading(false); // End loading
    };

    fetchData();
  }, [projectID]); // Depend on categories and projectID
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      await fetchQuestions(currentCategory); // Fetch questions
      setLoading(false); // End loading
    };

    fetchData();
  }, [currentStep, currentCategory, ]); // Depend on categories and projectID

  useEffect(() => {
    // Whenever answers change, call the onAnswersChange prop
    onAnswersChange(answers);
  }, [answers, onAnswersChange]);

  const fetchQuestions = async (category) => {
    try {
      const response = await axios.get(`${apiEndpoint}/questions`, {
        params: { currentCategory: category },
      });
      const question_list = response.data.question_list;
      console.log("Question List:", response)
      setQuestions(question_list);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };
  const fetchAnswers = async () => {
    try {
      const response = await axios.get(`${apiEndpoint}/submit-answers`, {
        params: { project_id: projectID },
      });
      const answer_list = response.data.answer_list;
      console.log("Answer List:", response)
      setAnswers(answer_list);

    } catch (error) {
      console.error('Error fetching answers:', error);
    }
  };
  const handleInputChange = (id, value, category, currentStep) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [id]: {
        input_answer: value,
        question: id,
        project_id: projectID,
        category: category
      },
    }));
    console.log("Answer changed", answers)
  };

  const giveSampleAnswer = (currentQuestion) => {
    const id = currentQuestion.question_id;
    const sample_answer = currentQuestion.sample_answer;
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [id]: {
        input_answer: sample_answer,
        question: id,
        project_id: projectID,
        category: currentCategory
      },
    }));
  };

  const handleAutoCorrect = async (currentQuestion) => {
    const text = answers[currentQuestion.question_id];
    const prompt_strategy = currentQuestion.prompt;
    const question = currentQuestion.question;
    const sample_answer = currentQuestion.sample_answer;

    try {
      const response = await axios.post(`${apiEndpoint}/`, {
        text,
        prompt_strategy,
        question,
        sample_answer,
      });

      const correctedText = response.data.generated_text;
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [currentQuestion.question_id]: {
          input_answer: correctedText,
          question: currentQuestion.question_id,
          project_id: projectID,
          category: currentCategory
        },
      }));
    } catch (error) {
      console.error("Error during auto-correct:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading screen while fetching data
  }

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
                  value={answers[question.question_id]?.input_answer || ""}
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
