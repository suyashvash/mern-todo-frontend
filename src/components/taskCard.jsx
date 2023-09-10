import "./index.css";

export default function TaskCard(props) {
  const task = props.task;

  const onTap = () => {
    window.location.href = `/detail?${task._id}`;
  }

  return (
    <div className="task-card" onClick={onTap}>
      <span className="task-title">{props.title}</span>
      <span className="task-assign">Assigned To - {props.assign}</span>
      <span className={"task-priority" + " " + task.priority.toLowerCase()}>{task.priority} Priority</span>
    </div>
  );
}
