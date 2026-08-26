import { useState } from 'react'
import CursoForm from '../components/CursoForm'
import CursoList from '../components/CursoList'
import { AppContextConsumer } from '../context/AppContext'

function Cursos() {
  const [cursoEditando, setCursoEditando] = useState(null)
  const [mensajeError, setMensajeError] = useState('')

  function guardarCurso(datosCurso, agregarCurso, editarCurso) {
    if (cursoEditando) {
      editarCurso(cursoEditando.id, datosCurso)
      setCursoEditando(null)
    } else {
      agregarCurso(datosCurso)
    }

    setMensajeError('')
  }

  function seleccionarCurso(curso) {
    setCursoEditando(curso)
    setMensajeError('')
  }

  function cancelarEdicion() {
    setCursoEditando(null)
    setMensajeError('')
  }

  function quitarCurso(id, eliminarCurso) {
    const resultado = eliminarCurso(id)

    if (!resultado.ok) {
      setMensajeError(resultado.mensaje)
      return
    }

    if (cursoEditando?.id === id) {
      setCursoEditando(null)
    }

    setMensajeError('')
  }

  return (
    <AppContextConsumer>
      {({ cursos, agregarCurso, editarCurso, eliminarCurso }) => (
        <main className="app">
          <header className="encabezado">
            <p>Gestor Académico</p>
            <h1>Cursos</h1>
          </header>

          <section className="contenido-cursos">
            <CursoForm
              key={cursoEditando?.id ?? 'nuevo-curso'}
              cursoEditando={cursoEditando}
              onGuardar={(datosCurso) =>
                guardarCurso(datosCurso, agregarCurso, editarCurso)
              }
              onCancelar={cancelarEdicion}
            />

            <div className="listado-cursos">
              {mensajeError && <p className="alerta">{mensajeError}</p>}
              <CursoList
                cursos={cursos}
                onEditar={seleccionarCurso}
                onEliminar={(id) => quitarCurso(id, eliminarCurso)}
              />
            </div>
          </section>
        </main>
      )}
    </AppContextConsumer>
  )
}

export default Cursos
