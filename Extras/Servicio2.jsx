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

  // Función para abrir el modal
  // Dentro de Servicio2.jsx

  const handleOpenEdit = (candidato) => {
    setSelectedCandidato(candidato)

    const textoBaseAsunto = candidato.asuntoPersonalizado || asunto

    // CAMBIO AQUÍ: Usar las plantillas específicas según el modo
    const textoBaseCuerpo =
      envioMode === 'email'
        ? candidato.mensajePersonalizado || plantillaEmail // <-- Antes decía 'plantilla'
        : candidato.mensajeWhatsAppPersonalizado || plantillaWhatsApp // <-- Antes decía 'plantilla'

    setTempAsunto(aplicarEtiquetas(textoBaseAsunto, candidato))
    setTempMensaje(aplicarEtiquetas(textoBaseCuerpo, candidato))

    setIsModalOpen(true)
  }

  // Función para guardar lo editado en el modal
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
                    statusEmail: 'LISTO', // Solo afecta a Email
                  }
                : {
                    mensajeWhatsAppPersonalizado: tempMensaje,
                    statusWhatsApp: 'LISTO', // Solo afecta a WhatsApp
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
            // 1. Ejecutamos tu función original de procesamiento
            const base = processCandidato(c, i)

            // 2. Extraemos el status base del JSON (o de base) para inicializar ambos canales
            const statusInicial = c.status || base.status || 'LISTO'

            // 3. Retornamos el objeto con estados INDEPENDIENTES
            return {
              ...base,
              // Rescate de Email
              email:
                c.email ||
                c.Email ||
                c.correo ||
                c.CORREO ||
                (base && base.email) ||
                '',

              // Rescate de Teléfono (aseguramos que exista la propiedad)
              telefono:
                c.telefono ||
                c.Telefono ||
                c.phone ||
                (base && base.telefono) ||
                '',

              // --- Lógica de Independencia de Canales ---
              statusEmail: statusInicial, // Estado inicial para el flujo de Email
              statusWhatsApp: statusInicial, // Estado inicial para el flujo de WhatsApp

              mensajePersonalizado: '', // Almacena edición manual de Email
              mensajeWhatsAppPersonalizado: '', // Almacena edición manual de WhatsApp
              asuntoPersonalizado: '', // Almacena asunto editado (solo Email)
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

    if (!window.confirm(mensajeConfirmacion)) {
      return // Si el usuario cancela, salimos de la función y no se envía nada
    }

    setEnviando(true)

    try {
      if (envioMode === 'whatsapp') {
        // --- LÓGICA WHATSAPP (CON FILTRO DE PAÍS) ---
        const listaWhatsApp = rango.map((c) => {
          // 1. Limpiamos cualquier carácter que no sea número
          const numeroLimpio = String(c.telefono || '').replace(/\D/g, '')

          // 2. Si el número existe, nos aseguramos que tenga el 52 (México)
          // Solo lo agrega si el número NO empieza ya con 52 y no está vacío
          let telefonoFinal = numeroLimpio
          // if (numeroLimpio && !numeroLimpio.startsWith('52')) {
          //   telefonoFinal = `52${numeroLimpio}`
          // }

          return {
            telefono: telefonoFinal,
            nombre: c.nombreEditado || c.nombre,
            // mensaje:
            //   c.mensajeWhatsAppPersonalizado || aplicarEtiquetas(plantilla, c),
            mensaje:
              c.mensajeWhatsAppPersonalizado ||
              aplicarEtiquetas(plantillaWhatsApp, c),
          }
        })

        // Verificación en consola para que estés seguro de qué se envía
        console.log('📱 WhatsApp List:', listaWhatsApp)

        const response = await fetch(
          'http://localhost:3001/api/send-whatsapp-bulk',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ lista: listaWhatsApp }),
          },
        )

        const data = await response.json()
        alert(`✅ WhatsApp: ${data.message}`)
      } else if (envioMode === 'email') {
        // --- LÓGICA EMAIL (CORREGIDA) ---
        const listaEmail = rango.map((c) => ({
          // IMPORTANTE: c.email ya contiene el correo editado gracias a handleEdit
          email: c.email,
          asunto: c.asuntoPersonalizado || aplicarEtiquetas(asunto, c),
          // cuerpo: c.mensajePersonalizado || aplicarEtiquetas(plantilla, c),
          cuerpo: c.mensajePersonalizado || aplicarEtiquetas(plantillaEmail, c),
        }))

        console.log('🚀 Enviando al backend:', listaEmail)

        const response = await fetch(
          'http://localhost:3001/api/send-email-bulk',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ lista: listaEmail }),
          },
        )

        const data = await response.json()
        alert(`✅ Email: ${data.message}`)
      }
    } catch (error) {
      console.error(error)
      alert('Error en el envío. Revisa la consola.')
    } finally {
      setEnviando(false)
    }
  }

  // Función auxiliar fuera del componente o dentro para reutilizar
  const aplicarEtiquetas = (texto, candidato) => {
    if (!texto) return ''
    if (!candidato) return texto // Si no hay candidato, devuelve el texto base

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
                  // Permitimos que el value sea '' para que el usuario pueda borrar todo
                  value={rangoInicio === 0 ? '' : rangoInicio}
                  onChange={(e) => {
                    const val = e.target.value
                    // Si está vacío, guardamos 0 internamente para el estado, pero se verá vacío en el input
                    setRangoInicio(val === '' ? 0 : Number(val))
                  }}
                  onBlur={(e) => {
                    // Al salir, si dejó vacío o puso algo menor a 1, corregimos a 1
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
                    // Al salir, validamos contra el rangoInicio
                    const valorFinal = Math.max(
                      rangoInicio,
                      Number(e.target.value),
                    )
                    // Si el JSON tiene un límite, aquí podrías poner Math.min(valorFinal, candidatos.length)
                    setRangoFin(valorFinal)
                  }}
                  className="w-14 bg-black/50 border border-gray-800 rounded-lg p-1 text-center text-purple-300 outline-none focus:border-purple-500 font-bold text-xs"
                />
              </div>
            </div>
          </div>
        </header>
        <header className="mb-10 flex md:hidden flex-col items-center gap-6">
          {/* Fila superior: Botón y Título alineados */}
          <div className="flex w-full items-center">
            {/* Botón a la izquierda */}
            <BackButton hoverColor="purple" />

            {/* Título centrado: el flex-1 y el text-center lo mantienen al medio */}
            <div className="flex-1 text-center px-4">
              <h1 className="text-3xl font-bold text-purple-400 tracking-tight mb-2">
                Mensajería Masiva
              </h1>
              <p className="text-gray-500 text-xs">
                Configuración de plantillas y gestión de envíos
              </p>
            </div>

            {/* Espaciador invisible para que el título quede 100% centrado respecto a la pantalla 
        si el BackButton desequilibra el flex. Si no te importa ese pequeño desvío, 
        puedes quitarlo. */}
            <div className="w-10" />
          </div>

          {/* Límite de Envío */}
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
        {/* Sección de configuración */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <TemplateEditor
              envioMode={envioMode}
              setEnvioMode={setEnvioMode}
              // Pasamos la plantilla que corresponda según el modo
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
          />
        </div>

        {/* Tabla y Acción Final */}
        {candidatos.length > 0 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <CandidatesTable
              envioMode={envioMode}
              setEnvioMode={setEnvioMode}
              candidatos={candidatos.slice(rangoInicio - 1, rangoFin)} // <-- Filtro de rango
              handleEdit={handleEdit}
              eliminarCandidato={eliminarCandidato}
              abrirEditor={handleOpenEdit}
              color="purple"
            />
            <div className="flex flex-col items-end mt-6">
              <p className="text-[10px] text-gray-500 uppercase font-bold mb-4 text-right tracking-widest">
                {/* Guardamos el total en una variable local para comparar */}
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
                } 
    bg-gray-800! border border-transparent text-white font-black py-4 px-12 rounded-2xl transition-all active:scale-95 flex items-center gap-3 shadow-2xl uppercase text-xs tracking-[0.2em]`}
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
        // data={MOCK_DATA_TEXT}
      />
      {/* Renderizado condicional del modal */}
      {envioMode === 'email' ? (
        <MessageModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          asunto={tempAsunto} // <--- Importante
          setAsunto={setTempAsunto} // <--- Importante
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
