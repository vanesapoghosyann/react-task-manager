import { useState, useEffect } from "react";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";

function App() {
  const [tasks, setTasks] = useState(() => {
  const savedTasks = localStorage.getItem("tasks");

  return savedTasks ? JSON.parse(savedTasks) : [];
});

  const addTask = (taskText) => {
    const newTask = {
      text: taskText,
      completed: false,
    };

    setTasks([...tasks, newTask]);
  };

  const deleteTask = (indexToDelete) => {
    const updatedTasks = tasks.filter((task, index) => index !== indexToDelete);

    setTasks(updatedTasks);
  };


  const toggleComplete = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index
        ? { ...task, completed: !task.completed }
        : task
    );

    setTasks(updatedTasks);
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const remainingTasks = tasks.length - completedTasks;

useEffect(() => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}, [tasks]);


  return (
    <div>
      <Header />

      <TaskForm onAddTask={addTask} />

      <p>Total Tasks: {tasks.length}</p>
      <p>Completed: {completedTasks}</p>
      <p>Remaining: {remainingTasks}</p>

      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
                marginRight: "10px",
              }}
            >
              {task.text}
            </span>

            <button onClick={() => toggleComplete(index)}>
              {task.completed ? "Undo" : "Complete"}
            </button>

            <button onClick={() => deleteTask(index)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;