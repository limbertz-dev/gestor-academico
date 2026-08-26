# Reglas del proyecto — Gestor Académico

Estas reglas aplican a todo el repositorio.

## Stack

- Vite + React con JavaScript.
- No usar TypeScript.
- Sin backend.
- Sin base de datos.
- Sin APIs externas.
- Sin localStorage ni sessionStorage.
- Todos los datos viven únicamente en memoria.
- Al recargar la página, los datos vuelven al estado inicial.

## Estado global

Usar un único React Context:

src/context/AppContext.jsx

Debe administrar:

- cursos
- estudiantes
- inscripciones

No usar Redux, Zustand ni otras librerías de estado global.

## Navegación

No usar react-router.

Usar estado local en App.jsx para cambiar entre:

- Cursos
- Estudiantes
- Inscripciones

## Modelos

Curso:
- id
- nombre
- docente

Estudiante:
- id
- nombre
- correo

Inscripción:
- id
- estudianteId
- cursoId

Los nuevos IDs deben generarse con crypto.randomUUID().

## Validaciones

Curso:
- nombre obligatorio
- docente obligatorio

Estudiante:
- nombre obligatorio
- correo obligatorio
- correo único

Inscripción:
- estudiante obligatorio
- curso obligatorio
- no permitir duplicar la inscripción del mismo estudiante al mismo curso

Integridad:
- no eliminar estudiantes que tengan inscripciones
- no eliminar cursos que tengan inscripciones

## Calidad

- Componentes en PascalCase.
- Variables y funciones en camelCase.
- Textos de interfaz en español.
- Mensajes de error específicos.
- Confirmar antes de eliminar.
- Sin console.log en el código final.
- Sin TODO.
- Código simple y fácil de explicar.

## Fuera de alcance

No implementar:

- login
- backend
- base de datos
- notas
- asistencia
- horarios
- pagos
- profesores como módulo independiente
- persistencia