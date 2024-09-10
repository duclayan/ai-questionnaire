import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
export const NavigationButtons = ({
  navbarEnabled,
  currentStep,
  totalSteps,
  handlePrevious,
  handleNext,
  handleSubmit,
}) => {
    const isReportStep = currentStep === totalSteps - 1
    const navigate = useNavigate(); 
    const handleNewProject = () => {navigate('/dashboard')};

    if (!navbarEnabled) {
      return(
        <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
        <p>The report is now in your local. In this current version, no editing is possible. Please create a new project.</p>
        <Button
          variant="contained"
          onClick={handleNewProject}
          sx={{
            bgcolor: "primary.main",
            "&:hover": {
              bgcolor: "primary.dark",
            },
          }}
        >
          New Project
        </Button>
      </Box>
      )
    } else {
      return (
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 4 }}>
          <Button
            variant="contained"
            onClick={handlePrevious}
            disabled={currentStep === 0 || isReportStep}
            sx={{
              bgcolor: currentStep === 0 || isReportStep ? "gray" : "primary.main",
              "&:hover": {
                bgcolor:
                  currentStep === 0 || isReportStep ? "gray" : "primary.dark",
              },
            }}
          >
            Previous
          </Button>
          {currentStep < totalSteps - 2 && (
            <Button
              variant="contained"
              onClick={handleNext}
              sx={{
                bgcolor: "primary.main",
                "&:hover": {
                  bgcolor: "primary.dark",
                },
              }}
            >
              Next
            </Button>
          )}
          {currentStep === totalSteps - 2 && (
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{
                bgcolor: "primary.main",
                "&:hover": {
                  bgcolor: "primary.dark",
                },
              }}
            >
              Submit
            </Button>
          )}
        </Box>
      );
    }
}
