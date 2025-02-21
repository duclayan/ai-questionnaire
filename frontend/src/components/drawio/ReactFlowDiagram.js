// This is an attempt to use ReactFlow in order to render diagrams
// Something to look back to because it actually is good for creating moving graphics

import React, { useState, useCallback } from 'react';
import ReactFlow, { addEdge, Controls, Background } from 'react-flow-renderer';
import axios from 'axios';

// Token Management
const token = localStorage.getItem("token");
const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;

export const ReactFlowDiagram = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  const onNodesChange = useCallback((changes) => setNodes((nds) => nds.map((node) => ({ ...node, ...changes }))), []);
  const onEdgesChange = useCallback((changes) => setEdges((eds) => addEdge(changes, eds)), []);
  
const fetchDiagram = async () => {
  setLoading(true);
  try {
    const apiUrl = `${apiEndpoint}/api/gpt-omini/`;
    const response = await axios.post(
      apiUrl,
      {
        text: `Strictly return the code only in plain text without explanation.Generate a React Flow diagram for:${prompt}.`,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // Extract elements from response.data
    if (response.data) {
      const codeString = response.data.trim().replace(/``````/g, '');
      const elementsMatch = codeString.match(/const elements = (\[[\s\S]*?\]);/);
      if (elementsMatch && elementsMatch[1]) {
        const parsedElements = eval(elementsMatch[1]); // Parse the array safely
        setNodes(parsedElements.filter((el) => !el.source && !el.target)); // Nodes
        setEdges(parsedElements.filter((el) => el.source && el.target)); // Edges
      }
    }
  } catch (error) {
    console.error('Error fetching diagram:', error);
  }
  setLoading(false);
};

  return (
    <div style={{ height: '100vh' }}>
      <div>
        <input 
          type="text" 
          placeholder="Enter diagram prompt" 
          value={prompt} 
          onChange={(e) => setPrompt(e.target.value)} 
        />
        <button onClick={fetchDiagram} disabled={loading}>
          {loading ? 'Generating...' : 'Generate Diagram'}
        </button>
        {/* <button onClick={saveDiagram}>Save Diagram</button> */}
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
      >
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

