import { useState, useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import axios from 'axios';
import html2canvas from 'html2canvas';
import './styles.css';
import { Box, Button } from '@mui/material';
import { DocumentLoader } from '../DocumentLoader/DocumentLoader';
import { EnlargedImage } from './EnlargedImage';
import { aws_prompt } from '../../drawio/prompt/aws_prompt';
import { basic_prompt } from '../../drawio/prompt/basic_prompt';

export const MermaidDiagram = ({ version, isReportPage, question, answers, token, apiEndpoint, requireGPT, language }) => {
  const [saveGraph, setSaveGraph] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEnlarged, setIsEnlarged] = useState(false);
  const [chartContent, setChartContent] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [cacheMermaid, setCacheMermaid] = useState("");
  const chartRef = useRef(null)
  // initial render 
  useEffect(() => {
    mermaid.registerIconPacks([
      {
        name: 'logos',
        loader: () =>
          fetch('./icons.json').then((res) => res.json()),
      },
    ]);
    // Render mermaid
    mermaid.initialize({
      startOnLoad: true,
      suppressErrorRendering: true,
      theme: 'default',
      flowchart: {
        useMaxWidth: true,
        htmlLabels: true
      }
    });
  }, []);
  async function fetchAndCheckJSON(url) {
    try {
      const response = await fetch(url);

      // 1. Check response status
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // 2. Check Content-Type header
      const contentType = response.headers.get("content-type");
      console.log("Content Type:", contentType)
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("File is not JSON!");
      }

      // 3. Parse JSON
      const data = await response.json();

      // 4. Optional: Check for expected keys
      if (!data.expectedKey) {
        throw new Error("JSON structure is not as expected!");
      }

      // Success
      console.log("Successfully fetched and validated JSON:", data);
      return data;
    } catch (error) {
      console.error("Error fetching or validating JSON:", error.message);
      return null;
    }
  }

  useEffect(() => {
    // Reset all state to initial values
      setSaveGraph(false);
      setLoading(false);
      setIsEnlarged(false);
      setChartContent('');
      setErrorMessage(null);
      setCacheMermaid('');
    // Clear the chart when version changes
    if (chartRef.current) {
      chartRef.current.innerHTML = "";
    }
  }, [version]);
  useEffect(() => {
    if (isEnlarged) {
      const mermaidChart = document.getElementById('enlarged-mermaid-chart');
      mermaidChart.innerHTML = '';
      mermaidChart.innerHTML = chartContent;
      mermaidChart.removeAttribute('data-processed');

      mermaid.run({
        querySelector: '#enlarged-mermaid-chart',
        suppressErrors: true,
        supressErrorHandling: true,
        supressErrorRendering: true
      });
    }
  }, [isEnlarged]);
  const prepareAndRenderMermaid = async (isNewDiagram) => {
    const url = "./sample.json"
    fetchAndCheckJSON(url)
    // Generate the chart based on the input answer
    const currentAnswer = isReportPage ? answers[question.question_id]?.input_answer : answers;
    // Render the chart after generating it
    setErrorMessage(null)
    if (chartRef) {
      chartRef.current.innerHTML = ""
    }
    renderMermaid(currentAnswer, isNewDiagram);
  };
  const handleGenerateClick = async () => {
    await prepareAndRenderMermaid(true)
  };
  const handleUpdateClick = async () => {
    await prepareAndRenderMermaid(false)
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
  function generateExtendedPrompt(prompt){
    if (version === "aws"){
      return aws_prompt + prompt
    } else {
      return basic_prompt + prompt
    }
  }
  function generateFollowUpPrompt(prompt) {
    // If cache is present -> prompt = Reference Diagram #previousdiagram + Prompt
    // Add a prompt that will allow to add specific prompt if it to the mermaid version
    if (cacheMermaid) {
      return `${cacheMermaid} - 
      Improve this according to this: ${prompt}
      - Return only the mermaidjs code remove any markups.
      - If prompt not related, then create a new diagram accordingly`
    } else {
      return prompt
    } 
  }
  const renderMermaid = async (currentAnswer, isNew, isRetry = false) => {
    if (!currentAnswer || currentAnswer.trim() == "") {
      setErrorMessage("No valid answer provided");
      return;
    }
    let mermaidChart = chartRef.current
    let generated_chart = isReportPage ? "" : currentAnswer;
    setSaveGraph(false)
    try {
      mermaidChart.innerHTML = ''
      if (requireGPT) {
        try {
          setLoading(true);
          const apiUrl = `${apiEndpoint}/api/gpt-omini/`;
          // If new prompt, takes the current answer 
          // If old prompt, function builds from old prompt
          const mermaidPrompt = isNew ? currentAnswer : generateFollowUpPrompt(currentAnswer)
          // According to version, extra prompt is injected
          // Current Versions: Basic, AWS
          const finalPrompt = generateExtendedPrompt(mermaidPrompt)
          console.log("Final Prompt", finalPrompt)
          const response = await axios.post(apiUrl, {
            text: finalPrompt,
            language: {language: language ?? "english"}
          }, {
            headers: { Authorization: `Bearer ${token}` }
          });

          generated_chart = await processMermaidCode(response.data.generated_text);
          console.log("Generated Chart", generated_chart)
          setCacheMermaid(generated_chart)
          setChartContent(generated_chart)
        } catch (error) {
          setErrorMessage("That was challenging. Maybe make it more simple.")
          throw error;
        }
      } else {
        generated_chart = currentAnswer
        setChartContent(currentAnswer)
      }

      let mermaidError = null;

      mermaid.parseError = (error) => {
        mermaidError = error.message;
        setErrorMessage("Please retry again.")
      };


      mermaidChart.innerHTML = generated_chart;
      mermaidChart.removeAttribute('data-processed');

      await mermaid.run({
        querySelector: '#mermaid-chart',
        suppressErrors: true,
      });

      if (mermaidChart.querySelector('svg[id^="mermaid-"]')) {
        setErrorMessage('')
      } else {
        if (mermaidError) {
          throw new Error(mermaidError);
        } else {
          throw new Error("Failed to generate Mermaid diagram");
        }
      }

      setSaveGraph(true)
    } catch (error) {
      setErrorMessage("Seems like I don't know how to do that yet. You can try rephrasing it or just click generate  again.");
      setSaveGraph(false);

      if (!isReportPage) {
        return
      }

      if (!isRetry) {
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
      }
    } finally {
      setLoading(false);
    }

  }
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
      if (cleaned_chart) {

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
          console.error("Not a a valid diagram")
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
      const apiUrl = `${apiEndpoint}/api/gpt-omini/`;
      const response = await axios.post(apiUrl, {
        text: gpt_input,
        language: {language: language ?? "english"}
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data.generated_text
    } catch (error) {
      console.error(`Error in prompt: Unable to generate a valid diagram`);
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
          { diagram: dataUrl },
          { headers: { Authorization: `Bearer ${token}` } }
        );

      } catch (error) {
        console.error('Error saving diagram:', error.response ? error.response.data : error.message);
        setErrorMessage("Error Saving Diagram")
      }
      setSaveGraph(false); // Reset saveGraph after saving
    } else {
      console.error("Diagram is not present/submitted");
      setErrorMessage("Diagram is not present/submittet")
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
  const exportAsSVG = () => {
    const svgElement = chartRef.current.querySelector("svg");
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const blob = new Blob([svgData], { type: "image/svg+xml" });
    const downloadLink = document.createElement("a");
    downloadLink.download = "cloudaisecurity-architecturaldiagram.svg";
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.click();
  };
  return (

    <Box
      key={isReportPage ? question.question_id : "diagramPage"}
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
                {isReportPage &&
                  (
                    <Button
                      variant="outlined"
                      color="secondary"
                      size="small"
                      onClick={saveDiagram}
                      style={{ marginLeft: '10px' }}
                    >
                      Add to Report
                    </Button>
                  )}

                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  style={{ marginLeft: '10px' }}
                  onClick={handleUpdateClick}
                >
                  Update Diagram
                </Button>

                <Button
                  variant="outlined"
                  color="secondary"
                  size="small"
                  onClick={exportAsPNG}
                  style={{ marginLeft: '10px' }}
                >
                  Download PNG Diagram
                </Button>

                <Button
                  variant="outlined"
                  color="secondary"
                  size="small"
                  onClick={exportAsSVG}
                  style={{ marginLeft: '10px' }}
                >
                  Download SVG Diagram
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
