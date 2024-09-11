import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, TextField, IconButton } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MicIcon from "@mui/icons-material/Mic";
import ErrorIcon from "@mui/icons-material/Error";
import axios from "axios";
import { InputLabel, FormControl } from "@mui/material";
import { DocumentLoader } from "../DocumentLoader/DocumentLoader";

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
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT

// Fetch answers according to the current project
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); 
      await fetchAnswers();
      setLoading(false);
    };
    fetchData();
    console.log("ANSWERS AFTER IT HAS BEEN FETCHED", answers)
  }, [projectID]); 
  useEffect(() => {
    console.log("Updated answers", answers)
  }, [answers]); 
// Fetch Questions on the current category
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchQuestions(currentCategory); 
      setLoading(false);
    };
    fetchData();
  }, [currentStep, currentCategory, ]); 

// When the answers change, the answerlist is updated in the main form 
  useEffect(() => {
    onAnswersChange(answers);
  }, [answers, onAnswersChange]);

// Functions : FetchQuestion
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
      console.log("Answer List:", answer_list)
      // Initialize inputValues based on fetched answers
      const initialInputValues = {};
      answer_list.forEach(answer => {
        initialInputValues[answer.question] = {
          input_answer: answer.input_answer,
          question: answer.question,
          category: answer.category,
          project_id: answer.project_id
        }; // Map question ID to input answer
      });
      setAnswers(initialInputValues);
      console.log("Initial Input Values", initialInputValues)
      console.log("New answer set", answers)
    } catch (error) {
      console.error('Error fetching answers:', error);
      setAnswers([]); // Ensure answers is an empty array on error
    }
  };

// Functions involving the input box directly 
// This includes handling change of input, giving sample answer and gpt autocorrect

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

// Show loading screen while fetching data
  if (loading) {
    return <DocumentLoader isLoading={loading} text={"Preparing the Data"} />;
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
