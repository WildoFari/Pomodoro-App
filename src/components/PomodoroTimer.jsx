import React from 'react';
import useTimer from '../hooks/useTimer';

function formatTime(seconds) {
  const m = String(Math.floor(seconds / 60)).padStart(2, '0');
  const s = String(seconds % 60).padStart(2, '0');
  return `${m}:${s}`;
}

export default function PomodoroTimer() {
  const { secondsLeft, isRunning, start, pause, reset } = useTimer();

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-6">
      <h1 className="text-4xl font-bold mb-4">Pomodoro</h1>
      <div className="text-6xl font-mono mb-6" style={{ color: 'black' }}>{formatTime(secondsLeft)}</div>
      <div className="flex gap-4">
        {!isRunning ? (
          <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={start}>Iniciar</button>
        ) : (
          <button className="bg-yellow-500 text-white px-4 py-2 rounded" onClick={pause}>Pausar</button>
        )}
        <button className="bg-gray-400 text-white px-4 py-2 rounded" onClick={reset}>Reiniciar</button>
      </div>
    </div>
  );
}



