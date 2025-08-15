import './App.css'
import PomodoroTimer from './components/PomodoroTimer'
import { PomodoroProvider } from './context/PomodoroContext'
import SEO from './components/SEO'
import { useEffect } from 'react'
import { initializeAnalytics } from './utils/analytics'

function App() {
  useEffect(() => {
    // Inicializar analytics solo en producción
    if (import.meta.env.PROD) {
      initializeAnalytics();
    }
  }, []);

  return (
    <PomodoroProvider>
      <SEO 
        title="Pomodoro Timer - Técnica de Productividad | Gestiona tu tiempo eficientemente"
        description="Aplicación Pomodoro gratuita para mejorar tu productividad. Técnica de gestión del tiempo con temporizadores personalizables, seguimiento de tareas y estadísticas de productividad."
        keywords="pomodoro, técnica pomodoro, productividad, gestión del tiempo, temporizador, focus, concentración, tareas, estudio, trabajo"
        url="https://tu-dominio.com/"
        image="https://tu-dominio.com/og-image.jpg"
      />
      <div className='bg-white'>
        <PomodoroTimer />
      </div>
    </PomodoroProvider>
  )
}

export default App
