import { useState } from 'react'

const formularioInicial = {
  nombre: '',
  correo: '',
}

function EstudianteForm({
  estudianteEditando,
  estudiantes,
  onGuardar,
  onCancelar,
}) {
  const [formulario, setFormulario] = useState(() =>
    estudianteEditando
      ? {
          nombre: estudianteEditando.nombre,
          correo: estudianteEditando.correo,
        }
      : formularioInicial,
  )
  const [errores, setErrores] = useState({})

  function actualizarCampo(evento) {
    const { name, value } = evento.target

    setFormulario((datosActuales) => ({
      ...datosActuales,
      [name]: value,
    }))
  }

  function validarFormulario() {
    const nuevosErrores = {}
    const correoNormalizado = formulario.correo.trim().toLowerCase()
    const correoExiste = estudiantes.some(
      (estudiante) =>
        estudiante.correo.toLowerCase() === correoNormalizado &&
        estudiante.id !== estudianteEditando?.id,
    )

    if (!formulario.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre del estudiante es obligatorio.'
    }

    if (!formulario.correo.trim()) {
      nuevosErrores.correo = 'El correo del estudiante es obligatorio.'
    } else if (correoExiste) {
      nuevosErrores.correo = 'Ya existe un estudiante con este correo.'
    }

    setErrores(nuevosErrores)

    return Object.keys(nuevosErrores).length === 0
  }

  function enviarFormulario(evento) {
    evento.preventDefault()

    if (!validarFormulario()) {
      return
    }

    const resultado = onGuardar({
      nombre: formulario.nombre.trim(),
      correo: formulario.correo.trim(),
    })

    if (!resultado.ok) {
      return
    }

    setFormulario(formularioInicial)
    setErrores({})
  }

  const estaEditando = Boolean(estudianteEditando)

  return (
    <form className="entidad-form" onSubmit={enviarFormulario} noValidate>
      <h2>{estaEditando ? 'Editar estudiante' : 'Nuevo estudiante'}</h2>

      <div className="campo">
        <label htmlFor="estudiante-nombre">Nombre</label>
        <input
          id="estudiante-nombre"
          name="nombre"
          type="text"
          value={formulario.nombre}
          onChange={actualizarCampo}
          aria-describedby={
            errores.nombre ? 'estudiante-error-nombre' : undefined
          }
        />
        {errores.nombre && (
          <p className="error" id="estudiante-error-nombre">
            {errores.nombre}
          </p>
        )}
      </div>

      <div className="campo">
        <label htmlFor="estudiante-correo">Correo</label>
        <input
          id="estudiante-correo"
          name="correo"
          type="email"
          value={formulario.correo}
          onChange={actualizarCampo}
          aria-describedby={
            errores.correo ? 'estudiante-error-correo' : undefined
          }
        />
        {errores.correo && (
          <p className="error" id="estudiante-error-correo">
            {errores.correo}
          </p>
        )}
      </div>

      <div className="acciones-formulario">
        <button type="submit">
          {estaEditando ? 'Guardar cambios' : 'Agregar estudiante'}
        </button>
        {estaEditando && (
          <button type="button" className="boton-secundario" onClick={onCancelar}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  )
}

export default EstudianteForm
