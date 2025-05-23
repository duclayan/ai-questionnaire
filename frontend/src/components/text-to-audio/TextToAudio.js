import{ useState, useEffect } from 'react';
import { useSpeechSynthesis } from "react-speech-kit";

function TextToAudio({ explanation }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const { speak, cancel } = useSpeechSynthesis();
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
}

export default TextToAudio;
