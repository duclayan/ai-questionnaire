import React, { useState, useEffect } from 'react';
import mermaid from 'mermaid';
import axios from 'axios';
import html2canvas from 'html2canvas';
import './styles.css';
import { Box, Button } from '@mui/material';
import { DocumentLoader } from '../DocumentLoader/DocumentLoader';

export const MermaidDiagram = ({ diagramName, question, answers, token, apiEndpoint,language }) => {
  const [mermaidError, setMermaidError] = useState(null);
  const [saveGraph, setSaveGraph] = useState(false);
  const [loading, setLoading] = useState(false);

  const sampleAnswer = ``;
  const diagramPrompt = `Generate the executable Mermaid.js code for the 'question'.
Output only the Mermaid.js code. Do not include any explanations, comments, or additional text. Translate to target language. Remove the word 'mermaid' in the return answer`;
  useEffect(() => {
    mermaid.initialize({ 
      startOnLoad: true, 
      suppressErrorRendering: true,     
      theme: 'default', // Set your preferred theme
      flowchart: {
          useMaxWidth: true,
          htmlLabels: true // Allow HTML labels for better language support
      }  });
  }, []);


  const handleGenerateClick = async () => {
    // Generate the chart based on the input answer
    const currentAnswer = answers[question.question_id]?.input_answer || "";
    // Render the chart after generating it
    renderMermaid(currentAnswer);
  };

  const renderMermaid = async (currentAnswer) => {
    // Check if currentAnswer is valid
    if (!currentAnswer || currentAnswer.trim() === "") {
        return; // Exit early if there's no valid answer
    }

    let generated_chart = "";
    const test_samples = true;
    try {
        if (test_samples) {
            setLoading(true);
            
            // Log the full API URL for debugging
            const apiUrl = `${apiEndpoint}/api/`;

            const response = await axios.post(apiUrl, {
                language: language,
                text: answers[question.question_id],
                prompt_strategy: diagramPrompt,
                question,
                sample_answer: sampleAnswer,
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            generated_chart = response.data.generated_text;
        } else {
            generated_chart = currentAnswer;
        }

        const mermaidChart = document.getElementById('mermaid-chart');
        // Clear previous content
        mermaidChart.innerHTML = ''; 
        mermaidChart.innerHTML = generated_chart; // Set the inner HTML to the chart
        mermaidChart.removeAttribute('data-processed');

        mermaid.run({ 
          querySelector: '#mermaid-chart',
          suppressErrors: true,
          supressErrorHandling: true, 
          supressErrorRendering: true  
        });

        // Override parseError to handle errors
        mermaid.parseError = (error) => {
          // console.error('Mermaid parsing error:', error);
          setMermaidError(`Error: Unable to generate a valid diagram

We encountered an issue while processing your input. This could be due to one of the following reasons:

1. Insufficient or unclear information provided
2. Complex or ambiguous relationships in the data
3. Formatting inconsistencies in the input

To resolve this issue, please try the following:

1. Review your input and ensure all necessary details are included
2. Simplify complex relationships or break them down into smaller parts
3. Double-check the formatting and structure of your input
4. Provide more specific or concrete examples if possible
5. If using technical terms, ensure they are clearly defined
6. Generate the same text again ;)

If the problem persists after making these adjustments, consider rephrasing your request or breaking it down into smaller, more manageable parts.

For additional assistance, please consult our documentation or reach out to our support team.`); // Set custom error message
    };
        setSaveGraph(true);
        setMermaidError(null); // Reset error state on successful render
    } catch (error) {
        setLoading(false);
 
        // Log detailed error information for debugging
        console.error('Mermaid rendering error:', error.message);
        setMermaidError(null); // Reset error state on successful render

    } finally {
      setMermaidError(null); // Reset error state on successful render

        setLoading(false); // Ensure loading state is reset in case of success or failure
    }
}

  const saveDiagram = async () => {
    if (saveGraph) {
      try {
        // Convert the rendered Mermaid diagram to a PNG image 
        const node = document.getElementById('mermaid-chart');
        const canvas = await html2canvas(node);
        const dataUrl = canvas.toDataURL('image/png');

        // API call to save the diagram
        await axios.post(
          `${apiEndpoint}/api/save-diagram/`,
          { diagram: dataUrl, diagramName },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log('Diagram saved successfully.');
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
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        paddingTop: "1.5rem",
        maxWidth: "100rem",
        margin: "0 auto",
      }}
    >
      <div style={{ width: '100%', textAlign: 'center' }}>
        <Button variant="outlined" color="primary" size="small" onClick={handleGenerateClick}>
          Generate
        </Button>
        {saveGraph && (
          <Button variant="outlined" color="secondary" size="small" onClick={saveDiagram} style={{ marginLeft: '10px' }}>
            Save Diagram
          </Button>
        )}
        {loading && <DocumentLoader isLoading={loading} text={"Preparing the Data"} />}

        <div id="mermaid-chart" className="mermaid" style={{ width: '100%', overflow: 'hidden', whiteSpace: 'nowrap' }}></div>

        {mermaidError && <div style={{ color: 'red' }}>Error: {mermaidError}</div>}
      </div>
    </Box>
  );
};