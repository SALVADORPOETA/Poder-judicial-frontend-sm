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
import ProtectedRoute from './components/ProtectedRoute'

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
          <Route
            path="/"
            element={
              <Home
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
              />
            }
          />

          {/* Usa ProtectedRoute directamente, él ya sabe qué hacer */}
          <Route
            path="/servicio-1"
            element={
              <ProtectedRoute>
                <Servicio1 />
              </ProtectedRoute>
            }
          />
          <Route
            path="/servicio-2"
            element={
              <ProtectedRoute>
                <Servicio2 />
              </ProtectedRoute>
            }
          />
          <Route
            path="/servicio-3"
            element={
              <ProtectedRoute>
                <Servicio3 />
              </ProtectedRoute>
            }
          />
          <Route
            path="/servicio-4"
            element={
              <ProtectedRoute>
                <EnConstruccion />
              </ProtectedRoute>
            }
          />
          <Route
            path="/servicio-5"
            element={
              <ProtectedRoute>
                <EnConstruccion />
              </ProtectedRoute>
            }
          />

          {/* Redirección global */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
