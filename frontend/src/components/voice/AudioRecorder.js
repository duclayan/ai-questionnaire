import React, { useState, useRef, useEffect } from "react";
import { Tooltip, IconButton, CircularProgress } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";
import axios from "axios";

const AudioRecorderComponent = (
  { question,  handleInputChange}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [loading, setLoading] = useState(false);

  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);
  const token = localStorage.getItem("token");
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;


  const handleMicClick = async () => {
    if (!isRecording) {
      // Start recording
      audioChunks.current = [];
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        mediaRecorder.current = new MediaRecorder(stream);
        mediaRecorder.current.ondataavailable = (event) => {
          audioChunks.current.push(event.data);
        };
        mediaRecorder.current.start();
        setIsRecording(true);
      });
    } else {
      // Stop recording
      mediaRecorder.current.stop();
      mediaRecorder.current.onstop = async () => {
        const audioBlob = new Blob(audioChunks.current, { type: "audio/webm" });
        setIsRecording(false);

        // Send the audio blob to the backend
        sendAudioToBackend(audioBlob);
      };
    }
  };

  const sendAudioToBackend = async (blob) => {
    setLoading(true);
    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64Audio = reader.result.split(",")[1]; // Extract Base64 string after the prefix
      const apiUrl = `${apiEndpoint}/api/transcribe/`;

      try {
        const response = await axios.post(
          apiUrl,
          {
            audio: base64Audio,
            format: "mp3", // Specify the desired format (can be dynamic)
          },
          {
            headers: { Authorization: `Bearer ${token}` }, // Add authorization header
          }
        );
        handleInputChange(question.question_id, response.data.transcript, question.category)
        console.log(response.data.transcript)
      } catch (error) {
        console.error("Error:", error.message);
      } finally {
        setLoading(false);
      }
    };

    reader.readAsDataURL(blob); // Convert blob to Base64 string
  };

  return (
    <Tooltip
      title={
        isRecording
          ? "Recording... Click again to stop."
          : "Click to start voice recording."
      }
      arrow
    >
      <span>
        <IconButton
          onClick={handleMicClick}
          color={isRecording ? "secondary" : "primary"}
          disabled={loading} 
        >
          {isRecording ? (<StopIcon />) : (<MicIcon />)}
          {loading && <CircularProgress size={24} sx={{ position: "absolute" }} />}
        </IconButton>
      </span>
    </Tooltip>
  );
};

export default AudioRecorderComponent;
