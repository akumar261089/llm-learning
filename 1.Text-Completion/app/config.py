import os
from dotenv import load_dotenv

# Load environment variables from `.env` file
load_dotenv()

# Azure OpenAI Configuration
AZURE_OPENAI_ENDPOINT = os.getenv("AZURE_OPENAI_ENDPOINT", "https://<your-endpoint>.openai.azure.com/")
AZURE_OPENAI_DEPLOYMENT = os.getenv("AZURE_OPENAI_DEPLOYMENT", "<deployment-name>")
AZURE_API_VERSION = os.getenv("AZURE_API_VERSION", "2023-07-01-preview")
AZURE_SUBSCRIPTION_KEY = os.getenv("AZURE_SUBSCRIPTION_KEY", "<your-api-key>")