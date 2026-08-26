import { useState } from 'react'
import { AppProvider } from './context/AppContext'
import Cursos from './views/Cursos'
import Estudiantes from './views/Estudiantes'
import Inscripciones from './views/Inscripciones'
import './App.css'

function App() {
  const [vistaActual, setVistaActual] = useState('cursos')

  return (
    <AppProvider>
      <nav className="navegacion-principal" aria-label="Vistas principales">
        <button
          type="button"
          className={vistaActual === 'cursos' ? 'activo' : ''}
          onClick={() => setVistaActual('cursos')}
          aria-pressed={vistaActual === 'cursos'}
        >
          Cursos
        </button>
        <button
          type="button"
          className={vistaActual === 'estudiantes' ? 'activo' : ''}
          onClick={() => setVistaActual('estudiantes')}
          aria-pressed={vistaActual === 'estudiantes'}
        >
          Estudiantes
        </button>
        <button
          type="button"
          className={vistaActual === 'inscripciones' ? 'activo' : ''}
          onClick={() => setVistaActual('inscripciones')}
          aria-pressed={vistaActual === 'inscripciones'}
        >
          Inscripciones
        </button>
      </nav>

      <div hidden={vistaActual !== 'cursos'}>
        <Cursos />
      </div>
      <div hidden={vistaActual !== 'estudiantes'}>
        <Estudiantes />
      </div>
      <div hidden={vistaActual !== 'inscripciones'}>
        <Inscripciones />
      </div>
    </AppProvider>
  )
}

export default App
