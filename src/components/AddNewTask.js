import { useState } from "react";
import "./AddNewTask.css";

const AddNewTask = (props) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");

  const addTaskHandler = () => {
    if (newTaskTitle) {
      props.addTask(props.status, newTaskTitle, newTaskDescription);
      setNewTaskTitle("");
      setNewTaskDescription("");
      props.setIsNewTask(false);
    }
  };

  const onCloseHandler = () => {
    props.setIsNewTask(false);
  };

  return (
    <div className="add-task">
      <input
        type="text"
        placeholder="New Task Title"
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
      />
      <textarea
        placeholder="New Task Description"
        value={newTaskDescription}
        onChange={(e) => setNewTaskDescription(e.target.value)}
      ></textarea>
      <button onClick={addTaskHandler}>Add</button>
      <button onClick={onCloseHandler}>Close</button>
    </div>
  );
};

export default AddNewTask;
