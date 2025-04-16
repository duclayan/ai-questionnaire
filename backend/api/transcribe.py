import os
import asyncio
from pathlib import Path
from openai import AzureOpenAI

async def transcribe_audio(path) -> str:
    """
    Transcribes an audio file using Azure OpenAI's Whisper model.

    Args:
        file_path (str): The path to the audio file to be transcribed.
        azure_endpoint (str): The Azure OpenAI endpoint. Defaults to environment variable if not provided.
        api_key (str): The Azure OpenAI API key. Defaults to environment variable if not provided.

    Returns:
        str: The transcription of the audio file.
    """
    # Change this to calling the env 
    file_path = path
    
    # Get Azure OpenAI credentials from parameters or environment
    azure_endpoint = os.environ.get("WHISPER_AZURE_OPENAI_ENDPOINT")
    api_key = os.environ.get("WHISPER_AZURE_OPENAI_API_KEY")
    api_version = os.environ.get("WHISPER_AZURE_OPENAI_VERSION")
    api_model = os.environ.get("WHISPER_AZURE_OPENAI_DEPLOYMENT")

    # Validate the file exists and has a supported extension
    path = Path(file_path)
    if not path.exists():
        raise FileNotFoundError(f"File not found: {file_path}")
        
    if path.suffix.lower() not in ['.mp3', '.webm']:
        raise ValueError(f"Unsupported file format: {path.suffix}. Only .mp3 and .webm are supported.")

    
    if not azure_endpoint or not api_key:
        raise ValueError("Azure OpenAI endpoint and API key must be provided either as parameters or environment variables")
    
    # Initialize the Azure OpenAI client
    client = AzureOpenAI(
        azure_endpoint=azure_endpoint, 
        api_key=api_key,
        api_version=api_version
    )

    # Read the audio file and transcribe it
    try:
        with open(file_path, "rb") as audio_file:
            transcript = client.audio.transcriptions.create(
                model=api_model,
                file=audio_file,
                response_format="text"
            )
            return transcript
    except Exception as e:
        raise RuntimeError(f"Transcription failed: {e}")
