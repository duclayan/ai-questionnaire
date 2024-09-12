import React from "react";
import { Tabs, Tab, Box } from "@mui/material";

export const StepNavigation = ({ currentStep, handleStepChange }) =>  {
  const steps = [
    "General Information",
    "Authentication Authorization Concept",
    "Application Design",
    "Cloud Architecture",
    "Report"
  ];

  return (
    <Box class="app-container" sx={{ width: "100%"}}>
      <Tabs
        value={currentStep}
        onChange={(event, newValue) => handleStepChange(newValue)}
        scrollButtons="auto"
        aria-label="form steps"
        centered
      >
        {steps.map((step, index) => (
          <Tab
            key={index}
            label={step}
            sx={{
              color: currentStep === index ? "black" : "gray",
              textTransform: "none",
            }}
          />
        ))}
      </Tabs>
    </Box>
  );
}
