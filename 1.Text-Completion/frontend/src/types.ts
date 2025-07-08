export interface Role {
  id: string;
  name: string;
  description: string;
  systemPrompt: string;
  icon: string;
}

export interface CompletionParams {
  temperature: number;
  maxTokens: number;
  topP: number;
}

export interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface CompletionRequest {
  prompt: Message[];
  max_tokens: number;
  temperature: number;
  top_p: number;
}

export interface CompletionResponse {
  text: string;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  roleName: string;
  userInput: string;
  completion: string;
  params: CompletionParams;
}

export interface Theme {
  id: string;
  name: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    gradient: string;
    buttonGradient: string;
    sliderGradient: string;
  };
}