import React from 'react'
import VcfGenerator from '../components/VcfGenerator'
import BackButton from '../components/BackButton'

function Servicio3() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto mt-5 md:mt-8">
        {/* Header con el título centrado en Verde */}
        <header className="mb-10 flex items-center justify-between gap-0">
          {/* 1. Contenedor Izquierdo */}
          <div className="flex-1 flex justify-start">
            <BackButton hoverColor="green" />
          </div>

          {/* 2. Contenedor Central */}
          <div className="flex-none text-center px-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-emerald-400 tracking-tight mb-2">
              Generador VCF
            </h1>
            <p className="text-gray-500 text-sm">
              Conversión de archivos para agregarlos como contactos
            </p>
          </div>

          {/* 3. Contenedor Derecho */}
          <div className="flex-1 flex justify-start items-start">
            <span className="hidden md:inline-block bg-emerald-900/50 text-emerald-200 px-3 py-1 rounded-full text-xs font-mono border border-emerald-700 mt-2 -translate-y-3 translate-x-20">
              v2.0
            </span>
          </div>
        </header>

        {/* Main con grid (puedes dejarlo en 1 sola columna si prefieres centrarlo) */}
        <main className="grid grid-cols-1 gap-8 items-start p-6 md:p-10 border border-gray-700 bg-gray-800/50 rounded-2xl shadow-xl shadow-emerald-900/10">
          <VcfGenerator />
        </main>
      </div>
    </div>
  )
}

export default Servicio3
