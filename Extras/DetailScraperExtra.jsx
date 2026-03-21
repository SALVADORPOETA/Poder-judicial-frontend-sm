import React, { useState } from 'react'
import { FileJson, CheckCircle, FileSpreadsheet } from 'lucide-react'

const DetailScraper = () => {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')
  // Ahora guardamos los datos en lugar de la URL
  const [scrapedData, setScrapedData] = useState(null)

  const API_URL =
    window.location.hostname === 'localhost'
      ? 'http://localhost:3001'
      : 'https://poder-judicial-backend-sm.vercel.app'

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile && selectedFile.type === 'application/json') {
      setFile(selectedFile)
      setStatus('idle')
      setScrapedData(null)
    } else {
      alert('Por favor, sube un archivo JSON válido')
    }
  }

  const handleStartDetailScraping = async (e) => {
    e.preventDefault()
    if (!file) return

    setLoading(true)
    setStatus('loading')
    setScrapedData(null)

    const formData = new FormData()
    formData.append('enlacesJson', file)

    try {
      const response = await fetch(`${API_URL}/api/scrape-details`, {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage(`¡Éxito! ${result.total} perfiles procesados`)
        // Guardamos los datos recibidos (el array de resultados)
        setScrapedData(result.data)
      } else {
        throw new Error(result.error || 'Error en el servidor')
      }
    } catch (error) {
      console.error(error)
      setStatus('error')
      setMessage(`Fallo: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  // Función para descargar el JSON desde la RAM del navegador
  const descargarJsonLocal = () => {
    if (!scrapedData) return
    const blob = new Blob([JSON.stringify(scrapedData, null, 2)], {
      type: 'application/json',
    })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `detalles_extraidos_${new Date().getTime()}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }

  const handleGenerateExcel = async () => {
    if (!scrapedData) return

    try {
      // Enviamos los datos actuales para que el backend genere el Excel al vuelo
      const response = await fetch(`${API_URL}/api/generate-excel`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ datos: scrapedData }),
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `reporte_poder_judicial.xlsx`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
      } else {
        alert('Error al generar Excel')
      }
    } catch (err) {
      console.error(err)
      alert('Error de conexión con el servidor')
    }
  }

  return (
    <div className="space-y-6 bg-gray-800/50 p-6 rounded-xl border border-gray-700 w-full shadow-xl h-full">
      <h2 className="text-xl font-semibold text-blue-300">
        Extracción de Detalles
      </h2>

      <div className="space-y-4">
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

      {status === 'success' && scrapedData && (
        <div className="bg-blue-900/20 border border-blue-500/50 p-6 rounded-lg flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-300">
          <div className="text-blue-400 font-bold text-sm flex items-center gap-2 mb-2">
            <CheckCircle size={18} /> {message}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <button
              onClick={descargarJsonLocal}
              className="flex-1 py-2 px-4 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 text-white shadow-lg"
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
              <FileJson size={14} />
              Descargar JSON
            </button>
            <button
              onClick={(e) => {
                handleGenerateExcel()
                e.currentTarget.blur()
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
