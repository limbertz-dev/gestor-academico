import { createContext, useRef, useState } from 'react'

const AppContext = createContext(null)

const cursosIniciales = [
  {
    id: crypto.randomUUID(),
    nombre: 'Programación Web',
    docente: 'Ana Pérez',
  },
  {
    id: crypto.randomUUID(),
    nombre: 'Base de Datos',
    docente: 'Carlos López',
  },
  {
    id: crypto.randomUUID(),
    nombre: 'Ingeniería de Software',
    docente: 'María García',
  },
]

const estudiantesIniciales = [
  {
    id: crypto.randomUUID(),
    nombre: 'Juan Pérez',
    correo: 'juan@example.com',
  },
  {
    id: crypto.randomUUID(),
    nombre: 'Ana López',
    correo: 'ana@example.com',
  },
  {
    id: crypto.randomUUID(),
    nombre: 'Carlos Gómez',
    correo: 'carlos@example.com',
  },
]

const inscripcionesIniciales = [
  {
    id: crypto.randomUUID(),
    estudianteId: estudiantesIniciales[0].id,
    cursoId: cursosIniciales[0].id,
  },
  {
    id: crypto.randomUUID(),
    estudianteId: estudiantesIniciales[1].id,
    cursoId: cursosIniciales[1].id,
  },
]

function AppProvider({ children }) {
  const [cursos, setCursos] = useState(cursosIniciales)
  const [estudiantes, setEstudiantes] = useState(estudiantesIniciales)
  const [inscripciones, setInscripciones] = useState(inscripcionesIniciales)
  const cursosRef = useRef(cursosIniciales)
  const estudiantesRef = useRef(estudiantesIniciales)
  const inscripcionesRef = useRef(inscripcionesIniciales)

  function normalizarTexto(valor) {
    return typeof valor === 'string' ? valor.trim() : ''
  }

  function actualizarCursos(nuevosCursos) {
    cursosRef.current = nuevosCursos
    setCursos(nuevosCursos)
  }

  function actualizarEstudiantes(nuevosEstudiantes) {
    estudiantesRef.current = nuevosEstudiantes
    setEstudiantes(nuevosEstudiantes)
  }

  function actualizarInscripciones(nuevasInscripciones) {
    inscripcionesRef.current = nuevasInscripciones
    setInscripciones(nuevasInscripciones)
  }

  function validarCurso({ nombre, docente }) {
    const nombreNormalizado = normalizarTexto(nombre)
    const docenteNormalizado = normalizarTexto(docente)

    if (!nombreNormalizado) {
      return {
        ok: false,
        mensaje: 'El nombre del curso es obligatorio.',
      }
    }

    if (!docenteNormalizado) {
      return {
        ok: false,
        mensaje: 'El docente del curso es obligatorio.',
      }
    }

    return {
      ok: true,
      datos: {
        nombre: nombreNormalizado,
        docente: docenteNormalizado,
      },
    }
  }

  function agregarCurso({ nombre, docente }) {
    const validacion = validarCurso({ nombre, docente })

    if (!validacion.ok) {
      return validacion
    }

    const nuevoCurso = {
      id: crypto.randomUUID(),
      ...validacion.datos,
    }

    actualizarCursos([...cursosRef.current, nuevoCurso])

    return { ok: true }
  }

  function editarCurso(id, datosCurso) {
    const cursoExiste = cursosRef.current.some((curso) => curso.id === id)

    if (!cursoExiste) {
      return {
        ok: false,
        mensaje: 'No se puede editar el curso porque no existe.',
      }
    }

    const validacion = validarCurso(datosCurso)

    if (!validacion.ok) {
      return validacion
    }

    actualizarCursos(
      cursosRef.current.map((curso) =>
        curso.id === id ? { ...curso, ...validacion.datos } : curso,
      ),
    )

    return { ok: true }
  }

  function eliminarCurso(id) {
    const cantidadInscripciones = inscripcionesRef.current.filter(
      (inscripcion) => inscripcion.cursoId === id,
    ).length

    if (cantidadInscripciones > 0) {
      return {
        ok: false,
        mensaje: `No se puede eliminar el curso porque tiene ${cantidadInscripciones} ${cantidadInscripciones === 1 ? 'inscripción' : 'inscripciones'}.`,
      }
    }

    actualizarCursos(cursosRef.current.filter((curso) => curso.id !== id))

    return { ok: true }
  }

  function existeCorreoDuplicado(correo, idActual) {
    const correoNormalizado = normalizarTexto(correo).toLowerCase()

    return estudiantesRef.current.some(
      (estudiante) =>
        estudiante.correo.trim().toLowerCase() === correoNormalizado &&
        estudiante.id !== idActual,
    )
  }

  function validarEstudiante({ nombre, correo }, idActual) {
    const nombreNormalizado = normalizarTexto(nombre)
    const correoNormalizado = normalizarTexto(correo)

    if (!nombreNormalizado) {
      return {
        ok: false,
        mensaje: 'El nombre del estudiante es obligatorio.',
      }
    }

    if (!correoNormalizado) {
      return {
        ok: false,
        mensaje: 'El correo del estudiante es obligatorio.',
      }
    }

    if (existeCorreoDuplicado(correoNormalizado, idActual)) {
      return {
        ok: false,
        mensaje: 'Ya existe un estudiante con este correo.',
      }
    }

    return {
      ok: true,
      datos: {
        nombre: nombreNormalizado,
        correo: correoNormalizado,
      },
    }
  }

  function agregarEstudiante({ nombre, correo }) {
    const validacion = validarEstudiante({ nombre, correo })

    if (!validacion.ok) {
      return validacion
    }

    const nuevoEstudiante = {
      id: crypto.randomUUID(),
      ...validacion.datos,
    }

    actualizarEstudiantes([...estudiantesRef.current, nuevoEstudiante])

    return { ok: true }
  }

  function editarEstudiante(id, datosEstudiante) {
    const estudianteExiste = estudiantesRef.current.some(
      (estudiante) => estudiante.id === id,
    )

    if (!estudianteExiste) {
      return {
        ok: false,
        mensaje: 'No se puede editar el estudiante porque no existe.',
      }
    }

    const validacion = validarEstudiante(datosEstudiante, id)

    if (!validacion.ok) {
      return validacion
    }

    actualizarEstudiantes(
      estudiantesRef.current.map((estudiante) =>
        estudiante.id === id
          ? { ...estudiante, ...validacion.datos }
          : estudiante,
      ),
    )

    return { ok: true }
  }

  function eliminarEstudiante(id) {
    const cantidadInscripciones = inscripcionesRef.current.filter(
      (inscripcion) => inscripcion.estudianteId === id,
    ).length

    if (cantidadInscripciones > 0) {
      return {
        ok: false,
        mensaje: `No se puede eliminar el estudiante porque tiene ${cantidadInscripciones} ${cantidadInscripciones === 1 ? 'inscripción' : 'inscripciones'}.`,
      }
    }

    actualizarEstudiantes(
      estudiantesRef.current.filter((estudiante) => estudiante.id !== id),
    )

    return { ok: true }
  }

  function existeInscripcionDuplicada({ estudianteId, cursoId }, idActual) {
    return inscripcionesRef.current.some(
      (inscripcion) =>
        inscripcion.estudianteId === estudianteId &&
        inscripcion.cursoId === cursoId &&
        inscripcion.id !== idActual,
    )
  }

  function validarInscripcion({ estudianteId, cursoId }, idActual) {
    const estudianteNormalizado = normalizarTexto(estudianteId)
    const cursoNormalizado = normalizarTexto(cursoId)

    if (!estudianteNormalizado) {
      return {
        ok: false,
        mensaje: 'El estudiante es obligatorio.',
      }
    }

    if (!cursoNormalizado) {
      return {
        ok: false,
        mensaje: 'El curso es obligatorio.',
      }
    }

    const datos = {
      estudianteId: estudianteNormalizado,
      cursoId: cursoNormalizado,
    }

    if (existeInscripcionDuplicada(datos, idActual)) {
      return {
        ok: false,
        mensaje: 'El estudiante ya está inscrito en este curso.',
      }
    }

    return { ok: true, datos }
  }

  function agregarInscripcion({ estudianteId, cursoId }) {
    const validacion = validarInscripcion({ estudianteId, cursoId })

    if (!validacion.ok) {
      return validacion
    }

    const nuevaInscripcion = {
      id: crypto.randomUUID(),
      ...validacion.datos,
    }

    actualizarInscripciones([...inscripcionesRef.current, nuevaInscripcion])

    return { ok: true }
  }

  function editarInscripcion(id, datosInscripcion) {
    const inscripcionExiste = inscripcionesRef.current.some(
      (inscripcion) => inscripcion.id === id,
    )

    if (!inscripcionExiste) {
      return {
        ok: false,
        mensaje: 'No se puede editar la inscripción porque no existe.',
      }
    }

    const validacion = validarInscripcion(datosInscripcion, id)

    if (!validacion.ok) {
      return validacion
    }

    actualizarInscripciones(
      inscripcionesRef.current.map((inscripcion) =>
        inscripcion.id === id
          ? { ...inscripcion, ...validacion.datos }
          : inscripcion,
      ),
    )

    return { ok: true }
  }

  function eliminarInscripcion(id) {
    actualizarInscripciones(
      inscripcionesRef.current.filter((inscripcion) => inscripcion.id !== id),
    )

    return { ok: true }
  }

  const valor = {
    cursos,
    estudiantes,
    inscripciones,
    agregarCurso,
    editarCurso,
    eliminarCurso,
    agregarEstudiante,
    editarEstudiante,
    eliminarEstudiante,
    agregarInscripcion,
    editarInscripcion,
    eliminarInscripcion,
  }

  return <AppContext.Provider value={valor}>{children}</AppContext.Provider>
}

function AppContextConsumer({ children }) {
  return (
    <AppContext.Consumer>
      {(valor) => children(valor)}
    </AppContext.Consumer>
  )
}

export { AppContextConsumer, AppProvider }
