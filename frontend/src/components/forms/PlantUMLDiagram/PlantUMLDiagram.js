import React, { useState, useRef, useMemo } from 'react';
import axios from 'axios';
import html2canvas from 'html2canvas';
import { Box, Button, Snackbar, Alert } from '@mui/material';
import plantumlEncoder from 'plantuml-encoder';

export const PlantUMLDiagram = () => {
  const [diagramContent, setDiagramContent] = useState('');
  const [inputText, setInputText] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const diagramRef = useRef(null);
  const token = localStorage.getItem("token");
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;

  const generateDiagram = async (isNew) => {
    setError('');
    setLoading(true);

    try {
      const prompt = isNew
        ? ` STRICTLY: Write PlantUML code for the following description: ${inputText}. Note: Return PlantUML Code Onlyin pLaintext`
        : `Improve the following PlantUML code: ${diagramContent} based on this description: ${inputText}`;

        const apiUrl = `${apiEndpoint}/api/gpt-omini/`;
        const response = await axios.post(apiUrl, {
        text: prompt,
        }, {
        headers: { Authorization: `Bearer ${token}` }
        });

      const plantUMLCode = response.data.generated_text;
      setDiagramContent(plantUMLCode);

      if (diagramRef.current) {
        diagramRef.current.innerHTML = `<pre>${plantUMLCode}</pre>`;
      }
    } catch (err) {
      setError('Failed to generate PlantUML diagram. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const generateDiagramWithRetry = async (isNew) => {
    setError('');
    setLoading(true);

    let retryCount = 0;
    let currentDiagramContent = diagramContent;

    while (retryCount < 5) {
      try {
        const prompt = isNew
          ? `STRICTLY: Write PlantUML code for the following description: ${inputText}. Note: Return PlantUML Code Only in plaintext.`
          : `Improve the following PlantUML code: ${currentDiagramContent} based on this description: ${inputText}. Error encountered: ${error}`;

        const apiUrl = `${apiEndpoint}/api/gpt-omini/`;
        const response = await axios.post(apiUrl, {
          text: prompt,
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const plantUMLCode = response.data.generated_text;
        setDiagramContent(plantUMLCode);

        if (diagramRef.current) {
          diagramRef.current.innerHTML = `<pre>${plantUMLCode}</pre>`;
        }

        // Render the diagram image
        const encodedDiagram = plantumlEncoder.encode(plantUMLCode);
        const imageUrl = `http://www.plantuml.com/plantuml/png/${encodedDiagram}`;

        // Check if the image renders successfully
        const img = new Image();
        img.src = imageUrl;
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });

        // If successful, exit the loop
        return;
      } catch (err) {
        setError('Failed to generate PlantUML diagram. Retrying...');
        retryCount++;
        currentDiagramContent = diagramContent;
      }
    }

    setError('Failed to generate PlantUML diagram after 5 retries.');
    setLoading(false);
  };

  const saveAsPNG = async () => {
    if (!diagramContent) {
      setError('No diagram to save.');
      return;
    }

    try {
      const node = diagramRef.current;
      const canvas = await html2canvas(node);
      const dataUrl = canvas.toDataURL('image/png');

      const link = document.createElement('a');
      link.download = 'plantuml-diagram.png';
      link.href = dataUrl;
      link.click();
    } catch (err) {
      setError('Failed to save diagram as PNG.');
    }
  };

  const saveAsSVG = () => {
    if (!diagramContent) {
      setError('No diagram to save.');
      return;
    }

    const blob = new Blob([diagramContent], { type: 'image/svg+xml' });
    const link = document.createElement('a');
    link.download = 'plantuml-diagram.svg';
    link.href = URL.createObjectURL(blob);
    link.click();
  };

  const renderDiagramImage = useMemo(() => {
    if (!diagramContent) {
      return null;
    }

    const encodedDiagram = plantumlEncoder.encode(diagramContent);
    const imageUrl = `http://www.plantuml.com/plantuml/png/${encodedDiagram}`;

    return (
      <img src={imageUrl} alt="PlantUML Diagram" style={{ marginTop: '2rem', maxWidth: '100%' }} />
    );
  }, [diagramContent]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: '2rem',
      }}
    >
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter your description here..."
        style={{ width: '100%', height: '100px', marginBottom: '1rem' }}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={() => generateDiagramWithRetry(true)}
        sx={{ mt: 2 }}
        disabled={loading}
      >
        Generate New Diagram
      </Button>

      <Button
        variant="contained"
        color="primary"
        onClick={() => generateDiagramWithRetry(false)}
        sx={{ mt: 2 }}
        disabled={loading || !diagramContent}
      >
        Update Diagram
      </Button>

      <Button
        variant="contained"
        color="secondary"
        onClick={saveAsPNG}
        sx={{ mt: 2 }}
        disabled={!diagramContent}
      >
        Save as PNG
      </Button>

      <Button
        variant="contained"
        color="secondary"
        onClick={saveAsSVG}
        sx={{ mt: 2 }}
        disabled={!diagramContent}
      >
        Save as SVG
      </Button>

      {loading && <p>Loading...</p>}

      {error && (
        <Snackbar
          open={!!error}
          autoHideDuration={5000}
          onClose={() => setError('')}
        >
          <Alert severity="error" onClose={() => setError('')}>
            {error}
          </Alert>
        </Snackbar>
      )}

      <div style={{ marginTop: '2rem', width: '100%' }}>
        {renderDiagramImage}
      </div>
    </Box>
  );
};
