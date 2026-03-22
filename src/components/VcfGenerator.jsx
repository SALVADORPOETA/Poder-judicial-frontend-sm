import React, { useState } from 'react'
import DataDropzone from './DataDropzone'
import { Download, Users, Hash } from 'lucide-react'
import { API_URL } from '../apiConfig'

const VcfGenerator = () => {
  const [file, setFile] = useState(null)
  const [jsonData, setJsonData] = useState(null)
  const [pjNumber, setPjNumber] = useState('')
  const [loading, setLoading] = useState(false)

  // Tu lógica de limpieza adaptada al estado
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (!selectedFile) return

    // Aplicamos tu Regex: busca "lista_" seguido de números
    const match = selectedFile.name.match(/lista_(\d+)/)
    const detectedId = match ? match[1] : 'extraida'

    setPjNumber(detectedId)
    setFile(selectedFile)

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result)
        setJsonData(parsed)
      } catch (err) {
        alert('El archivo no es un JSON válido')
        setFile(null)
        setJsonData(null)
      }
    }
    reader.readAsText(selectedFile)
  }

  const handleDownload = async () => {
    if (!jsonData) return alert('Primero carga el archivo en el dropzone')

    setLoading(true)
    try {
      // Usamos API_URL de apiConfig
      const response = await fetch(`${API_URL}/api/generate-vcf`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lista: jsonData, // Aquí va el contenido del JSON subido
          pj: pjNumber, // El número extraído del nombre del archivo
        }),
      })

      if (!response.ok) throw new Error('Error en el servidor')

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `contactos_lista_${pjNumber}.vcf`
      document.body.appendChild(a)
      a.click()
      a.remove()
    } catch (err) {
      console.error(err)
      alert('Error: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Lado Izquierdo: Carga de Archivo */}
      <DataDropzone
        file={file}
        onFileChange={handleFileChange}
        color="green"
        description="Se limpiarán los contactos del JSON para descargarlos en archivo VCF"
      />

      {/* Lado Derecho: Panel de Control */}
      <div className="bg-gray-900/50 p-6 rounded-2xl border border-gray-800 flex flex-col justify-between min-h-75">
        <div className="space-y-6">
          <h2 className="text-sm font-semibold text-emerald-300 uppercase tracking-widest">
            Análisis de Archivo
          </h2>

          {jsonData ? (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
              {/* Visualización del ID Extraído */}
              <div className="bg-gray-800/80 border border-emerald-500/20 p-5 rounded-xl flex items-center gap-4">
                <div className="bg-emerald-500/10 p-3 rounded-full">
                  <Hash className="text-emerald-400" size={24} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase font-black tracking-tighter">
                    Lista Identificada
                  </p>
                  <p className="text-2xl font-mono text-white">{pjNumber}</p>
                </div>
              </div>

              {/* Contador de Contactos */}
              <div className="bg-emerald-900/10 border border-emerald-500/20 p-5 rounded-xl flex items-center gap-4">
                <div className="bg-emerald-500/10 p-3 rounded-full">
                  <Users className="text-emerald-400" size={24} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase font-black tracking-tighter">
                    Total Registros
                  </p>
                  <p className="text-2xl font-mono text-emerald-400">
                    {jsonData.length}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center border border-dashed border-gray-800 rounded-xl h-44">
              <p className="text-gray-600 text-xs italic">
                Sube un archivo para iniciar la extracción
              </p>
            </div>
          )}
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mt-8">
          <button
            onClick={handleDownload}
            disabled={loading || !jsonData}
            className={`w-full py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2 ${
              loading || !jsonData
                ? 'bg-gray-700 text-gray-500'
                : 'text-white shadow-lg'
            }`}
            style={{
              backgroundColor: loading || !jsonData ? '#374151' : '#1a1a1a',
              border: '1px solid transparent',
              color: loading || !jsonData ? '#9ca3af' : 'white',
              cursor: loading || !jsonData ? 'default' : 'pointer',
            }}
            onMouseOver={(e) => {
              if (!loading && jsonData) {
                e.currentTarget.style.borderColor = '#10b981' // Color Esmeralda
              }
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = 'transparent'
            }}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-emerald-400"
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
                <span className="animate-pulse">Generando VCF...</span>
              </>
            ) : (
              <>
                <Download size={18} />
                Descargar VCF
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default VcfGenerator
