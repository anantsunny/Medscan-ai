export interface ProviderInfo {
  name: string;
  id: string;
  baseUrl: string;
  visionSupport: boolean;
  freeTier: boolean | "limited";
  exampleModels: string[];
  website: string;
}

export const PROVIDERS: ProviderInfo[] = [
  {
    id: "openrouter",
    name: "OpenRouter",
    baseUrl: "https://openrouter.ai/api/v1",
    visionSupport: true,
    freeTier: true,
    exampleModels: [
      "anthropic/claude-3-5-sonnet",
      "openai/gpt-4o",
      "google/gemini-2.0-flash",
    ],
    website: "https://openrouter.ai",
  },
  {
    id: "openai",
    name: "OpenAI",
    baseUrl: "https://api.openai.com/v1",
    visionSupport: true,
    freeTier: false,
    exampleModels: ["gpt-4o", "gpt-4-turbo", "gpt-4o-mini"],
    website: "https://platform.openai.com",
  },
  {
    id: "anthropic",
    name: "Anthropic",
    baseUrl: "https://api.anthropic.com/v1",
    visionSupport: true,
    freeTier: false,
    exampleModels: ["claude-3-5-sonnet-20241022", "claude-opus-4"],
    website: "https://www.anthropic.com",
  },
  {
    id: "groq",
    name: "Groq",
    baseUrl: "https://api.groq.com/openai/v1",
    visionSupport: true,
    freeTier: true,
    exampleModels: ["llama-3.3-70b-versatile", "mixtral-8x7b-32768"],
    website: "https://console.groq.com",
  },
  {
    id: "xai",
    name: "xAI (Grok)",
    baseUrl: "https://api.x.ai/v1",
    visionSupport: true,
    freeTier: "limited",
    exampleModels: ["grok-2-vision-1212", "grok-3"],
    website: "https://x.ai",
  },
  {
    id: "gemini",
    name: "Google Gemini",
    baseUrl: "https://generativelanguage.googleapis.com/v1beta/openai",
    visionSupport: true,
    freeTier: true,
    exampleModels: ["gemini-2.0-flash", "gemini-1.5-pro"],
    website: "https://aistudio.google.com",
  },
  {
    id: "mistral",
    name: "Mistral AI",
    baseUrl: "https://api.mistral.ai/v1",
    visionSupport: true,
    freeTier: false,
    exampleModels: ["pixtral-12b-2409", "mistral-large-latest"],
    website: "https://mistral.ai",
  }
];
