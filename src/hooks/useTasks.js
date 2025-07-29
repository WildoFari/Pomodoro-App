import { useState, useEffect } from 'react';

// Estructura de una tarea
const createTask = (text, pomodoroCount = 1) => ({
  id: Date.now() + Math.random(),
  text,
  completed: false,
  pomodoroCount, // Cuántos pomodoros estima que tomará
  completedPomodoros: 0, // Cuántos pomodoros ha completado
  createdAt: new Date().toISOString(),
  completedAt: null
});

export default function useTasks() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('pomodoro-tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);

  // Guardar tareas en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem('pomodoro-tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Agregar nueva tarea
  const addTask = (text, pomodoroCount = 1) => {
    if (text.trim()) {
      const newTask = createTask(text.trim(), pomodoroCount);
      setTasks(prev => [...prev, newTask]);
    }
  };

  // Eliminar tarea
  const removeTask = (taskId) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
    // Ajustar el índice actual si es necesario
    setCurrentTaskIndex(prev => {
      if (prev >= tasks.length - 1) {
        return Math.max(0, tasks.length - 2);
      }
      return prev;
    });
  };

  // Marcar tarea como completada
  const completeTask = (taskId) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, completed: true, completedAt: new Date().toISOString() }
        : task
    ));
  };

  // Incrementar pomodoros completados
  const incrementPomodoros = (taskId) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, completedPomodoros: task.completedPomodoros + 1 }
        : task
    ));
  };

  // Editar tarea
  const editTask = (taskId, newText, newPomodoroCount) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, text: newText, pomodoroCount: newPomodoroCount }
        : task
    ));
  };

  // Mover tarea arriba/abajo
  const moveTask = (taskId, direction) => {
    setTasks(prev => {
      const newTasks = [...prev];
      const currentIndex = newTasks.findIndex(task => task.id === taskId);
      
      if (direction === 'up' && currentIndex > 0) {
        [newTasks[currentIndex], newTasks[currentIndex - 1]] = 
        [newTasks[currentIndex - 1], newTasks[currentIndex]];
      } else if (direction === 'down' && currentIndex < newTasks.length - 1) {
        [newTasks[currentIndex], newTasks[currentIndex + 1]] = 
        [newTasks[currentIndex + 1], newTasks[currentIndex]];
      }
      
      return newTasks;
    });
  };

  // Limpiar tareas completadas
  const clearCompleted = () => {
    setTasks(prev => prev.filter(task => !task.completed));
  };

  // Obtener tareas activas (no completadas)
  const activeTasks = tasks.filter(task => !task.completed);
  
  // Obtener tareas completadas
  const completedTasks = tasks.filter(task => task.completed);

  // Obtener la tarea actual
  const currentTask = activeTasks[currentTaskIndex] || null;

  // Ir a la siguiente tarea
  const nextTask = () => {
    if (currentTaskIndex < activeTasks.length - 1) {
      setCurrentTaskIndex(prev => prev + 1);
    }
  };

  // Ir a la tarea anterior
  const previousTask = () => {
    if (currentTaskIndex > 0) {
      setCurrentTaskIndex(prev => prev - 1);
    }
  };

  // Ir a una tarea específica
  const goToTask = (index) => {
    if (index >= 0 && index < activeTasks.length) {
      setCurrentTaskIndex(index);
    }
  };

  return {
    tasks,
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
    goToTask,
    setCurrentTaskIndex
  };
}
