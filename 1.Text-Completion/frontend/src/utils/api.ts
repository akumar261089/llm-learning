import { CompletionRequest, CompletionResponse } from '../types';

export class APIError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'APIError';
  }
}

export async function fetchCompletion(request: CompletionRequest): Promise<CompletionResponse> {
  try {
    const response = await fetch('http://127.0.0.1:8000/text-completion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new APIError(
        errorData.message || `HTTP error! status: ${response.status}`,
        response.status
      );
    }

    const data = await response.json();
    // Handle both 'completion' and 'text' response formats
    return {
      text: data.completion || data.text || '',
      usage: data.usage
    };
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    throw new APIError(
      error instanceof Error ? error.message : 'An unexpected error occurred'
    );
  }
}