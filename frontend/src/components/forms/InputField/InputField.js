// src/components/forms/InputField/InputField.js
import React from "react";
import "./InputField.css";
import { Box, CircularProgress, FormControl, Grid, IconButton, InputLabel, TextField } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MicIcon from "@mui/icons-material/Mic";
import ErrorIcon from "@mui/icons-material/Error";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
        <Box sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'stretch' : 'center',
          mb: 2,
          mt: 1,
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            transition: 'background-color 0.3s',
            '&:hover, &.Mui-focused': {
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
            },
            '& fieldset': {
              borderColor: 'rgba(0, 0, 0, 0.23)',
            },
            '&:hover fieldset': {
              borderColor: 'primary.main',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'primary.main',
            },
          },
          '& .MuiInputBase-input': {
            color: 'inherit',
          },
        }}>
          <FormControl 
            fullWidth 
            variant="outlined" 
            sx={{ 
              flex: isMobile ? '1 1 auto' : '5 1 100%', 
              mr: isMobile ? 0 : 2,
              mb: isMobile ? 2 : 0 
            }}
          >
            <InputLabel
              htmlFor={`multiline-label-${question.question_id}`}
              sx={{
                whiteSpace: "break-spaces",
                position: "relative",
                transform: "none",
                marginBottom: 1
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

          <MermaidDropdown
            onChange={onChange}
            question={question}
            answers={answers}
            sx={{ 
              flex: isMobile ? '1 1 auto' : '1 1 40%',
              width: isMobile ? '100%' : 'auto'
            }}
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
      disabled= {questionBeingCorrected?.has(question.question_id) ? true : false}
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
            {questionBeingCorrected?.has(question.question_id) && (
              <CircularProgress size={20} sx={{ marginLeft: 1 }} />
            )}
          </Box>
           
        ),
      }}
      sx={{
        mt: 1,
        '& .MuiOutlinedInput-root': {
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          transition: 'background-color 0.3s',
          '&:hover, &.Mui-focused': {
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
          },
          '& fieldset': {
            borderColor: 'rgba(0, 0, 0, 0.23)',
          },
          '&:hover fieldset': {
            borderColor: 'primary.main',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'primary.main',
          },
        },
        '& .MuiInputBase-input': {
          color: 'inherit',
        },
      }}
      
    />
  </FormControl>
  }
      </Grid>
    </Grid>
   </Box>
  );
};