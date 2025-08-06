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
          <div className="flex items-center gap-3">
            {/* Botón de pausar/reanudar */}
            <button 
              onClick={isRunning ? pause : start}
              className="text-white hover:bg-white hover:bg-opacity-20 p-3 rounded-full transition-all duration-200"
            >
              <span className="text-2xl">{isRunning ? '⏸️' : '▶️'}</span>
            </button>
            
            {/* Botón para volver al inicio */}
            <button 
              onClick={reset}
              className="text-white hover:bg-white hover:bg-opacity-20 p-3 rounded-full transition-all duration-200"
              title="Volver al inicio"
            >
              <span className="text-2xl">🏠</span>
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
            <div className="flex gap-6 justify-center">
              <button 
                onClick={isRunning ? pause : start}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-8 py-4 rounded-full text-xl md:text-2xl font-bold transition-all duration-200 backdrop-blur-sm"
              >
                {isRunning ? '⏸️ Pausar' : '▶️ Reanudar'}
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
      <div className="bg-white shadow-lg md:hidden w-full sticky top-0 z-40">
        <div className="flex items-center justify-between p-3 w-full">
          {/* Logo y título compactos */}
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-red-500 to-red-600 p-2 rounded-lg shadow-md">
              <span className="text-lg">🍅</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-800">Pomodoro</h1>
              <p className="text-xs text-gray-600">Timer</p>
            </div>
          </div>
          
          {/* Botones de acción */}
          <div className="flex items-center gap-1">
            <button 
              onClick={() => setShowTaskList(!showTaskList)} 
              className={`p-2 rounded-lg transition-all duration-200 ${
                showTaskList 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`}
              title="Tareas"
            >
              <span className="text-lg">📋</span>
            </button>
            <button 
              onClick={() => setShowSettings(true)} 
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-all duration-200"
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
        <div className="hidden md:block bg-white rounded-3xl shadow-xl p-6 md:p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Logo y título */}
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-red-500 to-red-600 p-4 rounded-2xl shadow-lg">
                <span className="hidden md:block text-4xl">🍅</span>
                <span className="md:hidden text-sm">🍅</span>
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-2">Pomodoro Timer</h1>
                <p className="text-gray-600 text-sm md:text-base lg:text-lg">Mantén el enfoque, maximiza la productividad</p>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex items-center gap-3 flex-wrap">
              {/* Botón de estadísticas */}
              <button 
                title="Ver Estadísticas" 
                className="p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 group"
              >
                <div className="text-xl group-hover:scale-110 transition-transform duration-200">
                  📊
                </div>
                <span className="text-xs block mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Stats
                </span>
              </button>

              {/* Botón de tareas */}
              <button 
                onClick={() => setShowTaskList(!showTaskList)} 
                title="Lista de Tareas" 
                className={`p-3 rounded-xl transition-all duration-200 group ${
                  showTaskList 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <div className="text-xl group-hover:scale-110 transition-transform duration-200">
                  📋
                </div>
                <span className="text-xs block mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Tareas
                </span>
              </button>

              {/* Botón de configuración */}
              <button 
                onClick={() => setShowSettings(true)} 
                title="Configuración" 
                className="p-3 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-xl transition-all duration-200 group"
              >
                <div className="text-xl group-hover:scale-110 transition-transform duration-200">
                  ⚙️
                </div>
                <span className="text-xs block mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Config
                </span>
              </button>

              {/* Separador visual */}
              <div className="w-px h-8 bg-gray-200 mx-2 hidden lg:block"></div>

              {/* Indicador de estado */}
              <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-xl border border-green-200">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-green-700">Listo</span>
              </div>
            </div>
          </div>

          {/* Información adicional en el header */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-gray-600">
              <div className="flex flex-wrap items-center gap-4 md:gap-6">
                <span className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                  <span>⏱️</span>
                  <span className="font-medium">Duración: {durations.pomodoro} min</span>
                </span>
                <span className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                  <span>☕</span>
                  <span className="font-medium">Descanso: {durations.shortBreak} min</span>
                </span>
                <span className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                  <span>🌙</span>
                  <span className="font-medium">Descanso largo: {durations.longBreak} min</span>
                </span>
              </div>
              <div className="text-right">
                <span className="font-medium text-lg bg-blue-50 px-4 py-2 rounded-lg text-blue-700">
                  Hoy: 0 pomodoros
                </span>
              </div>
            </div>
            
            {/* Frase motivadora en el header */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-3 border border-blue-100">
                <MotivationalQuote 
                  autoChange={true}
                  changeInterval={30000}
                  textColor="text-gray-700"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Información móvil compacta */}
        <div className="md:hidden mb-4">
          <div className="bg-white rounded-xl p-3 shadow-lg w-full">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 px-2 py-1 bg-green-50 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-green-700">Listo</span>
              </div>
              <span className="text-xs font-medium bg-blue-50 px-2 py-1 rounded-full text-blue-700">
                Hoy: 0 pomodoros
              </span>
            </div>
            <div className="flex justify-between text-xs text-gray-600">
              <span className="bg-gray-50 px-2 py-1 rounded">⏱️ {durations.pomodoro}m</span>
              <span className="bg-gray-50 px-2 py-1 rounded">☕ {durations.shortBreak}m</span>
              <span className="bg-gray-50 px-2 py-1 rounded">🌙 {durations.longBreak}m</span>
            </div>
          </div>
        </div>

        {/* Contenido principal centrado */}
        <div className="flex flex-col items-center justify-center min-h-[40vh] md:min-h-[50vh] lg:min-h-[60vh] gap-4 md:gap-6 lg:gap-8 w-full px-4">
          {/* Mostrar tarea actual si existe */}
          {currentTask && (
            <div className="w-full max-w-sm md:max-w-md lg:max-w-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl md:rounded-2xl p-3 md:p-4 lg:p-6 shadow-lg">
              <div className="text-center">
                <h3 className="text-sm md:text-lg lg:text-xl font-semibold text-blue-800 mb-2 md:mb-3 flex items-center justify-center gap-2">
                  <span>🎯</span>
                  <span>Tarea Actual</span>
                </h3>
                <p className="text-blue-900 mb-2 md:mb-3 lg:mb-4 text-sm md:text-base lg:text-lg break-words">{currentTask.text}</p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-2 md:gap-3">
                  <span className="text-xs md:text-sm text-blue-700 bg-white px-2 md:px-3 py-1 rounded-full">
                    Pomodoros: {currentTask.completedPomodoros}/{currentTask.pomodoroCount}
                  </span>
                  <div className="flex gap-1 md:gap-2">
                    {[...Array(currentTask.pomodoroCount)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-3 md:w-4 h-3 md:h-4 rounded-full ${
                          i < currentTask.completedPomodoros 
                            ? 'bg-orange-500 shadow-md' 
                            : 'bg-gray-300'
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
          <div className="flex flex-col sm:flex-row gap-3 md:gap-6 w-full max-w-xs md:max-w-sm lg:max-w-md">
            <button 
              onClick={start}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl text-base md:text-lg lg:text-xl font-bold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              ▶️ Iniciar
            </button>
            <button 
              onClick={reset}
              className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl text-base md:text-lg lg:text-xl font-bold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              🔄 Reiniciar
            </button>
          </div>

          {/* Frase motivadora */}
          <div className="w-full max-w-md lg:max-w-lg mt-6 md:mt-8">
            <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100">
              <MotivationalQuote 
                context="starting"
                textColor="text-gray-800"
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



