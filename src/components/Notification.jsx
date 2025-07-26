import React, { useEffect } from 'react';

export default function Notification({ show, message, onClose }) {
  useEffect(() => {
    if (show) {
      // Solicitar permisos de notificación si no están concedidos
      if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
      }

      // Mostrar notificación del navegador
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Pomodoro Timer', {
          body: message,
          icon: '/vite.svg',
          badge: '/vite.svg',
          requireInteraction: true
        });
      }

      // Reproducir sonido de notificación
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT');
      audio.play().catch(e => console.log('No se pudo reproducir el audio:', e));

      // Auto-cerrar después de 5 segundos
      const timer = setTimeout(() => {
        onClose();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [show, message, onClose]);

  if (!show) return null;

  return (
    <div className="fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50 max-w-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-2xl mr-2">🔔</span>
          <div>
            <h3 className="font-bold">¡Sesión Completada!</h3>
            <p className="text-sm">{message}</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="ml-4 text-white hover:text-gray-200 text-xl"
        >
          ×
        </button>
      </div>
    </div>
  );
}
