import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./index.css";

export default function Update() {
  React.useEffect(() => {
    getDetails();
  }, []);

  const [task, setTask] = React.useState({});

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
        setTitle(res[0].title);
        setDescription(res[0].description);
        setDuration(res[0].duration);
        setStatus(res[0].status.toLowerCase());
        setAssignedTo(res[0].assignedTo);
        setPriority(res[0].priority.toLowerCase());
        setDate(res[0].date);
        setIsLoading(false);
        console.log(res[0]);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  const user = localStorage.getItem("user");

  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [duration, setDuration] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [assignedTo, setAssignedTo] = React.useState("");
  const [priority, setPriority] = React.useState("");
  const [date, setDate] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !title ||
      !description ||
      !duration ||
      !status ||
      !assignedTo ||
      !priority ||
      !date
    ) {
      alert("All fields are mandatory");
      return;
    }

    let body = {
      title,
      description,
      duration,
      status: status.toLowerCase(),
      assignedTo,
      priority: priority.toLowerCase(),
      date,
      completed: status.toLowerCase() == "completed" ? true : false,
    };

    setIsLoading(true);
    const response = await fetch(
      "https://mern-stack-todo-list-l6o1.onrender.com/api/tasks/update/" +
        task_id,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          UserId: JSON.parse(localStorage.getItem("user")).userId,
        },
        body: JSON.stringify(body),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setIsLoading(false);
        alert("Task Updated Successfully");
        console.log(res);
        // window.location.href = "/all";
      })
      .catch((err) => {
        console.log(err.response);
        setIsLoading(false);
        alert("Something went wrong");
      });
  };

  return (
    <div className="page create">
      <h3>Update Task</h3>

      <br />
      <div className="create-form-holder">
        <div>
          <Form style={{ textAlign: "left", width: "400px" }}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Task Title</Form.Label>
              <Form.Control
                required
                type="name"
                value={title}
                disabled={isLoading}
                placeholder="Ex - Clothes"
                onChangeCapture={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Description</Form.Label>
              <Form.Control
                required
                as="textarea"
                rows={3}
                value={description}
                disabled={isLoading}
                onChangeCapture={(e) => setDescription(e.target.value)}
                placeholder="Ex - Wash the clothes before the rain...."
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Duration</Form.Label>
              <Form.Control
                required
                type=""
                value={duration}
                disabled={isLoading}
                placeholder="In Minutes"
                onChangeCapture={(e) => setDuration(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Status</Form.Label>
              <div className="button-grp">
                {["New", "Pending", "In Progress"].map((item, index) => (
                  <Button
                    disabled={isLoading}
                    style={{ marginRight: 10 }}
                    variant={
                      status == item.toLowerCase()
                        ? "primary"
                        : "outline-primary"
                    }
                    onClick={() => setStatus(item.toLowerCase())}
                  >
                    {item}
                  </Button>
                ))}
              </div>
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              disabled={isLoading}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Form>
        </div>

        <div>
          <Form style={{ textAlign: "left", width: "400px" }}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Assigned To</Form.Label>
              <Form.Control
                required
                type="name"
                value={assignedTo}
                disabled={isLoading}
                placeholder="Enter Name"
                onChangeCapture={(e) => setAssignedTo(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Priority</Form.Label>
              {/* <Form.Control required type="name" placeholder="Enter Title" /> */}
              <div className="button-grp">
                {["Low", "Medium", "High"].map((item, index) => (
                  <Button
                    disabled={isLoading}
                    style={{ marginRight: 10 }}
                    variant={
                      priority == item.toLowerCase()
                        ? "primary"
                        : "outline-primary"
                    }
                    onClick={() => setPriority(item.toLowerCase())}
                  >
                    {item}
                  </Button>
                ))}
              </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Date</Form.Label>
              <Form.Control
                required
                disabled={isLoading}
                value={date}
                type="name"
                placeholder="YYYY-MM-DD"
                onChangeCapture={(e) => setDate(e.target.value)}
              />
            </Form.Group>
          </Form>
        </div>
      </div>
    </div>
  );
}
