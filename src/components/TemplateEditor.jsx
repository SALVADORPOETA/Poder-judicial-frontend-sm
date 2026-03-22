import { Info, Mail, MessageCircle } from 'lucide-react'

const TemplateEditor = ({
  asunto,
  setAsunto,
  plantilla,
  setPlantilla,
  color, // 'purple' por defecto desde el padre
  envioMode,
  setEnvioMode,
}) => {
  // Definimos las variantes de color de forma explícita
  const textColor =
    envioMode === 'whatsapp' ? 'text-green-400' : 'text-purple-400'
  const focusColor =
    envioMode === 'whatsapp'
      ? 'focus:border-green-500'
      : 'focus:border-purple-500'
  const tagColor =
    envioMode === 'whatsapp' ? 'text-green-400' : 'text-purple-400'

  return (
    <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-2xl shadow-xl h-full">
      <div className="flex justify-between items-center mb-6">
        <label
          className={`flex items-center gap-2 text-sm font-medium ${textColor} uppercase tracking-wider`}
        >
          <Info size={16} /> Plantilla de{' '}
          {envioMode === 'email' ? 'Email' : 'WhatsApp'}
        </label>

        {/* Switch de Modo */}
        <div className="flex bg-black/40 p-1 rounded-xl border border-gray-700 gap-1">
          <button
            type="button"
            onClick={() => setEnvioMode('email')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-tighter transition-all ${
              envioMode === 'email'
                ? 'bg-purple-500/50! text-white! shadow-lg'
                : 'text-gray-500! hover:text-gray-300!'
            }`}
          >
            <Mail size={12} /> Email
          </button>
          <button
            type="button"
            onClick={() => setEnvioMode('whatsapp')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-tighter transition-all ${
              envioMode === 'whatsapp'
                ? 'bg-green-500/50! text-white! shadow-lg'
                : 'text-gray-500! hover:text-gray-300!'
            }`}
          >
            <MessageCircle size={12} /> WhatsApp
          </button>
        </div>
      </div>

      {/* Input de Asunto (Condicional) */}
      {envioMode === 'email' && (
        <div className="mb-6 animate-in fade-in slide-in-from-top-2">
          <label className="flex items-center gap-2 text-[10px] font-black mb-2 text-gray-500 uppercase tracking-widest">
            Asunto del {envioMode === 'email' ? 'correo' : 'mensaje'}
          </label>
          <input
            type="text"
            className={`w-full bg-black/40 border border-gray-700 rounded-xl px-4 py-3 outline-none ${focusColor} transition-all text-sm font-mono`}
            value={asunto}
            onChange={(e) => setAsunto(e.target.value)}
          />
          <p className="mt-3 text-[12px] text-gray-500">
            Usa <span className={tagColor}>[nombre]</span>,{' '}
            <span className={tagColor}>{'{o|a}'}</span>,{' '}
            <span className={tagColor}>{'{a}'}</span>,{' '}
            <span className={tagColor}>{'{El|La}'}</span> y{' '}
            <span className={tagColor}>{'{el|la}'}</span> para personalizar.
          </p>
        </div>
      )}

      {/* Textarea */}
      <div className="mb-6">
        <label className="flex items-center gap-2 text-[10px] font-black mb-2 text-gray-500 uppercase tracking-widest">
          Cuerpo del {envioMode === 'email' ? 'correo' : 'mensaje'}
        </label>
        <textarea
          className={`w-full h-48 bg-black/40 border border-gray-700 rounded-xl p-4 outline-none ${focusColor} transition-all text-sm font-mono`}
          value={plantilla}
          onChange={(e) => setPlantilla(e.target.value)}
        />
        <p className="mt-2 text-[12px] text-gray-500">
          Usa <span className={tagColor}>[nombre]</span>,{' '}
          <span className={tagColor}>{'{o|a}'}</span>,{' '}
          <span className={tagColor}>{'{a}'}</span>,{' '}
          <span className={tagColor}>{'{El|La}'}</span> y{' '}
          <span className={tagColor}>{'{el|la}'}</span> para personalizar.
        </p>
      </div>
    </div>
  )
}

export default TemplateEditor
