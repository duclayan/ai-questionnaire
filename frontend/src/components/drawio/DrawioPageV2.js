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
import { default_aws, default_azure, default_xml, azure_images, aws_images, sample_aws_element, sample_azure_element, gcp_images, sample_gcp_element } from "./xmlSampleData";
import { saveAs } from 'file-saver';
export const DrawioPageV2 = () => {

  const [prompt, setPrompt] = useState("");
  const [editorOpen, setEditorOpen] = useState(false);
  const [editorLoading, setEditorLoading] = useState(true);
  const [drawioXml, setDrawioXml] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [drawioError, setDrawioError] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [pages, setPages] = useState([])
  const [currentStatus, setCurrentStatus] = useState("")

  const drawioIframeRef = useRef(null);
  const token = localStorage.getItem("token");
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
  const [selectedSample, setSelectedSample] = useState('');

  const samples = [
    {
      "text": "Create a GenAI chatbot architecture diagram with react.js as the frontend, python FastAPI and the backend, use typical aws resources for web app, database, storage, monitoring, include security components like iam, firewall, gateway, monitoring, security groups, amazon bedrock as the NLP and claude as the LLM. All components inside the AWS, only the user is outside of the cloud.",
      "prompt": default_aws,
      "title": "Architecture Diagram"
    },
    {
      "text": "Create an echarging management system architecture diagram with angular.js as the frontend, javaspring frame work as the backend, java Eureka for service exploration, postgressql database, with typical AWS resources. Consider typical security components such as iam, firewall, gateway, monitoring. All components inside the AWS cloud, only the user is outside of the cloud.",
      "type": default_aws,
      "title": "Amazon Web Services"
    },
    {
      "text": "Create an Azure architecture diagram illustrating a real-time data processing pipeline. The pipeline should include Azure VM, Azure Storage, Azure SQL, Azure functions and AZure AD. Show the connection of user.",
      "type": default_azure,
      "title": "Microsoft Azure Webservices"
    }
  ]
  const handleSampleChange = (event) => {
    const selected = event.target.value;
    setSelectedSample(selected);
    setPrompt(selected.text)
  };
  // Initialize Draw.io editor when it loads
  const handleDrawioLoad = () => {
    setEditorLoading(false);; // 1 minute timeout

    try {
      const iframe = drawioIframeRef.current;

      const timeoutId = setTimeout(() => {
        setEditorOpen(false)
      }, 10000)

      if (iframe && drawioXml && editorOpen) {
        // Render the DrawIO Diagram
        setTimeout(() => {
          iframe.contentWindow.postMessage(
            JSON.stringify({ action: "load", xml: drawioXml }),
            "*"
          );
        }, 1000);

        // Handling DrawIO Error
        window.addEventListener('message', event => {
          if (event.data?.event === 'error') {
            setEditorOpen(false)
            setDrawioError(true)
            throw new Error('Draw.io error');
          }
        });

        // Clear Timeout
        clearTimeout(timeoutId)
      }
    } catch (error) {
      alert('Unable to handle information');
    }
  };
  // Everytime a Page is Added, it is rendered
  useEffect(() => {
    if (drawioIframeRef.current && pages.length > 0) {
      const xmlPages = pages.map((xml, index) => {
        const pageNumber = index + 1;
        const pageId = `page-${pageNumber}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        console.log("PageID:", pageId)
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

  const gptCall = async (prompt) => {
    const apiUrl = `${apiEndpoint}/api/gpt-omini/`;
    const response = await axios.post(
      apiUrl,
      {
        text: prompt,
        gpt_type: "clean"

      },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    const data = response.data.generated_text;
    return data;
  }
  const getTechnology = async (code) => {
    const prompt = `Strictly: Only return the word ('AWS', 'Azure', 'GCP', or 'General'). Return the (cloud) technology this code is using. This is the code: ${code}`
    const answer = await gptCall(prompt)
    return answer
  }
  const generateXML = async (code) => {
    // This generates the XML Code from the given code
    const delayedSetStatus = (status, delay) => {
      return new Promise(resolve => {
        setTimeout(() => {
          setCurrentStatus(status);
          resolve();
        }, delay);
      });
    };
    const sample = selectedSample.prompt ? selectedSample.prompt : default_xml
    setCurrentStatus("Analyzing the type of Diagram")
    const technology = await getTechnology(code)
    setCurrentStatus(`Technology Detected as : ${technology}`)
    let icons = ''
    let sample_element = ''
    if (technology === 'AWS') {
      sample_element = sample_aws_element
      icons = aws_images
    } else if (technology === 'Azure') {
      sample_element = sample_azure_element
      icons = azure_images
    } else if (technology === 'GCP') {
      sample_element = sample_gcp_element
      icons = gcp_images
    } else {
    }
    const prompt = `
    Generate XML Code readable by DrawIO. Strictly return only the code content without any code block formatting.

    Use Drawio Cloud - ${technology} icons to represent tools similar to sample code. 
    Use the following icon source for the matching ${technology} Technology 
    that is used : ${icons}
    
    Group the similar components together e.g (AWS, VPC).

    Sample Element with Icon: 
    ${sample_element}

    --
    Ensure to include paths. If not available don't put any icon.
    Sample return code : ${sample}. 
    --
    This is the code to convert: ${code}`

    await delayedSetStatus(`Identifying the appropriate diagram`, 3000);

    const apiUrl = `${apiEndpoint}/api/gpt-omini/`;
    const response = await axios.post(
      apiUrl,
      {
        text: prompt,
        gpt_type: "clean",
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    const data = response.data.generated_text;
    return data;
  };

  const generateDiagram = async () => {
    try {
      setIsLoading(true);
      try {
        const xml = await generateXML(prompt);
        setDrawioXml(xml)
      } catch (error) {
        console.log("Error has been encountered:", error)
      }
      setIsLoading(false)

    } catch (error) {
      console.error("Error:", error);
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
            value={selectedSample.title}
            placeholder={selectedSample.title}
            onChange={handleSampleChange}
            displayEmpty
            fullWidth
            sx={{ mb: 2 }}
          >
            <MenuItem value="" disabled> Select a sample </MenuItem>
            {samples.map((sample) => (
              <MenuItem key={sample.id} value={sample}> {sample.title}</MenuItem>
            ))}
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
          <DocumentLoader isLoading={isLoading} text={currentStatus} />
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
              src="https://embed.diagrams.net/?embed=1&proto=json&spin=1"
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
