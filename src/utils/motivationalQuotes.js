// Frases motivadoras para la aplicación de Pomodoro
export const motivationalQuotes = [
  "Cada pomodoro es un paso hacia tus metas",
  "El enfoque es tu superpoder",
  "Un minuto a la vez, un logro a la vez",
  "Tu productividad es tu libertad",
  "Cada 25 minutos cuenta hacia el éxito",
  "Mantén el ritmo, mantén el enfoque",
  "La consistencia supera a la perfección",
  "Cada descanso te recarga para más",
  "Tu tiempo es valioso, úsalo sabiamente",
  "El progreso se construye minuto a minuto",
  "Enfócate en lo que importa, una tarea a la vez",
  "Cada pomodoro te acerca a tus sueños",
  "La disciplina es el puente entre metas y logros",
  "Respira, enfócate, conquista",
  "Tu futuro se construye en estos momentos",
  "Cada esfuerzo cuenta, cada minuto importa",
  "El éxito es la suma de pequeños esfuerzos repetidos",
  "Mantén la calma y sigue trabajando",
  "Tu potencial es ilimitado, tu tiempo es ahora",
  "Cada descanso es una oportunidad para reflexionar",
  "La calidad del tiempo supera la cantidad",
  "Tu mente es tu herramienta más poderosa",
  "Cada pomodoro es una victoria pequeña",
  "El enfoque profundo es tu ventaja competitiva",
  "Respeta tu tiempo, respeta tus límites",
  "Cada minuto de concentración es oro puro",
  "Tu productividad es tu legado",
  "El progreso constante supera la perfección ocasional",
  "Cada tarea completada es un logro celebrado",
  "Tu determinación es más fuerte que cualquier distracción",
  "El tiempo bien invertido siempre rinde frutos",
  "Cada pomodoro te hace más fuerte",
  "Tu enfoque es tu superpoder secreto",
  "La consistencia es la clave del éxito",
  "Cada descanso te prepara para el siguiente sprint",
  "Tu tiempo es tu recurso más valioso",
  "El progreso se mide en pomodoros completados",
  "Cada minuto de concentración es una inversión en tu futuro",
  "Tu disciplina hoy determina tu éxito mañana",
  "El enfoque es el arte de decir 'no' a las distracciones",
  "Cada tarea terminada es un peso menos en tu mente",
  "Tu productividad es tu forma de honrar el tiempo",
  "El éxito es la suma de decisiones inteligentes repetidas",
  "Cada pomodoro es una oportunidad de superarte",
  "Tu tiempo es limitado, tu potencial es infinito",
  "La calidad de tu trabajo refleja la calidad de tu enfoque",
  "Cada descanso es un momento para recargar energías",
  "Tu determinación es más fuerte que la procrastinación",
  "El progreso se construye un pomodoro a la vez",
  "Cada minuto de concentración es un regalo para tu futuro",
  "Tu disciplina es tu libertad",
  "El enfoque es el camino hacia la excelencia",
  "Cada tarea completada te acerca a tus sueños",
  "Tu tiempo es tu vida, úsalo con propósito"
];

// Mapeo de iconos para las frases motivadoras
export const quoteIcons = [
  "Target", "Zap", "Clock", "Rocket", "TrendingUp", "Music", "Sparkles", "Lightbulb", 
  "Hourglass", "Building", "Target", "Star", "Bridge", "Brain", "CrystalBall", "Gem", 
  "BarChart3", "Brain", "Zap", "Brain", "Star", "Brain", "Trophy", "Target", "Clock", 
  "Coins", "BookOpen", "TrendingUp", "PartyPopper", "Shield", "Sprout", "Zap", 
  "CrystalBall", "Key", "Running", "Gem", "BarChart3", "Target", "Sunrise", "X", 
  "Feather", "Hourglass", "Brain", "Rocket", "Infinity", "Palette", "Battery", "Zap", 
  "BuildingBlocks", "Gift", "Dove", "Star", "Moon", "Heart"
];

// Función para obtener una frase motivadora aleatoria
export const getRandomQuote = () => {
  const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
  return {
    text: motivationalQuotes[randomIndex],
    icon: quoteIcons[randomIndex]
  };
};

// Función para obtener una frase motivadora específica por contexto
export const getQuoteByContext = (context) => {
  const contextQuotes = {
    starting: [
      { text: "¡Comienza con energía! Cada pomodoro cuenta", icon: "Rocket" },
      { text: "El primer paso es el más importante", icon: "Footprints" },
      { text: "Tu jornada de productividad comienza ahora", icon: "Star" },
      { text: "Preparado, listo, ¡enfócate!", icon: "Target" }
    ],
    working: [
      { text: "Mantén el enfoque, el progreso se construye ahora", icon: "Zap" },
      { text: "Cada minuto de concentración es oro puro", icon: "Coins" },
      { text: "Tu determinación te llevará lejos", icon: "Running" },
      { text: "El éxito está en los detalles, mantén el ritmo", icon: "Music" }
    ],
    break: [
      { text: "Tómate un respiro bien merecido", icon: "Coffee" },
      { text: "Recarga energías para el siguiente sprint", icon: "Battery" },
      { text: "El descanso es parte del trabajo", icon: "Brain" },
      { text: "Disfruta este momento de calma", icon: "Flower" }
    ],
    completed: [
      { text: "¡Excelente trabajo! Has completado otro pomodoro", icon: "PartyPopper" },
      { text: "Cada pomodoro completado es una victoria", icon: "Trophy" },
      { text: "Tu consistencia te está llevando al éxito", icon: "TrendingUp" },
      { text: "¡Sigue así! Estás construyendo algo increíble", icon: "Star" }
    ]
  };
  
  const quotes = contextQuotes[context] || motivationalQuotes.map((text, index) => ({ text, icon: quoteIcons[index] }));
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
}; 