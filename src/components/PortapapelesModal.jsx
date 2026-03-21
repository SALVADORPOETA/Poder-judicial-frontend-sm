import React, { useState } from 'react'
import { Copy, X, ClipboardType, Check } from 'lucide-react'

const MOCK_DATA_TEXT = `¡Hola, estimad{o|a} [nombre]! ¿Vas a a dejar pasar esta oportunidad?

¡Hola, [nombre]! Como {el|la} buen{a} abogad{o|a} que eres, sabes lo importante que es cuidar de tu imagen. Por eso hoy te vengo a invitar a un webinar para que platiquemos al respecto. ¿Te interesa? Solo tienes que responder este mensaje con un "Me interesa" y te mando el boleto. {El|La} buen{a} abogad{o|a} que eres te ayudará a reconocer esto como una gran oportunidad.

Hola, estimad{o|a} [nombre]. {El|La} buen{a} abogad{o|a} que eres, deja ver que eres {el|la} mejor en tu área.

daishxl@gmail.com

dsmlhidroponia@gmail.com

juansartoricoder@gmail.com

2295300370

2291744012

2294778510`

const PortapapelesModal = ({ isOpen, onClose }) => {
  const [copiedIndex, setCopiedIndex] = useState(null)

  if (!isOpen) return null

  // Filtramos líneas vacías para no crear bloques inútiles
  const lines = MOCK_DATA_TEXT.split('\n').filter((line) => line.trim() !== '')

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

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
          <div className="space-y-3 overflow-y-auto max-h-100 pr-2 custom-scrollbar">
            {lines.map((line, index) => (
              <div
                key={index}
                className="group relative bg-black/50 border border-gray-800 rounded-xl p-4 hover:border-purple-500/50 transition-all cursor-pointer"
                onClick={() => handleCopy(line, index)}
              >
                <p className="text-gray-300 font-mono text-sm whitespace-pre-wrap pr-10">
                  {line}
                </p>
                <button className="absolute top-4 right-4 text-gray-500 group-hover:text-purple-400 transition-colors">
                  {copiedIndex === index ? (
                    <Check size={16} className="text-green-500" />
                  ) : (
                    <Copy size={16} />
                  )}
                </button>

                {/* Tooltip pequeño de "Copiado" */}
                {copiedIndex === index && (
                  <span className="absolute -top-2 right-10 bg-purple-600 text-white text-[10px] px-2 py-1 rounded shadow-lg animate-bounce">
                    ¡Copiado!
                  </span>
                )}
              </div>
            ))}
          </div>

          <p className="text-[10px] text-gray-500 mt-4 italic">
            * Haz clic en cualquier bloque para copiar el texto automáticamente.
          </p>
        </div>
      </div>
    </div>
  )
}

export default PortapapelesModal

// import React from 'react'
// import { Copy, X, ClipboardType } from 'lucide-react'

// // AQUÍ PEGAS TU TEXTO PLANO (MOCK DATA)
// const MOCK_DATA_TEXT = `¡Hola, estimad{o|a} [nombre]! ¿Vas a a dejar pasar esta oportunidad?

// ¡Hola, [nombre]! Como {el|la} buen{a} abogad{o|a} que eres, sabes lo importante que es cuidar de tu imagen. Por eso hoy te vengo a invitar a un webinar para que platiquemos al respecto. ¿Te interesa? Solo tienes que responder este mensaje con un "Me interesa" y te mando el boleto. {El|La} buen{a} abogad{o|a} que eres te ayudará a reconocer esto como una gran oportunidad.

// Hola, estimad{o|a} [nombre]. {El|La} buen{a} abogad{o|a} que eres, deja ver que eres {el|la} mejor en tu área.

// daishxl@gmail.com

// dsmlhidroponia@gmail.com

// juansartoricoder@gmail.com

// 2295300370

// 2291744012

// 2294778510`

// const PortapapelesModal = ({ isOpen, onClose, data }) => {
//   if (!isOpen) return null

//   return (
//     <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
//       <div className="bg-gray-900 border border-gray-800 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden">
//         {/* Header */}
//         <div className="px-6 py-4 border-b border-gray-800 flex justify-between items-center bg-gray-800/50">
//           <div className="flex items-center gap-2 text-purple-400">
//             <ClipboardType size={20} />
//             <span className="font-bold uppercase tracking-tight">
//               Datos de Prueba (Mock Data)
//             </span>
//           </div>
//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-white transition-colors"
//           >
//             <X size={20} />
//           </button>
//         </div>

//         {/* Content */}
//         <div className="p-6">
//           <div className="relative group">
//             <pre className="bg-black/50 border border-gray-800 p-4 rounded-xl text-gray-300 font-mono text-md overflow-y-auto max-h-100 whitespace-pre-wrap">
//               {MOCK_DATA_TEXT}
//             </pre>
//           </div>
//           <p className="text-[10px] text-gray-500 mt-4 italic">
//             * Estos datos son solo de referencia para pruebas rápidas.
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default PortapapelesModal
