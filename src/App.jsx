import { useState, useEffect } from "react";
import Header from "./components/Header";
import TaskItem from "./components/TaskItem";
import TaskForm from "./components/TaskForm";

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
    <div>


      <Header />

      <TaskForm onAddTask={addTask} />
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setFilter("all")}>
          All
        </button>

        <button onClick={() => setFilter("active")}>
          Active
        </button>

        <button onClick={() => setFilter("completed")}>
          Completed
        </button>
      </div>

      <button onClick={clearCompleted}>
        Clear Completed
      </button>
      <p>Total Tasks: {tasks.length}</p>
      <p>Completed: {completedTasks}</p>
      <p>Remaining: {remainingTasks}</p>



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
            expandedTaskId={expandedTaskId}
            toggleExpand={toggleExpand}
          />
  ))}
      </ul>

    </div>
  );
}

export default App;