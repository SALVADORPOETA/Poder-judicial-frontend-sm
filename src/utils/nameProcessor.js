// utils/nameProcessor.js
const numerosRomanos = [
  'I',
  'II',
  'III',
  'IIII',
  'IV',
  'V',
  'VI',
  'VII',
  'VIII',
  'IX',
  'X',
]

export const processCandidato = (c, index, pj = 6) => {
  const nombreLimpio = c.nombre.trim()
  const partes = nombreLimpio.split(/\s+/)

  // Lógica de Status e Irregularidad
  const tieneRomano = partes.some((p) =>
    numerosRomanos.includes(p.toUpperCase()),
  )
  const esIrregular = partes.length > 4 || tieneRomano

  // Reordenamiento (Apellido Apellido Nombre -> Nombre Apellido Apellido)
  let nombreFormateado = ''
  if (partes.length > 4) {
    nombreFormateado = capitalizar(nombreLimpio)
  } else {
    const apellidos = partes.slice(0, 2)
    const nombres = partes.slice(2)
    nombreFormateado = capitalizar([...nombres, ...apellidos].join(' '))
  }

  return {
    id: `pj${pj}-${String(index + 1).padStart(4, '0')}`,
    nombreOriginal: nombreLimpio,
    nombreEditado: nombreFormateado,
    correo: c.correo || '',
    telefono: c.telefono || '',
    sexo: c.sexo?.toUpperCase() || 'HOMBRE',
    status: esIrregular ? 'POR EDITAR' : 'TERMINADO',
  }
}

const capitalizar = (str) => {
  return str
    .split(' ')
    .map((p) => {
      if (numerosRomanos.includes(p.toUpperCase())) return p.toUpperCase()
      return p.charAt(0).toUpperCase() + p.slice(1).toLowerCase()
    })
    .join(' ')
}
