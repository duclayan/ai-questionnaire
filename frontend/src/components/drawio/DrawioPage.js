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

import { CircularProgress } from "@mui/material";
import { DocumentLoader } from "../forms/DocumentLoader/DocumentLoader";
import { default_xml, sequence_diagram_xml } from "./xmlSampleData";
import { saveAs } from 'file-saver';
export const DrawioPage = () => {

  const [prompt, setPrompt] = useState("");
  const [mermaidCode, setMermaidCode] = useState("");
  const [editorOpen, setEditorOpen] = useState(false);
  const [editorLoading, setEditorLoading] = useState(true);
  const [drawioXml, setDrawioXml] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [drawioError, setDrawioError] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [pages, setPages] = useState([])

  const drawioIframeRef = useRef(null);
  const token = localStorage.getItem("token");
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
  const [selectedSample, setSelectedSample] = useState('');

  const samples = {
    sample1: "Create a GenAI chatbot architecture diagram with react.js as the frontend, python FastAPI and the backend, use typical aws resources for web app, database, storage, monitoring, include security components like iam, firewall, gateway, monitoring, security groups, amazon bedrock as the NLP and claude as the LLM. All components inside the AWS, only the user is outside of the cloud.",
    sample2: "Create an echarging management system architecture diagram with angular.js as the frontend, javaspring frame work as the backend, java Eureka for service exploration, postgressql database, with typical AWS resources. Consider typical security components such as iam, firewall, gateway, monitoring. All components inside the AWS cloud, only the user is outside of the cloud.",
    sample3: "Create a sequence diagram  to assess risks based on their likelihood and impact on the organization. Risks may include data breaches, system outages, compliance violations, and insider threats."
  };

  const handleSampleChange = (event) => {
    const selected = event.target.value;
    setSelectedSample(selected);
    setPrompt(samples[selected] || '');
  };
  // Initialize Draw.io editor when it loads
  const handleDrawioLoad = () => {
    setEditorLoading(false);; // 1 minute timeout

    const iframe = drawioIframeRef.current;
    const timeoutId = setTimeout(() => {
      setEditorOpen(false) // close the editor if it is morethan 10 seconds
    }, 10000)
    try {
      if (iframe && drawioXml && editorOpen) {
        setTimeout(() => {
          iframe.contentWindow.postMessage(
            JSON.stringify({ action: "load", xml: drawioXml }),
            "*"
          );
          clearTimeout(timeoutId)
        }, 1000);
      }
    } catch (error) {
      setEditorOpen(false);
      setDrawioError(true)
      alert('Unable to handle information');
    } 
  };
  // Everytime a Page is Added, it is rendered
  useEffect(() => {
    if (drawioIframeRef.current && pages.length > 0) {
      const xmlPages = pages.map((xml, index) => {
        const pageNumber = index + 1;
        const pageId = `page-${pageNumber}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        return `<diagram id="${pageId}" name="Page-${pageNumber}">${xml}</diagram>`;
      }).join('');
      const fullXml = `<mxfile>${xmlPages}</mxfile>`;
  
      setTimeout(() => {
        drawioIframeRef.current.contentWindow.postMessage(
          JSON.stringify({ action: 'load', xml: fullXml }),
          '*'
        );
      }, 1000);
    }
  }, [pages]);
  // Handle messages from Draw.io V2
  useEffect(() => {
    const handleMessage = (event) => {
      if (typeof event.data === "string") {
        try {
          const msg = JSON.parse(event.data);
          const iframe = drawioIframeRef.current;
          if (msg.event === "init"){
            iframe.contentWindow.postMessage(
              JSON.stringify({ event: 'init', error: 'We were unable to generate your diagram, try again', message: "Successfully created your diagram"}),
              "*"
            );
          }
          if (msg.event === "save" || msg.event === "exit") {
            if (msg.xml) {
              setDrawioXml(msg.xml);
              const blob = new Blob([msg.xml], {type: "application/xml;charset=utf-8"});
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
    if (isSaved){
      setEditorOpen(false)
    }
  }, [isSaved]);

  const generateXML = async (code) => {
    // This generates the XML Code from the given code
    const prompt = `Generate XML Code readable by DrawIO. Strictly return only the code content without any code block formatting.`;

    try {
      const apiUrl = `${apiEndpoint}/api/gpt4o/`;
      const response = await axios.post(
        apiUrl,
        {
          text: `
          ${prompt}. This is the code to convert: ${code}
          --
          Sample Return Code for Microsoft Azure, GCP and AWS : ${default_xml}
          --
          Sample Return code for 'Sequence Diagram' : ${sequence_diagram_xml}
          --
          Create the daigram according to the sample return codes. 
          `,
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
      setIsLoading(true);
      generateXML(prompt);
    } catch (error) {
      // **WRITE A CODE HERE TO ADDRESS THE ERROR**
      setEditorOpen(false);
      setDrawioError(true);
    }
  };
  useEffect(() => {
    if (drawioXml) {
      setPages(prevPages => [...prevPages, drawioXml.trim()]);
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
            <MenuItem value="" disabled>Select a sample prompt</MenuItem>
            <MenuItem value="sample1">GenAI Chatbot Architecture</MenuItem>
            <MenuItem value="sample2">E-Charging Management System</MenuItem>
            <MenuItem value="sample3">Risk Assessment Sequence Diagram</MenuItem>
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
              src="https://embed.diagrams.net/?embed=1&spin=1&modified=unsavedChanges&proto=json"
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