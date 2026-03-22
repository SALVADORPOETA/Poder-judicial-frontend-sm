import React, { useState } from 'react'
import { ClipboardType, Send } from 'lucide-react'
import BackButton from '../components/BackButton'
import TemplateEditor from '../components/TemplateEditor'
import DataDropzone from '../components/DataDropzone'
import CandidatesTable from '../components/CandidatesTable'
import { processCandidato } from '../utils/nameProcessor'
import MessageModal from '../components/MessageModal'
import WhatsAppModal from '../components/WhatsAppModal'
import PortapapelesModal from '../components/PortapapelesModal'
import { API_URL } from '../apiConfig'

const Servicio2 = () => {
  const [candidatos, setCandidatos] = useState([])
  const [plantilla, setPlantilla] = useState('')
  const [rangoInicio, setRangoInicio] = useState(1)
  const [rangoFin, setRangoFin] = useState(5)
  const [file, setFile] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCandidato, setSelectedCandidato] = useState(null)
  const [tempMensaje, setTempMensaje] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [asunto, setAsunto] = useState('')
  const [tempAsunto, setTempAsunto] = useState('')
  const [envioMode, setEnvioMode] = useState('email')
  const [plantillaEmail, setPlantillaEmail] = useState('')
  const [plantillaWhatsApp, setPlantillaWhatsApp] = useState('')
  const [isPortapapelesOpen, setIsPortapapelesOpen] = useState(false)

  // --- CONFIGURACIÓN DE URL PARA PRODUCCIÓN ---

  const handleOpenEdit = (candidato) => {
    setSelectedCandidato(candidato)
    const textoBaseAsunto = candidato.asuntoPersonalizado || asunto
    const textoBaseCuerpo =
      envioMode === 'email'
        ? candidato.mensajePersonalizado || plantillaEmail
        : candidato.mensajeWhatsAppPersonalizado || plantillaWhatsApp

    setTempAsunto(aplicarEtiquetas(textoBaseAsunto, candidato))
    setTempMensaje(aplicarEtiquetas(textoBaseCuerpo, candidato))
    setIsModalOpen(true)
  }

  const handleSaveMensaje = () => {
    setCandidatos((prev) =>
      prev.map((c) =>
        c.id === selectedCandidato.id
          ? {
              ...c,
              ...(envioMode === 'email'
                ? {
                    mensajePersonalizado: tempMensaje,
                    asuntoPersonalizado: tempAsunto,
                    statusEmail: 'LISTO',
                  }
                : {
                    mensajeWhatsAppPersonalizado: tempMensaje,
                    statusWhatsApp: 'LISTO',
                  }),
            }
          : c,
      ),
    )
    setIsModalOpen(false)
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile?.type === 'application/json') {
      setFile(selectedFile)
      const reader = new FileReader()
      reader.onload = (event) => {
        try {
          const json = JSON.parse(event.target.result)
          const procesados = json.map((c, i) => {
            const base = processCandidato(c, i)
            const statusInicial = c.status || base.status || 'LISTO'
            return {
              ...base,
              email:
                c.email ||
                c.Email ||
                c.correo ||
                c.CORREO ||
                (base && base.email) ||
                '',
              telefono:
                c.telefono ||
                c.Telefono ||
                c.phone ||
                (base && base.telefono) ||
                '',
              statusEmail: statusInicial,
              statusWhatsApp: statusInicial,
              mensajePersonalizado: '',
              mensajeWhatsAppPersonalizado: '',
              asuntoPersonalizado: '',
            }
          })
          setCandidatos(procesados)
          setRangoFin(procesados.length)
        } catch (err) {
          console.error('Error al procesar el JSON:', err)
          alert('Error al leer el JSON. Revisa la consola.')
        }
      }
      reader.readAsText(selectedFile)
    }
  }

  const handleEdit = (id, campo, valor) => {
    setCandidatos((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [campo]: valor } : c)),
    )
  }

  const eliminarCandidato = (id) => {
    if (window.confirm('¿Eliminar candidato?')) {
      setCandidatos((prev) => prev.filter((c) => c.id !== id))
    }
  }

  const enviarMensajesMasivos = async () => {
    const rango = candidatos.slice(rangoInicio - 1, rangoFin)
    if (rango.length === 0) return alert('Rango vacío')

    const mensajeConfirmacion =
      envioMode === 'whatsapp'
        ? `¿Estás seguro de enviar ${rango.length} ${rango.length === 1 ? 'mensaje' : 'mensajes'} por WhatsApp?`
        : `¿Estás seguro de enviar ${rango.length} ${rango.length === 1 ? 'correo electrónico' : 'correos electrónicos'}?`

    if (!window.confirm(mensajeConfirmacion)) return

    setEnviando(true)

    try {
      if (envioMode === 'whatsapp') {
        const listaWhatsApp = rango.map((c) => ({
          telefono: String(c.telefono || '').replace(/\D/g, ''),
          nombre: c.nombreEditado || c.nombre,
          mensaje:
            c.mensajeWhatsAppPersonalizado ||
            aplicarEtiquetas(plantillaWhatsApp, c),
        }))

        // CAMBIO: Usar API_URL dinámica
        const response = await fetch(`${API_URL}/api/send-whatsapp-bulk`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ lista: listaWhatsApp }),
        })

        const data = await response.json()

        if (response.ok) {
          // Si data.message no existe, mostrará el texto alternativo
          alert(
            `✅ WhatsApp: ${data.message || 'Envío finalizado correctamente'}`,
          )
        } else {
          alert(`❌ Error: ${data.error || 'No se pudo completar el envío'}`)
        }
      } else if (envioMode === 'email') {
        const listaEmail = rango.map((c) => ({
          email: c.email,
          asunto: c.asuntoPersonalizado || aplicarEtiquetas(asunto, c),
          cuerpo: c.mensajePersonalizado || aplicarEtiquetas(plantillaEmail, c),
        }))

        // CAMBIO: Usar API_URL dinámica
        const response = await fetch(`${API_URL}/api/send-email-bulk`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ lista: listaEmail }),
        })

        const data = await response.json()

        if (response.ok) {
          alert(`✅ Email: ${data.message || 'Correos enviados con éxito'}`)
        } else {
          alert(
            `❌ Error Email: ${data.error || 'No se pudieron enviar los correos'}`,
          )
        }
      }
    } catch (error) {
      console.error(error)
      alert('Error en el envío. Revisa la consola.')
    } finally {
      setEnviando(false)
    }
  }

  const aplicarEtiquetas = (texto, candidato) => {
    if (!texto) return ''
    if (!candidato) return texto
    const esFemenino = ['MUJER', 'F', 'FEMENINO'].includes(
      String(candidato.sexo || '').toUpperCase(),
    )
    return texto
      .replace(
        /\[nombre\]/g,
        candidato.nombreEditado || candidato.nombre || 'Candidato',
      )
      .replace(/\{o\|a\}/g, esFemenino ? 'a' : 'o')
      .replace(/\{a\}/g, esFemenino ? 'a' : '')
      .replace(/\{El\|La\}/g, esFemenino ? 'La' : 'El')
      .replace(/\{el\|la\}/g, esFemenino ? 'la' : 'el')
  }

  const MOCK_DATA_TEXT = `...` // (Tu texto plano se mantiene igual)

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto mt-5 md:mt-8">
        <header className="mb-10 hidden md:flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">
          <div className="flex w-full items-center justify-between md:flex-1 md:justify-start">
            <BackButton hoverColor="purple" />
          </div>
          <div className="flex-none text-center px-4">
            <h1 className="text-4xl lg:text-5xl font-bold text-purple-400 tracking-tight mb-2">
              Mensajería Masiva
            </h1>
            <p className="text-gray-500 text-xs md:text-sm">
              Configuración de plantillas y gestión de envíos
            </p>
          </div>
          <div className="flex flex-1 justify-end items-center">
            <div className="bg-gray-900 border border-gray-800 p-2 rounded-xl flex items-center gap-3">
              <span className="text-[12px] lg:text-[15px] text-gray-500 ml-2 uppercase font-bold tracking-tighter">
                Rango de Envío:
              </span>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  value={rangoInicio === 0 ? '' : rangoInicio}
                  onChange={(e) => {
                    const val = e.target.value
                    setRangoInicio(val === '' ? 0 : Number(val))
                  }}
                  onBlur={(e) => {
                    const valorFinal = Math.max(1, Number(e.target.value))
                    setRangoInicio(valorFinal)
                    if (rangoFin < valorFinal) setRangoFin(valorFinal)
                  }}
                  className="w-14 bg-black/50 border border-gray-700 rounded-lg p-1 text-center text-purple-300 outline-none focus:border-purple-500 font-bold text-xs"
                />
                <span className="text-gray-600 text-xs">al</span>
                <input
                  type="number"
                  min={rangoInicio}
                  value={rangoFin === 0 ? '' : rangoFin}
                  onChange={(e) => {
                    const val = e.target.value
                    setRangoFin(val === '' ? 0 : Number(val))
                  }}
                  onBlur={(e) => {
                    const valorFinal = Math.max(
                      rangoInicio,
                      Number(e.target.value),
                    )
                    setRangoFin(valorFinal)
                  }}
                  className="w-14 bg-black/50 border border-gray-800 rounded-lg p-1 text-center text-purple-300 outline-none focus:border-purple-500 font-bold text-xs"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Versión Mobile Header */}
        <header className="mb-10 flex md:hidden flex-col items-center gap-6">
          <div className="flex w-full items-center">
            <BackButton hoverColor="purple" />
            <div className="flex-1 text-center px-4">
              <h1 className="text-3xl font-bold text-purple-400 tracking-tight mb-2">
                Mensajería Masiva
              </h1>
              <p className="text-gray-500 text-xs">
                Configuración de plantillas y gestión de envíos
              </p>
            </div>
            <div className="w-10" />
          </div>
          <div className="flex flex-1 justify-end items-center">
            <div className="bg-gray-900 border border-gray-800 p-2 rounded-xl flex items-center gap-3">
              <span className="text-[15px] text-gray-500 ml-2 uppercase font-bold tracking-tighter">
                Rango de Envío:
              </span>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  value={rangoInicio}
                  onChange={(e) =>
                    setRangoInicio(Math.max(1, Number(e.target.value)))
                  }
                  className="w-14 bg-black/50 border border-gray-700 rounded-lg p-1 text-center text-purple-300 outline-none focus:border-purple-500 font-bold text-xs"
                />
                <span className="text-gray-600 text-xs">al</span>
                <input
                  type="number"
                  min={rangoInicio}
                  value={rangoFin}
                  onChange={(e) =>
                    setRangoFin(Math.max(rangoInicio, Number(e.target.value)))
                  }
                  className="w-14 bg-black/50 border border-gray-700 rounded-lg p-1 text-center text-purple-300 outline-none focus:border-purple-500 font-bold text-xs"
                />
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <TemplateEditor
              envioMode={envioMode}
              setEnvioMode={setEnvioMode}
              plantilla={
                envioMode === 'email' ? plantillaEmail : plantillaWhatsApp
              }
              setPlantilla={
                envioMode === 'email' ? setPlantillaEmail : setPlantillaWhatsApp
              }
              asunto={asunto}
              setAsunto={setAsunto}
              color="purple"
            />
          </div>
          <DataDropzone
            file={file}
            onFileChange={handleFileChange}
            color="purple"
            description="El sistema procesará nombres y géneros automáticamente al subir."
          />
        </div>

        {candidatos.length > 0 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <CandidatesTable
              envioMode={envioMode}
              setEnvioMode={setEnvioMode}
              candidatos={candidatos.slice(rangoInicio - 1, rangoFin)}
              handleEdit={handleEdit}
              eliminarCandidato={eliminarCandidato}
              abrirEditor={handleOpenEdit}
              color="purple"
            />
            <div className="flex flex-col items-end mt-6">
              <p className="text-[10px] text-gray-500 uppercase font-bold mb-4 text-right tracking-widest">
                {(() => {
                  const total = Math.max(0, rangoFin - rangoInicio + 1)
                  const esSingular = total === 1
                  return (
                    <>
                      Preparado para enviar desde el contacto #{rangoInicio}{' '}
                      hasta el #{rangoFin} ({total}{' '}
                      {envioMode === 'email'
                        ? esSingular
                          ? 'correo'
                          : 'correos'
                        : esSingular
                          ? 'mensaje'
                          : 'mensajes'}{' '}
                      en total)
                    </>
                  )
                })()}
              </p>
              <button
                onClick={enviarMensajesMasivos}
                disabled={enviando}
                className={`${
                  enviando
                    ? 'opacity-50 cursor-not-allowed'
                    : envioMode === 'email'
                      ? 'hover:border-purple-500!'
                      : 'hover:border-green-500!'
                } bg-gray-800! border border-transparent text-white font-black py-4 px-12 rounded-2xl transition-all active:scale-95 flex items-center gap-3 shadow-2xl uppercase text-xs tracking-[0.2em]`}
              >
                <Send
                  size={18}
                  className={
                    enviando
                      ? 'animate-spin'
                      : envioMode === 'email'
                        ? 'text-purple-400'
                        : 'text-green-400'
                  }
                />
                {enviando
                  ? 'Enviando Paquete...'
                  : `Enviar ${envioMode === 'email' ? 'Correos' : 'WhatsApp'} Ahora`}
              </button>
            </div>
          </div>
        )}

        <button
          onClick={() => setIsPortapapelesOpen(true)}
          className="flex items-center gap-2 mt-4 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white rounded-xl font-bold text-xs transition-all border border-gray-700 uppercase tracking-widest"
        >
          <ClipboardType size={16} />
          Portapapeles
        </button>
      </div>

      <PortapapelesModal
        isOpen={isPortapapelesOpen}
        onClose={() => setIsPortapapelesOpen(false)}
        data={MOCK_DATA_TEXT}
      />

      {envioMode === 'email' ? (
        <MessageModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          asunto={tempAsunto}
          setAsunto={setTempAsunto}
          mensaje={tempMensaje}
          setMensaje={setTempMensaje}
          onSave={handleSaveMensaje}
          candidato={selectedCandidato}
        />
      ) : (
        <WhatsAppModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          mensaje={tempMensaje}
          setMensaje={setTempMensaje}
          onSave={handleSaveMensaje}
          candidato={selectedCandidato}
        />
      )}
    </div>
  )
}

export default Servicio2
