import React from "react";
import { Typography, Box, useMediaQuery, useTheme } from "@mui/material";
import BurgerMenu from "../BurgerMenu/BurgerMenu";

export const CenteredHeading = ({ currentStep, onStepChange }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const steps = [
    "General Information",
    "Authentication Authorization Concept",
    "Application Design",
    "Cloud Architecture",
    "Architecture Diagram",
    "Report"
  ];

  return (
    <Box 
      sx={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        mt: 4,
        width: '100%'
      }}
    >
      {isMobile && (
        <BurgerMenu steps={steps} currentStep={currentStep} onStepChange={onStepChange} />
      )}
      
      <Typography
        component="h1"
        align="center"
        sx={{
          fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem", lg: "3rem" },
          flexGrow: 1,
          pb: 2,
        }}
      >
        {steps[currentStep]}
      </Typography>
      
      {isMobile && <Box sx={{ width: 48 }} />} {/* Placeholder for spacing */}
    </Box>
  );
}