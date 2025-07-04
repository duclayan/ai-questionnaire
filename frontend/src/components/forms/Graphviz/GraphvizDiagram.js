import React, { useState, useMemo } from 'react';
import GraphvizSafe from './GraphvizSafe/GraphvizSafe';

const GraphvizDiagram = () => {
  const [dotCode, setDotCode] = useState('');
  const [renderedDot, setRenderedDot] = useState('');

  const graphOptions = useMemo(() => ({
    fit: true,
    height: 700,
    width: 1200,
    zoom: true,
    engine: 'dot',
    useWorker: false, // Disable web worker for better error handling
  }), []);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (dotCode.trim()) {
      setRenderedDot(dotCode);
    }
  };

  const loadUnifiedIconDiagram = () => {
    setDotCode(unifiedIconCode);
    setRenderedDot(unifiedIconCode);
  };

  const loadAWSCode = () => {
    setDotCode(awsCode);
    setRenderedDot(awsCode);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>
      <h1>Unified GCP Icon Diagram</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '10px' }}>
          <textarea
            value={dotCode}
            onChange={(e) => setDotCode(e.target.value)}
            placeholder="Enter your DOT code here..."
            style={{
              width: '100%',
              height: '300px',
              padding: '10px',
              fontFamily: 'monospace',
              fontSize: '14px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              resize: 'vertical'
            }}
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

      {renderedDot && (
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

export default GraphvizDiagram;
