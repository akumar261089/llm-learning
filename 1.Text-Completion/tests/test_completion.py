from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_text_completion_success():
    """
    Test the /text-completion endpoint for a successful response.
    """
    payload = {
        "prompt": [
            {"role": "system", "content": "You are an AI assistant."},
            {"role": "user", "content": "Complete this text: Once upon a time, there was a"}
        ],
        "max_tokens": 50,
        "temperature": 0.7,
        "top_p": 0.95
    }
    response = client.post("/text-completion", json=payload)
    assert response.status_code == 200
    assert "completion" in response.json()

def test_text_completion_invalid_request():
    """
    Test the /text-completion endpoint for an invalid request.
    """
    payload = {
        "prompt": "This is invalid input, should be a list of messages.",  # Invalid format
        "max_tokens": 50,
        "temperature": 0.7,
        "top_p": 0.95
    }
    response = client.post("/text-completion", json=payload)
    assert response.status_code == 422  # Unprocessable Entity