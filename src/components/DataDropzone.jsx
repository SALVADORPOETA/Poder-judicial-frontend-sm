import React from 'react'
import { FileJson, CheckCircle } from 'lucide-react'

const DataDropzone = ({
  file,
  onFileChange,
  color = 'purple',
  description = 'El sistema procesará los datos automáticamente al subir.',
}) => {
  // Mapeo de colores para las clases de Tailwind
  const colorClasses = {
    purple: {
      border: 'hover:border-purple-500',
      text: 'text-purple-400',
      bg: 'text-purple-300',
    },
    blue: {
      border: 'hover:border-blue-500',
      text: 'text-blue-400',
      bg: 'text-blue-300',
    },
    green: {
      border: 'hover:border-emerald-500',
      text: 'text-emerald-400',
      bg: 'text-emerald-300',
    },
  }
  const theme = colorClasses[color] || colorClasses.purple

  return (
    <div className="space-y-4 bg-gray-900/50 p-6 rounded-2xl border border-gray-800 shadow-xl flex flex-col justify-between h-full">
      <h2
        className={`text-sm font-semibold ${theme.bg} uppercase tracking-widest`}
      >
        Subida de Datos
      </h2>

      <div
        className={`relative border-2 border-dashed border-gray-700 rounded-xl p-8 text-center ${theme.border} transition-colors group cursor-pointer!`}
      >
        <input
          type="file"
          accept=".json"
          onChange={onFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer! z-10"
        />
        <div className="space-y-3 pointer-events-none">
          <FileJson
            className={`mx-auto h-10 w-10 ${file ? theme.text : 'text-gray-600'} group-hover:${theme.text} transition-colors`}
          />
          <div className="text-xs text-gray-400 leading-relaxed">
            {file ? (
              <div className="space-y-1">
                <span className={`${theme.bg} font-bold block`}>
                  {file.name}
                </span>
                <span className="text-[10px] text-green-500 flex items-center justify-center gap-1">
                  <CheckCircle size={10} /> Archivo cargado
                </span>
              </div>
            ) : (
              'Arrastra o selecciona el JSON de candidatos'
            )}
          </div>
        </div>
      </div>

      <p className="text-[12px] text-center text-gray-600">{description}</p>
    </div>
  )
}

export default DataDropzone
