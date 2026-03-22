// src/apiConfig.js
const getApiUrl = () => {
  const isHibrido = import.meta.env.VITE_MODO_HIBRIDO === 'true'
  const isProd = import.meta.env.MODE === 'production'

  // Si es producción (Vercel) y el switch está en true -> NGROK
  if (isProd && isHibrido) return import.meta.env.VITE_API_NGROK

  // Si es producción pero el switch está en false -> VERCEL BACKEND
  if (isProd && !isHibrido) return import.meta.env.VITE_API_PROD

  // Por defecto (Desarrollo) -> LOCALHOST
  return import.meta.env.VITE_API_LOCAL || 'http://localhost:3001'
}

export const API_URL = getApiUrl()
console.log(`🚀 Conectado a API en modo ${import.meta.env.MODE}: ${API_URL}`)
