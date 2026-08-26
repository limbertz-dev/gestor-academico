import { useState } from 'react'

const formularioInicial = {
  nombre: '',
  docente: '',
}

function CursoForm({ cursoEditando, onGuardar, onCancelar }) {
  const [formulario, setFormulario] = useState(() =>
    cursoEditando
      ? {
          nombre: cursoEditando.nombre,
          docente: cursoEditando.docente,
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

    if (!formulario.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre del curso es obligatorio.'
    }

    if (!formulario.docente.trim()) {
      nuevosErrores.docente = 'El docente del curso es obligatorio.'
    }

    setErrores(nuevosErrores)

    return Object.keys(nuevosErrores).length === 0
  }

  function enviarFormulario(evento) {
    evento.preventDefault()

    if (!validarFormulario()) {
      return
    }

    onGuardar({
      nombre: formulario.nombre.trim(),
      docente: formulario.docente.trim(),
    })

    setFormulario(formularioInicial)
    setErrores({})
  }

  const estaEditando = Boolean(cursoEditando)

  return (
    <form className="curso-form" onSubmit={enviarFormulario} noValidate>
      <h2>{estaEditando ? 'Editar curso' : 'Nuevo curso'}</h2>

      <div className="campo">
        <label htmlFor="curso-nombre">Nombre</label>
        <input
          id="curso-nombre"
          name="nombre"
          type="text"
          value={formulario.nombre}
          onChange={actualizarCampo}
          aria-describedby={errores.nombre ? 'curso-error-nombre' : undefined}
        />
        {errores.nombre && (
          <p className="error" id="curso-error-nombre">
            {errores.nombre}
          </p>
        )}
      </div>

      <div className="campo">
        <label htmlFor="curso-docente">Docente</label>
        <input
          id="curso-docente"
          name="docente"
          type="text"
          value={formulario.docente}
          onChange={actualizarCampo}
          aria-describedby={errores.docente ? 'curso-error-docente' : undefined}
        />
        {errores.docente && (
          <p className="error" id="curso-error-docente">
            {errores.docente}
          </p>
        )}
      </div>

      <div className="acciones-formulario">
        <button type="submit">
          {estaEditando ? 'Guardar cambios' : 'Agregar curso'}
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

export default CursoForm
