from fastapi import FastAPI, HTTPException
from app.models import LLMRequest, LLMResponse
from app.services.completion_service import get_completion

# Initialize the FastAPI app
app = FastAPI(
    title="Text Completion API",
    description="A FastAPI-based implementation for text completion using Azure OpenAI.",
    version="1.0.0"
)

@app.post("/text-completion", response_model=LLMResponse)
async def text_completion(request: LLMRequest):
    """
    Endpoint to generate text completions using Azure OpenAI.
    """
    try:
        completion = await get_completion(request)
        return LLMResponse(completion=completion)
    except HTTPException as e:
        # Rethrow FastAPI exceptions
        raise e
    except Exception as e:
        # Catch all other exceptions
        raise HTTPException(status_code=500, detail=str(e))