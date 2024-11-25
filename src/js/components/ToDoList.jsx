import React from "react";

const ToDoList = ({ tasks, onDelete }) => {
  return (
    <ul>
      {tasks.length === 0 ? (
        <li className="empty-list">No hay tareas, añadir tareas</li>
      ) : (
        tasks.map((task) => (
          <li key={task.id} className="task-item">
            {task.text}
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
