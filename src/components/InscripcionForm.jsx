import { useState } from 'react'

const formularioInicial = {
  estudianteId: '',
  cursoId: '',
}

function InscripcionForm({
  inscripcionEditando,
  inscripciones,
  estudiantes,
  cursos,
  onGuardar,
  onCancelar,
}) {
  const [formulario, setFormulario] = useState(() =>
    inscripcionEditando
      ? {
          estudianteId: inscripcionEditando.estudianteId,
          cursoId: inscripcionEditando.cursoId,
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
    const inscripcionDuplicada = inscripciones.some(
      (inscripcion) =>
        inscripcion.estudianteId === formulario.estudianteId &&
        inscripcion.cursoId === formulario.cursoId &&
        inscripcion.id !== inscripcionEditando?.id,
    )

    if (!formulario.estudianteId) {
      nuevosErrores.estudianteId = 'El estudiante es obligatorio.'
    }

    if (!formulario.cursoId) {
      nuevosErrores.cursoId = 'El curso es obligatorio.'
    }

    if (formulario.estudianteId && formulario.cursoId && inscripcionDuplicada) {
      nuevosErrores.cursoId =
        'El estudiante ya está inscrito en este curso.'
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
      estudianteId: formulario.estudianteId,
      cursoId: formulario.cursoId,
    })

    if (!resultado.ok) {
      return
    }

    setFormulario(formularioInicial)
    setErrores({})
  }

  const estaEditando = Boolean(inscripcionEditando)

  return (
    <form className="entidad-form" onSubmit={enviarFormulario} noValidate>
      <h2>{estaEditando ? 'Editar inscripción' : 'Nueva inscripción'}</h2>

      <div className="campo">
        <label htmlFor="inscripcion-estudiante">Estudiante</label>
        <select
          id="inscripcion-estudiante"
          name="estudianteId"
          value={formulario.estudianteId}
          onChange={actualizarCampo}
          aria-describedby={
            errores.estudianteId
              ? 'inscripcion-error-estudiante'
              : undefined
          }
        >
          <option value="">Selecciona un estudiante</option>
          {estudiantes.map((estudiante) => (
            <option key={estudiante.id} value={estudiante.id}>
              {estudiante.nombre}
            </option>
          ))}
        </select>
        {errores.estudianteId && (
          <p className="error" id="inscripcion-error-estudiante">
            {errores.estudianteId}
          </p>
        )}
      </div>

      <div className="campo">
        <label htmlFor="inscripcion-curso">Curso</label>
        <select
          id="inscripcion-curso"
          name="cursoId"
          value={formulario.cursoId}
          onChange={actualizarCampo}
          aria-describedby={
            errores.cursoId ? 'inscripcion-error-curso' : undefined
          }
        >
          <option value="">Selecciona un curso</option>
          {cursos.map((curso) => (
            <option key={curso.id} value={curso.id}>
              {curso.nombre}
            </option>
          ))}
        </select>
        {errores.cursoId && (
          <p className="error" id="inscripcion-error-curso">
            {errores.cursoId}
          </p>
        )}
      </div>

      <div className="acciones-formulario">
        <button type="submit">
          {estaEditando ? 'Guardar cambios' : 'Agregar inscripción'}
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

export default InscripcionForm
