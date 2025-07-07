import httpx
from fastapi import HTTPException
from app.models import LLMRequest
from app.config import (
    AZURE_OPENAI_ENDPOINT,
    AZURE_OPENAI_DEPLOYMENT,
    AZURE_API_VERSION,
    AZURE_SUBSCRIPTION_KEY
)
from app.utils import format_prompt

async def get_completion(request: LLMRequest) -> str:
    """
    Call Azure OpenAI API with the given LLMRequest parameters.
    """
    # Construct Azure OpenAI API URL
    url = f"{AZURE_OPENAI_ENDPOINT}openai/deployments/{AZURE_OPENAI_DEPLOYMENT}/chat/completions?api-version={AZURE_API_VERSION}"
    
    # Headers for Azure OpenAI API
    headers = {
        "Content-Type": "application/json",
        "api-key": AZURE_SUBSCRIPTION_KEY,
    }

    # Construct the payload
    payload = {
        "messages": format_prompt(request.prompt),
        "max_tokens": request.max_tokens,
        "temperature": request.temperature,
        "top_p": request.top_p,
    }

    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(url, json=payload, headers=headers)
            response.raise_for_status()  # Raise exception for HTTP errors
            data = response.json()
            # Extract response content
            completion = data.get("choices", [{}])[0].get("message", {}).get("content", "")
            if not completion:
                raise HTTPException(status_code=500, detail="Completion is empty.")
            return completion
    except httpx.HTTPStatusError as err:
        raise HTTPException(
            status_code=err.response.status_code,
            detail=f"Azure OpenAI API HTTP Error: {err.response.text}"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")