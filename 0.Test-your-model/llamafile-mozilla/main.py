from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Union, Optional
import requests  # Synchronous HTTP request library
import os
from dotenv import load_dotenv

# Load environment variables from `.env`
load_dotenv()

# LLaMAfiler Configuration via .env
LLAMA_URL = os.getenv("LLAMA_URL", "http://localhost:8081/v1/completions")  # Replace with your server URL
LLAMA_AUTH_TOKEN = os.getenv("LLAMA_AUTH_TOKEN", "no-key")  # Replace with an appropriate authorization token
LLAMA_MODEL = os.getenv("LLAMA_MODEL", "LLaMA_CPP")  # Default model name; adjust as needed

# Initialize FastAPI
app = FastAPI()


# Define Request and Response Models
class LLMRequest(BaseModel):
    model: str = LLAMA_MODEL  # Specify the model name from the environment or default
    prompt: str  # Prompt text for the completion
    max_tokens: Optional[int] = 100  # Maximum number of tokens to generate
    temperature: Optional[float] = 0.7  # Controls randomness (valid range: 0.0 - 2.0)
    top_p: Optional[float] = 1.0  # Top probability for sampling (valid range: 0.0 - 1.0)
    seed: Optional[int] = None  # Fixed seed for deterministic responses
    stream: Optional[bool] = False  # Enable or disable response streaming
    presence_penalty: Optional[float] = 0.0  # Penalize based on token presence
    frequency_penalty: Optional[float] = 0.0  # Penalize based on token frequency
    stop: Optional[Union[str, List[str]]] = None  # Stop sequences to end text generation
    user: Optional[str] = None  # Unique user identifier (if needed for abuse tracking)


class LLMResponse(BaseModel):
    completion: str  # The generated completion text


# Endpoint to interact with LLaMAfiler API
@app.post("/llamafiler-completions/", response_model=LLMResponse)
def generate_completions(request: LLMRequest):
    """
    Interacts with the LLaMAfiler completion endpoint to generate text based on the provided prompt.
    """

    # Construct the payload from the LLMRequest model
    payload = {
        "model": request.model,
        "prompt": request.prompt,
        "max_tokens": request.max_tokens,
        "temperature": request.temperature,
        "top_p": request.top_p,
        "seed": request.seed,
        "presence_penalty": request.presence_penalty,
        "frequency_penalty": request.frequency_penalty,
        "stop": request.stop,
        "stream": request.stream,
        "user": request.user,
    }

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {LLAMA_AUTH_TOKEN}",
    }

    print(f"Sending request to LLaMAfiler at {LLAMA_URL}")
    print(f"Payload: {payload}")

    try:
        # Make a POST request to the API
        response = requests.post(LLAMA_URL, json=payload, headers=headers)

        # Log the response status for debugging purposes
        print(f"Response status code: {response.status_code}")
        if response.status_code != 200:
            print(f"Error response: {response.text}")

        # Raise an error for non-200 responses
        response.raise_for_status()

        # Parse the response JSON
        data = response.json()

        # Extract the completion text from the "choices" array
        choices = data.get("choices", [])
        if not choices:
            raise HTTPException(
                status_code=500,
                detail="No choices were returned by the LLaMAfiler API.",
            )

        completion = choices[0].get("text", "").strip()
        print(f"Generated completion: {completion}")

        # Return the generated text to the client
        return LLMResponse(completion=completion)

    except requests.exceptions.RequestException as e:
        # Handle request exceptions (e.g., connection errors, timeouts)
        print(f"RequestException: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"An error occurred while communicating with LLaMAfiler: {str(e)}"
        )

    except Exception as e:
        # Handle generic exceptions
        print(f"Unexpected error: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"An unexpected error occurred: {str(e)}"
        )