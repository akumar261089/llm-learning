from pydantic import BaseModel
from typing import List

class Message(BaseModel):
    role: str  # E.g., system, user, or assistant
    content: str  # The textual content of the message

class LLMRequest(BaseModel):
    prompt: List[Message]  # List of messages forming the conversation history
    max_tokens: int = 100  # Maximum length of completion response
    temperature: float = 0.7  # Determines creativity level
    top_p: float = 0.95  # Determines sampling strategy

class LLMResponse(BaseModel):
    completion: str  # Generated completion output