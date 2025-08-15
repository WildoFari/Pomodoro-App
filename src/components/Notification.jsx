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

      // Auto-cerrar después de 10 segundos (más tiempo para notificación grande)
      const timer = setTimeout(() => {
        onClose();
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [show, message, onClose]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto p-6 sm:p-8 md:p-12">
        <div className="text-center">
          {/* Icono grande */}
          <div className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl mb-4 sm:mb-6 animate-bounce">
            🔔
          </div>
          
          {/* Título principal */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-3 sm:mb-4">
            ¡Sesión Completada!
          </h1>
          
          {/* Mensaje */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 leading-relaxed">
            {message}
          </p>
          
          {/* Mensaje adicional */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 text-green-100">
            ¡Excelente trabajo! Es hora de tomar un descanso.
          </p>
          
          {/* Botón de cierre */}
          <button 
            onClick={onClose}
            className="bg-white text-green-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg md:text-xl lg:text-2xl font-bold hover:bg-green-50 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 w-full sm:w-auto"
          >
            ¡Entendido!
          </button>
          
          {/* Contador de auto-cierre */}
          <p className="text-xs sm:text-sm text-green-200 mt-3 sm:mt-4">
            Se cerrará automáticamente en 10 segundos
          </p>
        </div>
      </div>
    </div>
  );
}
