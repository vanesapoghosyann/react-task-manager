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
      id: Date.now(),
      text: taskText,
      completed: false,
    };

    setTasks([...tasks, newTask]);
  };

  const deleteTask = (indexToDelete) => {
    const updatedTasks = tasks.filter((task, index) => index !== indexToDelete);

    setTasks(updatedTasks);
  };

  const clearCompleted = () => {
    const activeTasks = tasks.filter((task) => !task.completed);
    setTasks(activeTasks);
  };

  const toggleComplete = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index
        ? { ...task, completed: !task.completed }
        : task
    );

    setTasks(updatedTasks);
  };

  const startEditing = (task) => {
    setEditingId(task.id);
    setEditingText(task.text);
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const remainingTasks = tasks.length - completedTasks;


  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");


  const saveTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? { ...task, text: editingText }
        : task
    );

    setTasks(updatedTasks);
    setEditingId(null);
    setEditingText("");
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);


  return (
    <div>
      <Header />

      <TaskForm onAddTask={addTask} />
      <button onClick={clearCompleted}>
        Clear Completed
      </button>
      <p>Total Tasks: {tasks.length}</p>
      <p>Completed: {completedTasks}</p>
      <p>Remaining: {remainingTasks}</p>



      <ul>
        {tasks.map((task, index) => (
          <li key={task.id}>
            {editingId === task.id ? (
              <>
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />

                <button onClick={() => saveTask(task.id)}>
                  Save
                </button>
              </>
            ) : (
              <>
                <span
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                    marginRight: "10px",
                  }}
                >
                  {task.text}
                </span>

                <button onClick={() => startEditing(task)}>
                  Edit
                </button>

                <button onClick={() => toggleComplete(index)}>
                  {task.completed ? "Undo" : "Complete"}
                </button>

                <button onClick={() => deleteTask(index)}>
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;