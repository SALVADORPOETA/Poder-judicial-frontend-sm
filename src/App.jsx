import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

// Importación de Páginas
import Home from './pages/Home'
import Servicio1 from './pages/Servicio1'
import Servicio2 from './pages/Servicio2'
import Servicio3 from './pages/Servicio3'

// Componente Placeholder para rutas no desarrolladas aún
const EnConstruccion = () => (
  <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-10">
    <h2 className="text-2xl font-bold text-gray-500">Módulo en Desarrollo</h2>
    <p className="text-gray-600 mb-6">
      Este servicio estará disponible próximamente.
    </p>
    <button
      onClick={() => (window.location.href = '/')}
      className="text-purple-400 hover:underline"
    >
      Volver al inicio
    </button>
  </div>
)

function App() {
  // Inicializamos el estado revisando el sessionStorage para persistencia
  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionStorage.getItem('isAuth') === 'true',
  )

  return (
    <Router>
      <div className="min-h-screen bg-[#0a0a0a]">
        <Routes>
          {/* Ruta principal: Home y Login */}
          <Route
            path="/"
            element={
              <Home
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
              />
            }
          />

          {/* Ruta Servicio 1: PJ Scraper (Protegida) */}
          <Route
            path="/servicio-1"
            element={isAuthenticated ? <Servicio1 /> : <Navigate to="/" />}
          />

          {/* Rutas para los demás servicios (Protegidas) */}
          <Route
            path="/servicio-2"
            element={isAuthenticated ? <Servicio2 /> : <Navigate to="/" />}
          />
          <Route
            path="/servicio-3"
            element={isAuthenticated ? <Servicio3 /> : <Navigate to="/" />}
          />
          <Route
            path="/servicio-4"
            element={isAuthenticated ? <EnConstruccion /> : <Navigate to="/" />}
          />
          <Route
            path="/servicio-5"
            element={isAuthenticated ? <EnConstruccion /> : <Navigate to="/" />}
          />

          {/* Redirección por defecto si la ruta no existe */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
