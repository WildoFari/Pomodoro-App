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
        {!isRunning ? (
          <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={start}>Iniciar</button>
        ) : (
          <button className="bg-yellow-500 text-white px-4 py-2 rounded" onClick={pause}>Pausar</button>
        )}
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



