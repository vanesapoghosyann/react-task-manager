import { useState } from "react";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";

function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (taskText) => {
    setTasks([...tasks, taskText]);
  };

  return (
    <div>
      <Header />

      <TaskForm onAddTask={addTask} />

      <h2>Tasks: {tasks.length}</h2>

      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;