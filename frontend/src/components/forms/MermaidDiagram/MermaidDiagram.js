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
  const [repeatCount, setRepeatCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);
  const [repeat, setRepeat] = useState(true);
  const chartRef = useRef(null)
  const diagramPrompts = [
    `Strictly Generate a basic (no designs) executable Mermaid.js code for the 'question'.
    Output only the Mermaid.js code. Do not include any explanations, comments, or additional text. Translate to target language. Remove the word 'mermaid' in the return answer
    ---
    Return code should be execution ready for a mermaid render`
  ];;
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
      });
    }
  }, [isEnlarged]);
  const handleGenerateClick = async () => {
    // Generate the chart based on the input answer
    const currentAnswer = answers[question.question_id]?.input_answer || "";
    // Render the chart after generating it
    setErrorMessage(null)
    if(chartRef) {
      chartRef.current.innerHTML = ""
    }
    setRepeat(true)
    renderMermaid(currentAnswer);
  };
  async function processMermaidCode(code) {

    if (!code || code.toLowerCase().includes("we need more information".toLowerCase())) {
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
        return null
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

  const renderMermaid = async (currentAnswer, isRetry = false) => {
    // Check if currentAnswer is valid
    if (!currentAnswer || currentAnswer.trim() === "") {
      setErrorMessage("No valid answer provided");
      return;
    }
    let mermaidChart = chartRef.current
    let generated_chart = "";
    setSaveGraph(false)
    try {
      mermaidChart.innerHTML = ''
      for (let i = 0; i < diagramPrompts.length; i++) {
        try {
          setLoading(true);
          
          const apiUrl = `${apiEndpoint}/api/`;
          const response = await axios.post(apiUrl, {
            language: language,
            text: i === 0 ? answers[question.question_id] : generated_chart,
            prompt_strategy: diagramPrompts[i],
            question,
            sample_answer: generated_chart,
          }, {
            headers: { Authorization: `Bearer ${token}` }
          });     
          
          generated_chart = await processMermaidCode(response.data.generated_text);      
        } catch (error) {
          console.log("Diagram Prompts Error:", error);
          throw error;
        } 
      }
    
      setChartContent(generated_chart);
    
      let mermaidError = null;
    
      mermaid.parseError = (error) => {
        mermaidError = error.message;
        console.error("Mermaid parse error:", mermaidError);
      };
    
      
      mermaidChart.innerHTML = generated_chart;
      mermaidChart.removeAttribute('data-processed');
      
      await mermaid.run({
        querySelector: '#mermaid-chart',
        suppressErrors: true,
      });
    
      if (mermaidChart.querySelector('svg[id^="mermaid-"]')) {
        setErrorMessage('')
        console.log("SVG generated by Mermaid.js");
      } else {
        if (mermaidError) {
          throw new Error(mermaidError);
        } else {
          throw new Error("Failed to generate Mermaid diagram");
        }
      }

      setSaveGraph(true)
    } catch (error) {
      console.log("Catching Error", isRetry);
      setErrorMessage("Seems like I don't know how to do that yet. You can try rephrasing it or just click generate  again.");
      setSaveGraph(false);
    
      if (!isRetry) {
        try {
          let count = 0
          let corrected_chart = await handleMermaidError(generated_chart, error.message);
          while (count < 3) {
            corrected_chart = await handleMermaidError(generated_chart, error.message);
            if (corrected_chart) {
              await renderMermaid(corrected_chart, true);
              return
            }    
            count++
          }

        } catch (retryError) {
          setErrorMessage("Failed to generate diagram after retry.");
          setSaveGraph(false);
        }
      }
    } finally {
      setLoading(false);
      setRepeatCount(0);
    }
  };
  
  const handleMermaidError = async (generated_chart, error_message) => {
    setLoading(true)
    setErrorMessage("This is quite challenging, let me try again");
    let repeat_counter = 0;
    let gpt_output = ``;
    let cleaned_chart = null;

    if (!generated_chart) {
      return
    }
    while (repeat_counter < 3) {
      gpt_output = await gptErrorHandling(generated_chart, error_message);
      cleaned_chart = await processMermaidCode(gpt_output);
      console.log("Handle Mermaid Error", cleaned_chart);
      if (cleaned_chart){

        try {
          const mermaidChart = chartRef.current;
          mermaidChart.innerHTML = generated_chart;
          mermaidChart.removeAttribute('data-processed');
          
          await mermaid.run({
            querySelector: '#mermaid-chart',
            suppressErrors: true,
          });
  
          return cleaned_chart; 
        } catch (error) {
          console.log("Not a mermaid")
        }
      }
      repeat_counter++;
    }
    return null;
  };

  const gptErrorHandling = async (generated_chart, error_message) => {
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
      return response.data.generated_text
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
      downloadLink.download = 'cloudaisecurity-architecturaldiagram.png';
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
        {!loading && (
          <>
            <Button 
              variant="outlined" 
              color="primary" 
              size="small" 
              onClick={handleGenerateClick}
            >
              Generate
            </Button>
            
            {saveGraph && (

                <>
                  <Button 
                    variant="outlined" 
                    color="secondary" 
                    size="small" 
                    onClick={saveDiagram} 
                    style={{ marginLeft: '10px' }}
                  >
                    Add to Report
                  </Button>

                  <Button 
                    variant="outlined" 
                    color="secondary" 
                    size="small" 
                    onClick={exportAsPNG} 
                    style={{ marginLeft: '10px' }}
                  >
                    Download Diagram
                  </Button>
                </>
            )}
          </>
        )}
       
        {loading && <DocumentLoader isLoading={loading} text={"Preparing the Data"} />}


        <div id="mermaid-chart" ref={chartRef} className="mermaid" style={{ width: '100%', overflow: 'hidden', whiteSpace: 'nowrap' }} onClick={() => setIsEnlarged(true)}></div>

        {isEnlarged && <EnlargedImage onClose={() => setIsEnlarged(false)} />}

        {errorMessage && <div style={{ color: 'black' }}>{errorMessage}</div>}
      </div>
    </Box>
  );
};
