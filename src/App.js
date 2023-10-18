import { useState, useEffect } from "react";
import "./App.css";
import StatusColumn from "./components/StatusColumn";
import TaskDetail from "./components/TaskDetail";

import { v4 as uuidv4 } from 'uuid';

const App = () => {
  const [statuses, setStatuses] = useState(["Not Started", "In Progress", "Completed"]);
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  const saveTask = (updatedTasks) => {
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  };

  const addTask = (status, title, description) => {
    const newTask = {
      id: uuidv4(),
      title,
      description,
      status,
    };
    saveTask([...tasks, newTask]);
  };

  const editTask = (taskId, title, description, status) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, title, description, status };
      }
      return task;
    });
    saveTask(updatedTasks);
  };  

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    saveTask(updatedTasks);
    setSelectedTask(null);
  };

  const onTaskMove = (taskId, newStatus) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    saveTask(updatedTasks);
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  const addStatus = () => {
    const newStatus = prompt("Enter a new status:");
    if (newStatus) {
      setStatuses([...statuses, newStatus]);
    }
  };

  return (
    <div className="App">
      <h1>Trello Clone</h1>
      {!selectedTask && <button onClick={addStatus}>Add New Status</button>}
      {!selectedTask && <div className="status-columns">
        {statuses.map((status) => (
          <StatusColumn
            key={status}
            title={status}
            tasks={tasks.filter((task) => task.status === status)}
            onTaskMove={onTaskMove}
            addTask={addTask}
            onTaskClick={handleTaskClick}
          />
        ))}
      </div>}
      {selectedTask && (
        <TaskDetail
          statuses={statuses}
          task={selectedTask}
          editTask={editTask}
          deleteTask={deleteTask}
          onClose={() => setSelectedTask(null)}
        />
      )}
    </div>
  );
}

export default App;
