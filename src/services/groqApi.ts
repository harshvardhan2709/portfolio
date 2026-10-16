import { ChatMessage } from '../types/chat';
import { buildPortfolioSystemPrompt, getLocalFallbackResponse } from './portfolioContext';

const STORAGE_KEYS = {
  GROQ_KEY: 'portfolio_groq_key',
  MODEL: 'portfolio_groq_model',
};

export const GROQ_CONFIG = {
  name: 'Groq',
  endpoint: 'https://api.groq.com/openai/v1/chat/completions',
  defaultModel: 'qwen/qwen3.8-27b',
  supportedModels: [
    { id: 'qwen/qwen3.8-27b', name: 'Qwen 3.8 27B (⚡ Fastest • Sub-250ms • Free)' },
    { id: 'openai/gpt-oss-20b', name: 'GPT-OSS 20B (Ultra-Fast • Free)' },
    { id: 'openai/gpt-oss-120b', name: 'GPT-OSS 120B (Deep Reasoning • Free)' },
  ],
  envKey: () => (import.meta.env.VITE_GROQ_API_KEY as string | undefined) || '',
};

export function getEffectiveApiKey(): string {
  const localKey = localStorage.getItem(STORAGE_KEYS.GROQ_KEY);
  if (localKey && localKey.trim()) return localKey.trim();

  const envKey = GROQ_CONFIG.envKey();
  if (envKey && envKey.trim()) return envKey.trim();

  return '';
}

export function setCustomApiKey(key: string): void {
  if (!key.trim()) {
    localStorage.removeItem(STORAGE_KEYS.GROQ_KEY);
  } else {
    localStorage.setItem(STORAGE_KEYS.GROQ_KEY, key.trim());
  }
}

export function getSelectedModel(): string {
  const stored = localStorage.getItem(STORAGE_KEYS.MODEL);
  if (stored && GROQ_CONFIG.supportedModels.some((m) => m.id === stored)) {
    return stored;
  }
  return GROQ_CONFIG.defaultModel;
}

export function setSelectedModel(model: string): void {
  localStorage.setItem(STORAGE_KEYS.MODEL, model);
}

export interface StreamChatOptions {
  messages: ChatMessage[];
  onChunk: (accumulated: string) => void;
  signal?: AbortSignal;
}

/**
 * Sends messages through the secure /api/chat Vercel Edge Serverless Function
 * or directly to Groq API if a client key is entered, with instant grounded fallback.
 */
export async function streamChatResponse({
  messages,
  onChunk,
  signal,
}: StreamChatOptions): Promise<string> {
  const customApiKey = localStorage.getItem(STORAGE_KEYS.GROQ_KEY)?.trim();
  const model = getSelectedModel();
  const lastUserMessage = [...messages].reverse().find((m) => m.role === 'user')?.content || '';

  // Prepare sliding window chat history (last 5 messages) with compact token footprint
  const systemPrompt = buildPortfolioSystemPrompt();
  const nonBlank = messages.filter((m) => m.content.trim().length > 0);
  const recentTurns = nonBlank.slice(-5);

  const apiMessages = [
    { role: 'system', content: systemPrompt },
    ...recentTurns.map((m) => ({
      role: m.role,
      // Truncate previous long assistant responses in history to stay strictly under 2,000 total tokens
      content:
        m.role === 'assistant' && m.content.length > 500
          ? m.content.slice(0, 500) + '...'
          : m.content,
    })),
  ];

  try {
    let response: Response;

    // If user provided their own key in Settings modal, call direct Groq endpoint
    if (customApiKey) {
      response = await fetch(GROQ_CONFIG.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${customApiKey}`,
        },
        body: JSON.stringify({
          model,
          messages: apiMessages,
          temperature: 0.3,
          max_tokens: 800,
          stream: true,
        }),
        signal,
      });
    } else {
      // Default: Call secure /api/chat serverless proxy
      response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: apiMessages,
          model,
        }),
        signal,
      });
    }

    if (!response.ok) {
      let errorDetails = '';
      try {
        const errorJson = await response.json();
        errorDetails = errorJson?.error?.message || errorJson?.error || response.statusText;
      } catch {
        errorDetails = response.statusText;
      }

      if (response.status === 401) {
        throw new Error('Unauthorized or invalid Groq API key.');
      } else if (response.status === 429) {
        throw new Error('Groq rate limit reached. Please try again in a few moments.');
      } else {
        throw new Error(`Groq API response (${response.status}): ${errorDetails}`);
      }
    }

    if (!response.body) {
      throw new Error('ReadableStream not supported by this browser.');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let accumulatedText = '';
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || !trimmed.startsWith('data: ')) continue;
        const payload = trimmed.replace(/^data:\s*/, '');
        if (payload === '[DONE]') break;

        try {
          const parsed = JSON.parse(payload);
          const delta = parsed.choices?.[0]?.delta?.content;
          if (delta) {
            accumulatedText += delta;
            onChunk(accumulatedText);
          }
        } catch {
          // Ignore partial JSON chunks
        }
      }
    }

    if (!accumulatedText.trim()) {
      accumulatedText = 'I received an empty response. How else may I assist you with Harshvardhan’s portfolio?';
      onChunk(accumulatedText);
    }

    return accumulatedText;
  } catch (err: unknown) {
    if ((err as Error)?.name === 'AbortError') {
      throw err;
    }

    const errorMsg = err instanceof Error ? err.message : 'Unknown communication error';
    console.warn(`[GroqApi] Call failed: ${errorMsg}. Falling back to grounded local response.`);

    const fallbackAnswer = getLocalFallbackResponse(lastUserMessage);
    const notice = `\n\n> 💡 *Note: Running in local grounded mode (${errorMsg}). To enable live responses from Groq, add \`GROQ_API_KEY\` from Groq account and paste it in the setting option provided in the chat modal.*`;
    const fullText = fallbackAnswer + notice;

    // Simulate natural typewriter response for fallback
    let current = '';
    const words = fullText.split(' ');
    for (let i = 0; i < words.length; i++) {
      if (signal?.aborted) throw new DOMException('Aborted', 'AbortError');
      current += (i === 0 ? '' : ' ') + words[i];
      onChunk(current);
      await new Promise((r) => setTimeout(r, 12 + Math.random() * 16));
    }

    return fullText;
  }
}
