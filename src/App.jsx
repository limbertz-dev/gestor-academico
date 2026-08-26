import { AppProvider } from './context/AppContext'
import Estudiantes from './views/Estudiantes'
import './App.css'

function App() {
  return (
    <AppProvider>
      <Estudiantes />
    </AppProvider>
  )
}

export default App
