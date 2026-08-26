function InscripcionList({
  inscripciones,
  estudiantes,
  cursos,
  onEditar,
  onEliminar,
}) {
  function obtenerNombreEstudiante(estudianteId) {
    return (
      estudiantes.find((estudiante) => estudiante.id === estudianteId)
        ?.nombre ?? 'Estudiante no encontrado'
    )
  }

  function obtenerNombreCurso(cursoId) {
    return cursos.find((curso) => curso.id === cursoId)?.nombre ?? 'Curso no encontrado'
  }

  function confirmarEliminacion(inscripcion) {
    const estudiante = obtenerNombreEstudiante(inscripcion.estudianteId)
    const curso = obtenerNombreCurso(inscripcion.cursoId)
    const confirmado = window.confirm(
      `¿Deseas eliminar la inscripción de "${estudiante}" en "${curso}"?`,
    )

    if (confirmado) {
      onEliminar(inscripcion.id)
    }
  }

  if (inscripciones.length === 0) {
    return (
      <section className="panel">
        <h2>Inscripciones registradas</h2>
        <p className="estado-vacio">No hay inscripciones registradas.</p>
      </section>
    )
  }

  return (
    <section className="panel">
      <h2>Inscripciones registradas</h2>
      <div className="tabla-entidades">
        <table>
          <thead>
            <tr>
              <th>Estudiante</th>
              <th>Curso</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {inscripciones.map((inscripcion) => (
              <tr key={inscripcion.id}>
                <td>{obtenerNombreEstudiante(inscripcion.estudianteId)}</td>
                <td>{obtenerNombreCurso(inscripcion.cursoId)}</td>
                <td>
                  <div className="acciones-tabla">
                    <button
                      type="button"
                      className="boton-secundario"
                      onClick={() => onEditar(inscripcion)}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      className="boton-peligro"
                      onClick={() => confirmarEliminacion(inscripcion)}
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default InscripcionList
