### Run FastAPI Application with UVicorn

Start the FastAPI application locally with live reloading:

```bash
uvicorn main:app --reload
```

---

### Check Ollama API Documentation

To explore available tags in the Ollama API, use the following endpoint:

```
http://ollamahost:11434/api/tags
```

---

### Generate Response from Ollama API

Send a `POST` request to the Ollama API to generate a response using the `llama3.2:latest` model. Here's an example using `curl`:

```bash
curl -X POST "http://ollamahost:11434/api/generate" \
-H "Content-Type: application/json" \
-d '{
  "model": "llama3.2:latest",
  "prompt": "Tell me something cool about artificial intelligence.",
  "max_tokens": 50,
  "temperature": 0.7
}'
```

---

### Forward Request to FastAPI Endpoint

Send a formatted request from FastAPI to the Ollama LLM endpoint. The message includes a system instruction and user input:

```bash
curl -X POST "http://127.0.0.1:8000/ollama-llm/" \
-H "Content-Type: application/json" \
-d '{
  "prompt": [
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": "Tell me something cool about artificial intelligence."}
  ],
  "max_tokens": 50,
  "temperature": 0.7
}'
```

---

### Key Notes

- **UVicorn Command**: Initiates the FastAPI app with automatic reload.
- **Ollama Tags Endpoint**: Useful for retrieving supported tags and models.
- **Ollama API Request**: Demonstrates LLM query configuration with parameters like `model`, `prompt`, `max_tokens`, and `temperature`.
- **FastAPI to Ollama Forwarding**: Showcases integration between FastAPI and Ollama's LLM service with conversational context.

---
