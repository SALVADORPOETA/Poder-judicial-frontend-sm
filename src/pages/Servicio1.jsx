import React from 'react'
import LinkScraper from '../components/LinkScraper'
import DetailScraper from '../components/DetailScraper'
import BackButton from '../components/BackButton'

function Servicio1() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto mt-5 md:mt-8">
        {/* Header con el título centrado */}
        <header className="mb-10 flex items-center justify-between gap-0">
          {/* 1. Contenedor Izquierdo: Botón alineado a la izquierda */}
          <div className="flex-1 flex justify-start">
            <BackButton hoverColor="blue" />
          </div>
          {/* 2. Contenedor Central: Título siempre al centro exacto */}
          <div className="flex-none text-center px-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-400 tracking-tight mb-2">
              Scraping PJ
            </h1>
            <p className="text-gray-500 text-sm">
              Plataforma de análisis del Poder Judicial 2026
            </p>
          </div>
          {/* 3. Contenedor Derecho: El badge en su propia celda pero "pegado" al inicio de su contenedor */}
          <div className="flex-1 flex justify-start items-start">
            {/* Usamos justify-start para que el badge se pegue al borde izquierdo de esta celda (que es el lado del título) */}
            <span className="hidden md:inline-block bg-blue-900/50 text-blue-200 px-3 py-1 rounded-full text-xs font-mono border border-blue-700 mt-2 -translate-y-3 translate-x-20">
              v2.1
            </span>
          </div>
        </header>
        {/* <main className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start p-10 border-5 md:border-10 lg:border-20 border-blue-900/50 rounded-2xl"> */}
        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start p-10 border border-gray-700 bg-gray-800/50 rounded-2xl">
          <LinkScraper />
          <DetailScraper />
        </main>
      </div>
    </div>
  )
}

export default Servicio1
