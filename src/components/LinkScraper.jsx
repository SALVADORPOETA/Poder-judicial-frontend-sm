import React, { useState } from 'react'
import { CheckCircle } from 'lucide-react'

const LinkScraper = () => {
  const LISTAS_OPCIONES = [
    { id: '1', nombre: '1. Ministras y Ministros SCJN' },
    { id: '2', nombre: '2. Magistradas y Magistrados Sala Superior TEPJF' },
    { id: '3', nombre: '3. Magistradas y Magistrados Salas Regionales TEPJF' },
    { id: '4', nombre: '4. Magistradas y Magistrados Tribunal de Disciplina' },
    { id: '5', nombre: '5. Magistradas y Magistrados de Circuito' },
    { id: '6', nombre: '6. Juezas y Jueces de Distrito' },
  ]

  const [listId, setListId] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')
  const [downloadUrl, setDownloadUrl] = useState(null)

  const handleStartScraping = async (e) => {
    e.preventDefault()
    if (!listId) return

    setLoading(true)
    setStatus('loading')
    setDownloadUrl(null)

    try {
      const response = await fetch('http://localhost:3001/api/start-scraping', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: listId }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage(`¡Éxito! ${data.total} URLs encontradas`)
        setDownloadUrl(data.downloadUrl)
      } else {
        throw new Error(data.error || 'Error en el servidor')
      }
    } catch (error) {
      setStatus('error')
      setMessage(`Fallo: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    // <div className="space-y-6 bg-gray-800/50 p-6 rounded-xl border border-gray-700 max-w-md mx-auto shadow-xl">
    <div className="space-y-6 bg-gray-800/50 p-6 rounded-xl border border-gray-700 w-full shadow-xl h-full">
      <h2 className="text-xl font-semibold text-blue-300">
        Extracción de URLs
      </h2>

      <form onSubmit={handleStartScraping} className="space-y-4">
        <div className="relative group">
          <select
            value={listId}
            onChange={(e) => setListId(e.target.value)}
            disabled={loading}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white outline-none appearance-none transition-all cursor-pointer pr-10 hover:border-blue-500 focus:border-blue-500 focus:ring-0"
          >
            <option value="" disabled>
              Selecciona una lista...
            </option>
            {LISTAS_OPCIONES.map((opcion) => (
              <option key={opcion.id} value={opcion.id} className="bg-gray-800">
                {opcion.nombre}
              </option>
            ))}
          </select>

          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 group-hover:text-blue-400 transition-colors">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !listId}
          className={`w-full py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2 ${
            loading || !listId
              ? 'bg-gray-700 text-gray-500'
              : 'text-white shadow-lg'
          }`}
          style={{
            backgroundColor: loading || !listId ? '#374151' : '#1a1a1a',
            border: '1px solid transparent',
            color: loading || !listId ? '#9ca3af' : 'white',
            // Control total del cursor desde el estilo
            cursor: loading || !listId ? 'default' : 'pointer',
          }}
          onMouseOver={(e) => {
            // Solo activa el borde azul si hay una lista seleccionada Y no está cargando
            if (!loading && listId) {
              e.currentTarget.style.borderColor = '#646cff'
            }
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.borderColor = 'transparent'
          }}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Extrayendo enlaces...
            </>
          ) : (
            'Iniciar Búsqueda'
          )}
        </button>
      </form>

      {/* Caja de Éxito y Botón de Descarga RESTAURADO */}
      {status === 'success' && downloadUrl && (
        <div className="bg-blue-900/20 border border-blue-500/50 p-6 rounded-lg flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-300">
          <div className="text-blue-400 font-bold text-sm flex items-center gap-2 mb-2">
            <CheckCircle size={18} /> {message}
          </div>
          <a
            href={downloadUrl}
            download={`enlaces_lista_${listId}.json`}
            style={{
              borderRadius: '8px',
              border: '1px solid transparent',
              padding: '0.6em 1.2em',
              fontSize: '1em',
              fontWeight: '500',
              backgroundColor: '#1a1a1a', // Fondo original
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'border-color 0.25s',
              color: 'white', // Texto blanco como estaba
              width: '60%',
              margin: '0 auto',
              textDecoration: 'none',
            }}
            onMouseOver={(e) => (e.currentTarget.style.borderColor = '#646cff')}
            onMouseOut={(e) =>
              (e.currentTarget.style.borderColor = 'transparent')
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Descargar JSON
          </a>
        </div>
      )}
    </div>
  )
}

export default LinkScraper
