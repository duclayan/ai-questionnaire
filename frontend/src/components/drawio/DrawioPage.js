import { useState, useEffect, useRef } from "react";
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
import AudioRecorderComponent from "../voice/AudioRecorder";
export const DrawioPage = () => {
  const [prompt, setPrompt] = useState("");
  const [editorOpen, setEditorOpen] = useState(false);
  const [editorLoading, setEditorLoading] = useState(true);
  const [drawioXml, setDrawioXml] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [drawioError, setDrawioError] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [pages, setPages] = useState([])
  const [cacheDrawIO, setCacheDrawIO] = useState([]) 
  // Track if the current operation is an update
  const [isUpdateOperation, setIsUpdateOperation] = useState(false);
  // when new prompt, add the latest prompt here
  // current version only allows update on the current screen 
  // future update: you can go back to other screens and it can still get updated
  const [currentlyRecordingId, setCurrentlyRecordingId] = useState(123);

  const drawioIframeRef = useRef(null);
  const token = localStorage.getItem("token");
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
  const [selectedSample, setSelectedSample] = useState('');

  const samples = {
    sample1: "Create a GenAI chatbot architecture diagram with react.js as the frontend, python FastAPI and the backend, use typical aws resources for web app, database, storage, monitoring, include security components like iam, firewall, gateway, monitoring, security groups, amazon bedrock as the NLP and claude as the LLM. All components inside the AWS, only the user is outside of the cloud.",
    sample2: "Create an echarging management system architecture diagram with angular.js as the frontend, javaspring frame work as the backend, java Eureka for service exploration, postgressql database, with typical AWS resources. Consider typical security components such as iam, firewall, gateway, monitoring. All components inside the AWS cloud, only the user is outside of the cloud.",
    sample3: "Create a sequence diagram  to assess risks based on their likelihood and impact on the organization. Risks may include data breaches, system outages, compliance violations, and insider threats."
  };
  
  const question = {
    question_id: 123,
    category: "general",
    prompt: "",
    question:""
  }
  
  const handleInputChange = async (question_id, response, category) => {
    setPrompt(response)
  };

  const handleSampleChange = (event) => {
    const selected = event.target.value;
    setSelectedSample(selected);
    setPrompt(samples[selected] || '');
  };

  // Initialize Draw.io editor when it loads
  const handleDrawioLoad = () => {
    setEditorLoading(false);
    
    const timeoutId = setTimeout(() => {
      setEditorOpen(false) // close the editor if it is more than 10 seconds
    }, 10000)
    
    try {
      const iframe = drawioIframeRef.current;

      const timeoutId2 = setTimeout(() => {
        setEditorOpen(false)
        console.log("Took too long to open")
      }, 100000)

      if (iframe && drawioXml && editorOpen) {
        setTimeout(() => {
          iframe.contentWindow.postMessage(
            JSON.stringify({ action: "load", xml: drawioXml }),
            "*"
          );
          clearTimeout(timeoutId2)
        }, 1000);
      }
    } catch (error) {
      setEditorOpen(false);
      setDrawioError(true)
      alert('Unable to handle information');
    } finally {
      clearTimeout(timeoutId)
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

  function generateUpdatePrompt(prompt) {
    // If cache is present -> prompt = Reference Diagram #previousdiagram + Prompt
    // Add a prompt that will allow to add specific prompt if it to the mermaid version
    if (cacheDrawIO) {
      return `This is the existing DRAWIO in Cache"${cacheDrawIO}" - '
      --
      Improve this according to the user prompt:" ${prompt}"
      - Return only the mermaidjs code remove any markups.
      - If prompt not related, then create a new diagram accordingly`
    } else {
      return prompt
    } 
  }

  const generateXML = async (userPrompt, isUpdatePrompt) => {
    // This generates the XML Code from the given code
    const prompt = `With max 500 lines create a simple representation of this. Always start and end with the mxGraphModel Tag. 
    Generate XML Code readable by DrawIO. Strictly return only the code content without any code block formatting.`;

    // If there is an existing code, and update is on then we 
    // If Follow Up Code : Generate a Follow Up Code
    // Generate follow up codde : uses the cacheDrawIO 
    try {
      const apiUrl = `${apiEndpoint}/api/gpt-omini/`;
      const updated_prompt = isUpdatePrompt ? generateUpdatePrompt(userPrompt) : userPrompt
      const response = await axios.post(
        apiUrl,
        {
          text: `
          ${prompt}. 
          
          This is the user prompt: "${updated_prompt}"
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
      setDrawioXml(data)
      setCacheDrawIO(data)
      setIsLoading(false) // Set loading to false here when XML is ready
      return response.data.generated_text;
    } catch (error) {
      console.error("Error generating XML:", error);
    }
  };

  const generateDiagram = async (isUpdatePrompt) => {
    try {
      setIsLoading(true);
      setIsUpdateOperation(isUpdatePrompt); // Track if this is an update operation
      // If it is an update to the diagram, it should be true otherwise it should be false
      generateXML(prompt, isUpdatePrompt);
    } catch (error) {
      // **WRITE A CODE HERE TO ADDRESS THE ERROR**
      setEditorOpen(false);
      setDrawioError(true);
    }
  };

  useEffect(() => {
    if (drawioXml && !isLoading) { // Only proceed when XML is ready and not loading
      if (isUpdateOperation && editorOpen && drawioIframeRef.current) {
        console.log("updating current diagram")
        // For updates, directly update the current diagram in the iframe
        setTimeout(() => {
          drawioIframeRef.current.contentWindow.postMessage(
            JSON.stringify({ action: "load", xml: drawioXml }),
            "*"
          );
        }, 500);
      } else if (!isUpdateOperation) {
        // For new diagrams, add a new page and open editor
        setPages(prevPages => [...prevPages, drawioXml.trim()]);
        setEditorOpen(true);
      }
    }
  }, [drawioXml, isUpdateOperation, isLoading]);

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
            InputProps={{
              endAdornment: (
                <Box sx={{ display: "flex" }}>
                  <AudioRecorderComponent  question={question} handleInputChange={handleInputChange} currentlyRecordingId={currentlyRecordingId}
                    setCurrentlyRecordingId={setCurrentlyRecordingId} />
                </Box>
              ),
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => generateDiagram(false)}
            sx={{ mt: 2 }}
          >
            Generate Diagram
          </Button>
          {/* add button here to add changes through chat */}
          <Button
            variant="contained"
            color="primary"
            onClick={() => generateDiagram(true)}
            sx={{ mt: 2 }}
            disabled={!editorOpen} // Disable if editor is not open (no current diagram to update)
          >
            Update Diagram
          </Button>
        </Box>
        <Grid item xs={12}>
          <DocumentLoader isLoading={isLoading} text={"Processing the Data"} />
        </Grid>
        {drawioError && (
          <Grid item xs={12}> Please try to generate a diagram again.</Grid>
        )}

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