import OpenAI from "openai";

const PROVIDER_BASE_URLS: Record<string, string> = {
  openrouter: "https://openrouter.ai/api/v1",
  openai: "https://api.openai.com/v1",
  anthropic: "https://api.anthropic.com/v1",
  groq: "https://api.groq.com/openai/v1",
  xai: "https://api.x.ai/v1",
  gemini: "https://generativelanguage.googleapis.com/v1beta/openai",
  mistral: "https://api.mistral.ai/v1",
};

export function getLLMClient(): OpenAI {
  const provider = (process.env.LLM_PROVIDER || "openrouter").toLowerCase();
  const baseURL = PROVIDER_BASE_URLS[provider];

  if (!baseURL) {
    throw new Error(
      `Unsupported LLM provider: "${provider}". Supported: ${Object.keys(PROVIDER_BASE_URLS).join(", ")}`
    );
  }

  const extraHeaders: Record<string, string> = {};

  // OpenRouter requires a referer header for free models
  if (provider === "openrouter") {
    extraHeaders["HTTP-Referer"] = "https://github.com/medscan-ai";
    extraHeaders["X-Title"] = "MedScan AI";
  }

  return new OpenAI({
    apiKey: process.env.LLM_API_KEY,
    baseURL,
    defaultHeaders: extraHeaders,
  });
}

export function getModel(): string {
  return process.env.LLM_MODEL || "anthropic/claude-3-5-sonnet";
}

export function getMaxFileSize(): number {
  return parseInt(process.env.MAX_FILE_SIZE_MB || "5", 10) * 1024 * 1024;
}
