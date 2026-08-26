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

function AppProvider({ children }) {
  const [cursos, setCursos] = useState(cursosIniciales)
  const [estudiantes, setEstudiantes] = useState(estudiantesIniciales)
  const [inscripciones] = useState([])

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
    const tieneInscripciones = inscripciones.some(
      (inscripcion) => inscripcion.cursoId === id,
    )

    if (tieneInscripciones) {
      return {
        ok: false,
        mensaje: 'No se puede eliminar un curso con inscripciones.',
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
    const tieneInscripciones = inscripciones.some(
      (inscripcion) => inscripcion.estudianteId === id,
    )

    if (tieneInscripciones) {
      return {
        ok: false,
        mensaje: 'No se puede eliminar un estudiante con inscripciones.',
      }
    }

    setEstudiantes((estudiantesActuales) =>
      estudiantesActuales.filter((estudiante) => estudiante.id !== id),
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
