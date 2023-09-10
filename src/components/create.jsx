import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./index.css";

export default function Create() {
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
      completed: false,
      createdBy: user ? JSON.parse(user).userId : "",
    };

    setIsLoading(true);
    const response = await fetch(
      "https://mern-stack-todo-list-l6o1.onrender.com/api/tasks/add",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setIsLoading(false);
        alert("Task Created Successfully");
        window.location.href = "/all";
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        alert("Something went wrong");
      });
  };

  return (
    <div className="page create">
      <h3>Create Task</h3>

      <br />
      <div className="create-form-holder">
        <div>
          <Form style={{ textAlign: "left", width: "400px" }}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Task Title</Form.Label>
              <Form.Control
                required
                type="name"
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
                    variant={status == item ? "primary" : "outline-primary"}
                    onClick={() => setStatus(item)}
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
                    variant={priority == item ? "primary" : "outline-primary"}
                    onClick={() => setPriority(item)}
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
