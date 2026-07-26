import { useState, useEffect } from "react";
import Header from "./components/Header";
import TaskItem from "./components/TaskItem";
import TaskForm from "./components/TaskForm";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");

    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(
      (task) => task.id !== id
    );

    setTasks(updatedTasks);
  };

  const clearCompleted = () => {
    const activeTasks = tasks.filter((task) => !task.completed);
    setTasks(activeTasks);
  };

  const toggleComplete = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? { ...task, completed: !task.completed }
        : task
    );

    setTasks(updatedTasks);
  };

  const startEditing = (task) => {
    setEditingId(task.id);
    setEditingText(task.text);
  };

  const [expandedTaskId, setExpandedTaskId] = useState(null);

  const toggleExpand = (id) => {
    if (expandedTaskId === id) {
      setExpandedTaskId(null);
    } else {
      setExpandedTaskId(id);
    }
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


  const [filter, setFilter] = useState("all");

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") {
      return !task.completed;
    }

    if (filter === "completed") {
      return task.completed;
    }

    return true;
  });


  return (
    <div className="app">


      <Header />

      <TaskForm onAddTask={addTask} />
      <div className="filter-buttons">

  <button
    className={filter === "all" ? "active-filter" : ""}
    onClick={() => setFilter("all")}
  >
    All
  </button>


  <button
    className={filter === "active" ? "active-filter" : ""}
    onClick={() => setFilter("active")}
  >
    Active
  </button>


  <button
    className={filter === "completed" ? "active-filter" : ""}
    onClick={() => setFilter("completed")}
  >
    Completed
  </button>
<button 
  className="clear-btn"
  onClick={clearCompleted}
>
  Clear Completed
</button>
</div>

      <div className="stats-container">

  <div className="stat-card">
    <span>📋</span>
    <h2>{tasks.length}</h2>
    <p>Total Tasks</p>
  </div>


  <div className="stat-card">
    <span>✅</span>
    <h2>{completedTasks}</h2>
    <p>Completed</p>
  </div>


  <div className="stat-card">
    <span>⏳</span>
    <h2>{remainingTasks}</h2>
    <p>Remaining</p>
  </div>

</div>



      {filteredTasks.length === 0 ? (
  <div className="empty-state">

    <div className="empty-icon">
      📋
    </div>

    <h3>No tasks yet</h3>

    <p>
      Add your first task above
    </p>

  </div>
) : (
  <ul>
    {filteredTasks.map((task, index) => (
      <TaskItem
        key={task.id}
        task={task}
        index={index}
        editingId={editingId}
        editingText={editingText}
        setEditingText={setEditingText}
        startEditing={startEditing}
        saveTask={saveTask}
        toggleComplete={toggleComplete}
        deleteTask={deleteTask}
      />
    ))}
  </ul>
)}

    </div>
  );
}

export default App;