import React from "react";
import { Typography, Box } from "@mui/material";

function CenteredHeading() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      <Typography
        component="h1"
        align="center"
        sx={{
          fontSize: { xs: "1.5rem", sm: "2.5rem", md: "3rem", lg: "3.125rem" }, // Responsive font sizes
          maxWidth: "100%",
          pb: 2,
        }}
      >
        My Form
      </Typography>
    </Box>
  );
}

export default CenteredHeading;
