import React, { createContext, useContext, useState } from 'react';

const PomodoroContext = createContext();

export function PomodoroProvider({ children }) {
  const [durations, setDurations] = useState({
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
  });

  const updateDurations = (newDurations) => {
    setDurations((prev) => ({ ...prev, ...newDurations }));
  };

  return (
    <PomodoroContext.Provider value={{ durations, updateDurations }}>
      {children}
    </PomodoroContext.Provider>
  );
}

export function usePomodoroConfig() {
  return useContext(PomodoroContext);
}
