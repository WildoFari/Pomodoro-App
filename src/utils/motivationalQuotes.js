// Frases motivadoras para la aplicación de Pomodoro
export const motivationalQuotes = [
  "Cada pomodoro es un paso hacia tus metas 🎯",
  "El enfoque es tu superpoder 💪",
  "Un minuto a la vez, un logro a la vez ⏰",
  "Tu productividad es tu libertad 🚀",
  "Cada 25 minutos cuenta hacia el éxito 📈",
  "Mantén el ritmo, mantén el enfoque 🎵",
  "La consistencia supera a la perfección ✨",
  "Cada descanso te recarga para más 💡",
  "Tu tiempo es valioso, úsalo sabiamente ⏳",
  "El progreso se construye minuto a minuto 🏗️",
  "Enfócate en lo que importa, una tarea a la vez 🎯",
  "Cada pomodoro te acerca a tus sueños 🌟",
  "La disciplina es el puente entre metas y logros 🌉",
  "Respira, enfócate, conquista 🧘‍♀️",
  "Tu futuro se construye en estos momentos 🔮",
  "Cada esfuerzo cuenta, cada minuto importa 💎",
  "El éxito es la suma de pequeños esfuerzos repetidos 📊",
  "Mantén la calma y sigue trabajando 🧘‍♂️",
  "Tu potencial es ilimitado, tu tiempo es ahora ⚡",
  "Cada descanso es una oportunidad para reflexionar 🤔",
  "La calidad del tiempo supera la cantidad ⭐",
  "Tu mente es tu herramienta más poderosa 🧠",
  "Cada pomodoro es una victoria pequeña 🏆",
  "El enfoque profundo es tu ventaja competitiva 🎯",
  "Respeta tu tiempo, respeta tus límites ⏰",
  "Cada minuto de concentración es oro puro 💰",
  "Tu productividad es tu legado 📚",
  "El progreso constante supera la perfección ocasional 📈",
  "Cada tarea completada es un logro celebrado 🎉",
  "Tu determinación es más fuerte que cualquier distracción 🛡️",
  "El tiempo bien invertido siempre rinde frutos 🌱",
  "Cada pomodoro te hace más fuerte 💪",
  "Tu enfoque es tu superpoder secreto 🔮",
  "La consistencia es la clave del éxito 🔑",
  "Cada descanso te prepara para el siguiente sprint 🏃‍♀️",
  "Tu tiempo es tu recurso más valioso 💎",
  "El progreso se mide en pomodoros completados 📊",
  "Cada minuto de concentración es una inversión en tu futuro 🎯",
  "Tu disciplina hoy determina tu éxito mañana 🌅",
  "El enfoque es el arte de decir 'no' a las distracciones 🚫",
  "Cada tarea terminada es un peso menos en tu mente 🪶",
  "Tu productividad es tu forma de honrar el tiempo ⏳",
  "El éxito es la suma de decisiones inteligentes repetidas 🧠",
  "Cada pomodoro es una oportunidad de superarte 🚀",
  "Tu tiempo es limitado, tu potencial es infinito ♾️",
  "La calidad de tu trabajo refleja la calidad de tu enfoque 🎨",
  "Cada descanso es un momento para recargar energías 🔋",
  "Tu determinación es más fuerte que la procrastinación 💪",
  "El progreso se construye un pomodoro a la vez 🧱",
  "Cada minuto de concentración es un regalo para tu futuro 🎁",
  "Tu disciplina es tu libertad 🕊️",
  "El enfoque es el camino hacia la excelencia 🌟",
  "Cada tarea completada te acerca a tus sueños 🌙",
  "Tu tiempo es tu vida, úsalo con propósito ❤️"
];

// Función para obtener una frase motivadora aleatoria
export const getRandomQuote = () => {
  const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
  return motivationalQuotes[randomIndex];
};

// Función para obtener una frase motivadora específica por contexto
export const getQuoteByContext = (context) => {
  const contextQuotes = {
    starting: [
      "¡Comienza con energía! Cada pomodoro cuenta 🚀",
      "El primer paso es el más importante 👣",
      "Tu jornada de productividad comienza ahora ⭐",
      "Preparado, listo, ¡enfócate! 🎯"
    ],
    working: [
      "Mantén el enfoque, el progreso se construye ahora 💪",
      "Cada minuto de concentración es oro puro 💰",
      "Tu determinación te llevará lejos 🏃‍♀️",
      "El éxito está en los detalles, mantén el ritmo 🎵"
    ],
    break: [
      "Tómate un respiro bien merecido ☕",
      "Recarga energías para el siguiente sprint 🔋",
      "El descanso es parte del trabajo 🧘‍♀️",
      "Disfruta este momento de calma 🌸"
    ],
    completed: [
      "¡Excelente trabajo! Has completado otro pomodoro 🎉",
      "Cada pomodoro completado es una victoria 🏆",
      "Tu consistencia te está llevando al éxito 📈",
      "¡Sigue así! Estás construyendo algo increíble 🌟"
    ]
  };
  
  const quotes = contextQuotes[context] || motivationalQuotes;
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
}; 