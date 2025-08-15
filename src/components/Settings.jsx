import React, { useState } from 'react';
import { usePomodoroConfig } from '../context/PomodoroContext';

export default function Settings({ onClose }) {
  const { durations, updateDurations } = usePomodoroConfig();
  const [form, setForm] = useState(durations);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: Number(value) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateDurations(form);
    if (onClose) onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <form className="bg-white p-4 sm:p-6 rounded-lg shadow-xl flex flex-col gap-4 w-full max-w-sm mx-auto" onSubmit={handleSubmit}>
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">⚙️ Configuración</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Pomodoro (minutos)
            </label>
            <input 
              type="number" 
              name="pomodoro" 
              min="1" 
              max="60" 
              value={form.pomodoro} 
              onChange={handleChange} 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 text-sm"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Descanso corto (minutos)
            </label>
            <input 
              type="number" 
              name="shortBreak" 
              min="1" 
              max="30" 
              value={form.shortBreak} 
              onChange={handleChange} 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 text-sm"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Descanso largo (minutos)
            </label>
            <input 
              type="number" 
              name="longBreak" 
              min="1" 
              max="60" 
              value={form.longBreak} 
              onChange={handleChange} 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 text-sm"
            />
          </div>
        </div>
        
        <div className="flex gap-3 pt-2">
          <button 
            type="button" 
            onClick={onClose} 
            className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors text-sm font-medium"
          >
            Cancelar
          </button>
          <button 
            type="submit" 
            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}
