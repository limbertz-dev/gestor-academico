function EstudianteList({ estudiantes, onEditar, onEliminar }) {
  function confirmarEliminacion(estudiante) {
    const confirmado = window.confirm(
      `¿Deseas eliminar al estudiante "${estudiante.nombre}"?`,
    )

    if (confirmado) {
      onEliminar(estudiante.id)
    }
  }

  if (estudiantes.length === 0) {
    return (
      <section className="panel">
        <h2>Estudiantes registrados</h2>
        <p className="estado-vacio">No hay estudiantes registrados.</p>
      </section>
    )
  }

  return (
    <section className="panel">
      <h2>Estudiantes registrados</h2>
      <div className="tabla-entidades">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {estudiantes.map((estudiante) => (
              <tr key={estudiante.id}>
                <td>{estudiante.nombre}</td>
                <td>{estudiante.correo}</td>
                <td>
                  <div className="acciones-tabla">
                    <button
                      type="button"
                      className="boton-secundario"
                      onClick={() => onEditar(estudiante)}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      className="boton-peligro"
                      onClick={() => confirmarEliminacion(estudiante)}
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

export default EstudianteList
