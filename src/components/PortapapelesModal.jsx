import React from 'react'
import { Copy, X, ClipboardType } from 'lucide-react'

// AQUÍ PEGAS TU TEXTO PLANO (MOCK DATA)
const MOCK_DATA_TEXT = `¡Hola, estimad{o|a} [nombre]! ¿Vas a a dejar pasar esta oportunidad?

¡Hola, [nombre]! Como {el|la} buen{a} abogad{o|a} que eres, sabes lo importante que es cuidar de tu imagen. Por eso hoy te vengo a invitar a un webinar para que platiquemos al respecto. ¿Te interesa? Solo tienes que responder este mensaje con un "Me interesa" y te mando el boleto. {El|La} buen{a} abogad{o|a} que eres te ayudará a reconocer esto como una gran oportunidad.

Hola, estimad{o|a} [nombre]. {El|La} buen{a} abogad{o|a} que eres, deja ver que eres {el|la} mejor en tu área.

daishxl@gmail.com
dsmlhidroponia@gmail.com
juansartoricoder@gmail.com

2295300370
2291744012
2294778510`

const PortapapelesModal = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null

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
              {MOCK_DATA_TEXT}
            </pre>
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
