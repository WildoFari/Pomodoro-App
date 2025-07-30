import React, { useState } from 'react';
import useTimer from '../hooks/useTimer';
import useTasks from '../hooks/useTasks';
import { usePomodoroConfig } from '../context/PomodoroContext';
import Settings from './Settings';
import Notification from './Notification';
import TaskList from './TaskList';

function formatTime(seconds) {
  const m = String(Math.floor(seconds / 60)).padStart(2, '0');
  const s = String(seconds % 60).padStart(2, '0');
  return `${m}:${s}`;
}

export default function PomodoroTimer() {
  const { durations } = usePomodoroConfig();
  const [showSettings, setShowSettings] = useState(false);
  const [showTaskList, setShowTaskList] = useState(false);
  
  const { currentTask, incrementPomodoros } = useTasks();

  // Función para manejar cuando termina un pomodoro
  const handlePomodoroComplete = () => {
    if (currentTask) {
      incrementPomodoros(currentTask.id);
    }
  };

  const { 
    secondsLeft, 
    isRunning, 
    showNotification, 
    notificationMessage,
    start, 
    pause, 
    reset, 
    closeNotification 
  } = useTimer(durations.pomodoro * 60, handlePomodoroComplete);

  // Si está corriendo, mostrar pantalla completa
  if (isRunning) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-red-500 via-red-600 to-red-700 flex flex-col items-center justify-center z-50">
        {/* Header minimalista */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white">🍅 Pomodoro</h1>
          <button 
            onClick={pause}
            className="text-white hover:bg-white hover:bg-opacity-20 p-3 rounded-full transition-all duration-200"
          >
            <span className="text-2xl">⏸️</span>
          </button>
        </div>

        {/* Tarea actual si existe */}
        {currentTask && (
          <div className="absolute top-20 left-4 right-4 text-center">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-4 md:p-6 max-w-2xl mx-auto">
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">🎯 Tarea Actual</h3>
              <p className="text-lg md:text-xl text-white mb-3">{currentTask.text}</p>
              <div className="flex justify-center items-center gap-3">
                <span className="text-white text-lg">
                  {currentTask.completedPomodoros}/{currentTask.pomodoroCount} pomodoros
                </span>
                <div className="flex gap-2">
                  {[...Array(currentTask.pomodoroCount)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-4 h-4 rounded-full ${
                        i < currentTask.completedPomodoros 
                          ? 'bg-yellow-400' 
                          : 'bg-white bg-opacity-30'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Temporizador gigante */}
        <div className="flex flex-col items-center justify-center flex-1">
          <div className="text-center">
            <div className="text-8xl md:text-9xl lg:text-[12rem] font-mono font-bold text-white mb-8 drop-shadow-2xl">
              {formatTime(secondsLeft)}
            </div>
            
            {/* Barra de progreso */}
            <div className="w-full max-w-2xl mx-auto mb-8">
              <div className="bg-white bg-opacity-30 rounded-full h-4 overflow-hidden">
                <div 
                  className="bg-white h-full rounded-full transition-all duration-1000 ease-linear"
                  style={{ 
                    width: `${((durations.pomodoro * 60 - secondsLeft) / (durations.pomodoro * 60)) * 100}%` 
                  }}
                />
              </div>
            </div>

            {/* Botones de control */}
            <div className="flex gap-6 justify-center">
              <button 
                onClick={pause}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-8 py-4 rounded-full text-xl md:text-2xl font-bold transition-all duration-200 backdrop-blur-sm"
              >
                ⏸️ Pausar
              </button>
              <button 
                onClick={reset}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-8 py-4 rounded-full text-xl md:text-2xl font-bold transition-all duration-200 backdrop-blur-sm"
              >
                🔄 Reiniciar
              </button>
            </div>
          </div>
        </div>

        {/* Footer con información */}
        <div className="absolute bottom-4 left-4 right-4 text-center">
          <p className="text-white text-lg opacity-80">
            ¡Mantén el enfoque! 💪
          </p>
        </div>

        {/* Notificación */}
        <Notification 
          show={showNotification}
          message={notificationMessage}
          onClose={closeNotification}
        />
      </div>
    );
  }

  // Vista normal cuando no está corriendo
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-6">
      <div className="flex w-full justify-between items-center mb-2">
        <h1 className="text-4xl font-bold">Pomodoro</h1>
        <div className="flex gap-2">
          <button 
            onClick={() => setShowTaskList(!showTaskList)} 
            title="Lista de Tareas" 
            className="text-2xl p-2 hover:bg-gray-100 rounded"
          >
            <span role="img" aria-label="tareas">📋</span>
          </button>
          <button 
            onClick={() => setShowSettings(true)} 
            title="Configuración" 
            className="text-2xl p-2 hover:bg-gray-100 rounded"
          >
            <span role="img" aria-label="configuración">⚙️</span>
          </button>
        </div>
      </div>

      {/* Mostrar tarea actual si existe */}
      {currentTask && (
        <div className="w-full max-w-md bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">🎯 Tarea Actual</h3>
            <p className="text-blue-900 mb-2">{currentTask.text}</p>
            <div className="flex justify-center items-center gap-2">
              <span className="text-sm text-blue-700">
                Pomodoros: {currentTask.completedPomodoros}/{currentTask.pomodoroCount}
              </span>
              <div className="flex gap-1">
                {[...Array(currentTask.pomodoroCount)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full ${
                      i < currentTask.completedPomodoros 
                        ? 'bg-orange-500' 
                        : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="text-6xl font-mono mb-6 text-black">{formatTime(secondsLeft)}</div>
      
      <div className="flex gap-4">
        <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={start}>Iniciar</button>
        <button className="bg-gray-400 text-white px-4 py-2 rounded" onClick={reset}>Reiniciar</button>
      </div>

      {/* Mostrar lista de tareas si está activada */}
      {showTaskList && (
        <div className="w-full max-w-4xl mt-6">
          <TaskList />
        </div>
      )}

      {showSettings && <Settings onClose={() => setShowSettings(false)} />}
      
      <Notification 
        show={showNotification}
        message={notificationMessage}
        onClose={closeNotification}
      />
    </div>
  );
}



