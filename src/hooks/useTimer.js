import { useState, useRef, useCallback, useEffect } from 'react';

const DEFAULT_DURATION = 25 * 60; // 25 minutos en segundos

export default function useTimer(initialDuration = DEFAULT_DURATION, onComplete = null) {
  const [secondsLeft, setSecondsLeft] = useState(initialDuration);
  const [isRunning, setIsRunning] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
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
            // Mostrar notificación cuando termine
            setNotificationMessage('¡Tu sesión Pomodoro ha terminado! ¡Toma un descanso!');
            setShowNotification(true);
            // Llamar al callback si existe
            if (onComplete) {
              onComplete();
            }
            return 0;
          }
        });
      }, 1000);
    }
  }, [isRunning, onComplete]);

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

  const closeNotification = useCallback(() => {
    setShowNotification(false);
    setNotificationMessage('');
  }, []);

  // Limpiar el intervalo al desmontar
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return {
    secondsLeft,
    isRunning,
    showNotification,
    notificationMessage,
    start,
    pause,
    reset,
    closeNotification,
  };
}
