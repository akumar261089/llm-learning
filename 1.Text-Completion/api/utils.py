from api.models import Message

def format_prompt(messages: list[Message]) -> list:
    """
    Format messages (list of Message objects) into the format required by Azure OpenAI API.
    """
    return [message.dict() for message in messages]