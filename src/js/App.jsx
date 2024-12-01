import React, { useState, useEffect } from "react";
import ToDoList from "./components/ToDoList.jsx";

const INITIAL_TASKS = JSON.parse(localStorage.getItem("tasks")) || [];

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(INITIAL_TASKS);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (event) => {
    if (event.key === "Enter" && task.trim()) {
      const newTask = { id: Date.now(), text: task };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      setTask("");
    }
  };

  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const handleClearAll = () => {
    setTasks([]);
  };

  return (
    <div className="App">
      <h1>Mi Lista de Tareas 👨‍💻</h1>
      <input
        type="text"
        placeholder="Añadir tarea..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyDown={handleAddTask}
      />
      <ToDoList tasks={tasks} onDelete={handleDeleteTask} />
      <button className="clear-button" onClick={handleClearAll}>
        Limpiar todas las tareas
      </button>
    </div>
  );
}

export default App;
