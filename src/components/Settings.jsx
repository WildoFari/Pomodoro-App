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
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <form className="bg-white p-6 rounded shadow-md flex flex-col gap-4 min-w-[300px]" onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-2 text-black">Configuración de Tiempos</h2>
        <label className="text-black">
          Pomodoro (min):
          <input type="number" name="pomodoro" min="1" max="60" value={form.pomodoro} onChange={handleChange} className="ml-2 border rounded px-2 py-1 w-16 text-black" />
        </label>
        <label className="text-black">
          Descanso corto (min):
          <input type="number" name="shortBreak" min="1" max="30" value={form.shortBreak} onChange={handleChange} className="ml-2 border rounded px-2 py-1 w-16 text-black" />
        </label>
        <label className="text-black">
          Descanso largo (min):
          <input type="number" name="longBreak" min="1" max="60" value={form.longBreak} onChange={handleChange} className="ml-2 border rounded px-2 py-1 w-16 text-black" />
        </label>
        <div className="flex gap-2 justify-end mt-4">
          <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">Cancelar</button>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Guardar</button>
        </div>
      </form>
    </div>
  );
}
