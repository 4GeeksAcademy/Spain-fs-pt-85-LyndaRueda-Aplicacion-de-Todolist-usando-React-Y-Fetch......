import React, { useState, useEffect } from "react";
import "../styles/index.css";

const API_URL = "https://jsonplaceholder.typicode.com/todos";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const fetchTasks = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error al obtener las tareas:", error);
    }
  };

  const addTask = async () => {
    if (newTask.trim() === "") return;

    const newTaskData = {
      title: newTask,
      completed: false,
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(newTaskData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setTasks((prevTasks) => [...prevTasks, data]);
      setNewTask("");
    } catch (error) {
      console.error("Error al agregar la tarea:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="App">
      <h1>Mi Lista de Tareas 📝</h1>
      <input
        type="text"
        placeholder="Añadir tarea..."
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") addTask();
        }}
      />
      <ul>
        {tasks.length === 0 ? (
          <li className="empty-list">No hay tareas aún...❌</li>
        ) : (
          tasks.map((task) => (
            <li key={task.id} className="task-item">
              <span>{task.title}</span>
              <button
                className="delete-button"
                onClick={() => deleteTask(task.id)}
              >
                🗑️
              </button>
            </li>
          ))
        )}
      </ul>
      <button className="clear-button" onClick={() => setTasks([])}>
        Limpiar todas las tareas 🧹
      </button>
    </div>
  );
}

export default App;
