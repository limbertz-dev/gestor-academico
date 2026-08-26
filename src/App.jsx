import { useState } from 'react'
import { AppProvider } from './context/AppContext'
import Cursos from './views/Cursos'
import Estudiantes from './views/Estudiantes'
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
      </nav>

      <div hidden={vistaActual !== 'cursos'}>
        <Cursos />
      </div>
      <div hidden={vistaActual !== 'estudiantes'}>
        <Estudiantes />
      </div>
    </AppProvider>
  )
}

export default App
