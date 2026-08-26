function CursoList({ cursos, onEditar, onEliminar }) {
  function confirmarEliminacion(curso) {
    const confirmado = window.confirm(
      `¿Deseas eliminar el curso "${curso.nombre}"?`,
    )

    if (confirmado) {
      onEliminar(curso.id)
    }
  }

  if (cursos.length === 0) {
    return (
      <section className="panel">
        <h2>Cursos registrados</h2>
        <p className="estado-vacio">No hay cursos registrados.</p>
      </section>
    )
  }

  return (
    <section className="panel">
      <h2>Cursos registrados</h2>
      <div className="tabla-cursos">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Docente</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cursos.map((curso) => (
              <tr key={curso.id}>
                <td>{curso.nombre}</td>
                <td>{curso.docente}</td>
                <td>
                  <div className="acciones-tabla">
                    <button
                      type="button"
                      className="boton-secundario"
                      onClick={() => onEditar(curso)}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      className="boton-peligro"
                      onClick={() => confirmarEliminacion(curso)}
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

export default CursoList
