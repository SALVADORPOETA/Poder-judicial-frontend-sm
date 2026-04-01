import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, Unlock, ChevronRight } from 'lucide-react'

const Home = ({ isAuthenticated, setIsAuthenticated }) => {
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === import.meta.env.VITE_APP_PASSWORD) {
      setIsAuthenticated(true)
      // Guardamos un marcador en el almacenamiento local
      sessionStorage.setItem('isAuth', 'true')
    } else {
      alert('Contraseña incorrecta')
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('isAuth')
    setIsAuthenticated(false)
    navigate('/')
  }

  const servicios = [
    {
      id: 1,
      title: 'Scraping PJ: URLs y Detalles',
      path: '/servicio-1',
      color: 'hover:border-blue-500 hover:text-blue-400',
    },
    {
      id: 2,
      title: 'Mensajería Masiva: Email y WhatsApp',
      path: '/servicio-2',
      color: 'hover:border-purple-500 hover:text-purple-400',
    },
    {
      id: 3,
      title: 'Generador de VCF: Contactos para teléfono',
      path: '/servicio-3',
      color: 'hover:border-emerald-500 hover:text-emerald-400',
    },
    // {
    //   id: 4,
    //   title: 'Servicio 4: Base de Datos',
    //   path: '/servicio-4',
    //   color: 'hover:border-red-500 hover:text-red-400',
    // },
    // {
    //   id: 5,
    //   title: 'Servicio 5: Configuración',
    //   path: '/servicio-5',
    //   color: 'hover:border-orange-500 hover:text-orange-400',
    // },
  ]

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-6">
      {!isAuthenticated ? (
        /* VISTA: LOGIN */
        <div className="w-full max-w-md bg-gray-900/50 border border-gray-800 p-8 rounded-2xl shadow-2xl animate-in fade-in duration-500">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-purple-500/10 rounded-full">
              <Lock className="text-purple-500" size={32} />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center mb-8">
            Acceso al Sistema
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              name="username"
              defaultValue="admin"
              autoComplete="username"
              className="hidden"
              style={{ display: 'none' }}
            />
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              placeholder="Introduce la contraseña"
              className="w-full bg-black/50 border border-gray-700 rounded-xl p-4 outline-none focus:border-purple-500 transition-all text-center"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="w-full bg-purple-800! text-white! font-bold py-4 rounded-xl hover:bg-purple-700! transition-all active:scale-95 shadow-lg">
              Verificar Credenciales
            </button>
          </form>
        </div>
      ) : (
        /* VISTA: PANEL DE SERVICIOS */
        <div className="w-full max-w-2xl animate-in zoom-in-95 duration-500">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-400 px-4 py-2 rounded-full text-sm font-medium border border-green-500/20 mb-4">
              <Unlock size={16} /> Acceso Concedido
            </div>
            <h1 className="text-3xl font-bold">Panel de Servicios</h1>
            <p className="text-gray-500 mt-2">
              Selecciona la herramienta que deseas utilizar
            </p>
          </div>

          <div className="grid gap-4">
            {servicios.map((s) => (
              <div
                key={s.id}
                onClick={() => navigate(s.path)}
                className={`group bg-[#111] border border-gray-800 py-6 pr-6 pl-12 rounded-2xl flex items-center justify-between cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:bg-[#161616] ${s.color} hover:shadow-[0_0_20px_rgba(0,0,0,0.3)]`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-500 group-hover:bg-gray-700 transition-colors">
                    {s.id}
                  </div>
                  <span className="text-lg font-medium transition-colors ml-10">
                    {s.title}
                  </span>
                </div>
                <ChevronRight className="text-gray-600 group-hover:translate-x-1 transition-all" />
              </div>
            ))}
          </div>
        </div>
      )}
      {isAuthenticated && (
        <button
          className="bg-gray-800! mt-6 transition-all! duration-300! hover:scale-[1.03]"
          onClick={handleLogout}
        >
          Salir
        </button>
      )}
    </main>
  )
}

export default Home
