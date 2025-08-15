import React, { useState, useEffect } from 'react';
import { getRandomQuote, getQuoteByContext } from '../utils/motivationalQuotes';

const MotivationalQuote = ({ context, className = "", showEmoji = true, autoChange = true, changeInterval = 10000, textColor = "text-gray-700" }) => {
  const [quote, setQuote] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const updateQuote = () => {
    setIsVisible(false);
    setTimeout(() => {
      const newQuote = context ? getQuoteByContext(context) : getRandomQuote();
      setQuote(newQuote);
      setIsVisible(true);
    }, 300);
  };

  useEffect(() => {
    updateQuote();
  }, [context]);

  useEffect(() => {
    if (!autoChange) return;

    const interval = setInterval(updateQuote, changeInterval);
    return () => clearInterval(interval);
  }, [autoChange, changeInterval, context]);

  // Separar el emoji del texto
  const getQuoteParts = (quoteText) => {
    // Buscar emoji al final de la frase
    const emojiMatch = quoteText.match(/^(.+?)\s+([^\s]+)$/);
    if (emojiMatch && showEmoji) {
      const text = emojiMatch[1].trim();
      const emoji = emojiMatch[2].trim();
      // Verificar si el último elemento es realmente un emoji
      if (emoji.length <= 4 && /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u.test(emoji)) {
        return { emoji, text };
      }
    }
    return {
      emoji: null,
      text: quoteText
    };
  };

  const { emoji, text } = getQuoteParts(quote);

  return (
    <div className={`text-center ${className}`}>
      <div 
        className={`transition-all duration-500 ease-in-out ${
          isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-2'
        }`}
      >
        {showEmoji && emoji && (
          <div className="text-xl sm:text-2xl md:text-3xl mb-2 sm:mb-3 animate-pulse">
            {emoji}
          </div>
        )}
        <p className={`text-xs sm:text-sm md:text-base lg:text-lg font-medium leading-relaxed italic ${textColor} px-2`}>
          "{text}"
        </p>
        {showEmoji && emoji && (
          <div className="text-base sm:text-lg md:text-xl mt-1 sm:mt-2 opacity-60">
            {emoji}
          </div>
        )}
      </div>
    </div>
  );
};

export default MotivationalQuote; 