# 🌿 PlantAI - Identificador de Plantas con IA

Aplicación web para identificar plantas usando Google Gemini (GRATIS).

## 🚀 Instalación Local

```bash
# 1. Instalar dependencias
npm install

# 2. Crear archivo .env con tu API key
cp .env.example .env
# Edita .env y agrega tu GEMINI_API_KEY

# 3. Iniciar servidor
npm start

# 4. Abrir http://localhost:3000
```

## 🔑 Obtener API Key (GRATIS)

1. Ve a https://aistudio.google.com/apikey
2. Inicia sesión con Google
3. Click en "Create API Key"
4. Copia la key a tu archivo `.env`

---

## 🌐 Desplegar en la Nube (GRATIS)

### Opción 1: Railway (Recomendado)

1. Crea cuenta en https://railway.app
2. Click en "New Project" → "Deploy from GitHub"
3. Conecta tu repositorio
4. En Variables, agrega: `GEMINI_API_KEY=tu-api-key`
5. ¡Listo! Te dará una URL pública

### Opción 2: Render

1. Crea cuenta en https://render.com
2. New → Web Service
3. Conecta tu repositorio de GitHub
4. Configura:
   - Build Command: `npm install`
   - Start Command: `npm start`
5. En Environment, agrega: `GEMINI_API_KEY`
6. Deploy!

### Opción 3: Vercel (con adaptaciones)

Vercel es para sitios estáticos/serverless. Necesitarías convertir el backend a API routes.

### Opción 4: Fly.io

```bash
# Instalar flyctl
# Windows: iwr https://fly.io/install.ps1 -useb | iex

fly auth login
fly launch
fly secrets set GEMINI_API_KEY=tu-api-key
fly deploy
```

---

## 📁 Estructura

```
plantai-app/
├── server.js          # Servidor Express + API Gemini
├── package.json       
├── .env.example       # Plantilla de configuración
├── .env               # Tu configuración (no subir a git)
└── public/
    └── index.html     # Frontend completo
```

## 💡 Tips

- Imágenes claras = mejor identificación
- Funciona con hojas, flores, plantas completas
- Las plantas guardadas se almacenan en el navegador

---

Hecho con 🌱 usando Google Gemini AI
