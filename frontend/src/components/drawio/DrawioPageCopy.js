// This is the testing page wherein we try stuff
// Current: I tried to render mermaidjs file svg and turn it to XML Code
// This was actually working but only for flow diagrams
// In the future, maybe we can focus on more components and be able to cater more types of diagrams!
// But for now, we know that it works.
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  Select,
  MenuItem,
} from "@mui/material";
import mermaid from 'mermaid';
import { CircularProgress } from "@mui/material";
import { DocumentLoader } from "../forms/DocumentLoader/DocumentLoader";
import { default_xml, default_azure } from "./xmlSampleData";
import { saveAs } from 'file-saver';
import SvgToDrawio, { ConvertSvgToDrawIoXml } from "./ConvertSVGtoXML";
export const DrawioPageTest = () => {

  const [prompt, setPrompt] = useState("");
  const [editorOpen, setEditorOpen] = useState(false);
  const [editorLoading, setEditorLoading] = useState(true);
  const [drawioXml, setDrawioXml] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [drawioError, setDrawioError] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const drawioIframeRef = useRef(null);
  const token = localStorage.getItem("token");
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
  const [selectedSample, setSelectedSample] = useState('');

  const samples = {
    sample1: "Create a GenAI chatbot architecture diagram with react.js as the frontend, python FastAPI and the backend, use typical aws resources for web app, database, storage, monitoring, include security components like iam, firewall, gateway, monitoring, security groups, amazon bedrock as the NLP and claude as the LLM. All components inside the AWS, only the user is outside of the cloud.",
    sample2: "Create an echarging management system architecture diagram with angular.js as the frontend, javaspring frame work as the backend, java Eureka for service exploration, postgressql database, with typical AWS resources. Consider typical security components such as iam, firewall, gateway, monitoring. All components inside the AWS cloud, only the user is outside of the cloud."
  };

  const mermaidDiagram = `
    flowchart TD
        A[Christmas] -->|Get money| B(Go shopping)
        B --> C{Let me think}
        C -->|One| D[Laptop]
        C -->|Two| E[iPhone]
        C -->|Three| F[fa:fa-car Car]

      `

  const encodedMermaid = encodeURIComponent(mermaidDiagram)
  const handleSampleChange = (event) => {
    const selected = event.target.value;
    setSelectedSample(selected);
    if (selected === 'sample1') {
      setPrompt(samples.sample1);
    } else if (selected === 'sample2') {
      setPrompt(samples.sample2);
    }
  };

  // Handle Mermaid Code
  async function mermaidToSvg(mermaidCode) {
    mermaid.initialize({ startOnLoad: false });
    const { svg } = await mermaid.render('mermaid-diagram', mermaidCode);
    return svg;
  }

  // Initialize Draw.io editor when it loads
  async function handleDrawioLoad() {
    setEditorLoading(false); // 1 minute timeout
    const svgFile = await mermaidToSvg(mermaidDiagram);

    // Properly encode the SVG content for inclusion in the XML
    const encodedSvg = btoa(encodeURIComponent(svgFile));

    const xml = SvgToDrawio(svgFile)
    try {
      const iframe = drawioIframeRef.current;

      if (iframe) {

        setTimeout(() => {
          iframe.contentWindow.postMessage(
            JSON.stringify({
              action: 'load',
              xml: xml
            }
            ),
            "*"
          );
        }, 1000);


        // Error handling
        window.addEventListener('message', event => {
          if (event.data?.event === 'error') {
            setEditorOpen(false)
            setDrawioError(true)
            throw new Error('Draw.io error');
          }
        });
      }
    } catch (error) {
      setEditorOpen(false);
      console.log("error:", error)
      alert('Unable to handle information');
    }
  };

  // Handle messages from Draw.io V2
  useEffect(() => {
    const handleMessage = (event) => {
      if (typeof event.data === "string") {
        try {
          const msg = JSON.parse(event.data);
          console.log("DrawIO Message:", msg)
          if (msg.event === "save" || msg.event === "exit") {
            if (msg.xml) {
              setDrawioXml(msg.xml);
              const blob = new Blob([msg.xml], { type: "application/xml;charset=utf-8" });
              saveAs(blob, "diagram.drawio")
              setIsSaved(true)
            }
          }
        } catch (e) {
          console.error("Error parsing Draw.io message:", e);
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // Handle messages from Draw.io V2
  useEffect(() => {
    if (isSaved) {
      setEditorOpen(false)
    }
  }, [isSaved]);

  const generateXML = async (code) => {
    // This generates the XML Code from the given code
    const prompt = `With max 500 lines create a simple representation of this. Always start and end with the mxGraphModel Tag. Generate XML Code readable by DrawIO. Strictly return only the code content without any code block formatting.`;
    // // Version : Test with default XML
    // setDrawioXml(default_azure)
    // Version : Generate XML code from the user input
    try {
      const apiUrl = `${apiEndpoint}/api/gpt-omini/`;
      const response = await axios.post(
        apiUrl,
        {
          text: `${prompt}. Sample return code : ${default_xml} . This is the code to convert: ${code}`,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const data = response.data.generated_text;
      setDrawioXml(data);
      setIsLoading(false)
      return response.data.generated_text;
    } catch (error) {
    }
  };

  const generateDiagram = async () => {
    try {
      // Once the editor is open, it will call the rendering of the DrawIO
      setEditorOpen(true);

    } catch (error) {
      console.error("Error:", error);
      // **WRITE A CODE HERE TO ADDRESS THE ERROR**
      setEditorOpen(false);
      setDrawioError(true);
    }
  };
  useEffect(() => {
    if (drawioXml) {
      setEditorOpen(true);
      setIsLoading(false);
    }
  }, [drawioXml]);

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4"> Diagram Generator</Typography>
        <Box my={2}>

          <Select
            value={selectedSample}
            onChange={handleSampleChange}
            displayEmpty
            fullWidth
            sx={{ mb: 2 }}
          >
            <MenuItem value="" disabled>Select a sample</MenuItem>
            <MenuItem value="sample1">Sample 1</MenuItem>
            <MenuItem value="sample2">Sample 2</MenuItem>
          </Select>
          <TextField
            fullWidth
            label="Enter diagram description"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            multiline
            rows={3}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={generateDiagram}
            sx={{ mt: 2 }}
          >
            Generate Diagram
          </Button>
        </Box>
        <Grid item xs={12}>
          <DocumentLoader isLoading={isLoading} text={"Processing the Data"} />
        </Grid>
        {drawioError && (
          <Grid item xs={12}> Please try to generate a diagram again.</Grid>
        )
        }

        {editorOpen && (
          <Box
            sx={{
              width: "100%",
              height: "80vh",
              bgcolor: "background.paper",
              boxShadow: 3,
              p: 2,
              position: "relative",
            }}
          >
            <iframe
              ref={drawioIframeRef}
              title="drawio-editor"
              onLoad={handleDrawioLoad}
              src="https://embed.diagrams.net/?embed=1&ui=min&spin=1&proto=json"
              style={{
                width: "100%",
                height: "100%",
                border: "none",
              }}
            />
            {editorLoading && (
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <CircularProgress />
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Container>
  );
};
