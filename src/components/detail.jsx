import React, { useEffect } from "react";
import "./index.css";
import { Button } from "react-bootstrap";
import moment from "moment";

export default function Detail() {
  useEffect(() => {
    getDetails();
  }, []);

  const [task, setTask] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true);

  const task_id = window.location.href.split("?")[1];

  const getDetails = async () => {
    setIsLoading(true);
    const response = await fetch(
      "https://mern-stack-todo-list-l6o1.onrender.com/api/tasks/getTask/" +
        task_id,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          UserId: JSON.parse(localStorage.getItem("user")).userId,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setTask(res[0]);
        setIsLoading(false);
        console.log(res);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  const deleteTask = async () => {
    if (window.confirm("Are you sure, you want to delete this Task?")) {
      setIsLoading(true);
      const response = await fetch(
        "https://mern-stack-todo-list-l6o1.onrender.com/api/tasks/delete/" +
          task_id,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            UserId: JSON.parse(localStorage.getItem("user")).userId,
          },
        }
      )
        .then((res) => res.json())
        .then((res) => {
          setIsLoading(false);
          window.location.href = "/all";
          alert("Task Deleted Successfully");
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
        });
    }
  };

  return !isLoading ? (
    task && (
      <div className="page detail">
        <h3>Task Details</h3>
        <br />
        <div className="detail-hol">
          <div className="detail-wrapper">
            <div className="detail-holder">
              <span className="detail-title">Title</span>
              <span className="detail-value">{task.title}</span>
            </div>
            <div className="detail-holder">
              <span className="detail-title">Descriptipn</span>
              <span className="detail-value">{task.description}</span>
            </div>

            <div className="detail-holder">
              <span className="detail-title">Assigned To</span>
              <span className="detail-value">{task.assignedTo}</span>
            </div>
            <div className="detail-holder">
              <span className="detail-title">Date</span>
              <span className="detail-value">{moment(task.date).format('YYYY-MM-DD')}</span>
            </div>
          </div>
          <div className="detail-wrapper">
            <div className="detail-holder">
              <span className="detail-title">Duration</span>
              <span className="detail-value">{task.duration} minutes</span>
            </div>

            <div className="detail-holder">
              <span className="detail-title">Priority</span>
              <span className="detail-value">{task.priority}</span>
            </div>

            <div className="detail-holder">
              <span className="detail-title">Status</span>
              <span className="detail-value">{task.status}</span>
            </div>
            
          </div>
        </div>
        <br />
        <div className="detail-hol">
          <div className="detail-wrapper">
            <div className="detail-holder">
              <Button href={"/update?"+task_id} variant="outline-dark" className="detail-value">
                Update Task
              </Button>
            </div>
          </div>
          <div className="detail-wrapper">
            <div className="detail-holder">
              <Button variant="outline-danger" className="detail-value" onClick={deleteTask}>
                Delete Task
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  ) : (
    <div className="page detail">
      <h4>Loading.....</h4>
    </div>
  );
}
