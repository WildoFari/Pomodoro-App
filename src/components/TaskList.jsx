import React, { useState } from 'react';
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
    moveTask,
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
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">📋 Lista de Tareas</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setShowCompleted(!showCompleted)}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {showCompleted ? 'Ocultar' : 'Mostrar'} Completadas
          </button>
          {completedTasks.length > 0 && (
            <button
              onClick={clearCompleted}
              className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
            >
              Limpiar
            </button>
          )}
        </div>
      </div>

      {/* Tarea actual destacada */}
      {currentTask && (
        <div className="mb-6 p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">🎯 Tarea Actual</h3>
              <p className="text-xl">{currentTask.text}</p>
              <p className="text-sm opacity-90">
                Pomodoros: {currentTask.completedPomodoros}/{currentTask.pomodoroCount}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleCompletePomodoro(currentTask.id)}
                className="px-3 py-1 bg-white text-blue-600 rounded hover:bg-gray-100"
              >
                +1 Pomodoro
              </button>
              <button
                onClick={() => completeTask(currentTask.id)}
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Completar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navegación de tareas */}
      {activeTasks.length > 1 && (
        <div className="mb-4 flex justify-center gap-2">
          <button
            onClick={previousTask}
            disabled={currentTaskIndex === 0}
            className="px-3 py-1 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
          >
            ← Anterior
          </button>
          <span className="px-3 py-1 bg-gray-100 rounded">
            {currentTaskIndex + 1} de {activeTasks.length}
          </span>
          <button
            onClick={nextTask}
            disabled={currentTaskIndex === activeTasks.length - 1}
            className="px-3 py-1 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
          >
            Siguiente →
          </button>
        </div>
      )}

      {/* Formulario para agregar tarea */}
      <form onSubmit={handleAddTask} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            placeholder="¿Qué necesitas hacer?"
            className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
          <select
            value={newTaskPomodoros}
            onChange={(e) => setNewTaskPomodoros(parseInt(e.target.value))}
            className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
              <option key={num} value={num}>{num} pomodoro{num > 1 ? 's' : ''}</option>
            ))}
          </select>
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Agregar
          </button>
        </div>
      </form>

      {/* Lista de tareas activas */}
      <div className="space-y-2 mb-4">
        {activeTasks.map((task, index) => (
          <div
            key={task.id}
            className={`p-3 border rounded-lg ${
              index === currentTaskIndex 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 bg-gray-50'
            }`}
          >
            {editingTask === task.id ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="flex-1 px-2 py-1 border rounded text-black"
                />
                <select
                  value={editPomodoros}
                  onChange={(e) => setEditPomodoros(parseInt(e.target.value))}
                  className="px-2 py-1 border rounded text-black"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
                <button
                  onClick={() => handleSaveEdit(task.id)}
                  className="px-2 py-1 bg-green-500 text-white rounded text-sm"
                >
                  ✓
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="px-2 py-1 bg-gray-500 text-white rounded text-sm"
                >
                  ✕
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => goToTask(index)}
                    className={`px-2 py-1 rounded text-sm ${
                      index === currentTaskIndex
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                    }`}
                  >
                    {index + 1}
                  </button>
                  <span className="flex-1">{task.text}</span>
                  <span className="text-sm text-gray-600">
                    {task.completedPomodoros}/{task.pomodoroCount} 🍅
                  </span>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleCompletePomodoro(task.id)}
                    className="px-2 py-1 bg-orange-500 text-white rounded text-sm hover:bg-orange-600"
                    title="Completar pomodoro"
                  >
                    +1
                  </button>
                  <button
                    onClick={() => completeTask(task.id)}
                    className="px-2 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
                    title="Completar tarea"
                  >
                    ✓
                  </button>
                  <button
                    onClick={() => handleEditTask(task)}
                    className="px-2 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                    title="Editar"
                  >
                    ✎
                  </button>
                  <button
                    onClick={() => removeTask(task.id)}
                    className="px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
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

      {/* Lista de tareas completadas */}
      {showCompleted && completedTasks.length > 0 && (
        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold mb-3 text-gray-700">✅ Tareas Completadas</h3>
          <div className="space-y-2">
            {completedTasks.map((task) => (
              <div key={task.id} className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="line-through text-gray-600">{task.text}</span>
                    <p className="text-sm text-gray-500">
                      Completada: {new Date(task.completedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="text-sm text-green-600">
                    {task.completedPomodoros} pomodoro{task.completedPomodoros > 1 ? 's' : ''}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mensaje cuando no hay tareas */}
      {activeTasks.length === 0 && completedTasks.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p className="text-lg">No hay tareas aún</p>
          <p className="text-sm">¡Agrega tu primera tarea para comenzar!</p>
        </div>
      )}
    </div>
  );
}
