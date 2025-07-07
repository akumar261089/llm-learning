# ✍ Text Completion API with FastAPI

The **Text Completion API** enables you to generate coherent text completions using Azure OpenAI's Large Language Models (LLM). Whether you're writing stories, generating marketing copy, or assisting in creative tasks, this API is the perfect starting point to add AI-powered text generation to your workflows.

This project uses **FastAPI** as the backend framework and includes modular components for easy customization and scalability.

---

## 📚 Overview

### What is Text Completion?

Text completion is a common use case of large language models where you provide a partial input (called a _prompt_), and the model generates the continuation of that input. This is ideal for applications like:

- Creative writing
- Brainstorming ideas
- Automated document drafting
- Generating responses for conversational agents

---

## 🔥 Features

- **Azure OpenAI Integration**: Leverages Azure's GPT-based LLM for generating completions.
- **Highly Configurable**: Control `max_tokens`, `temperature`, and `top_p` for fine-tuning output behavior.
- **Interactive Documentation**: Explore and test the API interactively via [Swagger UI](http://127.0.0.1:8000/docs).
- **Error Handling**: Robust error-handling mechanisms for invalid inputs and API issues.
- **Expandable**: Future-ready backend that can integrate with React-based UI or other components.

---

## 🚀 Setup Instructions

### Prerequisites

- Python 3.8+ installed
- Azure OpenAI resource set up with an active deployment
- API Key and endpoint from Azure OpenAI Portal

### Installation

Clone the repository and install the dependencies:

```bash
git clone <repository_url>
cd 1.Text-Completion
pip install -r requirements.txt
```

### Environment Variables

Create a `.env` file in the root directory:

```plaintext
AZURE_OPENAI_ENDPOINT=https://<your-endpoint>.openai.azure.com/
AZURE_OPENAI_DEPLOYMENT=<deployment-name>
AZURE_API_VERSION=2023-07-01-preview
AZURE_SUBSCRIPTION_KEY=<your-api-key>
```

Replace `<your-endpoint>`, `<deployment-name>`, and `<your-api-key>` with your actual Azure OpenAI settings.

### Run the Application

Start the FastAPI server with Uvicorn:

```bash
uvicorn app.main:app --reload
```

Visit **[http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)** to explore the API using FastAPI’s interactive Swagger UI.

---

## ⚙️ API Usage

### Endpoint

`POST /text-completion`

### Request Body (JSON Format)

- **`prompt`** _(required)_: A list of messages forming the conversation (e.g., system instructions, user queries). Each message contains:
  - `role`: The role of the message (`"system"`, `"user"`, or `"assistant"`).
  - `content`: The text content of the message.
- **`max_tokens`** _(optional)_: Maximum length of the AI-generated response. Default is `100`.
- **`temperature`** _(optional)_: Controls the creativity of the output (`0.0` is deterministic, `1.0` is highly creative). Default is `0.7`.
- **`top_p`** _(optional)_: Controls the "nucleus sampling" strategy, where the model focuses on the most probable tokens. Default is `0.95`.

### Example CURL Command

```bash
curl -X POST "http://127.0.0.1:8000/text-completion" \
-H "Content-Type: application/json" \
-d '{
  "prompt": [
    {"role": "system", "content": "You are a helpful assistant for creative writing."},
    {"role": "user", "content": "Once upon a time in a small village, there was a"}
  ],
  "max_tokens": 50,
  "temperature": 0.7,
  "top_p": 0.95
}'
```

### Example Response

```json
{
  "completion": "young artist who dreamed of painting the most beautiful sunrise. Every day, they practiced endlessly, inspired by the rolling hills and golden rays that surrounded their village."
}
```

---

## 🔍 Examples to Try

Here are a variety of example prompts designed to showcase the power of text completion for different use cases.

---

### 1️⃣ **Storytelling**

- **Prompt**:
  ```json
  [
    { "role": "system", "content": "You are a storyteller." },
    {
      "role": "user",
      "content": "Write a magical story about a dragon that protects a hidden treasure."
    }
  ]
  ```
- **Expected Output**:
  ```text
  Deep within the misty mountains, a mystical blue dragon guarded a treasure hidden for centuries. It was said that the treasure contained jewels capable of granting immortality. Villagers whispered tales of the dragon, its shimmering scales reflecting the morning sun, and the brave souls who dared to seek the treasure never returned...
  ```

---

### 2️⃣ **Email Drafting**

- **Prompt**:
  ```json
  [
    {
      "role": "system",
      "content": "You are an assistant specialized in writing professional emails."
    },
    {
      "role": "user",
      "content": "Draft a follow-up email after a job interview thanking the employer."
    }
  ]
  ```
- **Expected Output**:

  ```text
  Subject: Thank You for the Opportunity

  Dear [Employer's Name],

  I hope this email finds you well. I wanted to take a moment to thank you for the opportunity to interview for the [Position Name] role at [Company Name]. It was a pleasure speaking with you and learning more about the exciting work your team is doing.
  ...
  ```

---

### 3️⃣ **Brainstorming Ideas**

- **Prompt**:
  ```json
  [
    { "role": "system", "content": "You are a creative assistant." },
    {
      "role": "user",
      "content": "Give me 3 ideas for a science fiction novel."
    }
  ]
  ```
- **Expected Output**:
  ```text
  1. In a post-apocalyptic world, a group of astronauts returns to Earth after 50 years in space, only to find humanity living under the rule of AI overlords.
  2. A scientist discovers a way to clone consciousness but begins losing track of whether they are the original or a clone.
  3. An alien race invades Earth with a unique demand: they seek Earth's art and literature instead of resources or territory.
  ```

---

### 4️⃣ **Generating Product Descriptions**

- **Prompt**:
  ```json
  [
    {
      "role": "system",
      "content": "You are an assistant for creating product descriptions."
    },
    {
      "role": "user",
      "content": "Write a compelling product description for a smartwatch."
    }
  ]
  ```
- **Expected Output**:
  ```text
  Stay connected and on top of your goals with the SmartPro X2 Smartwatch. Featuring a sleek design, customizable watch faces, advanced fitness tracking, and seamless smartphone integration, the SmartPro X2 is your ultimate daily companion. Monitor your health, receive notifications, and stay active—all while looking stylish.
  ```

---

### 5️⃣ **Coding Assistance**

- **Prompt**:
  ```json
  [
    { "role": "system", "content": "You are a coding assistant." },
    {
      "role": "user",
      "content": "Write Python code for a function that calculates the factorial of a number."
    }
  ]
  ```
- **Expected Output**:
  ```python
  def factorial(n):
      if n == 0 or n == 1:
          return 1
      return n * factorial(n - 1)
  ```

---

## 🛠 Challenges & Improvements

### Challenges

- Coherence: Ensuring completions remain consistent and contextually aligned with the prompt.
- Hallucinations: Avoiding outputs that inject irrelevant or factually incorrect information.

### Future Improvements

1. **React UI Integration**: Add a user-friendly frontend for seamless interaction.
2. **Custom Fine-Tuning**: Fine-tune the LLM for specific domains like marketing content or legal writing.
3. **Example Database**: Preload real-world examples for users to test and customize.
4. **Analytics**: Log and analyze completions for user feedback and optimization.

---

## 📖 Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Azure OpenAI Service Documentation](https://learn.microsoft.com/en-us/azure/cognitive-services/openai/)
- [Text Completion Use Cases](https://platform.openai.com/examples/)

---

Happy building! 🚀 😊

```

```
