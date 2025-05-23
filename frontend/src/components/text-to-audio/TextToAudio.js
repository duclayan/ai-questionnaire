import { useEffect, useState } from 'react';

function TextToAudio({ explanation, setIsAudioPlaying }) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setIsPlaying(true);
    setIsAudioPlaying(true);
  }, []);

  useEffect(() => {
    if (explanation && isPlaying) {
      // Create the utterance
      const utterance = new window.SpeechSynthesisUtterance(explanation);

      // Attach the event listener
      utterance.addEventListener('end', () => {
        setIsPlaying(false);
        setIsAudioPlaying(false);
      });

      // Speak the utterance
      window.speechSynthesis.speak(utterance);

      // Cleanup: cancel speech if component unmounts or explanation changes
      return () => {
        window.speechSynthesis.cancel();
      };
    }
  }, [explanation, isPlaying]);

  // Stop speech on page refresh or unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      window.speechSynthesis.cancel();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.speechSynthesis.cancel();
    };
  }, []);

  return null;
}

export default TextToAudio;
