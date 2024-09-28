// src/components/forms/InputField/InputField.js
import React from "react";
import "./InputField.css";
import { Box, CircularProgress, FormControl, Grid, IconButton, InputLabel, TextField } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MicIcon from "@mui/icons-material/Mic";
import ErrorIcon from "@mui/icons-material/Error";
import { MermaidDropdown } from "../MermaidDropdown/MermaidDropdown";

export const InputField = ({ 
  question,
  answers,
  handleInputChangeWithIdle,
  handleAutoCorrect,
  giveSampleAnswer,
  questionBeingCorrected,
  onChange,
  currentCategory

 }) => {
  
  return (
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
      {currentCategory === "Architecture Diagram" ? (
      <>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}> {/* Flex container */}
          <FormControl fullWidth variant="outlined" sx={{ flex: '5 1 100%', mr: 2 }}> {/* Input Field */}
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
                    <IconButton>
                      <MicIcon />
                    </IconButton>
                  </Box>
                ),
              }}
              sx={{ mt: 1 }}
            />
          </FormControl>

          {/* Dropdown Component */}
          <MermaidDropdown
            onChange={onChange}
            question={question}
            answers={answers}
            sx={{ flex: '1 1 40%' }} // Adjust width as needed
          />
        </Box>
      </>
    ) :         
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
  }
      </Grid>
    </Grid>
   </Box>
  );
};