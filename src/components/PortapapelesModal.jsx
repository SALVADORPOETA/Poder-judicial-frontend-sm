import React from 'react'
import { Copy, X, ClipboardType } from 'lucide-react'

const PortapapelesModal = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null

  //   const copyToClipboard = () => {
  //     navigator.clipboard.writeText(data)
  //     alert('¡Copiado al portapapeles!')
  //   }

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-gray-900 border border-gray-800 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-800 flex justify-between items-center bg-gray-800/50">
          <div className="flex items-center gap-2 text-purple-400">
            <ClipboardType size={20} />
            <span className="font-bold uppercase tracking-tight">
              Datos de Prueba (Mock Data)
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="relative group">
            <pre className="bg-black/50 border border-gray-800 p-4 rounded-xl text-gray-300 font-mono text-md overflow-y-auto max-h-100 whitespace-pre-wrap">
              {data}
            </pre>
            {/* <button
              onClick={copyToClipboard}
              className="absolute top-3 right-3 p-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-all shadow-lg flex items-center gap-2 text-xs font-bold"
            >
              <Copy size={14} /> COPIAR TODO
            </button> */}
          </div>
          <p className="text-[10px] text-gray-500 mt-4 italic">
            * Estos datos son solo de referencia para pruebas rápidas.
          </p>
        </div>
      </div>
    </div>
  )
}

export default PortapapelesModal
