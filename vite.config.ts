import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [
      react(),
      {
        name: 'local-api-chat-middleware',
        configureServer(server) {
          server.middlewares.use('/api/chat', async (req, res) => {
            if (req.method !== 'POST') {
              res.statusCode = 405;
              res.end('Method Not Allowed');
              return;
            }

            let bodyStr = '';
            req.on('data', (chunk) => {
              bodyStr += chunk;
            });

            req.on('end', async () => {
              try {
                const body = JSON.parse(bodyStr || '{}');
                const { messages, model } = body;

                const freshEnv = loadEnv(mode, process.cwd(), '');
                const apiKey =
                  freshEnv.GROQ_API_KEY ||
                  freshEnv.VITE_GROQ_API_KEY ||
                  process.env.GROQ_API_KEY ||
                  process.env.VITE_GROQ_API_KEY;

                if (!apiKey) {
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(
                    JSON.stringify({
                      error: 'Missing GROQ_API_KEY. Please add it in the setting option in the chat modal. You can get your API key from https://console.groq.com/keys.',
                    })
                  );
                  return;
                }

                const endpoint = 'https://api.groq.com/openai/v1/chat/completions';
                const defaultModel = 'qwen/qwen3.8-27b';

                const upstream = await fetch(endpoint, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${apiKey}`,
                  },
                  body: JSON.stringify({
                    model: model || defaultModel,
                    messages,
                    temperature: 0.3,
                    max_tokens: 800,
                    stream: true,
                  }),
                });

                res.statusCode = upstream.status;
                upstream.headers.forEach((val, key) => res.setHeader(key, val));

                if (!upstream.body) {
                  res.end();
                  return;
                }

                const reader = upstream.body.getReader();
                const pump = async () => {
                  const { done, value } = await reader.read();
                  if (done) {
                    res.end();
                    return;
                  }
                  res.write(value);
                  await pump();
                };
                await pump();
              } catch (e: unknown) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                const msg = e instanceof Error ? e.message : 'Proxy Error';
                res.end(JSON.stringify({ error: msg }));
              }
            });
          });
        },
      },
    ],
  };
});
