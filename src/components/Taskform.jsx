import { useState } from "react";

function TaskForm({ onAddTask }) {
  const [inputValue, setInputValue] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
  e.preventDefault();

  if (inputValue.trim() === "") return;

  const newTask = {
    id: Date.now(),
    text: inputValue,
    completed: false,
    priority,
    dueDate,
  };

  onAddTask(newTask);

  setInputValue("");
  setPriority("Medium");
  setDueDate("");
};

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter a task..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <button type="submit">
        Add
      </button>
    </form>
  );
}

export default TaskForm;