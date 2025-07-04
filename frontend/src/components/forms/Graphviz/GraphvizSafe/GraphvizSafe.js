// src/components/GraphvizSafe.js
import React, { useEffect, useRef } from 'react';
import { graphviz } from 'd3-graphviz';

const GraphvizSafe = ({ dot, options = {} }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!dot || !containerRef.current) return;
    
    try {
      // Clear previous rendering
      while (containerRef.current.firstChild) {
        containerRef.current.removeChild(containerRef.current.firstChild);
      }
      
      // Render new graph
      graphviz(containerRef.current)
        .options(options)
        .renderDot(dot);
    } catch (error) {
      console.error('Graphviz rendering error:', error);
      containerRef.current.innerHTML = `<div class="error">Diagram rendering failed: ${error.message}</div>`;
    }
  }, [dot, options]);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
};

export default GraphvizSafe;
