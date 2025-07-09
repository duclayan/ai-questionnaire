import React, { useState, useMemo } from 'react';
import GraphvizSafe from './GraphvizSafe/GraphvizSafe';
import axios from "axios"
import {
  CircularProgress, 
  Box,
  TextField
} from "@mui/material";
import AudioRecorderComponent from "../../voice/AudioRecorder";


const GraphvizDiagramChat = () => {
  const [dotCode, setDotCode] = useState('');
  const [renderedDot, setRenderedDot] = useState('');
  const [graphvizCode, setGraphvizCode] = useState('');
  const [currentlyRecordingId, setCurrentlyRecordingId] = useState(123);
  
const [isLoading, setIsLoading] = useState(false);
  
  const token = localStorage.getItem("token");
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;

  const graphOptions = useMemo(() => ({
    fit: true,
    height: 700,
    width: 1200,
    zoom: true,
    engine: 'dot',
    useWorker: false, // Disable web worker for better error handling
  }), []);

  const question = {
    question_id: 123,
    category: "general",
    prompt: "",
    question:""
  }
  const unifiedIconCode = `digraph UnifiedIcons {
    rankdir=LR;
    node [shape=none label=""];
    node [imagescale=true];
    
    // Main nodes with gcp.png
    DNS  [image="icons/gcp.png", label="DNS", shape=box];
    LB   [image="icons/gcp.png", label="Load Balancer", shape=circle];
    
    // Webserver cluster
    subgraph cluster_webservers {
        label="Webserver Cluster";
        style=filled;
        fillcolor=lightblue;
        
        WS1 [image="icons/gcp.png", label="Webserver 1", shape=box];
        WS2 [image="icons/gcp.png", label="Webserver 2", shape=box];
        WS3 [image="icons/gcp.png", label="Webserver 3", shape=box];
    }
    
    DB    [image="icons/gcp.png", label="User Database", shape=box];
    Cache [image="icons/gcp.png", label="Cache", shape=box];
    
    // Connections
    DNS -> LB;
    LB -> WS1;
    LB -> WS2;
    LB -> WS3;
    WS1 -> DB;
    WS2 -> DB;
    WS3 -> DB;
    WS1 -> Cache;
    WS2 -> Cache;
    WS3 -> Cache;
}`;

  const awsCode = `
  digraph G {
      rankdir="LR";
      compound=true;
      fontname="Arial";
      node [fontname="Arial", shape=box, style="rounded,filled", color="#003f5c", fontcolor=white];
      edge [fontname="Arial", color="#003f5c"];

      // External User
      user [label="User", shape=egg, style=filled, fillcolor="#ff6361", fontcolor=black];

      // Frontend
      subgraph cluster_frontend {
          label="Frontend (React.js)";
          labeljust="l";
          style=filled;
          fillcolor="#e0e0e0";
          fontcolor=black;
          react [label="React.js App", fillcolor="#58508d"];
      }

      // API Gateway
      apigw [label="Amazon API Gateway", fillcolor="#bc5090", shape=component];

      // Backend
      subgraph cluster_backend {
          label="Backend (FastAPI)";
          labeljust="l";
          style=filled;
          fillcolor="#e0e0e0";
          fontcolor=black;
          fastapi [label="FastAPI Server", fillcolor="#ff6361"];
      }

      // AWS Services
      bedrock [label="Amazon Bedrock\n(Claude LLM)", fillcolor="#ffa600"];
      dynamodb [label="Amazon DynamoDB", fillcolor="#003f5c"];
      s3 [label="Amazon S3\n(Storage)", fillcolor="#003f5c"];
      cloudwatch [label="Amazon CloudWatch\n(Monitoring)", fillcolor="#003f5c"];

      // Security Components
      subgraph cluster_security {
          label="Security Components";
          labeljust="l";
          style=filled;
          fillcolor="#e0e0e0";
          fontcolor=black;
          iam [label="AWS IAM\n(Access Control)", fillcolor="#ff6361"];
          waf [label="AWS WAF\n(Firewall)", fillcolor="#ff6361"];
          sg [label="Security Groups\n(Network Security)", fillcolor="#ff6361"];
      }

      // Connections
      user -> react [label="HTTPS", ltail="cluster_frontend"];
      react -> apigw [label="API Calls"];
      apigw -> fastapi [label="Requests"];
      fastapi -> bedrock [label="LLM Queries"];
      fastapi -> dynamodb [label="Data Access"];
      fastapi -> s3 [label="File Storage"];
      fastapi -> cloudwatch [label="Metrics & Logs"];

      // Security Relationships
      iam -> fastapi [label="Permissions", style=dashed];
      waf -> apigw [label="Protection", style=dashed];
      sg -> fastapi [label="Traffic Filtering", style=dashed];
      cloudwatch -> iam [label="Alerting", dir=back, style=dashed];

      // AWS Boundary
      subgraph cluster_aws {
          label="AWS Cloud Environment";
          labeljust="l";
          style=filled;
          fillcolor="#f2f2f2";
          fontcolor=black;
          margin=20;
          
          react;
          apigw;
          fastapi;
          bedrock;
          dynamodb;
          s3;
          cloudwatch;
          iam;
          waf;
          sg;
      }
  }
  `
  const generatePrompt = async (prompt) => {
    const updated_prompt = `
     Using the user prompt : ${prompt}. Create a DOT Diagram based on the following code as reference. 
    ---------
     AWS Coe Reference : ${awsCode}
     -----
     UnifiedIcodeCode Reference : ${unifiedIconCode}
     -----
     Important:
     1. Only  return the code without any markdown. Remove markdown.
     2. Ensure that it will work with graphviz 100% if you are not sure, make it simple.

     IGNORE OTHER ARCHITECTURE. ONLY USE DOT FOR GRAPHVIZ. DO NOT USE MERMAIDJS.
    `
    return updated_prompt
  }
  const renderGraphvizCode = async (prompt) => {
    const final_prompt = await generatePrompt(prompt)

    try { 
        const apiUrl = `${apiEndpoint}/api/gpt-omini/`;

        const response = await axios.post(apiUrl, {
        text: final_prompt,
        language: "english"
        }, {
        headers: { Authorization: `Bearer ${token}` }
        });

        const generated_chart = response.data.generated_text;
        console.log("Generated Chart", generated_chart)
        setGraphvizCode(generated_chart)
        setDotCode(generated_chart);
        setRenderedDot(generated_chart);
        console.log("dot chart", generated_chart)
        setIsLoading(false)

    } catch (error) {
        console.log("That was challenging. Maybe make it more simple.")
        throw error;
    }
    };
  const handleInputChange = async (question_id, response, category) => {
    setDotCode(response)
  };


  const handleSubmit = (e) => {
    setIsLoading(true)
    e.preventDefault();
    renderGraphvizCode(dotCode)
  };

  const loadUnifiedIconDiagram = () => {
    setDotCode(unifiedIconCode);
    setRenderedDot(unifiedIconCode);
  };

  const loadAWSCode = () => {
    setDotCode(awsCode);
    setRenderedDot(awsCode);
  };

  
  const loadUpdatedDiagram = () => {
    setDotCode(dotCode);
    setRenderedDot(dotCode);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>
      <h1>Graphviz Diagram Chat</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '10px' }}>
          <TextField
            fullWidth
            multiline
            value={dotCode}
            onChange={(e) => setDotCode(e.target.value)}
            placeholder="Enter your DOT code here..."
            variant="outlined"
            InputProps={{
              endAdornment: (
                <Box sx={{ display: "flex" }}>
                  <AudioRecorderComponent
                    question={question}
                    handleInputChange={handleInputChange}
                    currentlyRecordingId={currentlyRecordingId}
                    setCurrentlyRecordingId={setCurrentlyRecordingId}
                  />
                </Box>
              ),
            }}
            sx={{ mt: 1 }}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="submit"
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Render Diagram
          </button>

            <button
            type="button"
            onClick={loadUpdatedDiagram}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Update
          </button>

          <button
            type="button"
            onClick={loadUnifiedIconDiagram}
            style={{
              padding: '10px 20px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Load Unified GCP Icons Diagram
          </button>

          <button
            type="button"
            onClick={loadAWSCode}
            style={{
              padding: '10px 20px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Load AWS
          </button>
        </div>
      </form>
    {isLoading && (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
        <CircularProgress />
      </div>
    )}

      {graphvizCode && (
        <div style={{
          marginTop: '30px',
          border: '1px solid #ddd',
          padding: '20px',
          borderRadius: '4px',
          height: '750px',
          overflow: 'hidden'
        }}>
          <GraphvizSafe
            dot={renderedDot}
            options={graphOptions}
          />
        </div>
      )}
    </div>
  );
};

export default GraphvizDiagramChat;
