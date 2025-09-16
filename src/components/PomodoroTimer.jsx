import React, { useState } from 'react';
import { 
  FaPlay, 
  FaPause, 
  FaRedo, 
  FaHome, 
  FaCog, 
  FaClipboardList,
  FaPalette
} from 'react-icons/fa';
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
  const [selectedColor, setSelectedColor] = useState('red');

  // Función para cambiar al siguiente color
  const changeToNextColor = () => {
    const currentIndex = pomodoroColors.findIndex(color => color.name === selectedColor);
    const nextIndex = (currentIndex + 1) % pomodoroColors.length;
    setSelectedColor(pomodoroColors[nextIndex].name);
  };
  
  const { currentTask, incrementPomodoros } = useTasks();

  // Colores disponibles para el pomodoro
  const pomodoroColors = [
    { name: 'red', gradient: 'from-red-500 via-red-600 to-red-700', solid: 'bg-red-500', hex: '#ef4444' },
    { name: 'blue', gradient: 'from-blue-500 via-blue-600 to-blue-700', solid: 'bg-blue-500', hex: '#3b82f6' },
    { name: 'green', gradient: 'from-green-500 via-green-600 to-green-700', solid: 'bg-green-500', hex: '#22c55e' },
    { name: 'purple', gradient: 'from-purple-500 via-purple-600 to-purple-700', solid: 'bg-purple-500', hex: '#a855f7' },
    { name: 'orange', gradient: 'from-orange-500 via-orange-600 to-orange-700', solid: 'bg-orange-500', hex: '#f97316' },
    { name: 'pink', gradient: 'from-pink-500 via-pink-600 to-pink-700', solid: 'bg-pink-500', hex: '#ec4899' },
    { name: 'indigo', gradient: 'from-indigo-500 via-indigo-600 to-indigo-700', solid: 'bg-indigo-500', hex: '#6366f1' },
    { name: 'teal', gradient: 'from-teal-500 via-teal-600 to-teal-700', solid: 'bg-teal-500', hex: '#14b8a6' },
    { name: 'yellow', gradient: 'from-yellow-500 via-yellow-600 to-yellow-700', solid: 'bg-yellow-500', hex: '#eab308' },
    { name: 'emerald', gradient: 'from-emerald-500 via-emerald-600 to-emerald-700', solid: 'bg-emerald-500', hex: '#10b981' }
  ];

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

      <div className={`fixed inset-0 bg-gradient-to-br ${pomodoroColors.find(color => color.name === selectedColor)?.gradient || 'from-red-500 via-red-600 to-red-700'} flex flex-col items-center justify-center z-50 overflow-hidden`}>
        {/* Header minimalista - optimizado para móvil */}
        <div className="absolute top-2 sm:top-4 left-2 sm:left-4 right-2 sm:right-4 flex justify-center sm:justify-between items-center">
          <div className="hidden sm:block bg-black bg-opacity-30 backdrop-blur-sm rounded-lg px-3 py-2">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white drop-shadow-lg">🍅 Pomodoro</h1>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Botón de pausar/reanudar */}
            <button 
              onClick={isRunning ? pause : start}
              className="text-white hover:bg-white hover:bg-opacity-20 p-5 sm:p-3 rounded-full transition-all duration-200 min-h-[80px] min-w-[80px] sm:min-h-[44px] sm:min-w-[44px] flex items-center justify-center"
            >
              {isRunning ? (
                <FaPause className="text-lg sm:text-xl md:text-2xl" />
              ) : (
                <FaPlay className="text-lg sm:text-xl md:text-2xl" />
              )}
            </button>
            
            {/* Botón para volver al inicio */}
            <button 
              onClick={reset}
              className="text-white hover:bg-white hover:bg-opacity-20 p-5 sm:p-3 rounded-full transition-all duration-200 min-h-[80px] min-w-[80px] sm:min-h-[44px] sm:min-w-[44px] flex items-center justify-center"
              title="Volver al inicio"
            >
              <FaHome className="text-lg sm:text-xl md:text-2xl" />

            </button>

            {/* Botón de cambiar color */}
            <button
              onClick={changeToNextColor}
              className={`hover:bg-white hover:bg-opacity-20 p-5 sm:p-3 rounded-full transition-all duration-200 min-h-[80px] min-w-[80px] sm:min-h-[44px] sm:min-w-[44px] flex items-center justify-center`}
              style={{ 
                backgroundColor: pomodoroColors.find(color => color.name === selectedColor)?.hex || '#ef4444',
                color: 'white'
              }}
              title="Cambiar color"
            >
              <FaPalette className="text-lg sm:text-xl md:text-2xl" />
            </button>
          </div>
        </div>

        {/* Tarea actual si existe - optimizada para móvil */}
        {currentTask && (
          <div className="absolute top-40 sm:top-30 left-2 sm:left-4 right-2 sm:right-4 text-center">
            <div className="bg-black bg-opacity-40 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 max-w-sm sm:max-w-md md:max-w-2xl mx-auto border border-white border-opacity-20 shadow-2xl">

              <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-white mb-1 sm:mb-2 drop-shadow-lg">🎯 Tarea Actual</h3>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white mb-2 sm:mb-3 break-words px-2 drop-shadow-lg font-medium">{currentTask.text}</p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-1 sm:gap-2 md:gap-3">
                <span className="text-white text-sm sm:text-base md:text-lg drop-shadow-lg font-medium">

                  {currentTask.completedPomodoros}/{currentTask.pomodoroCount} pomodoros
                </span>
                <div className="flex gap-1 sm:gap-2">
                  {[...Array(currentTask.pomodoroCount)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${
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

        {/* Temporizador gigante - optimizado para móvil */}
        <div className="flex flex-col items-center justify-center flex-1 px-4">
          <div className="text-center w-full">
            <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[12rem] font-mono font-bold text-white mb-4 sm:mb-6 md:mb-8 drop-shadow-2xl leading-none">
              {formatTime(secondsLeft)}
            </div>
            
            {/* Barra de progreso - optimizada para móvil */}
            <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto mb-4 sm:mb-6 md:mb-8">
              <div className="bg-white bg-opacity-30 rounded-full h-2 sm:h-3 md:h-4 overflow-hidden">
                <div 
                  className="bg-white h-full rounded-full transition-all duration-1000 ease-linear"
                  style={{ 
                    width: `${((durations.pomodoro * 60 - secondsLeft) / (durations.pomodoro * 60)) * 100}%` 
                  }}
                />
              </div>
            </div>

            {/* Botones de control - optimizados para móvil */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 justify-center items-center w-full max-w-md mx-auto">
              <button 
                onClick={isRunning ? pause : start}
                className="w-full sm:w-auto bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-6 sm:px-8 md:px-10 py-4 sm:py-5 rounded-full text-lg sm:text-xl md:text-2xl font-bold transition-all duration-200 backdrop-blur-sm min-h-[50px] flex items-center justify-center gap-2 sm:gap-3"
              >
                {isRunning ? <FaPause /> : <FaPlay />}
                <span className="hidden sm:inline">{isRunning ? 'Pausar' : 'Reanudar'}</span>
              </button>
              <button 
                onClick={reset}
                className="w-full sm:w-auto bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-6 sm:px-8 md:px-10 py-4 sm:py-5 rounded-full text-lg sm:text-xl md:text-2xl font-bold transition-all duration-200 backdrop-blur-sm min-h-[50px] flex items-center justify-center gap-2 sm:gap-3"
              >
                <FaRedo />
                <span className="hidden sm:inline">Reiniciar</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer con información - optimizado para móvil */}
        <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4 text-center">
          <div className="bg-black bg-opacity-30 backdrop-blur-sm rounded-lg px-3 py-2 inline-block">
            <p className="text-white text-sm sm:text-base md:text-lg font-medium drop-shadow-lg">
              {isRunning ? '¡Mantén el enfoque! 💪' : 'Temporizador pausado ⏸️'}
            </p>
          </div>
        </div>

        {/* Botón de selector de colores - optimizado para móvil */}


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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 w-full overflow-x-hidden">
      {/* Header compacto para móvil - con iconos en esquina superior derecha */}
      <div className="bg-white shadow-lg md:hidden w-full sticky top-0 z-40">
        <div className="flex items-center justify-between p-3 w-full">
          {/* Logo y título compactos */}
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-xl sm:text-2xl">🍅</span>
            <h1 className="text-lg hidden md:block sm:text-xl font-medium text-gray-900">Pomodoro</h1>
          </div>
          
          {/* Iconos pequeños en esquina superior derecha */}
          <div className="flex items-center gap-1">
            {/* Botón de tareas */}
            <button 
              onClick={() => setShowTaskList(!showTaskList)} 
              className={`p-1.5 rounded-md transition-all duration-200 ${
                showTaskList 
                  ? 'text-white bg-blue-600' 
                  : 'text-white hover:text-blue-200 hover:bg-gray-700'
              }`}
              title="Tareas"
            >
              <FaClipboardList className="text-xs" />
            </button>
            
            {/* Botón de configuración */}
            <button 
              onClick={() => setShowSettings(true)} 
              className="p-1.5 text-white hover:text-gray-200 hover:bg-gray-700 rounded-md transition-all duration-200"
              title="Configuración"
            >
              <FaCog className="text-xs" />
            </button>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="w-full max-w-6xl mx-auto p-1 sm:p-2 md:p-4 lg:p-8">
        {/* Header desktop - optimizado */}
        <div className="hidden md:block bg-white border-b border-gray-100 p-4 mb-4">
          <div className="flex items-center justify-between">
            {/* Logo y título */}
            <div className="flex items-center gap-3">
              <span className="text-2xl">🍅</span>
              <h1 className="text-xl font-medium text-gray-900">Pomodoro Timer</h1>
            </div>

            {/* Botones de acción - optimizados */}
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setShowTaskList(!showTaskList)} 
                className={`p-2 rounded-lg transition-all duration-200 ${
                  showTaskList 
                    ? 'text-white bg-blue-600' 
                    : 'text-white hover:text-blue-200 hover:bg-gray-700'
                }`}
                title="Tareas"
              >
                <FaClipboardList className="text-lg" />
              </button>
              <button 
                onClick={() => setShowSettings(true)} 
                className="p-2 text-white hover:text-gray-200 hover:bg-gray-700 rounded-lg transition-all duration-200"
                title="Configuración"
              >
                <FaCog className="text-lg" />
              </button>
            </div>
          </div>
        </div>

        {/* Información móvil compacta */}
        <div className="md:hidden mb-3">
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
          </div>
        </div>

        {/* Contenido principal centrado - optimizado para móvil */}
        <div className="flex flex-col items-center justify-center min-h-[30vh] sm:min-h-[35vh] md:min-h-[50vh] lg:min-h-[60vh] gap-3 sm:gap-4 md:gap-6 lg:gap-8 w-full px-3 sm:px-4">
          {/* Mostrar tarea actual si existe - optimizada para móvil */}
          {currentTask && (
            <div className="w-full max-w-sm sm:max-w-md bg-white border border-gray-200 rounded-lg p-3 sm:p-4">
              <div className="text-center">
                <h3 className="text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Tarea Actual</h3>
                <p className="text-gray-900 mb-2 sm:mb-3 text-xs sm:text-sm break-words">{currentTask.text}</p>
                <div className="flex justify-center items-center gap-1 sm:gap-2">
                  <span className="text-xs text-gray-700">
                    {currentTask.completedPomodoros}/{currentTask.pomodoroCount}
                  </span>
                  <div className="flex gap-1">
                    {[...Array(currentTask.pomodoroCount)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
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

          {/* Temporizador principal con controles integrados */}
          <div className="text-center w-full">
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-gray-800 mb-4 sm:mb-6 md:mb-8 drop-shadow-lg leading-none">
              {formatTime(secondsLeft)}
            </div>
            
            {/* Barra de progreso - optimizada para móvil */}
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto mb-6 sm:mb-8 md:mb-10">
              <div className="bg-gray-200 rounded-full h-1.5 sm:h-2 md:h-3 overflow-hidden shadow-inner">
                <div 
                  className="bg-gradient-to-r from-red-500 to-red-600 h-full rounded-full transition-all duration-1000 ease-linear shadow-lg"
                  style={{ 
                    width: `${((durations.pomodoro * 60 - secondsLeft) / (durations.pomodoro * 60)) * 100}%` 
                  }}
                />
              </div>
            </div>
            
            {/* Botones de control integrados con el temporizador */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center items-center">
              <button 
                onClick={start}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 sm:px-8 md:px-10 py-3 md:py-4 rounded-xl md:rounded-2xl text-sm sm:text-base md:text-lg font-bold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
              >
                <FaPlay className="text-sm sm:text-base" />
                <span>Iniciar</span>
              </button>
              <button 
                onClick={reset}
                className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-6 sm:px-8 md:px-10 py-3 md:py-4 rounded-xl md:rounded-2xl text-sm sm:text-base md:text-lg font-bold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
              >
                <FaRedo className="text-sm sm:text-base" />
                <span>Reiniciar</span>
              </button>
            </div>
          </div>

          {/* Frase motivadora - optimizada para móvil */}
          <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg mt-3 sm:mt-4 md:mt-6 lg:mt-8">
            <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-lg border border-gray-100">

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



