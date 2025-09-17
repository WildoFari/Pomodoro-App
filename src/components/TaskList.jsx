import React, { useState } from 'react';
import { FaClock } from 'react-icons/fa';
import useTasks from '../hooks/useTasks';

export default function TaskList() {
  const {
    activeTasks,
    completedTasks,
    currentTask,
    currentTaskIndex,
    addTask,
    removeTask,
    completeTask,
    incrementPomodoros,
    editTask,
    clearCompleted,
    nextTask,
    previousTask,
    goToTask
  } = useTasks();

  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskPomodoros, setNewTaskPomodoros] = useState(1);
  const [editingTask, setEditingTask] = useState(null);
  const [editText, setEditText] = useState('');
  const [editPomodoros, setEditPomodoros] = useState(1);
  const [showCompleted, setShowCompleted] = useState(false);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTaskText.trim()) {
      addTask(newTaskText, newTaskPomodoros);
      setNewTaskText('');
      setNewTaskPomodoros(1);
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task.id);
    setEditText(task.text);
    setEditPomodoros(task.pomodoroCount);
  };

  const handleSaveEdit = (taskId) => {
    if (editText.trim()) {
      editTask(taskId, editText, editPomodoros);
      setEditingTask(null);
      setEditText('');
      setEditPomodoros(1);
    }
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
    setEditText('');
    setEditPomodoros(1);
  };

  const handleCompletePomodoro = (taskId) => {
    incrementPomodoros(taskId);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-2 sm:p-4 md:p-6 max-w-2xl mx-auto">
      {/* Header compacto para móvil */}
      <div className="flex flex-col gap-2 mb-3 sm:mb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-2xl font-bold text-gray-800">📋 Tareas</h2>
          <div className="flex gap-1 sm:gap-2">
            <button
              onClick={() => setShowCompleted(!showCompleted)}
              className="px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              {showCompleted ? 'Ocultar' : 'Mostrar'}
            </button>
            {completedTasks.length > 0 && (
              <button
                onClick={clearCompleted}
                className="px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Limpiar
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tarea actual destacada - compacta para móvil */}
      {currentTask && (
        <div className="mb-3 sm:mb-6 p-2 sm:p-4 bg-slate-50 border border-slate-200 text-slate-800 rounded-lg shadow-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex-1">
                             <h3 className="text-sm sm:text-lg font-semibold text-slate-700">🎯 Actual</h3>
              <p className="text-xs sm:text-xl break-words">{currentTask.text}</p>
              <p className="text-xs text-slate-600 mt-1 flex items-center gap-1">
                <FaClock className="text-slate-400" />
                {currentTask.completedPomodoros}/{currentTask.pomodoroCount} pomodoros
              </p>
            </div>
            <div className="flex gap-1 sm:gap-2">
              <button
                onClick={() => handleCompletePomodoro(currentTask.id)}
                className="px-2 py-1 sm:px-3 sm:py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors text-xs sm:text-sm"
              >
                +1
              </button>
              <button
                onClick={() => completeTask(currentTask.id)}
                className="px-2 py-1 sm:px-3 sm:py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-xs sm:text-sm"
              >
                ✓
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navegación de tareas - compacta para móvil */}
      {activeTasks.length > 1 && (
        <div className="mb-3 sm:mb-4 flex justify-center">
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={previousTask}
              disabled={currentTaskIndex === 0}
              className="px-2 py-1 sm:px-3 sm:py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50 transition-colors text-xs sm:text-sm"
            >
              ←
            </button>
            <span className="px-2 py-1 sm:px-3 sm:py-2 bg-gray-100 rounded-lg text-xs sm:text-sm">
              {currentTaskIndex + 1}/{activeTasks.length}
            </span>
            <button
              onClick={nextTask}
              disabled={currentTaskIndex === activeTasks.length - 1}
              className="px-2 py-1 sm:px-3 sm:py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50 transition-colors text-xs sm:text-sm"
            >
              →
            </button>
          </div>
        </div>
      )}

      {/* Formulario para agregar tarea - compacto para móvil */}
      <form onSubmit={handleAddTask} className="mb-3 sm:mb-6">
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            placeholder="Nueva tarea..."
            className="flex-1 px-2 py-2 sm:px-3 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black text-sm"
          />
          <select
            value={newTaskPomodoros}
            onChange={(e) => setNewTaskPomodoros(parseInt(e.target.value))}
            className="px-2 py-2 sm:px-3 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black text-xs sm:text-sm"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
          <button
            type="submit"
            className="px-3 py-2 sm:px-4 sm:py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-xs sm:text-sm font-medium"
          >
            +
          </button>
        </div>
      </form>

      {/* Lista de tareas activas - compacta para móvil */}
      <div className="space-y-1 sm:space-y-2 mb-3 sm:mb-4">
        {activeTasks.map((task, index) => (
          <div
            key={task.id}
            className={`p-2 sm:p-3 border rounded-lg ${
              index === currentTaskIndex 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 bg-gray-50'
            }`}
          >
            {editingTask === task.id ? (
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="flex-1 px-2 py-1 sm:py-2 border rounded-lg text-black text-sm"
                />
                <select
                  value={editPomodoros}
                  onChange={(e) => setEditPomodoros(parseInt(e.target.value))}
                  className="px-2 py-1 sm:py-2 border rounded-lg text-black text-sm"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
                <div className="flex gap-1 sm:gap-2">
                  <button
                    onClick={() => handleSaveEdit(task.id)}
                    className="px-2 py-1 sm:px-3 sm:py-2 bg-green-500 text-white rounded-lg text-xs sm:text-sm transition-colors"
                  >
                    ✓
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="px-2 py-1 sm:px-3 sm:py-2 bg-gray-500 text-white rounded-lg text-xs sm:text-sm transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex items-center gap-2 sm:gap-3 flex-1">
                  <button
                    onClick={() => goToTask(index)}
                    className={`px-1.5 py-1 sm:px-2 sm:py-1 rounded text-xs sm:text-sm transition-colors ${
                      index === currentTaskIndex
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                    }`}
                  >
                    {index + 1}
                  </button>
                  <span className="flex-1 break-words text-xs sm:text-base">{task.text}</span>
                  <span className="text-xs text-gray-600 whitespace-nowrap">
                    {task.completedPomodoros}/{task.pomodoroCount}
                  </span>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleCompletePomodoro(task.id)}
                    className="px-1.5 py-1 sm:px-2 sm:py-1 bg-orange-500 text-white rounded text-xs hover:bg-orange-600 transition-colors"
                    title="+1 pomodoro"
                  >
                    +1
                  </button>
                  <button
                    onClick={() => completeTask(task.id)}
                    className="px-1.5 py-1 sm:px-2 sm:py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600 transition-colors"
                    title="Completar"
                  >
                    ✓
                  </button>
                  <button
                    onClick={() => handleEditTask(task)}
                    className="px-1.5 py-1 sm:px-2 sm:py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 transition-colors"
                    title="Editar"
                  >
                    ✎
                  </button>
                  <button
                    onClick={() => removeTask(task.id)}
                    className="px-1.5 py-1 sm:px-2 sm:py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600 transition-colors"
                    title="Eliminar"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lista de tareas completadas - compacta para móvil */}
      {showCompleted && completedTasks.length > 0 && (
        <div className="border-t pt-3 sm:pt-4">
          <h3 className="text-sm sm:text-lg font-semibold mb-2 sm:mb-3 text-gray-700">✅ Completadas</h3>
          <div className="space-y-1 sm:space-y-2">
            {completedTasks.map((task) => (
              <div key={task.id} className="p-2 sm:p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
                  <div className="flex-1">
                    <span className="line-through text-gray-600 text-xs sm:text-base break-words">{task.text}</span>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(task.completedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="text-xs text-green-600 whitespace-nowrap">
                    {task.completedPomodoros} pomodoros
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mensaje cuando no hay tareas - compacto para móvil */}
      {activeTasks.length === 0 && completedTasks.length === 0 && (
        <div className="text-center py-6 sm:py-8 text-gray-500">
          <p className="text-sm sm:text-lg">No hay tareas aún</p>
          <p className="text-xs sm:text-sm">¡Agrega tu primera tarea!</p>
        </div>
      )}
    </div>
  );
}
