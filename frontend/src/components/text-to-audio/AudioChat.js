import { useState, useEffect } from "react";
import removeMarkdown from "remove-markdown";
import { Button } from "@mui/material";
import AudioRecorderComponent from "../voice/AudioRecorder";
import TextToAudio from "./TextToAudio";
import axios from "axios";
function AudioChat({ token, apiEndpoint, context, gptResponse, setGptResponse }) {
    // context contains the diagram explanation
    // UserPrompt is the latest input from the user
    const [currentlyRecordingId, setCurrentlyRecordingId] = useState(123);
    const [isNewPrompt, setIsNewPrompt] = useState(false); // audio prompt from the recording
    const [isAudioPlaying, setIsAudioPlaying] = useState(true); // audio prompt from the recording


    useEffect(() => {
       setIsNewPrompt(true)
    }, [gptResponse]);

    useEffect(() => {
       console.log(isAudioPlaying)
    }, [isAudioPlaying]);
    const handleInputChange = async (question_id, response, category) => {
        //pass prompt to the gpt
        handlePromptChange(response)
    };

    const handlePromptChange = async (prompt) => {
        setIsNewPrompt(false)
        const diagramQuestionPrompt = `
            You are an expert assistant helping users understand diagrams or images.

            INSTRUCTIONS:
            - Answer the user's question about the diagram or image using only the provided explanation.
            - If the explanation does not contain enough information, reply with: The image does not provide enough information to answer this question.
            - Respond only in plain text. Do not use any formatting, symbols, bullet points, or special characters.

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
        setGptResponse(removeMarkdown(data))
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
            fullWidth
            sx={{ mb: 1 }}
            disabled={isAudioPlaying}
        >
            Chat with Audio
            <AudioRecorderComponent question={question} setIsAudioPlaying={setIsAudioPlaying} handleInputChange={handleInputChange} currentlyRecordingId={currentlyRecordingId} setCurrentlyRecordingId={setCurrentlyRecordingId} />
        </Button>

        {isNewPrompt && (
            <TextToAudio explanation={gptResponse} isAudioPlaying={isAudioPlaying} setIsAudioPlaying={setIsAudioPlaying}/>
        )}
        
        </>


    );
}

export default AudioChat;
