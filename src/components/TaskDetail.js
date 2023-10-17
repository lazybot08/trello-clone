import { useState, useEffect } from "react";
import "./TaskDetail.css";

const TaskDetail = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(props.task.title);
  const [editedDescription, setEditedDescription] = useState(
    props.task.description
  );
  const [selectedStatus, setSelectedStatus] = useState(props.task.status);

  useEffect(() => {
    setEditedTitle(props.task.title);
    setEditedDescription(props.task.description);
    setSelectedStatus(props.task.status);
  }, [props.task]);

  const handleEdit = () => {
    if (isEditing) {
      props.editTask(
        props.task.id,
        editedTitle,
        editedDescription,
        selectedStatus
      );
    }
    setIsEditing(!isEditing);
  };

  const statusChangeHandler = (newStatus) => {
    setSelectedStatus(newStatus);
  };

  return (
    <div className="task-detail">
      <h2>Task Detail</h2>
      <label>Title:</label>
      <input
        type="text"
        value={editedTitle}
        onChange={(e) => setEditedTitle(e.target.value)}
        disabled={!isEditing}
      />
      <label>Description:</label>
      <textarea
        value={editedDescription}
        onChange={(e) => setEditedDescription(e.target.value)}
        disabled={!isEditing}
      ></textarea>

      <div className="task-status">
        <label>Status:</label>
        <select
          value={selectedStatus}
          onChange={(e) => statusChangeHandler(e.target.value)}
          disabled={!isEditing}
        >
          {props.statuses.map((status) => {
            return <option value={status}>{status}</option>
          })}
        </select>
      </div>

      <button onClick={handleEdit}>{isEditing ? "Save" : "Edit"}</button>
      <button onClick={() => props.deleteTask(props.task.id)}>
        Delete Task
      </button>
      <button onClick={props.onClose}>Close</button>
    </div>
  );
};

export default TaskDetail;
