import React, { useEffect, useRef, useState } from 'react';

const CustomSVGLogo = ({ logoType = 'azure-bedrock', width = 200, height = 100, svgPath = null }) => {
  const mermaidRef = useRef(null);
  const [svgContent, setSvgContent] = useState('');
  const [customSvg, setCustomSvg] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load custom SVG from local file
  useEffect(() => {
    const loadCustomSvg = async () => {
      if (logoType === 'azure-bedrock' && svgPath) {
        try {
          const svgData = await window.fs.readFile(svgPath, { encoding: 'utf8' });
          setCustomSvg(svgData);
        } catch (err) {
          console.error('Error loading custom SVG:', err);
          setError(`Failed to load SVG from ${svgPath}`);
        }
      }
    };

    loadCustomSvg();
  }, [logoType, svgPath]);

  // Define logo configurations with custom SVG integration
  const logoConfigs = {
    'azure-bedrock': {
      // If we have custom SVG, create a simple node that will be replaced
      diagram: customSvg ? `
        graph TD
          AB[Azure Bedrock]
          style AB fill:transparent,stroke:transparent
      ` : `
        graph LR
          A[Azure] --> B[Bedrock]
          style A fill:#0078d4,stroke:#005a9e,stroke-width:2px,color:#fff
          style B fill:#ff9900,stroke:#cc7700,stroke-width:2px,color:#fff
      `,
      title: 'Azure Bedrock',
      useCustomSvg: !!customSvg
    }
  };

  useEffect(() => {
    const loadMermaidAndRender = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Load Mermaid from CDN if not already loaded
        if (!window.mermaid) {
          await new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/mermaid/10.6.1/mermaid.min.js';
            script.onload = () => resolve();
            script.onerror = () => reject(new Error('Failed to load Mermaid'));
            document.head.appendChild(script);
          });
        }

        // Initialize Mermaid
        window.mermaid.initialize({
          startOnLoad: false,
          theme: 'default',
          securityLevel: 'loose',
          flowchart: {
            useMaxWidth: true,
            htmlLabels: true
          }
        });

        const config = logoConfigs[logoType];
        if (!config) {
          throw new Error(`Logo type "${logoType}" not found`);
        }

        // Generate unique ID for this instance
        const elementId = `mermaid-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        
        if (config.useCustomSvg && customSvg) {
          // For custom SVG, we'll replace the mermaid content with our SVG
          setSvgContent(customSvg);
        } else {
          // Render the standard Mermaid diagram
          const { svg } = await window.mermaid.render(elementId, config.diagram);
          setSvgContent(svg);
        }
        
      } catch (err) {
        console.error('Error rendering diagram:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    // Only render when we have either custom SVG loaded or don't need it
    if (logoType !== 'azure-bedrock' || !svgPath || customSvg || error) {
      loadMermaidAndRender();
    }
  }, [logoType, customSvg]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8 bg-gray-100 rounded-lg">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Loading {logoType} logo...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8 bg-red-50 border border-red-200 rounded-lg">
        <div className="text-red-600">
          <svg className="w-6 h-6 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="custom-svg-logo">
      <div 
        className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm flex items-center justify-center"
        style={{ width, minHeight: height }}
      >
        <div 
          ref={mermaidRef}
          dangerouslySetInnerHTML={{ __html: svgContent }}
          className="max-w-full max-h-full"
          style={{ 
            width: logoConfigs[logoType]?.useCustomSvg ? 'auto' : '100%',
            height: logoConfigs[logoType]?.useCustomSvg ? 'auto' : '100%'
          }}
        />
      </div>
      <div className="mt-2 text-center text-sm text-gray-600">
        {logoConfigs[logoType]?.title || logoType}
        {logoConfigs[logoType]?.useCustomSvg && <span className=" text-green-600"> (Custom SVG)</span>}
      </div>
    </div>
  );
};

// Architecture diagram component that can reference logos
const ArchitectureDiagram = ({ architecture = 'architecture-beta' }) => {
  const [diagramContent, setDiagramContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const generateArchitectureDiagram = async () => {
      setIsLoading(true);
      
      // Load Mermaid if not already loaded
      if (!window.mermaid) {
        await new Promise((resolve) => {
          const script = document.createElement('script');
          script.src = 'https://cdnjs.cloudflare.com/ajax/libs/mermaid/10.6.1/mermaid.min.js';
          script.onload = () => resolve();
          document.head.appendChild(script);
        });
      }

      window.mermaid.initialize({
        startOnLoad: false,
        theme: 'default',
        securityLevel: 'loose'
      });

      // Example architecture diagram that references azure-bedrock
      const architectureDiagram = `
        graph TB
          subgraph "Cloud Services"
            AB[azure-bedrock]
            API[API Gateway]
            DB[(Database)]
          end
          
          subgraph "Client Applications"
            WEB[Web App]
            MOBILE[Mobile App]
          end
          
          WEB --> API
          MOBILE --> API
          API --> AB
          AB --> DB
          
          style AB fill:#e1f5fe,stroke:#01579b,stroke-width:3px
          style API fill:#f3e5f5,stroke:#4a148c,stroke-width:2px
          style DB fill:#e8f5e8,stroke:#1b5e20,stroke-width:2px
      `;

      try {
        const elementId = `architecture-${Date.now()}`;
        const { svg } = await window.mermaid.render(elementId, architectureDiagram);
        setDiagramContent(svg);
      } catch (err) {
        console.error('Error rendering architecture diagram:', err);
      } finally {
        setIsLoading(false);
      }
    };

    generateArchitectureDiagram();
  }, [architecture]);

  if (isLoading) {
    return <div className="text-center p-8">Loading architecture diagram...</div>;
  }

  return (
    <div className="w-full">
      <div dangerouslySetInnerHTML={{ __html: diagramContent }} />
    </div>
  );
};

// Demo component
const SimpleMermaidTest = () => {
  const [svgFilePath, setSvgFilePath] = useState('/azure_folder/azure-bedrock.svg');
  const [showArchitecture, setShowArchitecture] = useState(false);

  console.log("SVG PAth",svgFilePath)
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Custom SVG Logo in Mermaid</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Logo Component */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Individual Logo Component</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              SVG File Path:
            </label>
            <input 
              type="text"
              value={svgFilePath}
              onChange={(e) => setSvgFilePath(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="azure_folder/azure-bedrock.svg"
            />
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <CustomSVGLogo 
              logoType="azure-bedrock"
              width={300}
              height={150}
              svgPath={svgFilePath}
            />
          </div>
        </div>

        {/* Architecture Diagram */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Architecture Diagram</h2>
          <div className="mb-4">
            <button
              onClick={() => setShowArchitecture(!showArchitecture)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              {showArchitecture ? 'Hide' : 'Show'} Architecture Beta
            </button>
          </div>
          
          {showArchitecture && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <ArchitectureDiagram architecture="architecture-beta" />
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">Usage Instructions:</h3>
        <ol className="list-decimal list-inside text-blue-700 space-y-1 text-sm">
          <li>Place your Azure Bedrock SVG file in the azure_folder directory</li>
          <li>Use the component with: <code className="bg-white px-1 rounded">&lt;CustomSVGLogo logoType="azure-bedrock" svgPath="azure_folder/azure-bedrock.svg" /&gt;</code></li>
          <li>In Mermaid diagrams, reference "azure-bedrock" as a node and it will be styled specially</li>
          <li>The component will automatically load and display your custom SVG</li>
        </ol>
      </div>
    </div>
  );
};

export default SimpleMermaidTest;