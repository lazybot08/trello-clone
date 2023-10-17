import { useState } from "react";

import "./StatusColumn.css";
import TaskCard from "./TaskCard";
import AddNewTask from "./AddNewTask";

const StatusColumn = (props) => {
  const [isNewTask, setIsNewTask] = useState(false);
  const allowDrop = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    props.onTaskMove(taskId, props.title);
  };

  const newTaskClickHandler = () => {
    setIsNewTask(true);
  };

  return (
    <div className="status-column" onDragOver={allowDrop} onDrop={handleDrop}>
      <div className="status-header">
        <span>
          <h2>{props.title} :</h2>
          <p>{props.tasks.length}</p>
        </span>
        <span className="material-symbols-outlined">more_horiz</span>
      </div>
      <div className="task-list">
        {props.tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onTaskClick={props.onTaskClick}
          />
        ))}
        {!isNewTask && <button onClick={newTaskClickHandler}>New</button>}
        {isNewTask && (
          <AddNewTask
            setIsNewTask={setIsNewTask}
            status={props.title}
            addTask={props.addTask}
          />
        )}
      </div>
    </div>
  );
};

export default StatusColumn;
