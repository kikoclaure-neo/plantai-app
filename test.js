require('dotenv').config();

const apiKey = process.env.GEMINI_API_KEY;

fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`)
  .then(res => res.json())
  .then(data => {
    data.models.forEach(m => {
      if (m.supportedGenerationMethods?.includes('generateContent')) {
        console.log(m.name);
      }
    });
  })
  .catch(err => console.error(err));