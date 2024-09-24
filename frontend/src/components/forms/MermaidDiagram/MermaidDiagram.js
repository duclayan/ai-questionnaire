import React, { useState, useEffect } from 'react';
import mermaid from 'mermaid';
import axios from 'axios';
import html2canvas from 'html2canvas';
import './styles.css';
import { Box, Button } from '@mui/material';

export const MermaidDiagram = ({ diagramName, question, answers }) => {
  const [chart, setChart] = useState('graph TD; A-->B; B-->C; C-->A;');
  const [mermaidError, setMermaidError] = useState(null);
  const [saveGraph, setSaveGraph] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
  const token = localStorage.getItem('token');

  useEffect(() => {
    mermaid.initialize({ startOnLoad: false });
    setChart(answers[question.question_id]?.input_answer || "");
    console.log("Current Chart", chart);
    if (shouldRender) {
      console.log("Diagram Content", answers);
      renderMermaid();
      setShouldRender(false);
    }
  }, [shouldRender, answers]); // Added answers to dependencies

  const renderMermaid = async () => {
    try {
      const mermaidChart = document.getElementById('mermaid-chart');
      mermaidChart.innerHTML = chart; // Set the inner HTML to the chart
      mermaidChart.removeAttribute('data-processed');
      await mermaid.run({ querySelector: '#mermaid-chart' });
      setSaveGraph(true);
      setMermaidError(null); // Reset error state on successful render
    } catch (error) {
      console.error('Mermaid rendering error:', error);
      
      // Clear the chart display and show an error message
      const mermaidChart = document.getElementById('mermaid-chart');
      mermaidChart.innerHTML = ''; // Clear any existing content
      setMermaidError("Invalid Diagram"); // Set a user-friendly error message
    }
  };

  const handleGenerateClick = () => {
    // Assuming you want to set the chart based on the input answer
    const diagramContent = answers[question.question_id]?.input_answer || 'graph TD; A-->B; B-->C; C-->A;';
    setChart(diagramContent); // Set the chart content
    setShouldRender(true); // Trigger rendering
  };

  const saveDiagram = async () => {
    if (saveGraph) {
      try {
        // Convert the rendered Mermaid diagram to a PNG image 
        const node = document.getElementById('mermaid-chart');
        const canvas = await html2canvas(node); 
        const dataUrl = canvas.toDataURL('image/png'); 
        console.log("Diagram Name", diagramName);

        // API call to save the diagram
        const response = await axios.post(
          `${apiEndpoint}/api/save-diagram/`,
          { diagram: dataUrl, diagramName: diagramName }, 
          { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log('Diagram saved:', response.data);
      } catch (error) {
        console.error('Error saving diagram:', error.response ? error.response.data : error.message);
      }
      setSaveGraph(false); // Reset saveGraph after saving
    } else {
      console.error("Diagram is not present/submitted");
    }
  };

  return (
    <Box
      key={question.question_id}
      sx={{
        mb: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center", // Center items horizontally
        justifyContent: "center", // Center items vertically if needed
        width: "100%",
        paddingTop: "1.5rem",
        maxWidth: "100rem",
        margin: "0 auto",
      }}
    >
      <div style={{ width: '100%', textAlign: 'center' }}> {/* Center text inside */}
          <Button variant="outlined" color="primary" size="small" onClick={handleGenerateClick}>
            Generate
          </Button>
          {/* Conditionally render the Save button */}
          {saveGraph && (
            <Button variant="outlined" color="secondary" size="small" onClick={saveDiagram} style={{ marginLeft: '10px' }}>
              Save Diagram
            </Button>
          )}
          
        <div 
          id="mermaid-chart" 
          className="mermaid" 
          style={{ width: '100%', overflow: 'hidden', whiteSpace: 'nowrap' }}
        ></div>
    
        {mermaidError && <div style={{ color: 'red' }}>Error: {mermaidError}</div>}
      </div>
    </Box>
  );
};