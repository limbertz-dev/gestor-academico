import { useState } from 'react'
import InscripcionForm from '../components/InscripcionForm'
import InscripcionList from '../components/InscripcionList'
import { AppContextConsumer } from '../context/AppContext'

function Inscripciones() {
  const [inscripcionEditando, setInscripcionEditando] = useState(null)

  function guardarInscripcion(
    datosInscripcion,
    agregarInscripcion,
    editarInscripcion,
  ) {
    if (inscripcionEditando) {
      editarInscripcion(inscripcionEditando.id, datosInscripcion)
      setInscripcionEditando(null)
    } else {
      agregarInscripcion(datosInscripcion)
    }
  }

  function seleccionarInscripcion(inscripcion) {
    setInscripcionEditando(inscripcion)
  }

  function cancelarEdicion() {
    setInscripcionEditando(null)
  }

  function quitarInscripcion(id, eliminarInscripcion) {
    eliminarInscripcion(id)

    if (inscripcionEditando?.id === id) {
      setInscripcionEditando(null)
    }
  }

  return (
    <AppContextConsumer>
      {({
        cursos,
        estudiantes,
        inscripciones,
        agregarInscripcion,
        editarInscripcion,
        eliminarInscripcion,
      }) => (
        <main className="app">
          <header className="encabezado">
            <p>Gestor Académico</p>
            <h1>Inscripciones</h1>
          </header>

          <section className="contenido-entidades">
            <InscripcionForm
              key={inscripcionEditando?.id ?? 'nueva-inscripcion'}
              inscripcionEditando={inscripcionEditando}
              inscripciones={inscripciones}
              estudiantes={estudiantes}
              cursos={cursos}
              onGuardar={(datosInscripcion) =>
                guardarInscripcion(
                  datosInscripcion,
                  agregarInscripcion,
                  editarInscripcion,
                )
              }
              onCancelar={cancelarEdicion}
            />

            <div className="listado-entidades">
              <InscripcionList
                inscripciones={inscripciones}
                estudiantes={estudiantes}
                cursos={cursos}
                onEditar={seleccionarInscripcion}
                onEliminar={(id) => quitarInscripcion(id, eliminarInscripcion)}
              />
            </div>
          </section>
        </main>
      )}
    </AppContextConsumer>
  )
}

export default Inscripciones
