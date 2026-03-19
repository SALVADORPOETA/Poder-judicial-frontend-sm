import React, { useState } from 'react'
import { FileJson, CheckCircle, FileSpreadsheet } from 'lucide-react'

const DetailScraper = () => {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')
  const [downloadUrl, setDownloadUrl] = useState(null)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile && selectedFile.type === 'application/json') {
      setFile(selectedFile)
      setStatus('idle')
      setDownloadUrl(null)
    } else {
      alert('Por favor, sube un archivo JSON válido')
    }
  }

  const handleStartDetailScraping = async (e) => {
    e.preventDefault()
    if (!file) return

    setLoading(true)
    setStatus('loading')
    setDownloadUrl(null)

    const formData = new FormData()
    formData.append('enlacesJson', file)

    try {
      const response = await fetch('http://localhost:3001/api/scrape-details', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage(`¡Éxito! ${data.total} perfiles procesados`)
        // Obtenemos el nombre del archivo generado del backend
        const fileName = data.file.split('\\').pop().split('/').pop()
        setDownloadUrl(`http://localhost:3001/descargas/detalles/${fileName}`)
      } else {
        throw new Error(data.error || 'Error en el servidor')
      }
    } catch (error) {
      console.error(error)
      setStatus('error')
      setMessage(`Fallo: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleGenerateExcel = async () => {
    // Extraemos el ID del archivo que el usuario ya subió
    const match = file.name.match(/enlaces_electos_(\d+)/)
    const listId = match ? match[1] : 'extraida'

    try {
      const response = await fetch('http://localhost:3001/api/generate-excel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: listId }),
      })

      const data = await response.json()
      if (data.success) {
        // Abrimos el link de descarga que nos da el servidor
        window.location.href = data.downloadUrl
      } else {
        alert('Error al generar Excel: ' + data.error)
      }
    } catch (err) {
      console.error(err)
      alert('Error de conexión con el servidor')
    }
  }

  return (
    // <div className="space-y-6 bg-gray-800/50 p-6 rounded-xl border border-gray-700 max-w-md mx-auto shadow-xl">
    <div className="space-y-6 bg-gray-800/50 p-6 rounded-xl border border-gray-700 w-full shadow-xl h-full">
      <h2 className="text-xl font-semibold text-blue-300">
        Extracción de Detalles
      </h2>

      <div className="space-y-4">
        {/* Dropzone de archivo */}
        <div className="relative border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-blue-500 transition-colors group">
          <input
            type="file"
            accept=".json"
            onChange={handleFileChange}
            disabled={loading}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
          />
          <div className="space-y-2">
            <FileJson
              className={`mx-auto h-8 w-8 ${file ? 'text-blue-400' : 'text-gray-500'} group-hover:text-blue-400 transition-colors`}
            />
            <p className="text-xs text-gray-400">
              {file ? (
                <span className="text-blue-300 font-medium">{file.name}</span>
              ) : (
                'Arrastra o selecciona el JSON de enlaces'
              )}
            </p>
          </div>
        </div>
        {/* Botón de Acción unificado */}
        <button
          onClick={handleStartDetailScraping}
          disabled={loading || !file}
          className={`w-full py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2 ${
            loading || !file
              ? 'bg-gray-700 text-gray-500'
              : 'text-white shadow-lg'
          }`}
          style={{
            backgroundColor: loading || !file ? '#374151' : '#1a1a1a',
            border: '1px solid transparent',
            color: loading || !file ? '#9ca3af' : 'white',
            // ESTO fuerzan el cursor: si no hay archivo o está cargando, usa 'default' (flecha)
            cursor: loading || !file ? 'default' : 'pointer',
          }}
          onMouseOver={(e) => {
            if (!loading && file) {
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
              Procesando perfiles...
            </>
          ) : (
            'Iniciar Extracción de Datos'
          )}
        </button>
      </div>

      {/* Caja de Éxito y Acciones Finales */}
      {status === 'success' && downloadUrl && (
        <div className="bg-blue-900/20 border border-blue-500/50 p-6 rounded-lg flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-300">
          <div className="text-blue-400 font-bold text-sm flex items-center gap-2 mb-2">
            <CheckCircle size={18} /> {message}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            {/* Botón Descargar JSON: Texto pequeño para evitar doble línea */}
            <a
              href={downloadUrl}
              download
              className="flex-1 py-2 px-4 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 text-white shadow-lg"
              style={{
                backgroundColor: '#1a1a1a',
                border: '1px solid transparent',
                color: 'white',
                textDecoration: 'none',
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.borderColor = '#646cff')
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.borderColor = 'transparent')
              }
            >
              <FileJson size={14} />
              Descargar JSON
            </a>
            {/* Botón Generar Excel: Corregido el borde de enfoque */}
            <button
              onClick={(e) => {
                handleGenerateExcel()
                e.currentTarget.blur() // Quita el foco inmediatamente para eliminar el borde blanco
              }}
              className="flex-1 py-2 px-4 rounded-lg font-bold text-xs transition-all flex items-center justify-center gap-2 text-white shadow-lg outline-none focus:ring-0"
              style={{
                backgroundColor: '#1a1a1a',
                border: '1px solid transparent',
                color: 'white',
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.borderColor = '#646cff')
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.borderColor = 'transparent')
              }
            >
              <FileSpreadsheet size={14} />
              Generar Excel
            </button>
          </div>
        </div>
      )}
      {status === 'error' && (
        <div className="bg-red-900/20 border border-red-500/50 p-3 rounded-lg text-red-400 text-xs text-center">
          {message}
        </div>
      )}
    </div>
  )
}

export default DetailScraper
