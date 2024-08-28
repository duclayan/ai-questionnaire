import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function FormSubmitted() {
const navigate = useNavigate();

  const createNewReport = () => {
    navigate('/form'); // Redirect to home page
  };

  return (
    <div>
        <h1> Successfully Submitted </h1>
        <Button onClick={createNewReport}> Create another Report </Button>

    </div>
  );
}

export default FormSubmitted;