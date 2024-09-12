import React, { useEffect, useState } from "react";
import { Box, Grid, TextField, IconButton, CircularProgress } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MicIcon from "@mui/icons-material/Mic";
import ErrorIcon from "@mui/icons-material/Error";
import axios from "axios";
import { InputLabel, FormControl } from "@mui/material";
import { DocumentLoader } from "../DocumentLoader/DocumentLoader";

export const QuestionList = ({ currentStep, onAnswersChange, projectID, language, autoCorrectEnabled  })=> {
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
  const [loading, setLoading] = useState(true);
  const [questionBeingCorrected, setQuestionBeingCorrected] = useState(null)
  const [idleTimers, setIdleTimers] = useState({});
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT

// Fetch answers according to the current project
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); 
      await fetchAnswers();
      setLoading(false);
    };
    fetchData();
  }, [projectID]); 

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchQuestions(currentCategory); 
      setLoading(false);
    };
    fetchData();
  }, [currentStep]); 

// When the answers change, the answerlist is updated in the main form 
  useEffect(() => {
    onAnswersChange(answers);
    console.log("Updated Answers", answers)
  }, [answers]);

// Functions : FetchQuestion
  const fetchQuestions = async (category) => {
    try {
      const response = await axios.get(
        `${apiEndpoint}/questions`, {
        params: { currentCategory: category },
      });
      const question_list = response.data.question_list;
      setQuestions(question_list);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const fetchAnswers = async () => {
    try {
      const response = await axios.get(
        `${apiEndpoint}/submit-answers`, {
        params: { project_id: projectID },
      });
      const answer_list = response.data.answer_list;
      // Temporary holder for the anwers
      const initialInputValues = {};
      answer_list.forEach(answer => {
        initialInputValues[answer.question] = {
          input_answer: answer.input_answer,
          question: answer.question,
          category: answer.category,
          project_id: answer.project_id
        }; 
      });
      setAnswers(initialInputValues);
    } catch (error) {
      console.error('Error fetching answers:', error);
      setAnswers([]); // Ensure answers is an empty array on error
    }
  };

// Functions involving the input box directly 
// This includes handling change of input, giving sample answer and gpt autocorrect
  const handleInputChangeWithIdle = (questionId, value) => {
    console.log("Handle Input Change with Idle")
    const question = questions.find(q => q.question_id === questionId);
    handleInputChange(questionId, value,question.category);
    
    // Clear previous timer if exists
    if (idleTimers[questionId]) {
      clearTimeout(idleTimers[questionId]);
    }

    // Set a new timer for auto-correction
    if (autoCorrectEnabled) {
      const timer = setTimeout(() => {
        handleAutoCorrect(question);
      }, 3000); // 10 seconds idle

      setIdleTimers((prev) => ({ ...prev, [questionId]: timer }));
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
    console.log("AUTO CORRECT")
    const text = answers[currentQuestion.question_id];
    const prompt_strategy = currentQuestion.prompt;
    const question = currentQuestion.question;
    const sample_answer = currentQuestion.sample_answer;
    setQuestionBeingCorrected(currentQuestion.question_id)
    try {
      const response = await axios.post(`${apiEndpoint}/`, {
        language,
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
    setQuestionBeingCorrected(null)
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
                    handleInputChangeWithIdle(question.question_id, e.target.value)
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
                        {questionBeingCorrected === question.question_id && (
                          <CircularProgress size={20} sx={{ marginLeft: 1 }} />
                        )}
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
