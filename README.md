# 🍅 Pomodoro Timer - Técnica de Productividad

[![React](https://img.shields.io/badge/React-19.1.0-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.0.4-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.11-38B2AC.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Una aplicación web gratuita y moderna para implementar la **Técnica Pomodoro** y mejorar tu productividad. Gestiona tu tiempo eficientemente con temporizadores personalizables, seguimiento de tareas y estadísticas detalladas.

## ✨ Características Principales

### 🎯 **Temporizador Pomodoro Inteligente**

- **Temporizador personalizable**: Configura duraciones para pomodoros, descansos cortos y largos
- **Modo pantalla completa**: Enfoque total durante las sesiones de trabajo
- **Barra de progreso visual**: Seguimiento en tiempo real del progreso
- **Notificaciones**: Alertas cuando termina cada sesión

### 📋 **Gestión de Tareas**

- **Lista de tareas integrada**: Organiza y prioriza tus actividades
- **Seguimiento de pomodoros**: Cuenta automática de sesiones por tarea
- **Progreso visual**: Indicadores de completado vs. pendiente
- **Tarea actual destacada**: Enfoque en la actividad en curso

### 📊 **Estadísticas y Análisis**

- **Seguimiento de productividad**: Métricas detalladas de tu rendimiento
- **Historial de sesiones**: Registro de pomodoros completados
- **Gráficos de progreso**: Visualización de tu evolución
- **Exportación de datos**: Guarda y analiza tus resultados

### 🎨 **Personalización Avanzada**

- **Temas de colores**: 10 opciones de colores para personalizar la experiencia
- **Configuración flexible**: Ajusta duraciones, sonidos y notificaciones
- **Interfaz responsive**: Optimizada para móviles, tablets y desktop
- **Modo oscuro/claro**: Adapta la interfaz a tus preferencias

### 🔔 **Notificaciones Inteligentes**

- **Notificaciones del navegador**: Alertas incluso con la pestaña cerrada
- **Sonidos personalizables**: Diferentes tonos para cada tipo de sesión
- **Recordatorios automáticos**: Nunca pierdas el ritmo de trabajo

## 🚀 Tecnologías Utilizadas

- **Frontend**: React 19.1.0 con Hooks modernos
- **Build Tool**: Vite 7.0.4 para desarrollo rápido
- **Styling**: Tailwind CSS 4.1.11 para diseño responsive
- **Iconos**: React Icons para interfaz moderna
- **Estado**: Context API para gestión global
- **Almacenamiento**: LocalStorage para persistencia de datos

## 📱 Características PWA

- **Instalable**: Añade la app a tu pantalla de inicio
- **Offline**: Funciona sin conexión a internet
- **Notificaciones push**: Alertas incluso con la app cerrada
- **Experiencia nativa**: Se siente como una aplicación móvil

## 🎯 ¿Qué es la Técnica Pomodoro?

La **Técnica Pomodoro** es un método de gestión del tiempo desarrollado por Francesco Cirillo en la década de 1980. Se basa en trabajar en intervalos de 25 minutos (llamados "pomodoros") seguidos de descansos cortos.

### Beneficios de la Técnica Pomodoro:

- ✅ **Mejora la concentración** y reduce las distracciones
- ✅ **Aumenta la productividad** mediante sesiones enfocadas
- ✅ **Reduce la fatiga mental** con descansos regulares
- ✅ **Mejora la gestión del tiempo** y la planificación
- ✅ **Aumenta la motivación** con logros medibles

## 🛠️ Instalación y Uso

### Requisitos Previos

- Node.js 18.0.0 o superior
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/pomodoro-app.git

# Entrar al directorio
cd pomodoro-app

# Instalar dependencias
npm install

# Iniciar en modo desarrollo
npm run dev
```

### Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Construcción para producción
npm run build

# Vista previa de producción
npm run preview

# Linting
npm run lint
```

## 📖 Guía de Uso

### 1. **Configuración Inicial**

- Ajusta las duraciones de pomodoro, descansos cortos y largos
- Personaliza los sonidos y notificaciones
- Selecciona tu tema de color preferido

### 2. **Crear Tareas**

- Añade tareas a tu lista de actividades
- Establece el número de pomodoros estimados
- Organiza por prioridad

### 3. **Iniciar Sesión**

- Selecciona una tarea de tu lista
- Haz clic en "Iniciar" para comenzar el pomodoro
- Mantén el enfoque durante los 25 minutos

### 4. **Descansos**

- Toma descansos cortos entre pomodoros
- Descansos largos después de 4 pomodoros
- Usa este tiempo para estirarte y relajarte

### 5. **Seguimiento**

- Revisa tus estadísticas de productividad
- Analiza tu progreso semanal/mensual
- Ajusta tu estrategia según los resultados

## 🎨 Personalización

### Temas de Colores Disponibles

- 🔴 Rojo (por defecto)
- 🔵 Azul
- 🟢 Verde
- 🟣 Púrpura
- 🟠 Naranja
- 🩷 Rosa
- 🟦 Índigo
- 🟢 Verde azulado
- 🟡 Amarillo
- 🟢 Esmeralda

### Configuración Avanzada

- **Duración de pomodoros**: 15-60 minutos
- **Descansos cortos**: 1-15 minutos
- **Descansos largos**: 10-30 minutos
- **Sonidos**: Personaliza alertas y notificaciones

## 📊 Estadísticas y Métricas

La aplicación registra automáticamente:

- **Pomodoros completados** por día/semana/mes
- **Tiempo total de trabajo** y descanso
- **Tareas completadas** y pendientes
- **Tendencias de productividad**
- **Mejores días/horas** de rendimiento

## 🔧 Configuración Avanzada

### Variables de Entorno

```env
VITE_APP_TITLE=Pomodoro Timer
VITE_APP_DESCRIPTION=Aplicación Pomodoro para productividad
VITE_APP_URL=https://tu-dominio.com
```

### Personalización de Estilos

Los estilos se pueden personalizar editando las clases de Tailwind CSS en los componentes.

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Guías de Contribución

- Sigue las convenciones de código existentes
- Añade tests para nuevas funcionalidades
- Actualiza la documentación según sea necesario
- Mantén la accesibilidad y responsive design

## 📝 Roadmap

### Próximas Características

- [ ] **Sincronización en la nube** para múltiples dispositivos
- [ ] **Modo colaborativo** para equipos de trabajo
- [ ] **Integración con calendarios** (Google Calendar, Outlook)
- [ ] **Análisis avanzado** con machine learning
- [ ] **Gamificación** con logros y recompensas
- [ ] **API pública** para desarrolladores
- [ ] **Aplicación móvil nativa** (iOS/Android)

### Mejoras Técnicas

- [ ] **Service Workers** para funcionalidad offline completa
- [ ] **IndexedDB** para almacenamiento local avanzado
- [ ] **WebRTC** para notificaciones push
- [ ] **PWA avanzada** con instalación automática

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## 🙏 Agradecimientos

- **Francesco Cirillo** por desarrollar la Técnica Pomodoro
- **React Team** por el framework increíble
- **Vite Team** por las herramientas de build
- **Tailwind CSS** por el sistema de diseño
- **Comunidad open source** por las contribuciones

## 📞 Soporte

- **Documentación**: [docs.tu-dominio.com](https://docs.tu-dominio.com)
- **Issues**: [GitHub Issues](https://github.com/tu-usuario/pomodoro-app/issues)
- **Discord**: [Servidor de la comunidad](https://discord.gg/pomodoro-app)
- **Email**: soporte@tu-dominio.com

## 🌟 Estrellas

Si este proyecto te ha ayudado a mejorar tu productividad, ¡considera darle una estrella en GitHub!

---

**Desarrollado con ❤️ para mejorar la productividad mundial**

_¿Tienes alguna pregunta o sugerencia? ¡No dudes en contactarnos!_
