import React from 'react'
import { X, Save, MessageSquare, AlertCircle } from 'lucide-react'

const MessageModal = ({
  isOpen,
  onClose,
  asunto,
  setAsunto,
  mensaje,
  setMensaje,
  onSave,
  candidato,
}) => {
  if (!isOpen || !candidato) return null

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />

      <div className="relative bg-[#0d0d0d] border border-gray-800 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 border-b border-gray-800 flex justify-between items-start bg-gray-900/30">
          <div className="flex gap-4">
            <div className="mt-1 p-2.5 bg-purple-500/10 rounded-xl text-purple-400">
              <MessageSquare size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                Personalizar Email
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Para:{' '}
                <span className="text-purple-400 font-semibold">
                  {candidato.nombreEditado}
                </span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white! bg-gray-800! hover:text-white! hover:bg-gray-600/50! transition-all! rounded-full p-1"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* SECCIÓN DE ASUNTO - Aquí verás el texto ya procesado */}
          <div className="space-y-2">
            <label className="text-[10px] text-gray-500 uppercase font-black tracking-widest">
              Asunto del Correo
            </label>
            <input
              type="text"
              value={asunto || ''}
              onChange={(e) => setAsunto(e.target.value)}
              className="w-full bg-black/40 border border-gray-700 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500 transition-all font-mono text-sm"
              placeholder="Escribe el asunto..."
            />
          </div>

          {/* SECCIÓN DE CUERPO - Aquí verás el mensaje ya procesado */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-[10px] text-gray-500 uppercase font-black tracking-widest">
                Cuerpo del Correo
              </label>
              <span className="text-[10px] text-gray-600 font-mono">
                {(mensaje || '').length} caracteres
              </span>
            </div>
            <textarea
              value={mensaje || ''}
              onChange={(e) => setMensaje(e.target.value)}
              spellCheck="false"
              className="w-full h-52 bg-black/40 border border-gray-700 rounded-2xl p-5 text-gray-200 outline-none focus:border-purple-500 transition-all font-mono text-sm leading-relaxed resize-none"
            />
          </div>

          <div className="flex items-start gap-2 p-3 bg-amber-500/5 border border-amber-500/10 rounded-xl">
            <AlertCircle size={14} className="text-amber-500 mt-0.5 shrink-0" />
            <p className="text-[11px] text-amber-500/80 leading-snug">
              Nota: Este mensaje se enviará al correo:{' '}
              <span className="text-amber-200 font-mono">
                {candidato.email || 'Sin correo'}
              </span>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-800 flex justify-end gap-3 bg-gray-900/20">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-white! bg-gray-700! hover:text-white! hover:bg-gray-400/50! transition-all! text-xs! uppercase tracking-widest!"
          >
            Descartar
          </button>
          <button
            onClick={onSave}
            className="px-8 py-2.5 bg-purple-800! hover:bg-purple-600! text-white! rounded-xl transition-all! flex items-center gap-2 shadow-lg! uppercase text-xs! tracking-widest!"
          >
            <Save size={16} /> Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  )
}

export default MessageModal
