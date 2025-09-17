import React, { useState, useEffect, useCallback } from 'react';
import { getRandomQuote, getQuoteByContext } from '../utils/motivationalQuotes';
import * as LucideIcons from 'lucide-react';

const MotivationalQuote = ({ context, className = "", showIcon = true, autoChange = true, changeInterval = 10000, textColor = "text-gray-700" }) => {
  const [quote, setQuote] = useState({ text: '', icon: null });
  const [isVisible, setIsVisible] = useState(false);

  const updateQuote = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      const newQuote = context ? getQuoteByContext(context) : getRandomQuote();
      setQuote(newQuote);
      setIsVisible(true);
    }, 300);
  }, [context]);

  useEffect(() => {
    updateQuote();
  }, [updateQuote]);

  useEffect(() => {
    if (!autoChange) return;

    const interval = setInterval(updateQuote, changeInterval);
    return () => clearInterval(interval);
  }, [autoChange, changeInterval, updateQuote]);

  // Obtener el componente de icono de Lucide
  const getIconComponent = (iconName) => {
    if (!iconName || !LucideIcons[iconName]) return null;
    return LucideIcons[iconName];
  };

  const IconComponent = getIconComponent(quote.icon);

  return (
    <div className={`text-center ${className}`}>
      <div 
        className={`transition-all duration-500 ease-in-out ${
          isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-2'
        }`}
      >
        {showIcon && IconComponent && (
          <div className="flex justify-center mb-2 sm:mb-3">
            <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-blue-500 animate-pulse" />
          </div>
        )}
        <p className={`text-xs sm:text-sm md:text-base lg:text-lg font-medium leading-relaxed italic ${textColor} px-2`}>
          "{quote.text}"
        </p>
        {showIcon && IconComponent && (
          <div className="flex justify-center mt-1 sm:mt-2 opacity-60">
            <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-blue-500" />
          </div>
        )}
      </div>
    </div>
  );
};

export default MotivationalQuote; 