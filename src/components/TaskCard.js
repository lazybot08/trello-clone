import "./TaskCard.css";

const TaskCard = (props) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("taskId", props.task.id);
  };

  return (
    <div
      className="task-card"
      onDragStart={handleDragStart}
      draggable="true"
      onClick={() => {
        props.onTaskClick(props.task);
        console.log("Task clicked:", props.task.id);
      }}
    >
      <p>{props.task.title}</p>
    </div>
  );
}

export default TaskCard;
