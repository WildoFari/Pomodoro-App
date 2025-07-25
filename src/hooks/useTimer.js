import { useState, useRef, useCallback, useEffect } from 'react';

const DEFAULT_DURATION = 25 * 60; // 25 minutos en segundos

export default function useTimer(initialDuration = DEFAULT_DURATION) {
  const [secondsLeft, setSecondsLeft] = useState(initialDuration);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const start = useCallback(() => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setSecondsLeft(prev => {
          if (prev > 0) {
            return prev - 1;
          } else {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            return 0;
          }
        });
      }, 1000);
    }
  }, [isRunning]);

  const pause = useCallback(() => {
    if (isRunning) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    }
  }, [isRunning]);

  const reset = useCallback(() => {
    clearInterval(intervalRef.current);
    setSecondsLeft(initialDuration);
    setIsRunning(false);
  }, [initialDuration]);

  // Limpiar el intervalo al desmontar
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return {
    secondsLeft,
    isRunning,
    start,
    pause,
    reset,
  };
}
