import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./index.css";
import React from "react";

export default function Login() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username && password) {
      setIsLoading(true);
      const response = await fetch(
        "https://mern-stack-todo-list-l6o1.onrender.com/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      if (data.status) {
        localStorage.setItem("user", JSON.stringify({ userId: data.token, loggedIn: true }));
        window.location.href = "/all";
      } else {
        alert(data.message);
      }
      setIsLoading(false);
    } else {
      console.log("Please fill all the fields");
      console.log(username);
      console.log(password);
      alert("Please fill all the fields");
    }
  };

  return (
    <div className="page login">
      <h3>Login Account</h3>
      <Form.Text>Sign in and get started with JIRA</Form.Text>
      <br />
      <br />
      <Form style={{ textAlign: "left", width: "400px" }}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            disabled={isLoading}
            type="name"
            placeholder="Enter username"
            onChangeCapture={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            disabled={isLoading}
            type="password"
            placeholder="Password"
            onChangeCapture={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button
          disabled={isLoading}
          variant="primary"
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
}
