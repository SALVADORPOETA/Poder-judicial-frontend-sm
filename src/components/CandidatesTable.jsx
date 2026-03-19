import React, { useState } from 'react'
import {
  Trash2,
  UserCheck,
  AlertCircle,
  FileText,
  CheckCircle2,
  Mail,
  MessageCircle,
  Phone,
} from 'lucide-react'

const CandidatesTable = ({
  candidatos,
  handleEdit,
  eliminarCandidato,
  color,
  abrirEditor,
  // Sugerencia: pasar envioMode y setEnvioMode desde el padre
  // para que el padre sepa qué modal abrir.
  envioMode,
  setEnvioMode,
}) => {
  // Si prefieres mantenerlo interno por ahora:
  // const [envioMode, setEnvioMode] = useState('email')

  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden shadow-2xl mt-6">
      {/* Header con Selector de Modo */}
      <div className="px-4 py-4 bg-gray-800/30 border-b border-gray-800 flex justify-between items-center gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-black text-gray-500 uppercase tracking-widest">
            Previsualización ({candidatos.length})
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left min-w-225">
          <thead className="bg-black/40 text-gray-500 text-[10px] uppercase font-black">
            <tr>
              <th className="p-4">Estado</th>
              <th className="p-4">Candidato</th>
              <th className="p-4">Correo</th>
              <th className="p-4">Teléfono</th>
              <th className="p-4 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/50">
            {candidatos.map((c) => (
              <tr
                key={c.id}
                className={`hover:bg-${color}-500/5 transition-colors group border-b border-gray-800/30`}
              >
                <td className="p-4">
                  {(() => {
                    // Determinamos qué datos mirar según el modo activo
                    const modoEmail = envioMode === 'email'

                    const personalizado = modoEmail
                      ? c.mensajePersonalizado
                      : c.mensajeWhatsAppPersonalizado

                    const statusActual = modoEmail
                      ? c.statusEmail
                      : c.statusWhatsApp

                    // 1. Si hay texto manual -> PERSONALIZADO
                    if (personalizado && personalizado.trim() !== '') {
                      return (
                        <div className="bg-purple-500/10 text-purple-400 px-2 py-1 rounded text-[10px] font-bold flex items-center gap-1 border border-purple-500/20 w-fit">
                          <CheckCircle2 size={10} /> PERSONALIZADO
                        </div>
                      )
                    }

                    // 2. Si el status de ESTE MODO es "POR EDITAR" -> REVISAR
                    if (statusActual === 'POR EDITAR') {
                      return (
                        <div className="bg-amber-500/10 text-amber-500 px-2 py-1 rounded text-[10px] font-bold flex items-center gap-1 border border-amber-500/20 w-fit">
                          <AlertCircle size={10} /> REVISAR
                        </div>
                      )
                    }

                    // 3. De lo contrario -> LISTO
                    return (
                      <div className="bg-green-500/10 text-green-500 px-2 py-1 rounded text-[10px] font-bold flex items-center gap-1 border border-green-500/20 w-fit">
                        <UserCheck size={10} /> LISTO
                      </div>
                    )
                  })()}
                </td>
                <td className="p-4">
                  <input
                    value={c.nombreEditado || ''}
                    onChange={(e) =>
                      handleEdit(c.id, 'nombreEditado', e.target.value)
                    }
                    className={`bg-transparent outline-none focus:ring-1 focus:ring-${color}-500/50 rounded px-2 py-1 w-full text-sm text-gray-200 transition-all`}
                  />
                </td>

                <td className="p-4">
                  <input
                    value={c.email || ''}
                    onChange={(e) => handleEdit(c.id, 'email', e.target.value)}
                    className="bg-transparent outline-none focus:ring-1 focus:ring-blue-500/50 rounded px-2 py-1 w-full text-sm text-blue-400 font-mono"
                  />
                </td>

                <td className="p-4 text-sm font-mono">
                  <div className="flex items-center gap-2">
                    <Phone size={12} className="text-gray-600 shrink-0" />
                    <input
                      value={c.telefono || ''} // Directo y simple
                      onChange={(e) =>
                        handleEdit(c.id, 'telefono', e.target.value)
                      }
                      className={`bg-transparent outline-none focus:ring-1 focus:ring-green-500/50 rounded px-2 py-1 w-full text-sm transition-all truncate max-w-37.5 ${
                        !c.telefono ? 'text-gray-600 italic' : 'text-gray-400'
                      }`}
                      placeholder="Sin número"
                    />
                  </div>
                </td>

                <td className="p-4">
                  <div className="flex items-center justify-center gap-2">
                    {/* Botón de acción dinámico: Abre el editor correspondiente */}
                    <button
                      onClick={() => abrirEditor(c)}
                      title={`Personalizar ${envioMode === 'email' ? 'Correo' : 'WhatsApp'}`}
                      className={`p-2 transition-all rounded-lg ${
                        envioMode === 'email'
                          ? `text-gray-500 hover:text-${color}-400 hover:bg-${color}-500/10`
                          : 'text-gray-500 hover:text-green-400 hover:bg-green-500/10'
                      }`}
                    >
                      {/* Aquí mostramos Mail o WhatsApp según el modo para dar feedback visual */}
                      {envioMode === 'email' ? (
                        <Mail size={16} />
                      ) : (
                        <MessageCircle size={16} />
                      )}
                    </button>

                    <button
                      onClick={() => eliminarCandidato(c.id)}
                      className="p-2 text-gray-700 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CandidatesTable
