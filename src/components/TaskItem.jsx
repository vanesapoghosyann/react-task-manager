function formatDueDate(date) {
  if (!date) return "No date";

  const today = new Date();
  const due = new Date(date);

  today.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);

  const difference =
    (due - today) / (1000 * 60 * 60 * 24);

  if (difference === 0) {
    return "📅 Today";
  }

  if (difference === 1) {
    return "📅 Tomorrow";
  }

  if (difference < 0) {
    return "⚠ Overdue";
  }

  return `📅 ${due.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })}`;
}


function TaskItem({
  task,
  index,
  editingId,
  editingText,
  setEditingText,
  startEditing,
  saveTask,
  toggleComplete,
  deleteTask,
  expandedTaskId,
  toggleExpand
}) {
  return (
    <li className={`task-card ${
    task.completed ? "completed-task" : ""
  }`}>
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
          <div style={{ marginBottom: "15px" }}>
            <h3 className="task-title"
              style={{
                cursor: task.completed ? "pointer" : "default",
                color: task.completed ? "green" : "black",
              }}
              onClick={() => {
                if (task.completed) {
                  toggleExpand(task.id);
                }
              }}
            >
              {task.completed ? "✅ " : ""}
              {task.text}
            </h3>

            {!task.completed && (
              <>
                <p>
                  Priority:{" "}
                  <span
                    style={{
                      color:
                        task.priority === "High"
                          ? "red"
                          : task.priority === "Medium"
                            ? "orange"
                            : "green",

                      fontWeight: "bold",
                    }}
                  >
                    {task.priority === "High"
                      ? "🔴 High"
                      : task.priority === "Medium"
                        ? "🟡 Medium"
                        : "🟢 Low"}
                  </span>
                </p>

                <p
                  style={{
                    color: formatDueDate(task.dueDate).includes("Overdue")
                      ? "red"
                      : "black",
                    fontWeight: "bold",
                  }}
                >
                  {formatDueDate(task.dueDate)}
                </p>
              </>
            )}

            {task.completed && expandedTaskId === task.id && (
              <>
                <p>
                  Status: ✅ Completed
                </p>

                <p>
                  Priority:{" "}
                  <span
                    style={{
                      color:
                        task.priority === "High"
                          ? "red"
                          : task.priority === "Medium"
                            ? "orange"
                            : "green",
                      fontWeight: "bold",
                    }}
                  >
                    {task.priority === "High"
                      ? "🔴 High"
                      : task.priority === "Medium"
                        ? "🟡 Medium"
                        : "🟢 Low"}
                  </span>
                </p>

                <p
                  style={{
                    color: formatDueDate(task.dueDate).includes("Overdue")
                      ? "red"
                      : "black",
                    fontWeight: "bold",
                  }}
                >
                  {formatDueDate(task.dueDate)}
                </p>
              </>
            )}
          </div>

          <button className="edit-btn" onClick={() => startEditing(task)}>
            Edit
          </button>

          <button className="complete-btn" onClick={() => toggleComplete(task.id)}>
            {task.completed ? "Undo" : "Complete"}
          </button>

          <button className="delete-btn" onClick={() => deleteTask(task.id)}>
            Delete
          </button>
        </>
      )}
    </li>
  );
}

export default TaskItem;