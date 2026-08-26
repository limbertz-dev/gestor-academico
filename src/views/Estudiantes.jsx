import { useState } from 'react'
import EstudianteForm from '../components/EstudianteForm'
import EstudianteList from '../components/EstudianteList'
import { AppContextConsumer } from '../context/AppContext'

function Estudiantes() {
  const [estudianteEditando, setEstudianteEditando] = useState(null)
  const [mensajeError, setMensajeError] = useState('')

  function guardarEstudiante(
    datosEstudiante,
    agregarEstudiante,
    editarEstudiante,
  ) {
    if (estudianteEditando) {
      editarEstudiante(estudianteEditando.id, datosEstudiante)
      setEstudianteEditando(null)
    } else {
      agregarEstudiante(datosEstudiante)
    }

    setMensajeError('')
  }

  function seleccionarEstudiante(estudiante) {
    setEstudianteEditando(estudiante)
    setMensajeError('')
  }

  function cancelarEdicion() {
    setEstudianteEditando(null)
    setMensajeError('')
  }

  function quitarEstudiante(id, eliminarEstudiante) {
    const resultado = eliminarEstudiante(id)

    if (!resultado.ok) {
      setMensajeError(resultado.mensaje)
      return
    }

    if (estudianteEditando?.id === id) {
      setEstudianteEditando(null)
    }

    setMensajeError('')
  }

  return (
    <AppContextConsumer>
      {({
        estudiantes,
        agregarEstudiante,
        editarEstudiante,
        eliminarEstudiante,
      }) => (
        <main className="app">
          <header className="encabezado">
            <p>Gestor Académico</p>
            <h1>Estudiantes</h1>
          </header>

          <section className="contenido-entidades">
            <EstudianteForm
              key={estudianteEditando?.id ?? 'nuevo-estudiante'}
              estudianteEditando={estudianteEditando}
              estudiantes={estudiantes}
              onGuardar={(datosEstudiante) =>
                guardarEstudiante(
                  datosEstudiante,
                  agregarEstudiante,
                  editarEstudiante,
                )
              }
              onCancelar={cancelarEdicion}
            />

            <div className="listado-entidades">
              {mensajeError && <p className="alerta">{mensajeError}</p>}
              <EstudianteList
                estudiantes={estudiantes}
                onEditar={seleccionarEstudiante}
                onEliminar={(id) => quitarEstudiante(id, eliminarEstudiante)}
              />
            </div>
          </section>
        </main>
      )}
    </AppContextConsumer>
  )
}

export default Estudiantes
