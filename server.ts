import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

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

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
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
