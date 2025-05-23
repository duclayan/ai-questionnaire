import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import MicIcon from '@mui/icons-material/Mic';
import AudioRecorderComponent from "../voice/AudioRecorder";
import TextToAudio from "./TextToAudio";
import axios from "axios";
function AudioChat({ token, apiEndpoint, context, gptResponse, setGptResponse }) {
    // context contains the diagram explanation
    // UserPrompt is the latest input from the user
    const [currentlyRecordingId, setCurrentlyRecordingId] = useState(123);
    const [prompt, setPrompt] = useState(""); // audio prompt from the recording
    const [isNewPrompt, setIsNewPrompt] = useState(false); // audio prompt from the recording


    useEffect(() => {
       setIsNewPrompt(true)
    }, [gptResponse]);
    const handleInputChange = async (question_id, response, category) => {
        // set prompt to the text from audio
        setPrompt(response)
        //pass prompt to the gpt
        handlePromptChange(response)
    };

    const handlePromptChange = async (prompt) => {
        setIsNewPrompt(false)
        const diagramQuestionPrompt = `
            You are an expert assistant helping users understand diagrams or images.

            INSTRUCTIONS:
            - Answer the user's question about the diagram or image.
            - Base your answer on the provided explanation.
            - If the explanation is insufficient, say "The image does not provide enough information to answer this question."

            CONTEXT:
            Explanation:
            """
            ${context}
            """

            USER QUESTION:
            """
            ${prompt}
            """
            `
        const apiUrl = `${apiEndpoint}/api/gpt-omini/`;
        const response = await axios.post(
            apiUrl,
            {
                text: diagramQuestionPrompt,
            },
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );
        const data = response.data.generated_text;
        // set the gpt response to the response received from text
        // this gpt response will be played as audio
        setGptResponse(data)
    }


    const question = {
        question_id: 123,
        category: "general",
        prompt: "Information about the ",
        question: ""
    }

    return (
        <>
            <Button
            variant="contained"
            component="label"
            startIcon={<MicIcon />}
            fullWidth
            sx={{ mb: 1 }}
        >
            Chat with Audio
            <AudioRecorderComponent question={question} handleInputChange={handleInputChange} currentlyRecordingId={currentlyRecordingId} setCurrentlyRecordingId={setCurrentlyRecordingId} />
        </Button>

        {isNewPrompt && (
            <TextToAudio explanation={gptResponse} />
        )}
        
        </>


    );
}

export default AudioChat;
