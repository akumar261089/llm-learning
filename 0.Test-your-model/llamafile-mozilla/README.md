# LLaMAfiler Server Instructions

### **1. Start the LLaMAfiler Server**

Run the following command to start the LLaMAfiler server on `0.0.0.0` (listen on all interfaces) and port `8081` using the specified model:

```bash
./llava-v1.5-7b-q4.llamafile --server --v2 -l 0.0.0.0:8081
```

---

### **2. Test the LLaMAfiler Server**

After starting the server, use `curl` to send a POST request to verify that it’s working.

#### **Example Test Request**

Replace `SERVER` with the server’s IP or hostname (e.g., `127.0.0.1` for localhost):

```bash
curl -X POST "http://SERVER:8081/v1/completions" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer no-key" \
-d '{
  "model": "LLaMA_CPP",
  "prompt": "You are a helpful assistant. Explain machine learning.",
  "max_tokens": 100,
  "temperature": 0.7,
  "top_p": 1.0,
  "presence_penalty": 0.0,
  "frequency_penalty": 0.0,
  "stream": false
}'
```

#### **Expected Output**

If the server is running correctly, it will respond with a JSON object similar to this:

```json
{
  "choices": [
    {
      "index": 0,
      "text": "\n\nMachine Learning is a type of artificial intelligence...",
      "finish_reason": "length",
      "logprobs": null
    }
  ],
  "created": 1752040729,
  "id": "cmpl-5n0qapdkcmjo2huvkhk4hhni",
  "model": "LLaMA_CPP",
  "object": "text_completion",
  "usage": {
    "completion_tokens": 100,
    "prompt_tokens": 12,
    "total_tokens": 112
  }
}
```

This confirms the server is running and processing requests correctly.

---

### **3. Test Through an API Endpoint**

If you’ve created a FastAPI server as a wrapper (e.g., `/llamafiler-completions/`), you can test the API endpoint with this `curl` command.

#### **Example Test Request**

```bash
curl -X POST "http://127.0.0.1:8000/llamafiler-completions/" \
-H "Content-Type: application/json" \
-d '{
  "model": "LLaMA_CPP",
  "prompt": "You are a helpful assistant. Explain machine learning.",
  "max_tokens": 100,
  "temperature": 0.7,
  "top_p": 1.0,
  "presence_penalty": 0.0,
  "frequency_penalty": 0.0,
  "stream": false
}'
```

#### **Expected Output**

Similar to the direct request to the LLaMAfiler server, the wrapper API should return:

```json
{
  "completion": "\n\nMachine Learning is a type of artificial intelligence..."
}
```

---

### **Notes**

- **Server:** Use `0.0.0.0` to allow access from external systems. Restrict to `127.0.0.1` for local-only access.
- **Authorization:** `Bearer no-key` is used as a placeholder token. Update this to your actual token if authentication is required.
- **Debugging:** Ensure the LLaMAfiler server is running and reachable on `http://SERVER:8081` before testing with the wrapper API.

---
