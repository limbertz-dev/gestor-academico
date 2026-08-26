Lee primero AGENTS.md y respeta todas sus reglas.

Este es únicamente el proyecto base del Gestor Académico.

Elimina el contenido de demostración innecesario generado por Vite y deja una pantalla inicial sencilla con el título "Gestor Académico".

No implementes Cursos, Estudiantes ni Inscripciones todavía.

No instales dependencias adicionales.

No realices operaciones Git.


Lee primero AGENTS.md y respeta estrictamente todas sus reglas.

Implementa únicamente la Feature 1: ABM de Cursos.

1. Crea src/context/AppContext.jsx con el único React Context del proyecto.

2. Agrega el estado cursos en memoria y las funciones:

- agregarCurso
- editarCurso
- eliminarCurso

3. Modelo Curso:

- id generado con crypto.randomUUID()
- nombre
- docente

4. Inicializa con tres cursos:

- Programación Web — Ana Pérez
- Base de Datos — Carlos López
- Ingeniería de Software — María García

5. Crea src/components/CursoForm.jsx.

Debe permitir:

- crear
- editar

Validaciones:

- nombre obligatorio
- docente obligatorio

6. Crea src/components/CursoList.jsx.

Debe:

- listar cursos
- permitir editar
- permitir eliminar
- solicitar confirmación antes de eliminar

7. Crea src/views/Cursos.jsx combinando formulario y listado.

8. Muestra temporalmente Cursos desde App.jsx.

No implementes Estudiantes.
No implementes Inscripciones.
No agregues todavía el menú final.
No instales dependencias.
No realices operaciones Git.

Al terminar, indícame brevemente qué archivos modificaste.


Lee primero AGENTS.md y respeta todas sus reglas.

Implementa únicamente la Feature 2: ABM de Estudiantes.

El proyecto ya tiene AppContext.jsx y el ABM de Cursos.

Extiende el Context existente. No crees otro Context.

1. Agrega el estado estudiantes y las funciones:
- agregarEstudiante
- editarEstudiante
- eliminarEstudiante

2. Modelo:
- id generado con crypto.randomUUID()
- nombre
- correo

3. Inicializa con:
- Juan Pérez — juan@example.com
- Ana López — ana@example.com
- Carlos Gómez — carlos@example.com

4. Crea src/components/EstudianteForm.jsx.

Validaciones:
- nombre obligatorio
- correo obligatorio
- correo único
- al editar, excluir al propio estudiante de la validación de correo único

5. Crea src/components/EstudianteList.jsx.

Debe:
- listar
- editar
- eliminar
- confirmar antes de eliminar

6. Crea src/views/Estudiantes.jsx.

7. Muestra temporalmente Estudiantes desde App.jsx para poder probarlo.

No implementes Inscripciones.
No agregues todavía el menú final.
No instales dependencias.
No realices operaciones Git.