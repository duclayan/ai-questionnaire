import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { Box, Button } from '@mui/material';
import { useSpeechSynthesis } from "react-speech-kit";

function TextToAudio({ explanation }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const { speak, cancel, onEnd } = useSpeechSynthesis();
  const [prevExplanationRef, setPreviousExplanation] = useState(false);
  // const prevExplanationRef = useRef();
  useEffect(() => {
    setIsPlaying(true)
  }, []);

  // Autoplay explanation when component mounts or when explanation changes
  useEffect(() => {

    if (explanation && isPlaying) {
      speak({ text: explanation });
    }
    // Cleanup: cancel speech on unmount
    return () => cancel()

  }, [isPlaying]); // <-- Empty dependency array: only runs on mount/unmount

  // Play handler (only if not already played)
  const handlePlay = (status) => {
    if (explanation && status) {
      speak({
        text: explanation,
        onEnd: () => setHasPlayed(true)
      });
      setIsPlaying(true)
    } else {
      cancel()
      setIsPlaying(false)
    }
  };
}

export default TextToAudio;
