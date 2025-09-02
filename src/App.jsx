import './App.css'
import PomodoroTimer from './components/PomodoroTimer'
import NotFound from './components/NotFound'
import { PomodoroProvider } from './context/PomodoroContext'
import SEO from './components/SEO'
import { useEffect } from 'react'
import { initializeAnalytics } from './utils/analytics'
import { Routes, Route } from 'react-router-dom'

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
      <Routes>
        <Route path="/" element={
          <div className='bg-white'>
            <PomodoroTimer />
          </div>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </PomodoroProvider>
  )
}

export default App
