import React from "react";
import { Tabs, Tab, Box } from "@mui/material";

function StepNavigation({ currentStep, handleStepChange }) {
  // Further extension of this code could be that the steps can be customizable by the users
  const steps = [
    "General Information",
    "Authentication Authorization Concept",
    "Application Design",
    "Cloud Architecture",
    "Report"
  ];

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
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

export default StepNavigation;
