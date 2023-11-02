import { useEffect, useState, useRef } from "react";

import "./StatusColumn.css";
import TaskCard from "./TaskCard";
import AddNewTask from "./AddNewTask";

const StatusColumn = (props) => {
  const [isNewTask, setIsNewTask] = useState(false);
  const [selectedValue, setSelectedValue] = useState(
    "rgba(227, 226, 224, 0.5)"
  );
  const [isMenu, setIsMenu] = useState(false);

  const menuRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [isMenu]);

  const handleOptionChange = (event) => {
    setSelectedValue(event.target.value);
  };
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

  const dropDownHandler = () => {
    setIsMenu((prevState) => !prevState);
  };

  return (
    <div className="status-column" onDragOver={allowDrop} onDrop={handleDrop}>
      <div className="status-header">
        <span>
          <h2 style={{ backgroundColor: selectedValue }}>{props.title}</h2>
          <p>{props.tasks.length}</p>
        </span>
        <div className="dropdown-menu" ref={menuRef}>
          <span onClick={dropDownHandler} className="material-symbols-outlined">
            more_horiz
          </span>
          {isMenu && (
            <select
              size="11"
              value={selectedValue}
              onChange={handleOptionChange}
            >
              <option className="empty-option" value={null}></option>
              <option value="" onClick={() => props.deleteStatus(props.title)}>Delete Status</option>
              <hr className="break-line"/>
              <option value="rgb(227, 226, 224)">Gray</option>
              <option value="rgb(238, 224, 218)">Brown</option>
              <option value="rgb(250, 222, 201)">Orange</option>
              <option value="rgb(253, 236, 200)">Yellow</option>
              <option value="rgb(219, 237, 219)">Green</option>
              <option value="rgb(211, 229, 239)">Blue</option>
              <option value="rgb(232, 222, 238)">Purple</option>
              <option value="rgb(245, 224, 233)">Pink</option>
              <option value="rgb(255, 226, 221)">Red</option>
            </select>
          )}
        </div>
      </div>
      <div className="task-list">
        {props.tasks.map((task) => (
          <TaskCard key={task.id} task={task} onTaskClick={props.onTaskClick} />
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
