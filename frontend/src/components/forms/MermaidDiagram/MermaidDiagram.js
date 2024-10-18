import React, { useState, useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import axios from 'axios';
import html2canvas from 'html2canvas';
import './styles.css';
import { Box, Button } from '@mui/material';
import { DocumentLoader } from '../DocumentLoader/DocumentLoader';
import { EnlargedImage } from './EnlargedImage';

export const MermaidDiagram = ({ diagramName, question, answers, token, apiEndpoint,language }) => {
  const [mermaidError, setMermaidError] = useState(null);
  const [saveGraph, setSaveGraph] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEnlarged, setIsEnlarged] = useState(false);
  const [chartContent, setChartContent] = useState('');

  const chartRef = useRef(null)
  const diagramPrompts = [
    `Strictly Generate a basic (no designs) executable Mermaid.js code for the 'question'.
    Output only the Mermaid.js code. Do not include any explanations, comments, or additional text. Translate to target language. Remove the word 'mermaid' in the return answer
    ---
    Return code should be execution ready for a mermaid render`
  ];;
  useEffect(() => {
    
    if (chartRef.current) {
      console.log("ChartRef", chartRef.current)
    }

    mermaid.initialize({ 
      startOnLoad: true, 
      suppressErrorRendering: true,     
      theme: 'default', // Set your preferred theme
      flowchart: {
          useMaxWidth: true,
          htmlLabels: true // Allow HTML labels for better language support
      }  });
  }, []);

  useEffect(() => {
    if (isEnlarged) {
      const mermaidChart = document.getElementById('enlarged-mermaid-chart');
      // Clear previous content
      mermaidChart.innerHTML = ''; 
      mermaidChart.innerHTML = chartContent; // Set the inner HTML to the chart
      mermaidChart.removeAttribute('data-processed');

      mermaid.run({ 
        querySelector: '#enlarged-mermaid-chart',
        suppressErrors: true,
        supressErrorHandling: true, 
        supressErrorRendering: true  
      });    }
  }, [isEnlarged]);

  const handleGenerateClick = async () => {
    // Generate the chart based on the input answer
    const currentAnswer = answers[question.question_id]?.input_answer || "";
    // Render the chart after generating it
    renderMermaid(currentAnswer);
  };
  async function processMermaidCode(code, repeat = 0) {
    if (repeat === 3) {
        return null;
    }

    if (code.toLowerCase().includes("we need more information".toLowerCase())) {
      return null
    }


    // Try to extract Mermaid code from the text
    let extracted = extractMermaidCode(code);
    if (extracted) {
        return extracted;
    }

    // If extraction fails, clean the input
    let cleaned = code.trim()
        .replace(/^```[\s\S]*?\n/, '')
        .replace(/\n```$/, '')
        .replace(/^(mermaid|plaintext)\n/, '');

    // Remove empty lines
    cleaned = cleaned.split('\n').filter(line => line.trim() !== '').join('\n');

    // List of valid Mermaid.js diagram types
    const validTypes = [
        'graph', 'flowchart', 'sequenceDiagram', 'classDiagram', 'stateDiagram',
        'erDiagram', 'journey', 'gantt', 'pie', 'requirementDiagram', 'gitGraph',
        'mindmap', 'timeline', 'quadrantChart', 'sankey', 'xy', 'block'
    ];

    // Check if the code starts with a valid diagram type
    const startsWithValidType = validTypes.some(type => 
        cleaned.toLowerCase().startsWith(type.toLowerCase())
    );

    // Check for common Mermaid.js syntax
    const hasMermaidSyntax = /(\w+)(\[.*?\]|\(.*?\))(\s*-->|\s*---)/.test(cleaned) || 
                             /subgraph\s+\w+/.test(cleaned) || 
                             /\w+>.*?:\s*.*?$/.test(cleaned);

    // If it's valid Mermaid code, ensure it starts with a diagram type
    if (startsWithValidType || hasMermaidSyntax) {
        if (!startsWithValidType) {
            cleaned = 'graph TB\n' + cleaned;
        }
        return cleaned;
    } else {
        cleaned = await handleMermaidError(cleaned, "This is an invalid MermaidJS Code, generate a mermaidJS code for this");
        return processMermaidCode(cleaned, repeat + 1);
    }
}

function extractMermaidCode(text) {
    // Try to extract Mermaid code from text description
    const mermaidBlockRegex = /```mermaid\n([\s\S]*?)\n```/;
    const match = text.match(mermaidBlockRegex);
    
    if (match) {
        return match[1].trim();
    }

    // If no mermaid block found, look for lines that look like Mermaid code
    const lines = text.split('\n');
    let mermaidLines = [];
    let inMermaidCode = false;

    for (const line of lines) {
        if (line.trim().startsWith('graph ') || inMermaidCode) {
            inMermaidCode = true;
            mermaidLines.push(line.trim());
        } else if (inMermaidCode && line.trim() === '') {
            break; // Stop at first empty line after Mermaid code
        }
    }

    if (mermaidLines.length > 0) {
        return mermaidLines.join('\n');
    }

    return null;
}
  const renderMermaid = async (currentAnswer) => {
    // Check if currentAnswer is valid
    if (!currentAnswer || currentAnswer.trim() === "") {
        return; // Exit early if there's no valid answer
    }

    let generated_chart = "";
    try {

      for (let i = 0; i < diagramPrompts.length; i++) {
        try {
          setLoading(true);
      
          const apiUrl = `${apiEndpoint}/api/`;
          const response = await axios.post(apiUrl, {
            language: language,
            text: i === 0 ? answers[question.question_id] : generated_chart, // Use previous result for second prompt
            prompt_strategy: diagramPrompts[i],
            question,
            sample_answer: generated_chart,
          }, {
            headers: { Authorization: `Bearer ${token}` }
          });
    
          // Process the Mermaid code asynchronously and await the result
          generated_chart = await processMermaidCode(response.data.generated_text, 0);
    
          if (generated_chart === null) {
            // If processMermaidCode returns null, it means it couldn't generate valid code
            throw new Error("Unable to generate valid Mermaid code after multiple attempts");
          }
    
        } catch (error) {
          generated_chart = await handleMermaidError(generated_chart, error.message)
          renderMermaid(generated_chart)

        } finally {
          setLoading(false);
        }
      }

        setChartContent(generated_chart) // Make accessible for the enlarged image

        // Clear previous content
        const mermaidChart = chartRef.current
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
        mermaid.parseError = async (error) => {
          generated_chart = await handleMermaidError(generated_chart, error.message)
          renderMermaid(generated_chart)
          setMermaidError(`Error: Unable to generate a valid diagram, please click generate again`); // Set custom error message
        };
        setSaveGraph(true);
        setMermaidError(null); // Reset error state on successful render
    } catch (error) {
        setLoading(false);
        let errorHandled = false;
        for (let attempt = 0; attempt < 3; attempt++) {
          try {
            generated_chart = await handleMermaidError(generated_chart, error.message);
            if (generated_chart) {
              errorHandled = true;
              break;
            }
          } catch (handlerError) {
          }
        }
      
        if (!errorHandled) {
          setMermaidError(`Error : Unable to generate a valid diagram after 3 attempts`);
          generated_chart = null; // Reset the chart if all attempts fail
        }
        setMermaidError(null); // Reset error state on successful render

    } finally {
      setMermaidError(null); // Reset error state on successful render

        setLoading(false); // Ensure loading state is reset in case of success or failure
    }
}
  const handleMermaidError = async (generated_chart, error_message) => {
    let corrected_chart = "";

    let gpt_input = `
    Fix the error for this chart : ${generated_chart},
    Here is the error: ${error_message}
    `
    try {
      const apiUrl = `${apiEndpoint}/api/gpt4o/`;
      const response = await axios.post(apiUrl, {
        text: gpt_input
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      corrected_chart = processMermaidCode(response.data.generated_text,0);
      return corrected_chart
    } catch (error) {
      setMermaidError(`Error in prompt: Unable to generate a valid diagram`);
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

      } catch (error) {
        console.error('Error saving diagram:', error.response ? error.response.data : error.message);
      }
      setSaveGraph(false); // Reset saveGraph after saving
    } else {
      console.error("Diagram is not present/submitted");
    }
  };

  const exportAsPNG = () => {
    console.log("Mermaid CHart", chartRef.current.querySelector('svg'))
    const svgElement = chartRef.current.querySelector('svg');
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    const scaleFactor = 10;
    
    img.onload = () => {
      canvas.width = img.width * scaleFactor;
      canvas.height = img.height * scaleFactor;

      // Fill the canvas with a white background
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = 'mermaid-diagram.png';
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
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
          <>
          <Button variant="outlined" color="secondary" size="small" onClick={saveDiagram} style={{ marginLeft: '10px' }}>
            Add to Report
          </Button>

          <Button variant="outlined" color="secondary" size="small" onClick={exportAsPNG} style={{ marginLeft: '10px' }}>
            Download Diagram
          </Button>
          
          </>

        )}
        {loading && <DocumentLoader isLoading={loading} text={"Preparing the Data"} />}

        <div id="mermaid-chart" ref={chartRef} className="mermaid" style={{ width: '100%', overflow: 'hidden', whiteSpace: 'nowrap' }} onClick={() => setIsEnlarged(true)}></div>

        {isEnlarged && <EnlargedImage onClose={() => setIsEnlarged(false)} />}
        {mermaidError && <div style={{ color: 'red' }}>Error: {mermaidError}</div>}
      </div>
    </Box>
  );
};