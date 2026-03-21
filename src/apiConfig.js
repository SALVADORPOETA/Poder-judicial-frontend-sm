// src/apiConfig.js

const getApiUrl = () => {
  const modoHibrido = import.meta.env.VITE_MODO_HIBRIDO === 'true'
  const isProd = import.meta.env.MODE === 'production'

  // 1. Si activaste el modo híbrido en el .env, usa Ngrok
  if (modoHibrido) {
    return import.meta.env.VITE_API_NGROK
  }

  // 2. Si estás en producción real (backend y frontend en la nube)
  if (isProd) {
    return import.meta.env.VITE_API_PROD
  }

  // 3. Por defecto, si estás programando normal en tu PC
  return import.meta.env.VITE_API_LOCAL
}

export const API_URL = getApiUrl()
