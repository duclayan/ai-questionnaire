import React from "react";
import { Typography, Box } from "@mui/material";

export const CenteredHeading = ({ currentStep }) => {
  const steps = [
    "Upload File",
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
    </Box>
  );
}