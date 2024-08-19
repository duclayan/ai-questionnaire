// // src/components/forms/FormContainer/FormContainer.js
// import React, { useState } from "react";
// import "./FormContainer.css";
// import InputField from "../InputField/InputField";
// const FormContainer = ({ onSubmit }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="form-container">
//       <InputField
//         label="Name"
//         name="name"
//         value={formData.name}
//         onChange={handleChange}
//         placeholder="Enter your name"
//       />
//       <InputField
//         label="Email"
//         type="email"
//         name="email"
//         value={formData.email}
//         onChange={handleChange}
//         placeholder="Enter your email"
//       />
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default FormContainer;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { TextField, Button, Grid, Paper, Typography } from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MicIcon from "@mui/icons-material/Mic";
import ErrorIcon from "@mui/icons-material/Error";

const FormContainer = () => {
  const [questions, setQuestions] = useState([
    { id: 23, text: "What is up" },
    { id: 23, text: "What is up" },
  ]);
  const [answers, setAnswers] = useState({});
  const [summary, setSummary] = useState("");
  const [multiline, setMultiline] = useState("");
  // useEffect(() => {
  //   const fetchQuestions = async () => {
  //     const response = await axios.get(
  //       "<http://localhost:8000/api/questions/>"
  //     );
  //     setQuestions(response.data);
  //   };
  //   fetchQuestions();
  // }, []);

  // questions = [{ id: 23, text: "What is up" }];
  const handleInputChange = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleAutoCorrect = async (questionText, inputText) => {
    const response = await axios.post(
      "<http://localhost:8000/api/autocorrect/>",
      {
        questionText,
        inputText,
      }
    );
    const correctedText = response.data.correctedText;
    handleInputChange(questionText, correctedText);
  };

  const handleSubmit = async (event) => {
    console.log("Submit");
    // event.preventDefault();
    // const response = await axios.post(
    //   "<http://localhost:8000/api/submit/>",
    //   answers
    // );
    // setSummary(response.data.summary);
  };
  const classes = (theme) => ({
    root: {
      flexGrow: 2,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
  });
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid
            item
            container
            xs={12}
            sm={10}
            md={8}
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth
                multiline
                value={multiline}
                label="The Multiline"
                onChange={(e) => setMultiline(e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Grid container spacing={1} justifyContent="center">
                <Grid item>
                  <Button
                    variant="contained"
                    startIcon={<CheckCircleIcon />}
                  ></Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" startIcon={<MicIcon />}></Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" startIcon={<ErrorIcon />} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* {questions.map((question) => (
          <div key={question.id}>
            <label>{question.text}</label>
            <TextField
              type="text"
              maxLength="3000"
              value={answers[question.id] || ""}
              onChange={(e) => handleInputChange(question.id, e.target.value)}
            />
            <Button
              type="button"
              onClick={() =>
                handleAutoCorrect(question.text, answers[question.id])
              }
            >
              Auto Correct
            </Button>
            <Button color="inherit" type="button">
              Text to Speech
            </Button>
            <Button type="button">Sample Item</Button>{" "}
          </div>
        ))}
        <button type="submit">Submit</button> */}
      </form>
    </div>
  );
};

export default FormContainer;
