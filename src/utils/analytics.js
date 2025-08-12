// Google Analytics y métricas SEO para Pomodoro Timer App

// Configuración de Google Analytics
const GA_TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID;

// Inicializar Google Analytics
export const initGA = () => {
  if (typeof window !== 'undefined' && GA_TRACKING_ID) {
    // Cargar Google Analytics
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', GA_TRACKING_ID, {
      page_title: 'Pomodoro Timer',
      page_location: window.location.href,
      custom_map: {
        'custom_parameter_1': 'pomodoro_sessions',
        'custom_parameter_2': 'task_completion',
        'custom_parameter_3': 'user_productivity'
      }
    });

    window.gtag = gtag;
  }
};

// Eventos personalizados para seguimiento de productividad
export const trackPomodoroEvent = (action, label, value) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: 'Pomodoro',
      event_label: label,
      value: value
    });
  }
};

// Eventos específicos
export const trackPomodoroStart = (duration) => {
  trackPomodoroEvent('pomodoro_start', 'Session Started', duration);
};

export const trackPomodoroComplete = (duration) => {
  trackPomodoroEvent('pomodoro_complete', 'Session Completed', duration);
};

export const trackBreakStart = (breakType) => {
  trackPomodoroEvent('break_start', `${breakType} Break Started`, 1);
};

export const trackTaskComplete = (taskName, pomodoroCount) => {
  trackPomodoroEvent('task_complete', taskName, pomodoroCount);
};

export const trackSettingsChange = (setting, value) => {
  trackPomodoroEvent('settings_change', setting, value);
};

// Métricas de rendimiento web
export const trackWebVitals = () => {
  if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
    // LCP (Largest Contentful Paint)
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      if (window.gtag) {
        window.gtag('event', 'web_vitals', {
          event_category: 'Web Vitals',
          event_label: 'LCP',
          value: Math.round(lastEntry.startTime)
        });
      }
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // FID (First Input Delay)
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (window.gtag) {
          window.gtag('event', 'web_vitals', {
            event_category: 'Web Vitals',
            event_label: 'FID',
            value: Math.round(entry.processingStart - entry.startTime)
          });
        }
      });
    }).observe({ entryTypes: ['first-input'] });

    // CLS (Cumulative Layout Shift)
    new PerformanceObserver((list) => {
      let clsValue = 0;
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      if (window.gtag) {
        window.gtag('event', 'web_vitals', {
          event_category: 'Web Vitals',
          event_label: 'CLS',
          value: Math.round(clsValue * 1000) / 1000
        });
      }
    }).observe({ entryTypes: ['layout-shift'] });
  }
};

// Seguimiento de errores
export const trackError = (error, errorInfo) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'exception', {
      description: error.toString(),
      fatal: false,
      custom_parameter_1: errorInfo?.componentStack || 'Unknown'
    });
  }
};

// Seguimiento de engagement
export const trackEngagement = (action, duration) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'user_engagement', {
      event_category: 'Engagement',
      event_label: action,
      value: duration
    });
  }
};

// Seguimiento de instalación PWA
export const trackPWAInstall = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'pwa_install', {
      event_category: 'PWA',
      event_label: 'App Installed'
    });
  }
};

// Seguimiento de uso offline
export const trackOfflineUsage = (duration) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'offline_usage', {
      event_category: 'PWA',
      event_label: 'Offline Session',
      value: duration
    });
  }
};

// Configuración de eventos personalizados
export const setupCustomEvents = () => {
  // Seguimiento de tiempo en página
  let startTime = Date.now();
  
  window.addEventListener('beforeunload', () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    trackEngagement('page_view', timeSpent);
  });

  // Seguimiento de interacciones con el temporizador
  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-track="timer"]')) {
      trackPomodoroEvent('timer_interaction', 'Timer Button Clicked', 1);
    }
  });
};

// Inicializar todo cuando se carga la página
export const initializeAnalytics = () => {
  initGA();
  trackWebVitals();
  setupCustomEvents();
  
  // Seguimiento de instalación PWA
  window.addEventListener('appinstalled', trackPWAInstall);
  
  // Seguimiento de estado offline
  window.addEventListener('online', () => {
    trackEngagement('connection_restored', 1);
  });
  
  window.addEventListener('offline', () => {
    trackEngagement('connection_lost', 1);
  });
};

export default {
  initGA,
  trackPomodoroEvent,
  trackPomodoroStart,
  trackPomodoroComplete,
  trackBreakStart,
  trackTaskComplete,
  trackSettingsChange,
  trackWebVitals,
  trackError,
  trackEngagement,
  trackPWAInstall,
  trackOfflineUsage,
  initializeAnalytics
};
