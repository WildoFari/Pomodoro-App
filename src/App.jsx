import './App.css'
import PomodoroTimer from './components/PomodoroTimer'
import { PomodoroProvider } from './context/PomodoroContext'

function App() {
  return (
    <PomodoroProvider>
      <div className='bg-white'>
        <PomodoroTimer />
      </div>
    </PomodoroProvider>
  )
}

export default App
