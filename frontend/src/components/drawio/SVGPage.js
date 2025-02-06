import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import mermaid from 'mermaid';
import { 
  Box, TextField, Button, Container, 
  Typography, Modal, IconButton, 
  Grid
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import { CircularProgress } from '@mui/material';
import { DocumentLoader } from '../forms/DocumentLoader/DocumentLoader';
export const SVGPage = () => {

// Sample Data
// Existing hardcoded XML and Mermaid code for testing
  const default_xml = `
    <mxfile host="embed.diagrams.net" agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36 Edg/132.0.0.0" version="26.0.10">
      <diagram id="pQsEFA-4h3Cu0HHXUz_q" name="Kong API Gateway Flow">
        <mxGraphModel dx="1214" dy="783" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="827" pageHeight="1169" math="0" shadow="0">
          <root>
            <mxCell id="0" />
            <mxCell id="1" parent="0" />
          </root>
        </mxGraphModel>
      </diagram>
    </mxfile>
            `;
  const mermaid_xml = `
 <mxfile host="app.diagrams.net" modified="2023-01-29T12:00:00.000Z" agent="5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36" etag="example_etag" version="15.8.2" type="device">
  <diagram id="prtHgNgQTEPvFCAcTncT" name="Page-1">
    <mxGraphModel dx="1422" dy="762" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="827" pageHeight="1169" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />
        <mxCell id="2" value="Client/Application" style="rounded=1;whiteSpace=wrap;html=1;" vertex="1" parent="1">
          <mxGeometry x="40" y="200" width="120" height="60" as="geometry" />
        </mxCell>
        <mxCell id="3" value="Kong API Gateway" style="rounded=1;whiteSpace=wrap;html=1;" vertex="1" parent="1">
          <mxGeometry x="240" y="200" width="120" height="60" as="geometry" />
        </mxCell>
        <mxCell id="4" value="Authentication Plugin" style="rounded=1;whiteSpace=wrap;html=1;" vertex="1" parent="1">
          <mxGeometry x="440" y="120" width="120" height="60" as="geometry" />
        </mxCell>
        <mxCell id="5" value="Rate Limiting Plugin" style="rounded=1;whiteSpace=wrap;html=1;" vertex="1" parent="1">
          <mxGeometry x="440" y="200" width="120" height="60" as="geometry" />
        </mxCell>
        <mxCell id="6" value="Load Balancer" style="rounded=1;whiteSpace=wrap;html=1;" vertex="1" parent="1">
          <mxGeometry x="440" y="280" width="120" height="60" as="geometry" />
        </mxCell>
        <mxCell id="7" value="Upstream Service 1" style="rounded=1;whiteSpace=wrap;html=1;" vertex="1" parent="1">
          <mxGeometry x="640" y="200" width="120" height="60" as="geometry" />
        </mxCell>
        <mxCell id="8" value="Upstream Service 2" style="rounded=1;whiteSpace=wrap;html=1;" vertex="1" parent="1">
          <mxGeometry x="640" y="280" width="120" height="60" as="geometry" />
        </mxCell>
        <mxCell id="9" value="Upstream Service 3" style="rounded=1;whiteSpace=wrap;html=1;" vertex="1" parent="1">
          <mxGeometry x="640" y="360" width="120" height="60" as="geometry" />
        </mxCell>
        <mxCell id="10" value="Logging Plugin" style="rounded=1;whiteSpace=wrap;html=1;" vertex="1" parent="1">
          <mxGeometry x="240" y="360" width="120" height="60" as="geometry" />
        </mxCell>
        <mxCell id="11" value="Monitoring Plugin" style="rounded=1;whiteSpace=wrap;html=1;" vertex="1" parent="1">
          <mxGeometry x="240" y="440" width="120" height="60" as="geometry" />
        </mxCell>
        <mxCell id="12" value="" style="endArrow=classic;html=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;" edge="1" parent="1" source="2" target="3">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="390" y="420" as="sourcePoint" />
            <mxPoint x="440" y="370" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="13" value="" style="endArrow=classic;html=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;" edge="1" parent="1" source="3" target="4">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="390" y="420" as="sourcePoint" />
            <mxPoint x="440" y="370" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="14" value="" style="endArrow=classic;html=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;" edge="1" parent="1" source="3" target="5">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="390" y="420" as="sourcePoint" />
            <mxPoint x="440" y="370" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="15" value="" style="endArrow=classic;html=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;" edge="1" parent="1" source="3" target="6">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="390" y="420" as="sourcePoint" />
            <mxPoint x="440" y="370" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="16" value="" style="endArrow=classic;html=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;" edge="1" parent="1" source="6" target="7">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="390" y="420" as="sourcePoint" />
            <mxPoint x="440" y="370" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="17" value="" style="endArrow=classic;html=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;" edge="1" parent="1" source="6" target="8">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="390" y="420" as="sourcePoint" />
            <mxPoint x="440" y="370" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="18" value="" style="endArrow=classic;html=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;" edge="1" parent="1" source="6" target="9">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="390" y="420" as="sourcePoint" />
            <mxPoint x="440" y="370" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="19" value="" style="endArrow=classic;html=1;exitX=0.5;exitY=1;exitDx=0;exitDy=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;" edge="1" parent="1" source="3" target="10">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="390" y="420" as="sourcePoint" />
            <mxPoint x="440" y="370" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="20" value="" style="endArrow=classic;html=1;exitX=0.5;exitY=1;exitDx=0;exitDy=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;" edge="1" parent="1" source="3" target="11">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="390" y="420" as="sourcePoint" />
            <mxPoint x="440" y="370" as="targetPoint" />
          </mxGeometry>
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>

    
              `
  const mermaidcode = `
    graph TD
    Client[Client/Application] -->|Sends Request| Kong[Kong API Gateway]
    Kong -->|Authenticates| AuthPlugin[Authentication Plugin]
    Kong -->|Enforces Rate Limits| RateLimitPlugin[Rate Limiting Plugin]
    Kong -->|Routes to Service| LoadBalancer[Load Balancer]
    LoadBalancer --> Service1[Upstream Service 1]
    LoadBalancer --> Service2[Upstream Service 2]
    LoadBalancer --> Service3[Upstream Service 3]
    Kong -->|Logs| LoggingPlugin[Logging Plugin]
    Kong -->|Monitors| MonitoringPlugin[Monitoring Plugin]`;
  const new_mermaidcode = `graph TD
    A[User] -->|Interacts with| B[Application]
    B -->|Sends data| C[Network]
    C -->|Transmits| D[Server]
    
    E[Firewall] -->|Monitors and filters| C
    F[Encryption] -->|Secures| C
    G[Authentication] -->|Verifies| A
    H[Access Control] -->|Manages| D
    I[Intrusion Detection System] -->|Monitors| C
    J[Updates & Patches] -->|Secures| B
    K[Backup & Recovery] -->|Protects| D
    
    style E fill:#f9f,stroke:#333,stroke-width:2px
    style F fill:#bbf,stroke:#333,stroke-width:2px
    style G fill:#bfb,stroke:#333,stroke-width:2px
    style H fill:#fbb,stroke:#333,stroke-width:2px
    style I fill:#ff9,stroke:#333,stroke-width:2px
    style J fill:#f99,stroke:#333,stroke-width:2px
    style K fill:#9ff,stroke:#333,stroke-width:2px
`
  const [prompt, setPrompt] = useState('');
  const [mermaidCode, setMermaidCode] = useState('');
  const [svgCode, setSvgCode] = useState('');
  const [editorOpen, setEditorOpen] = useState(false);
  const [editorLoading, setEditorLoading] = useState(true);
  const [drawioXml, setDrawioXml] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const [inputType, setInputType] = useState('')
  const drawioIframeRef = useRef(null);
  const token = localStorage.getItem('token');
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT

  // Initialize Draw.io editor when it loads
  const handleDrawioLoad = () => {
    setEditorLoading(false);
    const iframe = drawioIframeRef.current;
    // const generate_xml = generateXML(mermaidCode)
    // setDrawioXml(generate_xml)
    if (iframe && drawioXml) {
      // Wait a bit for the editor to be ready
      setTimeout(() => {
        iframe.contentWindow.postMessage(JSON.stringify({
          action: 'load',
          xml: drawioXml
        }), '*');
      }, 1000);
    }
  };
  // Handle messages from Draw.io V2
  useEffect(() => {
    const handleMessage = (event) => {
      if (typeof event.data === 'string') {
        try {
          const msg = JSON.parse(event.data);
          if (msg.event === 'save' || msg.event === 'exit') {
            if (msg.xml) {
              setDrawioXml(msg.xml);
              console.log("Msg", msg)
              console.log("XML File", msg.xml)
            // This value will then be sent to the gpt
              generateMermaidJS(msg.xml, "Convert")
                // 1. Call the GPT to ask for the MermaidJSCode
                // 2. SetMermaidJS Code to new code
            // The GPT will generate the matching mermaid js file 
            // The new mermaidjs file will be rendered upon save
              // setMermaidCode(new_mermaidcode)
            }
            setEditorOpen(false);
          }
        } catch (e) {
          console.error('Error parsing Draw.io message:', e);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const generateXML = async (code) => {
    // This generates the XML Code from the given code
    const prompt = `Convert MermaidJS Code to XML Code readable by DrawIO. Strictly return only the code content without any code block formatting.`

    try {
      const apiUrl = `${apiEndpoint}/api/gpt-omini/`;
      const response = await axios.post(apiUrl, {
        text: `${prompt}. Sample return code : ${default_xml} . This is the code to convert: ${code}`
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = response.data.generated_text
      setDrawioXml(data)
      return response.data.generated_text
    } catch (error) {
      // setMermaidError(`Error in prompt: Unable to generate a valid diagram`);
    } 
  };

  const generateMermaidJS = async (code, input_type) => {
    setIsLoading(true)
    // This generates the XML Code from the given code
    // Input type : "convert" if from XML File,  "generate" if from User Prompt
    const prompt = `${input_type} the following description into Mermaid JS code for a graph diagram. Provide only the code content without any Mermaid JS tags 
    or code block formatting. The code should start directly with the graph definition`

    try {
      console.log("mermaidjs is loading", isLoading)
      const apiUrl = `${apiEndpoint}/api/gpt-omini/`;
      const response = await axios.post(apiUrl, {
        text: `${prompt}. This is the data: ${code}`
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const result = response.data.generated_text
      setMermaidCode(result)
    } catch (error) {
      // setMermaidError(`Error in prompt: Unable to generate a valid diagram`);
    } 
    setIsLoading(false)
  };

  const generateDiagram = async () => {
    try {
      // Generate MermaidJS Code from the prompt that the user input
      generateMermaidJS(prompt, "convert")
    } catch (error) {
      console.error('Error:', error);
    }
  };


  useEffect(() => {
    mermaid.initialize({ startOnLoad: false });
    const renderDiagram = async () => {
      try {
        const { svg } = await mermaid.render('mermaid-svg', mermaidCode);
        setSvgCode(svg);
      } catch (err) {
        console.error('Mermaid error:', err);
      }
    };
    if (mermaidCode) {
      const generatedXML = generateXML(mermaidCode)
      setDrawioXml(generatedXML)
      console.log("GeneratedXML", generatedXML)
      renderDiagram();
    }

  }, [mermaidCode]);

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4">Get a preview of your Diagram</Typography>
        <Box my={2}>
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
        {svgCode && (
          <Box my={4}>
            <Box display="flex" alignItems="center" gap={2}>
              <Typography variant="h6">Preview</Typography>
              {/* <Button
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={() => setEditorOpen(true)}
              >
                Edit in Draw.io
              </Button> */}
            </Box>
            <div dangerouslySetInnerHTML={{ __html: svgCode }} />
          </Box>
        )}

        {/* Draw.io Editor Modal */}
        <Modal open={editorOpen} onClose={() => setEditorOpen(false)}>
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80vw',
            height: '80vh',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4
          }}>
            <Box display="flex" justifyContent="flex-end">
              <IconButton onClick={() => setEditorOpen(false)}>
                <CloseIcon />
              </IconButton>
            </Box>
            <iframe
              ref={drawioIframeRef}
              title="drawio-editor"
              onLoad={handleDrawioLoad}
              src="https://embed.diagrams.net/?embed=1&proto=json&spin=1"
              style={{
                width: '100%',
                height: 'calc(100% - 40px)',
                border: 'none'
              }}
            />
            {editorLoading && (
              <Box sx={{ 
                position: 'absolute', 
                top: '50%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)' 
              }}>
                <CircularProgress />
              </Box>
            )}
          </Box>
        </Modal>

        {/* {mermaidCode && (
          <Box my={4}>
            <Typography variant="h6">Mermaid Code</Typography>
            <TextField
              fullWidth
              multiline
              rows={8}
              value={mermaidCode}
              onChange={(e) => setMermaidCode(e.target.value)}
              sx={{ mt: 2, fontFamily: 'monospace' }}
            />
          </Box>
        )} */}
      </Box>
    </Container>
  );
};