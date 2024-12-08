import React, { useState, useEffect } from "react";
import "../styles/index.css";
import ToDoList from "./components/ToDoList";

const BASE_URL = "https://playground.4geeks.com/todo";
const USER_URL = `${BASE_URL}/users/DragonBall`;
const TODOS_URL = `${BASE_URL}/todos/DragonBall`;

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const initializeUser = async () => {
    try {
      const response = await fetch(USER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("Usuario inicializado exitosamente.");
      } else {
        console.error("Error al inicializar el usuario.");
      }
    } catch (error) {
      console.error("Error al inicializar el usuario:", error);
    }
  };


  const fetchTasks = async () => {
    try {
      const response = await fetch(USER_URL);
      const data = await response.json();
      setTasks(data.todos || []);
    } catch (error) {
      console.error("Error al obtener las tareas:", error);
    }
  };

  const addTask = async () => {
    if (newTask.trim() === "") return;

    const newTaskData = {
      label: newTask,
      is_done: false,
    };

    try {
      const response = await fetch(TODOS_URL, {
        method: "POST",
        body: JSON.stringify(newTaskData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setTasks((prevTasks) => [...prevTasks, newTaskData]);
        setNewTask("");
      } else {
        console.error("Error al agregar la tarea.");
      }
    } catch (error) {
      console.error("Error al agregar la tarea:", error);
    }
  };

  const updateTask = async (id, updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? updatedTask : task
    );

    try {
      const response = await fetch(`${BASE_URL}/todos/${id}`, {
        method: "PUT",
        body: JSON.stringify(updatedTask),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setTasks(updatedTasks);
      } else {
        console.error("Error al actualizar la tarea.");
      }
    } catch (error) {
      console.error("Error al actualizar la tarea:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/todos/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      } else {
        console.error("Error al eliminar la tarea.");
      }
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
    }
  };

  useEffect(() => {
    initializeUser().then(fetchTasks);
  }, []);

  return (
    <div className="App">
      <h1>Mi Lista de Tareas 📝🟠🐉🉐✪</h1>
      <input
        type="text"
        placeholder="Añadir tarea..."
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") addTask();
        }}
      />
      <ToDoList tasks={tasks} onDelete={deleteTask} onUpdate={updateTask} />
      <button className="clear-button" onClick={() => setTasks([])}>
        Limpiar todas las tareas 🧹
      </button>
    </div>
  );
}

export default App;
