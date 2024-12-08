import React from "react";

const ToDoList = ({ tasks, onDelete, onUpdate }) => {
  const handleCheck = (task) => {
    const updatedTask = { ...task, is_done: !task.is_done };
    onUpdate(task.id, updatedTask);
  };

  return (
    <ul>
      {tasks.length === 0 ? (
        <li className="empty-list">No hay tareas, añadir tareas</li>
      ) : (
        tasks.map((task) => (
          <li key={task.id} className={`task-item ${task.is_done ? "done" : ""}`}>
            <span onClick={() => handleCheck(task)}>{task.label}</span>
            <button
              className="delete-button"
              onClick={() => onDelete(task.id)}
            >
              🗑️
            </button>
          </li>
        ))
      )}
    </ul>
  );
};

export default ToDoList;
