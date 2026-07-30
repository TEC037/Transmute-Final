import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

// Compute currentFile/currentDir safe for both ESM (import.meta.url) and CommonJS (__filename)
const currentFile = (typeof __filename !== 'undefined')
  ? __filename
  : (typeof import.meta !== 'undefined' && typeof (import.meta as any).url === 'string'
      ? fileURLToPath((import.meta as any).url)
      : undefined);

const currentDir = (typeof __dirname !== 'undefined')
  ? __dirname
  : (currentFile ? path.dirname(currentFile) : process.cwd());

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '20mb' }));

  // API health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // Image Generation Endpoint
  app.post('/api/generate-image', async (req, res) => {
    try {
      const { prompt, aspectRatio, userApiKey, style } = req.body;

      if (!prompt || typeof prompt !== 'string') {
        return res.status(400).json({ error: 'Prompt es requerido' });
      }

      // Prioritize user's logged-in custom API key, fallback to system GEMINI_API_KEY
      const apiKey = (userApiKey && typeof userApiKey === 'string' && userApiKey.trim() !== '')
        ? userApiKey.trim()
        : process.env.GEMINI_API_KEY;

      if (!apiKey) {
        return res.status(400).json({
          error: 'No se encontró API Key de Gemini. Por favor proporciona tu API key en los ajustes de tu cuenta o activa las credenciales en el sistema.',
        });
      }

      const ai = new GoogleGenAI({ apiKey });

      let fullPrompt = prompt;
      if (style && style !== 'none') {
        fullPrompt = `${prompt}, in ${style} art style, vintage comic book ink lineart halftone texture high quality`;
      }

      // Generate image using imagen-3.0-generate-002
      const response = await ai.models.generateImages({
        model: 'imagen-3.0-generate-002',
        prompt: fullPrompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
          aspectRatio: aspectRatio || '1:1',
        },
      });

      if (!response.generatedImages || response.generatedImages.length === 0) {
        throw new Error('No se pudo generar la imagen con el modelo Imagen 3.');
      }

      const imageBytes = response.generatedImages[0].image.imageBytes;
      const imageUrl = `data:image/jpeg;base64,${imageBytes}`;

      return res.json({ imageUrl, prompt: fullPrompt });
    } catch (err: any) {
      console.error('Error generating image:', err);
      return res.status(500).json({
        error: err.message || 'Error al generar la imagen',
      });
    }
  });

  // Image Editing / Transformation Endpoint
  app.post('/api/edit-image', async (req, res) => {
    try {
      const { prompt, base64Image, userApiKey } = req.body;

      if (!prompt || !base64Image) {
        return res.status(400).json({ error: 'Prompt e imagen base son requeridos' });
      }

      const apiKey = (userApiKey && typeof userApiKey === 'string' && userApiKey.trim() !== '')
        ? userApiKey.trim()
        : process.env.GEMINI_API_KEY;

      if (!apiKey) {
        return res.status(400).json({
          error: 'No se encontró API Key de Gemini.',
        });
      }

      const ai = new GoogleGenAI({ apiKey });

      const cleanBase64 = base64Image.replace(/^data:image\/\w+;base64,/, '');

      let generatedImageUrl: string | null = null;

      try {
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: [
            {
              role: 'user',
              parts: [
                { text: `Modifica esta imagen según las instrucciones: ${prompt}. Genera una nueva versión visualmente pulida.` },
                {
                  inlineData: {
                    mimeType: 'image/jpeg',
                    data: cleanBase64,
                  },
                },
              ],
            },
          ],
          config: {
            responseModalities: ['IMAGE', 'TEXT'],
          },
        });

        const candidates = response.candidates;
        if (candidates && candidates[0]?.content?.parts) {
          for (const part of candidates[0].content.parts) {
            if (part.inlineData) {
              generatedImageUrl = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
              break;
            }
          }
        }
      } catch (genErr) {
        console.warn('Gemini 2.5 flash image generation attempt failed, falling back to Imagen 3:', genErr);
      }

      if (!generatedImageUrl) {
        // Fallback to imagen-3.0-generate-002 with contextual prompt
        const fallbackResp = await ai.models.generateImages({
          model: 'imagen-3.0-generate-002',
          prompt: `Modificación de cromo alquímico: ${prompt}. Estilo ilustración vintage, entintado a mano, alta calidad`,
          config: {
            numberOfImages: 1,
            outputMimeType: 'image/jpeg',
            aspectRatio: '1:1',
          },
        });
        if (fallbackResp.generatedImages?.[0]?.image?.imageBytes) {
          generatedImageUrl = `data:image/jpeg;base64,${fallbackResp.generatedImages[0].image.imageBytes}`;
        }
      }

      if (!generatedImageUrl) {
        throw new Error('No se pudo generar ni editar la imagen.');
      }

      return res.json({ imageUrl: generatedImageUrl, prompt });
    } catch (err: any) {
      console.error('Error editing image:', err);
      return res.status(500).json({
        error: err.message || 'Error al editar la imagen',
      });
    }
  });

  // Assistant & Workflow Automation Endpoint (Gemini 3.6 Flash)
  app.post('/api/assistant', async (req, res) => {
    try {
      const { message, userContext, userApiKey, mode } = req.body;

      const apiKey = (userApiKey && typeof userApiKey === 'string' && userApiKey.trim() !== '')
        ? userApiKey.trim()
        : process.env.GEMINI_API_KEY;

      if (!apiKey) {
        return res.status(400).json({
          error: 'No se encontró API Key de Gemini. Configura tu clave en los ajustes para interactuar con el Asistente Alquímico.',
        });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const systemInstruction = `Eres el "Gran Alquimista Noir", un asistente inteligente de flujo de trabajo de los años 1930. Tu propósito es simplificar radicalmente la experiencia del usuar[...]\nAnaliza la solicitud del usuario junto con su estado actual de hábitos y progreso.\n\nResponde SIEMPRE en formato JSON estructurado con el siguiente esquema:\n{\n  "reply": "Tu mensaje amigable en personaje de alquimista vintage (máximo 3 párrafos, usando metáforas de tinta y transmutación)",\n  "suggestedActions": [\n    {\n      "type": "create_habit" | "mark_complete" | "recommend_shop" | "quick_routine",\n      "label": "Nombre corto de la acción (ej: 'Crear Hábito: Caminar 20 min')",\n      "payload": { ... } // Para create_habit: { title, category, frequency, xpReward, inkReward, minLevel, icon }. Para mark_complete: { habitTitle }. Para quick_routine: array de hábitos.\n    }\n  ]\n}\n\nSi el usuario pide crear una rutina o mejorar sus hábitos, genera automáticamente de 1 a 3 hábitos sugeridos en "suggestedActions".\nSi el usuario dice que ya hizo una tarea (ej: "ya leí 10 páginas"), incluye una acción "mark_complete" con el nombre del hábito correspondiente.\nSi no hay acciones directas, devuelve "suggestedActions": [].\n\nContexto actual del usuario:\n- Nivel: ${userContext?.level || 1}\n- XP: ${userContext?.currentXp || 0}\n- Gotas de Tinta: ${userContext?.inkDrops || 0}\n- Hábitos actuales (${userContext?.habits?.length || 0}): ${JSON.stringify(userContext?.habits?.map((h: any) => ({ title: h.title, completed: h.completed, category: h.category })) || [])}`;

      const promptText = mode === 'quick_routine'
        ? `Genera una rutina de 3 hábitos equilibrados y motivadores para simplificar mi día sobre: ${message || 'Productividad y Bienestar'}.`
        : mode === 'streak_analysis'
        ? `Analiza mi rendimiento y da consejos prácticos para mantener mis rachas diarias.`
        : (message || 'Hola Alquimista, ¿cómo puedes simplificar mi rutina hoy?');

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: promptText,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          temperature: 0.7,
        },
      });

      let parsedData: any = { reply: 'Transmutación completada.', suggestedActions: [] };
      if (response.text) {
        try {
          parsedData = JSON.parse(response.text.trim());
        } catch {
          parsedData = { reply: response.text, suggestedActions: [] };
        }
      }

      return res.json(parsedData);
    } catch (err: any) {
      console.error('Error in assistant endpoint:', err);
      return res.status(500).json({
        error: err.message || 'Error en el Asistente Alquímico',
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(currentDir ?? process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
