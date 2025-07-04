import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Container,
  Grid,
  TextField,
  Typography,
  Alert,
  Paper
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';

function PythonDiagram() {
  const [inputText, setInputText] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;

  useEffect(() => {
    return () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl);
    };
  }, [imageUrl]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    if (imageUrl) {
      URL.revokeObjectURL(imageUrl);
      setImageUrl(null);
    }

    try {
      const response = await axios.post(
        `${apiEndpoint}/api/generate-diagram/`,
        { prompt: inputText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          responseType: 'blob',
          timeout: 30000
        }
      );
      const url = URL.createObjectURL(response.data);
      setImageUrl(url);
    } catch (err) {
      let errorMessage = 'Failed to generate image';
      if (err.response) {
        if (err.response.data instanceof Blob) {
          const text = await err.response.data.text();
          errorMessage = text || errorMessage;
        } else if (err.response.data?.error) {
          errorMessage = err.response.data.error;
        }
      } else if (err.message) {
        errorMessage = err.message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Card elevation={3} sx={{ mb: 4 }}>
        <CardHeader
          title="Architecture Diagram Generator"
          titleTypographyProps={{ variant: 'h5', fontWeight: 'bold' }}
        />
        <CardContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mb: 2 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={9}>
                <TextField
                  label="Describe your system architecture"
                  variant="outlined"
                  fullWidth
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  disabled={loading}
                  required
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={22} /> : <ImageIcon />}
                >
                  {loading ? 'Generating...' : 'Generate Diagram'}
                </Button>
              </Grid>
            </Grid>
          </Box>
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              <Typography variant="subtitle2">Error:</Typography>
              <Typography variant="body2">{error}</Typography>
            </Alert>
          )}
        </CardContent>
      </Card>

      {imageUrl && !loading && (
        <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Generated Diagram
          </Typography>
          <Box
            component="img"
            src={imageUrl}
            alt="Generated architecture diagram"
            sx={{
              maxWidth: '100%',
              maxHeight: 500,
              borderRadius: 2,
              border: '1px solid #eee',
              boxShadow: 1,
            }}
          />
        </Paper>
      )}
    </Container>
  );
}

export default PythonDiagram;
