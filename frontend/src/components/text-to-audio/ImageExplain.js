import React, { useState, useEffect } from "react";
import { Box, Button, Typography, CircularProgress,  FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import axios from "axios";
import TextToAudio from "./TextToAudio";

function ImageExplain() {
  const [image, setImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);


  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
  const [currentlanguage, setCurrentLanguage] = useState('English');

  const handleChange = (event) => {
    setCurrentLanguage(event.target.value);
  };

  useEffect(() => {
   console.log("current:", currentlanguage)

  }, [currentlanguage]);
  
  const handleSubmit = async (e) => {
    // e.preventDefault();
    if (!image) return;
    setLoading(true);
    setExplanation("");
    const formData = new FormData();
    formData.append("image", image);
    if (formData) { console.log(image) }
    const apiUrl = `${apiEndpoint}/api/explain-image/`;

    try {
      const response = await axios.post(
        apiUrl,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: {language: currentlanguage}
        }
      );
      setExplanation(response.data.explanation);
    } catch (error) {
      setExplanation("Error: " + (error.response?.data?.detail || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    setExplanation("")
    setImage(e.target.files[0]);
    const file = e.target.files[0];
    setSelectedImage(file);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null);
    }
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (selectedImage) {
      handleSubmit(selectedImage);
    }
  };

  return (
    <Box
      sx={{
        width: "50vw", // Allow full viewport width for the image
        maxWidth: "50vw",
        mx: "auto",
        mt: 4,
        p: 3,
        border: "1px solid #eee",
        borderRadius: 2,
        boxShadow: 2,
        bgcolor: "#fafafa",
      }}
    >
      {/* <FormControl fullWidth variant="outlined">
        <InputLabel id="language-select-label">Language</InputLabel>
        <Select
          labelId="language-select-label"
          value={currentlanguage}
          label="Language"
          onChange={handleChange}
        >
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="fr">French</MenuItem>
          <MenuItem value="es">Spanish</MenuItem>
          <MenuItem value="de">German</MenuItem>
        </Select>
      </FormControl> */}

      <form onSubmit={onFormSubmit}>
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          <Button
            variant="contained"
            component="label"
            startIcon={<ImageIcon />}
            sx={{ mb: 1 }}
          >
            Select Image
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
          </Button>
          {previewUrl && (
            <Box
              component="img"
              src={previewUrl}
              alt="Preview"
              sx={{
                width: "50vw",         // 70% of viewport width
                height: "50vh",        // 70% of viewport height
                objectFit: "contain",  // or "cover" if you want to crop
                borderRadius: 1,
                border: "1px solid #ddd",
                mb: 1,
                display: "block",
                background: "#fff"
              }}
            />
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading || !selectedImage || explanation}
            fullWidth
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Upload & Explain"}
          </Button>
        </Box>
      </form>
      <Box mt={3}>
        {loading && (
          <Typography align="center" color="text.secondary">
            Loading...
          </Typography>
        )}
        {explanation && TextToAudio && (
          <Box mt={2}>
            <TextToAudio explanation={explanation} />
          </Box>
        )}
      </Box>
    </Box>

  );
}

export default ImageExplain;
