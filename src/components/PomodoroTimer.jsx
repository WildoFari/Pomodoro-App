import React, { useState } from 'react';
import useTimer from '../hooks/useTimer';
import { usePomodoroConfig } from '../context/PomodoroContext';
import Settings from './Settings';
import Notification from './Notification';

function formatTime(seconds) {
  const m = String(Math.floor(seconds / 60)).padStart(2, '0');
  const s = String(seconds % 60).padStart(2, '0');
  return `${m}:${s}`;
}

export default function PomodoroTimer() {
  const { durations } = usePomodoroConfig();
  const [showSettings, setShowSettings] = useState(false);
  const { 
    secondsLeft, 
    isRunning, 
    showNotification, 
    notificationMessage,
    start, 
    pause, 
    reset, 
    closeNotification 
  } = useTimer(durations.pomodoro * 60);

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-6">
      <div className="flex w-full justify-between items-center mb-2">
        <h1 className="text-4xl font-bold">Pomodoro</h1>
        <button onClick={() => setShowSettings(true)} title="Configuración" className="text-2xl p-2">
          <span role="img" aria-label="configuración">⚙️</span>
        </button>
      </div>
      <div className="text-6xl font-mono mb-6" style={{ color: 'black' }}>{formatTime(secondsLeft)}</div>
      <div className="flex gap-4">
        {!isRunning ? (
          <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={start}>Iniciar</button>
        ) : (
          <button className="bg-yellow-500 text-white px-4 py-2 rounded" onClick={pause}>Pausar</button>
        )}
        <button className="bg-gray-400 text-white px-4 py-2 rounded" onClick={reset}>Reiniciar</button>
      </div>
      {showSettings && <Settings onClose={() => setShowSettings(false)} />}
      
      <Notification 
        show={showNotification}
        message={notificationMessage}
        onClose={closeNotification}
      />
    </div>
  );
}



