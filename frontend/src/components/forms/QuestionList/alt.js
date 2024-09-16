import React, { useEffect, useState } from "react";
import { Box, Grid, TextField, IconButton, FormControl, InputLabel } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MicIcon from "@mui/icons-material/Mic";
import ErrorIcon from "@mui/icons-material/Error";
import axios from "axios";

export const QuestionList = ({ currentStep, onAnswersChange, projectID }) => {
  const categories = [
    "General Information",
    "Authentication and Authorization",
    "Application Architecture",
    "Cloud Architecture",
    "Report",
  ];

  const currentCategory = categories[currentStep];

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]); // Ensure initial state is an array
  const [loading, setLoading] = useState(true);
  const [currentQuestionID, setCurrentQuestionID] = useState();
  const [inputValues, setInputValues] = useState({}); // State to manage input values
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchAnswers();
      await fetchQuestions(currentCategory);
      setLoading(false);
    };

    fetchData();
  }, [projectID, currentCategory]);

  useEffect(() => {
    onAnswersChange(answers);
  }, [answers, onAnswersChange]);

  useEffect(() => {
    saveInputValue(currentQuestionID);
  }, [currentQuestionID]);
  const fetchQuestions = async (category) => {
    try {
      const response = await axios.get(`${apiEndpoint}/api/questions`, {
        params: { currentCategory: category },
      });
      const question_list = response.data.question_list; // Adjust based on your API response structure
      setQuestions(question_list);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const fetchAnswers = async () => {
    try {
      const response = await axios.get(`${apiEndpoint}/api/submit-answers`, {
        params: { project_id: projectID },
      });
      const answer_list = response.data.answer_list; // Ensure this is an array
      setAnswers(Array.isArray(answer_list) ? answer_list : []); // Set answers to an array

      // Initialize inputValues based on fetched answers
      const initialInputValues = {};
      answer_list.forEach(answer => {
        initialInputValues[answer.question] = answer.input_answer; // Map question ID to input answer
      });
      setInputValues(initialInputValues);
    } catch (error) {
      console.error('Error fetching answers:', error);
      setAnswers([]); // Ensure answers is an empty array on error
    }
  };
  const handleInputChange = (id, value, category) => {
    // Update the inputValues state when the user types
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [id]:value,
    }));
    setCurrentQuestionID(id)
  };

  const saveInputValue = (id) => {
    console.log("TO CHANGE",  inputValues[id])
    // Save the input value to answers state
    setAnswers((prevAnswers) => {
      const existingAnswer = prevAnswers.find(answer => answer.question === id);
      if (existingAnswer) {
        return prevAnswers.map(answer =>
          answer.question === id
            ? { ...existingAnswer, input_answer: inputValues[id] }
            : answer
        );
      } else {
        return [
          ...prevAnswers,
          {
            input_answer: inputValues[id],
            question: id,
            project_id: projectID,
            category: currentCategory
          },
        ];
      }
    });
  };

  const giveSampleAnswer = (currentQuestion) => {
    const id = currentQuestion.question_id;
    const sample_answer = currentQuestion.sample_answer;
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [id]: sample_answer, // Set the sample answer in input values
    }));
  };

  const handleAutoCorrect = async (currentQuestion) => {
    const text = inputValues[currentQuestion.question_id] || "";
    const prompt_strategy = currentQuestion.prompt;
    const question = currentQuestion.question;
    const sample_answer = currentQuestion.sample_answer;

    try {
      const response = await axios.post(`${apiEndpoint}/api/`, {
        text,
        prompt_strategy,
        question,
        sample_answer,
      });

      const correctedText = response.data.generated_text;
      setInputValues((prevInputValues) => ({
        ...prevInputValues,
        [currentQuestion.question_id]: correctedText, // Update input value with corrected text
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
                  value={inputValues[question.question_id] || ""} // Use local state for the input value
                  onChange={(e) => handleInputChange(question.question_id, e.target.value, question.category)} // Update local state on change
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <Box sx={{ display: "flex" }}>
                        {/* <IconButton onClick={() => saveInputValue(question.question_id, question.category)}> */}
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
};