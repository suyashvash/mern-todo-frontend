import Button from "react-bootstrap/Button";
import "./index.css";
import Form from "react-bootstrap/Form";
import TaskCard from "./taskCard";
import React from "react";

export const AllTask = () => {
  React.useEffect(() => {
    getTask();
  }, []);

  const [tasks, setTasks] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const getTask = async () => {
    setIsLoading(true);
    const response = await fetch(
      "https://mern-stack-todo-list-l6o1.onrender.com/api/tasks",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          UserId: JSON.parse(localStorage.getItem("user")).userId,
        },
      }
    );
    const data = await response.json();
    setTasks(data);
    setIsLoading(false);
    console.log(data);
  };

  const renderTask = (task) => {
    return (
      <TaskCard
        key={task._id}
        title={task.title}
        assign={task.assignedTo}
        createdAt={task.createdAt.split("T")[0]}
        task={task}
      />
    );
  };

  const newTasks = tasks?.filter((task) => task.status.toLowerCase() === "new");
  const pendingTasks = tasks?.filter(
    (task) => task.status.toLowerCase() === "pending"
  );
  const inProgressTasks = tasks?.filter(
    (task) => task.status.toLowerCase() === "inprogress"
  );
  const doneTasks = tasks?.filter(
    (task) => task.status.toLowerCase() === "done"
  );

  return !isLoading ? (
    tasks && (
      <div className="page all">
        <h2>All Tasks</h2>

        <div className="task-list-wrapper">
          <div className="task-board new">
            <div className="task-board-header">
              <span className="header-text">New Tasks</span>
            </div>
            {newTasks.length > 0 ? (
              newTasks.map(renderTask)
            ) : (
              <div className="no-task">
                <span>No Task Found</span>
              </div>
            )}
          </div>

          <div className="task-board pending">
            <div className="task-board-header">
              <span className="header-text">Pending</span>
            </div>
            {pendingTasks.length > 0 ? (
              pendingTasks.map(renderTask)
            ) : (
              <div className="no-task">
                <span>No Task Found</span>
              </div>
            )}
          </div>

          <div className="task-board inprogress">
            <div className="task-board-header">
              <span className="header-text">In Progress</span>
            </div>
            {inProgressTasks.length > 0 ? (
              inProgressTasks.map(renderTask)
            ) : (
              <div className="no-task">
                <span>No Task Found</span>
              </div>
            )}
          </div>

          <div className="task-board done">
            <div className="task-board-header">
              <span className="header-text">Done</span>
            </div>
            {doneTasks.length > 0 ? (
              doneTasks.map(renderTask)
            ) : (
              <div className="no-task">
                <span>No Task Found</span>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  ) : (
    <div className="page">
      <h2>Loading...</h2>
    </div>
  );
};
