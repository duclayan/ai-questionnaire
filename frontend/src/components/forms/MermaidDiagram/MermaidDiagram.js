import React, { useState, useEffect } from 'react';
import mermaid from 'mermaid';

const MermaidDiagram = () => {
  const [chart, setChart] = useState('graph TD; A-->B; B-->C; C-->A;');
  const [mermaidError, setMermaidError] = useState(null);
  const [shouldRender, setShouldRender] = useState(false); // State for controlling rendering

  useEffect(() => {
    mermaid.initialize({ startOnLoad: false }); // Prevent automatic rendering on load
    if (shouldRender) {
      renderMermaid();
      setShouldRender(false); // Reset shouldRender after rendering
    }
  }, [shouldRender]); // Re-run effect when shouldRender changes

  const renderMermaid = async () => {
    try {
      const mermaidChart = document.getElementById('mermaid-chart');
      mermaidChart.innerHTML = chart; // Set the innerHTML to the current chart

      // Clear any previous Mermaid processing attributes
      mermaidChart.removeAttribute('data-processed');

      await mermaid.run({ querySelector: '#mermaid-chart' }); // Render the diagram
      setMermaidError(null); // Clear any previous errors
    } catch (error) {
      console.error('Mermaid rendering error:', error);
      setMermaidError(error.message);
    }
  };

  const handleGenerateClick = () => {
    setShouldRender(true); // Set to true to trigger rendering
  };

  return (
    <div>
      <textarea
        rows="4"
        value={chart}
        onChange={(e) => setChart(e.target.value)} // Update chart state
      />
      <button onClick={handleGenerateClick}>Generate</button> {/* Generate button */}
      <div id="mermaid-chart" className="mermaid"></div> {/* Container for Mermaid diagram */}
      {mermaidError && (
        <div style={{ color: 'red' }}>
          Error: {mermaidError}
        </div>
      )}
    </div>
  );
};

export default MermaidDiagram;