import React, { useState, useEffect } from "react";
import ToDoList from "./components/ToDoList";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(() => {
  
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (event) => {
    if (event.key === "Enter" && task.trim()) {
      setTasks([...tasks, { id: Date.now(), text: task }]);
      setTask("");
    }
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="App">
      <h1>Mi Lista de Tareas 👨‍💻</h1>
      <input
        type="text"
        placeholder="Añadir tarea... ✔️"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyDown={handleAddTask}
      />
      <ToDoList tasks={tasks} onDelete={handleDeleteTask} />
    </div>
  );
}

export default App;
