import React from "react";
import { Box, Button } from "@mui/material";

function NavigationButtons({
  currentStep,
  totalSteps,
  handlePrevious,
  handleNext,
  handleSubmit,
}) {
  const isReportStep = currentStep === totalSteps - 1;

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

export default NavigationButtons;
