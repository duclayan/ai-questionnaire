import React from "react";
import { Tabs, Tab, Box } from "@mui/material";
import BurgerMenu from "../BurgerMenu/BurgerMenu";

export const StepNavigation = ({ currentStep, handleStepChange, isFormSubmitted, isMobile }) =>  {
  const steps = [
    "General Information",
    "Authentication Authorization Concept",
    "Application Design",
    "Cloud Architecture",
    "Architecture Diagram",
    "Report"
  ];

  return (
    (isMobile ?  (<BurgerMenu steps={steps} currentStep={currentStep} onStepChange={handleStepChange} disabled={isFormSubmitted}/>): (<Box class="app-container" sx={{ width: "100%"}}>
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
            disabled={isFormSubmitted}
            sx={{
              color: currentStep === index ? "black" : "gray",
              textTransform: "none",
            }}
          />
        ))}
      </Tabs>
    </Box>) )
  );
}
