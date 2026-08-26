import { AppProvider } from './context/AppContext'
import Cursos from './views/Cursos'
import './App.css'

function App() {
  return (
    <AppProvider>
      <Cursos />
    </AppProvider>
  )
}

export default App
