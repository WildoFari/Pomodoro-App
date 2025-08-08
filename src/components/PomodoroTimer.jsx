import React, { useState } from 'react';
import useTimer from '../hooks/useTimer';
import useTasks from '../hooks/useTasks';
import { usePomodoroConfig } from '../context/PomodoroContext';
import Settings from './Settings';
import Notification from './Notification';
import TaskList from './TaskList';
import MotivationalQuote from './MotivationalQuote';

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

  // Si está corriendo o pausado, mostrar pantalla completa
  if (isRunning || secondsLeft < durations.pomodoro * 60) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-red-500 via-red-600 to-red-700 flex flex-col items-center justify-center z-50">
        {/* Header minimalista */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white">🍅 Pomodoro</h1>
          <div className="flex items-center gap-2">
            {/* Botón de pausar/reanudar */}
            <button 
              onClick={isRunning ? pause : start}
              className="text-white hover:bg-white hover:bg-opacity-10 p-2 rounded-lg transition-all duration-200"
            >
              <span className="text-lg">{isRunning ? '⏸' : '▶'}</span>
            </button>
            
            {/* Botón para volver al inicio */}
            <button 
              onClick={reset}
              className="text-white hover:bg-white hover:bg-opacity-10 p-2 rounded-lg transition-all duration-200"
              title="Volver al inicio"
            >
              <span className="text-lg">⌂</span>
            </button>
          </div>
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
            <div className="flex gap-4 justify-center">
              <button 
                onClick={isRunning ? pause : start}
                className="bg-white bg-opacity-10 hover:bg-opacity-20 text-white px-6 py-3 rounded-lg text-lg font-medium transition-all duration-200 backdrop-blur-sm border border-white border-opacity-20"
              >
                {isRunning ? '⏸ Pausar' : '▶ Reanudar'}
              </button>
              <button 
                onClick={reset}
                className="bg-white bg-opacity-10 hover:bg-opacity-20 text-white px-6 py-3 rounded-lg text-lg font-medium transition-all duration-200 backdrop-blur-sm border border-white border-opacity-20"
              >
                ↺ Reiniciar
              </button>
            </div>
          </div>
        </div>

        {/* Footer con información */}
        <div className="absolute bottom-4 left-4 right-4 text-center">

          <p className="text-white text-lg opacity-80">
            {isRunning ? '¡Mantén el enfoque! 💪' : 'Temporizador pausado ⏸️'}
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 w-full">
      {/* Header compacto para móvil */}
      <div className="bg-white border-b border-gray-100 md:hidden w-full sticky top-0 z-40">
        <div className="flex items-center justify-between p-4 w-full">
          {/* Logo y título compactos */}
          <div className="flex items-center gap-3">
            <span className="text-2xl">🍅</span>
            <h1 className="text-xl font-medium text-gray-900">Pomodoro</h1>
          </div>
          
          
          {/* Botones de acción */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowTaskList(!showTaskList)} 
                              className={`p-2 rounded-md transition-all duration-200 ${
                  showTaskList 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              title="Tareas"
            >
              <span className="text-lg">📋</span>
            </button>
            <button 
              onClick={() => setShowSettings(true)} 
              className="p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-all duration-200"
              title="Configuración"
            >
              <span className="text-lg">⚙️</span>
            </button>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="w-full max-w-6xl mx-auto p-1 sm:p-2 md:p-4 lg:p-8">
        {/* Header desktop */}
        <div className="hidden md:block bg-white border-b border-gray-100 p-4 mb-4">
          <div className="flex items-center justify-between">
            {/* Logo y título */}
            <div className="flex items-center gap-3">
              <span className="text-2xl">🍅</span>
              <h1 className="text-xl font-medium text-gray-900">Pomodoro Timer</h1>
            </div>

            {/* Botones de acción */}
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setShowTaskList(!showTaskList)} 
                className={`p-2 rounded-md transition-all duration-200 ${
                  showTaskList 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
                title="Tareas"
              >
                <span className="text-lg">📋</span>
              </button>
              <button 
                onClick={() => setShowSettings(true)} 
                className="p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-all duration-200"
                title="Configuración"
              >
                <span className="text-lg">⚙️</span>
              </button>
            </div>
          </div>
        </div>

        {/* Información móvil compacta */}
        <div className="md:hidden mb-4">
          <div className="bg-white border border-gray-100 rounded-lg p-3 w-full">
            <div className="flex justify-between text-xs text-gray-700">
              <span>⏱️ {durations.pomodoro}m</span>
              <span>☕ {durations.shortBreak}m</span>
              <span>🌙 {durations.longBreak}m</span>
            </div>
          </div>
        </div>

        {/* Contenido principal centrado */}
        <div className="flex flex-col items-center justify-center min-h-[40vh] md:min-h-[50vh] lg:min-h-[60vh] gap-4 md:gap-6 lg:gap-8 w-full px-4">
          {/* Mostrar tarea actual si existe */}
          {currentTask && (
            <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg p-4">
              <div className="text-center">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Tarea Actual</h3>
                <p className="text-gray-900 mb-3 text-sm break-words">{currentTask.text}</p>
                <div className="flex justify-center items-center gap-2">
                  <span className="text-xs text-gray-700">
                    {currentTask.completedPomodoros}/{currentTask.pomodoroCount}
                  </span>
                  <div className="flex gap-1">
                    {[...Array(currentTask.pomodoroCount)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${
                          i < currentTask.completedPomodoros 
                            ? 'bg-blue-500' 
                            : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Temporizador principal */}
          <div className="text-center w-full">
            <div className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-mono font-bold text-gray-800 mb-4 md:mb-6 lg:mb-8 drop-shadow-lg leading-none">
              {formatTime(secondsLeft)}
            </div>
            
            {/* Barra de progreso */}
            <div className="w-full max-w-xs md:max-w-sm lg:max-w-md mx-auto mb-4 md:mb-6 lg:mb-8">
              <div className="bg-gray-200 rounded-full h-2 md:h-3 overflow-hidden shadow-inner">
                <div 
                  className="bg-gradient-to-r from-red-500 to-red-600 h-full rounded-full transition-all duration-1000 ease-linear shadow-lg"
                  style={{ 
                    width: `${((durations.pomodoro * 60 - secondsLeft) / (durations.pomodoro * 60)) * 100}%` 
                  }}
                />
              </div>
            </div>
          </div>
          
          {/* Botones de control */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full max-w-xs md:max-w-sm lg:max-w-md">
            <button 
              onClick={start}
              className="bg-gray-900 hover:bg-gray-800 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg text-base md:text-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md"
            >
              ▶ Iniciar
            </button>
            <button 
              onClick={reset}
              className="bg-gray-600 hover:bg-gray-500 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg text-base md:text-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md"
            >
              ↺ Reiniciar
            </button>
          </div>

          {/* Frase motivadora */}
          <div className="w-full max-w-md mt-6">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <MotivationalQuote 
                context="starting"
                textColor="text-gray-700"
                changeInterval={20000}
              />
            </div>
          </div>
        </div>

        {/* Mostrar lista de tareas si está activada */}
        {showTaskList && (
          <div className="w-full mt-4 sm:mt-6 md:mt-8">
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
    </div>
  );
}



