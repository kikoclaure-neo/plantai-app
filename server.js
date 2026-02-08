const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const path = require('path');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const storage = multer.memoryStorage();
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const apiKey = process.env.GEMINI_API_KEY;
let genAI = null;

if (apiKey) {
  genAI = new GoogleGenerativeAI(apiKey);
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/api/identify', upload.single('image'), async (req, res) => {
  try {
    if (!genAI) {
      return res.status(500).json({ error: 'API key no configurada' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No se subió ninguna imagen' });
    }

    const base64Image = req.file.buffer.toString('base64');
    const mimeType = req.file.mimetype;

    // Usar el modelo con formato completo
    const model = genAI.getGenerativeModel({ model: 'models/gemini-2.0-flash' });

    const prompt = `Eres un botánico experto. Analiza esta imagen e identifica la planta. 
Responde ÚNICAMENTE con JSON válido (sin markdown, sin backticks):
{
  "identified": true,
  "commonName": "nombre común en español",
  "scientificName": "nombre científico",
  "family": "familia botánica",
  "origin": "región de origen",
  "description": "descripción breve",
  "characteristics": {
    "leaves": "descripción hojas",
    "flowers": "descripción flores",
    "size": "tamaño típico",
    "growth": "tipo crecimiento"
  },
  "care": {
    "light": "necesidades luz",
    "water": "frecuencia riego",
    "humidity": "humedad ideal",
    "temperature": "temperatura °C",
    "soil": "tipo suelo",
    "fertilizer": "fertilización"
  },
  "tips": ["consejo1", "consejo2", "consejo3"],
  "warnings": ["advertencia si aplica"],
  "difficulty": "fácil/media/difícil"
}
Si no es planta: {"identified": false, "error": "razón"}`;

    const result = await model.generateContent([
      prompt,
      { inlineData: { mimeType, data: base64Image } }
    ]);

    const response = await result.response;
    const text = response.text().replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

    let plantData;
    try {
      plantData = JSON.parse(text);
    } catch (e) {
      console.error('JSON parse error:', text);
      return res.status(500).json({ error: 'Error procesando respuesta' });
    }

    res.json(plantData);

  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message || 'Error al procesar' });
  }
});

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => {
  console.log(`
🌿 PlantAI - Servidor en http://localhost:${PORT}
${apiKey ? '✅ API Key configurada' : '❌ API Key NO configurada'}
  `);
});
