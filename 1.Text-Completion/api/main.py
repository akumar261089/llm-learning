from fastapi import FastAPI, HTTPException
from api.models import LLMRequest, LLMResponse
from api.services.completion_service import get_completion
from fastapi.middleware.cors import CORSMiddleware

# Initialize the FastAPI app
app = FastAPI(
    title="Text Completion API",
    description="A FastAPI-based implementation for text completion using Azure OpenAI.",
    version="1.0.0"
)
# Setup CORS
origins = [
    "http://localhost:3000"
    
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/text-completion", response_model=LLMResponse)
async def text_completion(request: LLMRequest):
    """
    Endpoint to generate text completions using Azure OpenAI.
    """
    try:
        print(request)
        completion = await get_completion(request)
        return  {"completion": completion}
    except HTTPException as e:
        # Rethrow FastAPI exceptions
        raise e
    except Exception as e:
        # Catch all other exceptions
        raise HTTPException(status_code=500, detail=str(e))