import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

// Le pasamos la prop hoverColor, con un valor por defecto (ej. blue)
const BackButton = ({ hoverColor = 'blue' }) => {
  const navigate = useNavigate()

  // Mapeo de colores para asegurar que Tailwind detecte las clases
  const borderColors = {
    blue: 'hover:border-blue-500/50!',
    purple: 'hover:border-purple-500/50!',
    green: 'hover:border-green-500/50!',
    red: 'hover:border-red-500/50!',
    orange: 'hover:border-orange-500/50!',
  }

  return (
    <button
      onClick={() => navigate('/')}
      className={`flex items-center gap-2 text-white group bg-gray-800! border border-transparent transition-all rounded-full pr-4 ${borderColors[hoverColor] || borderColors.blue}`}
    >
      <div className="p-2 rounded-full bg-gray-900 group-hover:bg-gray-700 transition-colors">
        <ArrowLeft size={18} />
      </div>
      <span className="hidden md:flex text-sm font-medium">
        Volver al inicio
      </span>
    </button>
  )
}

export default BackButton
