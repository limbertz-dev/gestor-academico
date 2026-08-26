<!-- promt 0 -->
Lee primero AGENTS.md y respeta todas sus reglas.

Este es únicamente el proyecto base del Gestor Académico.

Elimina el contenido de demostración innecesario generado por Vite y deja una pantalla inicial sencilla con el título "Gestor Académico".

No implementes Cursos, Estudiantes ni Inscripciones todavía.

No instales dependencias adicionales.

No realices operaciones Git.

<!-- Promt 1 -->

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

<!-- Promt 2 -->

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

<!-- fix promt 2.1 -->

Lee primero AGENTS.md.

Qodo encontró esta observación en el Pull Request de la Feature 2:

"App lacks view state. App directly renders only Estudiantes and has no local
state or conditional rendering for Cursos, Estudiantes, and Inscripciones.
This prevents the required state-driven main-view navigation."

Corrige únicamente esta observación.

Implementa en App.jsx navegación mediante estado local de React entre las
vistas Cursos y Estudiantes, conservando el único AppProvider existente.

No implementes Inscripciones ni agregues una tercera vista.
No uses react-router.
No instales dependencias.
No modifiques funcionalidades no relacionadas.
No realices operaciones Git.

Al finalizar, explícame brevemente qué cambiaste.

<!-- fix promt 2.2 -->

Lee primero AGENTS.md.

Qodo encontró esta observación después de la segunda revisión:

"Switching views discards form state. The conditional render unmounts the
current view when switching between Cursos and Estudiantes, so an unfinished
edit, partially entered form, or validation state is lost when the user returns."

Corrige únicamente esta observación.

La navegación entre Cursos y Estudiantes debe conservar el estado temporal de
los formularios al cambiar de vista.

No implementes Inscripciones.
No agregues nuevas funcionalidades.
No uses react-router.
No instales dependencias.
Mantén el único AppProvider existente.
No realices operaciones Git.

Al terminar, explícame brevemente qué cambiaste.

<!-- fix promt 2.3 -->

Lee primero AGENTS.md.

Qodo encontró esta nueva observación después de corregir la conservación del
estado entre vistas:

"Mounted views duplicate form ids. The hidden wrappers keep both Cursos and
Estudiantes mounted simultaneously, while both forms use identical IDs such
as nombre, error-nombre, etc. Labels and aria-describedby can resolve to the
wrong elements."

Corrige únicamente esta observación.

Mantén la solución actual que conserva ambas vistas montadas y utiliza hidden
para cambiar entre Cursos y Estudiantes.

Haz que todos los id, htmlFor y aria-describedby de los formularios sean
únicos por entidad.

Por ejemplo:

- curso-nombre
- curso-docente
- curso-error-nombre
- estudiante-nombre
- estudiante-correo
- estudiante-error-nombre
- estudiante-error-correo

Asegúrate de actualizar correctamente las referencias entre label, input y
mensajes de error.

No implementes Inscripciones.
No cambies la arquitectura de navegación.
No instales dependencias.
No agregues funcionalidades.
No realices operaciones Git.

Al terminar, explícame brevemente qué modificaste.

<!-- promt 3-->

Lee primero AGENTS.md y respeta estrictamente todas sus reglas.

Implementa únicamente la Feature 3: ABM de Inscripciones.

Ya existen Cursos y Estudiantes dentro del único AppContext.
Extiende ese mismo Context.

1. Agrega el estado inscripciones y las funciones:
- agregarInscripcion
- editarInscripcion
- eliminarInscripcion

2. Modelo:
- id con crypto.randomUUID()
- estudianteId
- cursoId

3. Agrega 2 inscripciones iniciales utilizando estudiantes y cursos existentes.

4. Crea src/components/InscripcionForm.jsx.

Debe tener:
- select de estudiante
- select de curso

Validaciones:
- estudiante obligatorio
- curso obligatorio
- no permitir que un estudiante esté inscrito dos veces en el mismo curso
- al editar una inscripción, excluir la inscripción actual de esta comparación

5. Crea src/components/InscripcionList.jsx.

En lugar de mostrar IDs, debe mostrar:
- nombre del estudiante
- nombre del curso

Debe permitir editar y eliminar.
Solicitar confirmación antes de eliminar.

6. Crea src/views/Inscripciones.jsx.

7. Agrega integridad referencial:

No permitir eliminar un estudiante que tenga inscripciones.
Mostrar un mensaje específico indicando cuántas inscripciones tiene.

No permitir eliminar un curso que tenga inscripciones.
Mostrar un mensaje específico indicando cuántas inscripciones tiene.

8. En App.jsx agrega el menú final:

Cursos | Estudiantes | Inscripciones

La navegación debe usar estado local de React.
No uses react-router.

9. El encabezado debe mostrar:
"Gestor Académico"

No agregues funcionalidades fuera de AGENTS.md.
No instales dependencias.
No realices operaciones Git.

<!-- fix promt 3.1-->

Lee primero AGENTS.md.

Qodo encontró esta observación en el Pull Request de la Feature 3:

"AppContext permits duplicate enrollments. The global state mutation API
appends and updates inscripciones without enforcing uniqueness of the
(estudianteId, cursoId) pair; the only duplicate check is in one UI form and
can be bypassed by any other context consumer."

Corrige únicamente esta observación.

Implementa también en AppContext.jsx la regla de negocio que impide que exista
más de una inscripción con la misma combinación estudianteId + cursoId.

La validación debe aplicarse tanto al agregar como al editar una inscripción.

Al editar, excluye la propia inscripción de la comparación para evitar que
colisione consigo misma.

Mantén también la validación existente en el formulario para conservar la
retroalimentación inmediata al usuario.

No agregues nuevas funcionalidades.
No cambies la arquitectura del proyecto.
No instales dependencias.
No realices operaciones Git.

<!-- fix promt develop 1 -->

Al finalizar, explícame brevemente qué modificaste.

Lee primero AGENTS.md y respeta estrictamente todas sus reglas.

Estamos corrigiendo el Pull Request FINAL de develop hacia main.

Qodo encontró 6 observaciones de corrección en el código integrado.
Corrige TODAS en una sola revisión, sin agregar nuevas funcionalidades.

1. INSCRIPCIONES — estado obsoleto en validación de duplicados

Qodo indicó que agregarInscripcion y editarInscripcion comprueban la
combinación estudianteId + cursoId utilizando una captura antigua del estado
inscripciones antes de ejecutar la actualización.

Corrige la lógica para que la unicidad de estudianteId + cursoId se valide
contra el estado más reciente, incluso si se realizan varias mutaciones antes
de un nuevo render de React.

No introduzcas efectos secundarios dentro de un updater de estado de React.
Mantén una solución simple y segura.

La regla debe seguir siendo:
un estudiante no puede estar inscrito dos veces en el mismo curso.

Al editar, excluir la propia inscripción de la comparación.

2. CURSOS — validación también en AppContext

Actualmente CursoForm valida los campos, pero agregarCurso y editarCurso
también deben proteger la regla de negocio.

En AppContext.jsx, tanto al crear como al editar un Curso:
- nombre es obligatorio
- nombre no puede ser null, vacío ni solo espacios
- docente es obligatorio
- docente no puede ser null, vacío ni solo espacios

Mantén también las validaciones existentes del formulario.

3. ESTUDIANTES — campos obligatorios también en AppContext

En agregarEstudiante y editarEstudiante:
- nombre es obligatorio
- nombre no puede ser null, vacío ni solo espacios
- correo es obligatorio
- correo no puede ser null, vacío ni solo espacios

Mantén también la validación inmediata del formulario.

4. ESTUDIANTES — correo único también en AppContext

AppContext debe impedir correos duplicados tanto al crear como al editar.

Normaliza el correo usando trim y comparación sin distinguir mayúsculas y
minúsculas.

Ejemplo:
ANA@EMAIL.COM
ana@email.com

deben considerarse el mismo correo.

Al editar, excluir al propio estudiante de la comparación.

5. INSCRIPCIONES — campos obligatorios también en AppContext

En agregarInscripcion y editarInscripcion:
- estudianteId es obligatorio
- cursoId es obligatorio
- rechazar null, undefined o string vacío

Conservar también la validación de inscripción duplicada.

6. INSCRIPCIONES — no descartar errores devueltos por AppContext

Actualmente la vista/formulario de Inscripciones ignora errores devueltos
por agregarInscripcion o editarInscripcion y limpia el formulario aunque la
operación haya fallado.

Corrige este flujo.

Las operaciones del Context deben devolver un resultado consistente, por
ejemplo:
{ ok: true }
o
{ ok: false, mensaje: "mensaje específico" }

Inscripciones.jsx y/o InscripcionForm.jsx deben comprobar ese resultado.

Si una operación falla:
- mostrar el mensaje específico al usuario
- NO limpiar el formulario
- NO salir del modo edición
- conservar los valores introducidos

Solo después de una operación exitosa:
- limpiar el formulario
- salir del modo edición cuando corresponda

Revisa también los consumidores de las operaciones de Cursos y Estudiantes
para que, si las mutaciones del Context devuelven un error, no se descarte
silenciosamente.

IMPORTANTE:

- Mantén un único AppContext.
- No agregues backend ni persistencia.
- No instales dependencias.
- No uses Redux ni otras librerías.
- No agregues nuevas funcionalidades.
- No cambies el diseño innecesariamente.
- No realices operaciones Git.

Al terminar:
1. Indícame qué archivos modificaste.
2. Explica cómo resolviste cada una de las 6 observaciones.
3. Confirma que npm run build termina correctamente.