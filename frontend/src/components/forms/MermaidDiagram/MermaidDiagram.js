
import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import mermaid from 'mermaid';
import axios from 'axios';
import html2canvas from 'html2canvas';
import './styles.css';
import { Box, Button, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { DocumentLoader } from '../DocumentLoader/DocumentLoader';
import { EnlargedImage } from './EnlargedImage';
import { aws_prompt } from '../../drawio/prompt/aws_prompt';
import { basic_prompt } from '../../drawio/prompt/basic_prompt';

export const MermaidDiagram = ({ version, isReportPage, question, answers, token, apiEndpoint, requireGPT, language }) => {
  const [saveGraph, setSaveGraph] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEnlarged, setIsEnlarged] = useState(false);
  const [chartContent, setChartContent] = useState('');
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const [cacheMermaid, setCacheMermaid] = useState("");
  const [lastValidChart, setLastValidChart] = useState("");
  const [lastInputText, setLastInputText] = useState("");
  const [showConfirmReset, setShowConfirmReset] = useState(false);
  const [lastInputHadError, setLastInputHadError] = useState(false);
  const chartRef = useRef(null);
  const location = useLocation();
  // initial render 
  useEffect(() => {
    mermaid.registerIconPacks([
      {
        name: 'logos',
        loader: () => import('@iconify-json/logos').then((module) => module.icons),
      },
    ]);
    mermaid.initialize({
      startOnLoad: true,
      suppressErrorRendering: true,
      theme: 'default',
      flowchart: { useMaxWidth: true, htmlLabels: true },
      deterministicIds: true,
      deterministicRandomSeed: 'diagram-seed-2025'
    });
  }, []);
  // Helper: show error popup and set error message
  const triggerError = (msg) => {
    setError(msg);
    setShowError(true);
  };

  useEffect(() => {
    setSaveGraph(false);
    setLoading(false);
    setIsEnlarged(false);
    setChartContent('');
    setError("");
    setCacheMermaid('');
    setLastValidChart('');
    setLastInputText('');
    if (chartRef.current) chartRef.current.innerHTML = "";
  }, [version, location.pathname]);
  // Removed useEffect for enlarged image overlay, since overlay now uses dangerouslySetInnerHTML and does not need direct DOM manipulation.
  // Main handler to generate or update diagram
  const prepareAndRenderMermaid = async (isNewDiagram) => {
    const currentAnswer = isReportPage ? answers[question.question_id]?.input_answer : answers;
    setError("");
    if (chartRef.current) chartRef.current.innerHTML = "";
    // If input is the same as previous, just render the previous diagram and do not generate or add a new one
    if (currentAnswer && currentAnswer.trim() === lastInputText?.trim()) {
      // Only block duplicate input if last input was successful (not after a failed attempt)
      if (lastValidChart && !lastInputHadError) {
        triggerError("Error: The description is the same as the previous one. Please modify your input to generate a new diagram.");
        chartRef.current.innerHTML = lastValidChart;
        chartRef.current.removeAttribute('data-processed');
        await mermaid.run({ querySelector: '#mermaid-chart', suppressErrors: true });
        return;
      }
      // If last input had error, allow retry
    }
    const result = await renderMermaid(currentAnswer, isNewDiagram);
    setLastInputText(currentAnswer ? currentAnswer.trim() : "");
    setLastInputHadError(result === false);
  };
  const handleGenerateClick = () => prepareAndRenderMermaid(true);
  const handleNewDiagramClick = () => setShowConfirmReset(true);
  const handleConfirmReset = () => {
    setShowConfirmReset(false);
    setSaveGraph(false);
    setChartContent('');
    setError("");
    setCacheMermaid('');
    setLastValidChart('');
    setLastInputText('');
    if (chartRef.current) chartRef.current.innerHTML = "";
  };
  const handleCancelReset = () => setShowConfirmReset(false);
  const handleUpdateClick = () => prepareAndRenderMermaid(false);
  // Extract and clean Mermaid code from text
  const processMermaidCode = async (code) => {
    if (!code || code.toLowerCase().includes("we need more information")) return null;
    let extracted = extractMermaidCode(code);
    if (extracted) return extracted;
    let cleaned = code.trim()
      .replace(/^```[\s\S]*?\n/, '')
      .replace(/\n```$/, '')
      .replace(/^(mermaid|plaintext)\n/, '')
      .split('\n').filter(line => line.trim() !== '').join('\n');
    const validTypes = [
      'graph', 'flowchart', 'sequenceDiagram', 'classDiagram', 'stateDiagram',
      'erDiagram', 'journey', 'gantt', 'pie', 'requirementDiagram', 'gitGraph',
      'mindmap', 'timeline', 'quadrantChart', 'sankey', 'xy', 'block'
    ];
    const startsWithValidType = validTypes.some(type => cleaned.toLowerCase().startsWith(type.toLowerCase()));
    const hasMermaidSyntax = /(\w+)(\[.*?\]|\(.*?\))(\s*-->|\s*---)/.test(cleaned) ||
      /subgraph\s+\w+/.test(cleaned) ||
      /\w+>.*?:\s*.*?$/.test(cleaned);
    if (startsWithValidType || hasMermaidSyntax) {
      if (!startsWithValidType) cleaned = 'graph TB\n' + cleaned;
      return cleaned;
    }
    return null;
  };
  // Extract Mermaid code block from text
  function extractMermaidCode(text) {
    const mermaidBlockRegex = /```mermaid\n([\s\S]*?)\n```/;
    const match = text.match(mermaidBlockRegex);
    if (match) return match[1].trim();
    const lines = text.split('\n');
    let mermaidLines = [], inMermaidCode = false;
    for (const line of lines) {
      if (line.trim().startsWith('graph ') || inMermaidCode) {
        inMermaidCode = true;
        mermaidLines.push(line.trim());
      } else if (inMermaidCode && line.trim() === '') break;
    }
    return mermaidLines.length > 0 ? mermaidLines.join('\n') : null;
  }
  // Add version-specific prompt
  function generateExtendedPrompt(prompt) {
    return (version === "aws" ? aws_prompt : basic_prompt) + prompt;
  }
  // Add follow-up prompt if cache exists
  function generateFollowUpPrompt(prompt) {
    return cacheMermaid
      ? `${cacheMermaid} - Improve this according to this: ${prompt} - Return only the mermaidjs code remove any markups. - If prompt not related, then create a new diagram accordingly`
      : prompt;
  }
  // Main render logic for Mermaid diagram
  const renderMermaid = async (currentAnswer, isNew, isRetry = false) => {
    if (!currentAnswer || currentAnswer.trim() === "") {
      triggerError("Error: not able to generate the diagram from the given description. Please improve the description");
      return false;
    }
    let mermaidChart = chartRef.current;
    let generated_chart = isReportPage ? "" : currentAnswer;
    // Only setSaveGraph(false) if there is truly no valid diagram
    if (!lastValidChart) setSaveGraph(false);
    try {
      mermaidChart.innerHTML = '';
      let generated_chart_candidate = null;
      if (requireGPT) {
        setLoading(true);
        const apiUrl = `${apiEndpoint}/api/gpt-omini/`;
        const mermaidPrompt = isNew ? currentAnswer : generateFollowUpPrompt(currentAnswer);
        const finalPrompt = generateExtendedPrompt(mermaidPrompt);
        const response = await axios.post(apiUrl, {
          text: finalPrompt,
          language: { language: language ?? "english" }
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        generated_chart_candidate = await processMermaidCode(response.data.generated_text);
      } else {
        generated_chart_candidate = currentAnswer;
      }
      let mermaidError = null;
      let renderFailed = false;
      mermaid.parseError = (error) => {
        mermaidError = error.message;
        renderFailed = true;
      };
      mermaidChart.innerHTML = generated_chart_candidate;
      mermaidChart.removeAttribute('data-processed');
      await mermaid.run({ querySelector: '#mermaid-chart', suppressErrors: true });
      if (renderFailed || !mermaidChart.querySelector('svg[id^="mermaid-"]')) {
        throw new Error(mermaidError || "Failed to generate Mermaid diagram");
      }
      setCacheMermaid(generated_chart_candidate);
      setChartContent(generated_chart_candidate);
      setLastValidChart(generated_chart_candidate);
      setSaveGraph(true);
      return true;
    } catch (error) {
      // Custom error message for error responses
      triggerError("Error: Please re evaluate the description that you have written");
      // Restore previous valid diagram
      if (lastValidChart && chartRef.current) {
        chartRef.current.innerHTML = lastValidChart;
        chartRef.current.removeAttribute('data-processed');
        await mermaid.run({ querySelector: '#mermaid-chart', suppressErrors: true });
      }
      // Do not setSaveGraph(false) on error; keep options available
      if (!isReportPage) return false;
      if (!isRetry) {
        let count = 0;
        let corrected_chart = await handleMermaidError(generated_chart, error.message);
        while (count < 3) {
          corrected_chart = await handleMermaidError(generated_chart, error.message);
          if (corrected_chart) {
            await renderMermaid(corrected_chart, true);
            return true;
          }
          count++;
        }
      }
      return false;
    } finally {
      setLoading(false);
    }
  };
  // Try to fix Mermaid errors using GPT
  const handleMermaidError = async (generated_chart, error_message) => {
    setLoading(true);
    triggerError("This is quite challenging, let me try again");
    if (!generated_chart) return;
    for (let i = 0; i < 3; i++) {
      const gpt_output = await gptErrorHandling(generated_chart, error_message);
      const cleaned_chart = await processMermaidCode(gpt_output);
      if (cleaned_chart) {
        try {
          const mermaidChart = chartRef.current;
          mermaidChart.innerHTML = generated_chart;
          mermaidChart.removeAttribute('data-processed');
          await mermaid.run({ querySelector: '#mermaid-chart', suppressErrors: true });
          return cleaned_chart;
        } catch (error) {
          console.error("Not a valid diagram");
        }
      }
    }
    return null;
  };
  // Call GPT to fix Mermaid error
  const gptErrorHandling = async (generated_chart, error_message) => {
    const gpt_input = `Fix the error for this chart : ${generated_chart}, Here is the error: ${error_message}`;
    try {
      const apiUrl = `${apiEndpoint}/api/gpt-omini/`;
      const response = await axios.post(apiUrl, {
        text: gpt_input,
        language: { language: language ?? "english" }
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data.generated_text;
    } catch (error) {
      console.error(`Error in prompt: Unable to generate a valid diagram`);
    }
  };
  // Save diagram as PNG via API
  const saveDiagram = async () => {
    if (!saveGraph) {
      triggerError("Diagram is not present/submitted");
      return;
    }
    try {
      const node = document.getElementById('mermaid-chart');
      const canvas = await html2canvas(node);
      const dataUrl = canvas.toDataURL('image/png');
      await axios.post(
        `${apiEndpoint}/api/save-diagram/`,
        { diagram: dataUrl },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error('Error saving diagram:', error.response ? error.response.data : error.message);
      triggerError("Error Saving Diagram");
    }
    setSaveGraph(false);
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
      <div>
        {!loading && (
          <>
            {!saveGraph ? (
              <Button
                variant="contained"
                color="primary"
                size="medium"
                onClick={handleGenerateClick}
                sx={{ minWidth: 140, fontWeight: 600, borderRadius: 2 }}
              >
                Generate
              </Button>
            ) : (
              <>
                <Button
                  variant="outlined"
                  color="warning"
                  size="medium"
                  onClick={handleNewDiagramClick}
                  sx={{ minWidth: 140, fontWeight: 600, borderRadius: 2 }}
                >
                  New Diagram
                </Button>
                {isReportPage && (
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="medium"
                    onClick={saveDiagram}
                    sx={{ minWidth: 140, fontWeight: 600, borderRadius: 2 }}
                  >
                    Add to Report
                  </Button>
                )}
                <Button
                  variant="contained"
                  color="primary"
                  size="medium"
                  onClick={handleUpdateClick}
                  sx={{ minWidth: 140, fontWeight: 600, borderRadius: 2 }}
                >
                  Update Diagram
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  size="medium"
                  onClick={exportAsPNG}
                  sx={{ minWidth: 180, fontWeight: 600, borderRadius: 2 }}
                >
                  Download PNG Diagram
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  size="medium"
                  onClick={exportAsSVG}
                  sx={{ minWidth: 180, fontWeight: 600, borderRadius: 2 }}
                >
                  Download SVG Diagram
                </Button>
              </>
            )}
          </>
        )}

        {loading && <DocumentLoader isLoading={loading} text={"Preparing the Data"} />}

        <div id="mermaid-chart" ref={chartRef} className="mermaid" style={{ width: '100%', overflow: 'hidden', whiteSpace: 'nowrap' }} onClick={() => setIsEnlarged(true)}></div>
        {isEnlarged && <EnlargedImage chart={chartRef.current ? chartRef.current.innerHTML : ''} onClose={() => setIsEnlarged(false)} />}

        <Dialog open={showConfirmReset} onClose={handleCancelReset}>
          <DialogTitle>Start New Diagram?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              If you continue, your current diagram and input will be cleared. <br />
              <b>Your previous work will not be saved.</b> Please save it locally if you require it before proceeding.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelReset} color="primary">Cancel</Button>
            <Button onClick={handleConfirmReset} color="warning" autoFocus>Continue</Button>
          </DialogActions>
        </Dialog>

        <Snackbar open={!!error && showError} autoHideDuration={5000} onClose={() => setShowError(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert onClose={() => setShowError(false)} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      </div>
    </Box>
  );
};
