import { createContext, useState } from 'react'

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

  function agregarCurso({ nombre, docente }) {
    const nuevoCurso = {
      id: crypto.randomUUID(),
      nombre,
      docente,
    }

    setCursos((cursosActuales) => [...cursosActuales, nuevoCurso])
  }

  function editarCurso(id, datosCurso) {
    setCursos((cursosActuales) =>
      cursosActuales.map((curso) =>
        curso.id === id ? { ...curso, ...datosCurso } : curso,
      ),
    )
  }

  function eliminarCurso(id) {
    const cantidadInscripciones = inscripciones.filter(
      (inscripcion) => inscripcion.cursoId === id,
    ).length

    if (cantidadInscripciones > 0) {
      return {
        ok: false,
        mensaje: `No se puede eliminar el curso porque tiene ${cantidadInscripciones} ${cantidadInscripciones === 1 ? 'inscripción' : 'inscripciones'}.`,
      }
    }

    setCursos((cursosActuales) =>
      cursosActuales.filter((curso) => curso.id !== id),
    )

    return { ok: true }
  }

  function agregarEstudiante({ nombre, correo }) {
    const nuevoEstudiante = {
      id: crypto.randomUUID(),
      nombre,
      correo,
    }

    setEstudiantes((estudiantesActuales) => [
      ...estudiantesActuales,
      nuevoEstudiante,
    ])
  }

  function editarEstudiante(id, datosEstudiante) {
    setEstudiantes((estudiantesActuales) =>
      estudiantesActuales.map((estudiante) =>
        estudiante.id === id
          ? { ...estudiante, ...datosEstudiante }
          : estudiante,
      ),
    )
  }

  function eliminarEstudiante(id) {
    const cantidadInscripciones = inscripciones.filter(
      (inscripcion) => inscripcion.estudianteId === id,
    ).length

    if (cantidadInscripciones > 0) {
      return {
        ok: false,
        mensaje: `No se puede eliminar el estudiante porque tiene ${cantidadInscripciones} ${cantidadInscripciones === 1 ? 'inscripción' : 'inscripciones'}.`,
      }
    }

    setEstudiantes((estudiantesActuales) =>
      estudiantesActuales.filter((estudiante) => estudiante.id !== id),
    )

    return { ok: true }
  }

  function agregarInscripcion({ estudianteId, cursoId }) {
    const nuevaInscripcion = {
      id: crypto.randomUUID(),
      estudianteId,
      cursoId,
    }

    setInscripciones((inscripcionesActuales) => [
      ...inscripcionesActuales,
      nuevaInscripcion,
    ])
  }

  function editarInscripcion(id, datosInscripcion) {
    setInscripciones((inscripcionesActuales) =>
      inscripcionesActuales.map((inscripcion) =>
        inscripcion.id === id
          ? { ...inscripcion, ...datosInscripcion }
          : inscripcion,
      ),
    )
  }

  function eliminarInscripcion(id) {
    setInscripciones((inscripcionesActuales) =>
      inscripcionesActuales.filter((inscripcion) => inscripcion.id !== id),
    )
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
