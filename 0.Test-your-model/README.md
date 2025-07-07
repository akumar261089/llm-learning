# 🚀 0. Test Your LLM with FastAPI

This project provides a simple and easy-to-use FastAPI-based interface to test Large Language Model (LLM) capabilities. Using this lightweight system, you can interact with LLMs in a structured way by sending prompts and receiving completions programmatically.

The FastAPI framework is used to build and host a RESTful API for interacting with your Azure-hosted LLM (or any other LLM service). You can customize the model settings like `temperature`, `max_tokens`, and `top_p` for fine-tuned generation.

---

## 🛠️ Setup and Run Instructions

### Prerequisites

- Python 3.8 or higher.
- Dependencies installed (FastAPI, Uvicorn, etc.).
- Azure LLM API key or equivalent API key if you're integrating another LLM.

### Install Dependencies

First, make sure the required libraries are installed. Use the following command:

```bash
pip install -r requirements.txt
```

> If you don’t already have a `requirements.txt` file, include the necessary libraries:

```bash
fastapi
uvicorn
openai
```

### Run the Application

Start the FastAPI application using Uvicorn:

```bash
uvicorn main:app --reload
```

This will start the application and host it at `http://127.0.0.1:8000`.

---

## 🧪 How to Use

Once the FastAPI server is running, you can interact with the API using tools like `curl`, Postman, or programmatically through Python or other HTTP clients.

### Example `curl` Command

Here’s an example of how to send a POST request to the `/azure-llm/` endpoint using `curl`:

```bash
curl -X POST "http://127.0.0.1:8000/azure-llm/" \
-H "Content-Type: application/json" \
-d '{
  "prompt": [
      {"role": "system", "content": "You are an AI assistant."},
      {"role": "user", "content": "What is the capital of France?"}
  ],
  "max_tokens": 50,
  "temperature": 0.7,
  "top_p": 0.95
}'
```

> **Result:**

```json
{ "completion": "The capital of France is **Paris**." }
```

---

## 🔍 API Details

### Endpoint: `/azure-llm/`

#### Method: `POST`

#### Request Body (JSON Format)

- **`prompt`** _(Required)_: A structured list of messages for the LLM. Typically includes `"system"`, `"user"`, or `"assistant"` roles to guide the model.
  - Example:
    ```json
    [
      { "role": "system", "content": "You are an AI assistant." },
      { "role": "user", "content": "What is the capital of France?" }
    ]
    ```
- **`max_tokens`** _(Optional)_: The maximum number of tokens to generate for the response.
  - Default: `50`
- **`temperature`** _(Optional)_: Controls the creativity/randomness of responses. Values between `0.0` (deterministic) and `1.0` (creative).
  - Default: `0.7`
- **`top_p`** _(Optional)_: Controls "nucleus sampling." Only the most probable word distributions (up to `top_p`) are considered.
  - Default: `0.95`

#### Example Request:

```json
{
  "prompt": [
    { "role": "system", "content": "You are an AI assistant." },
    { "role": "user", "content": "What is the capital of France?" }
  ],
  "max_tokens": 50,
  "temperature": 0.7,
  "top_p": 0.95
}
```

#### Example Response:

```json
{
  "completion": "The capital of France is **Paris**."
}
```

---

## 🖥️ Example Use Cases

Here are some example prompts you can try on the `/azure-llm/` endpoint:

### 1. General Knowledge

**Request (JSON):**

```json
{
  "prompt": [
    { "role": "system", "content": "You are an AI assistant." },
    { "role": "user", "content": "What is the tallest mountain in the world?" }
  ],
  "max_tokens": 50,
  "temperature": 0.5,
  "top_p": 0.9
}
```

**Response:**

```json
{
  "completion": "The tallest mountain in the world is Mount Everest, standing at 8,848 meters above sea level."
}
```

---

### 2. Creative Writing

**Request (JSON):**

```json
{
  "prompt": [
    { "role": "system", "content": "You are a creative assistant." },
    { "role": "user", "content": "Write a short poem about the ocean." }
  ],
  "max_tokens": 50,
  "temperature": 0.9,
  "top_p": 0.95
}
```

**Response:**

```json
{
  "completion": "Beneath the waves, a world so deep, where secrets of the ocean sleep. The currents hum, a timeless tune, lit gently by the silver moon."
}
```

---

### 3. Coding Assistance

**Request (JSON):**

```json
{
  "prompt": [
    { "role": "system", "content": "You are a coding assistant." },
    {
      "role": "user",
      "content": "Write a Python function to calculate the sum of an array of numbers."
    }
  ],
  "max_tokens": 50,
  "temperature": 0.3,
  "top_p": 1.0
}
```

**Response:**

```json
{
  "completion": "def calculate_sum(numbers):\n    return sum(numbers)"
}
```

---

### 4. Sentiment Analysis

**Request (JSON):**

```json
{
  "prompt": [
    { "role": "system", "content": "You are a sentiment analysis tool." },
    {
      "role": "user",
      "content": "I love this product! It's amazing and works perfectly."
    }
  ],
  "max_tokens": 50,
  "temperature": 0.4,
  "top_p": 0.9
}
```

**Response:**

```json
{
  "completion": "The sentiment is positive."
}
```

---

## 📋 Features

- **Customizable Inputs:** Fine-tune outputs by adjusting parameters such as `temperature`, `max_tokens`, and `top_p`.
- **JSON-Based API:** Standardized input and output formats for seamless integration.
- **FastAPI Framework:** Scalable and efficient implementation for testing LLMs locally or in production.
- **Modular Design:** Easily extend the API to include additional endpoints as needed.

---

## 🚀 Future Improvements

- Add support for **batch requests** to process multiple prompts in one API call.
- Log API usage for debugging and analytics.
- Add authentication for secure access to the API.
- Provide Swagger documentation for easier API exploration.

---

## 📖 Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [OpenAI API Documentation](https://platform.openai.com/docs/)
- [Azure OpenAI Service](https://learn.microsoft.com/en-us/azure/cognitive-services/openai/)

---

Start experimenting and exploring the power of LLMs! 🎉

---

This `README.md` follows a clean and comprehensive structure, providing a user with everything they need to understand, run, and use the API effectively. You can copy-paste this directly into your `README.md` file on GitHub! Let me know if you need further improvements or customizations. 😊
