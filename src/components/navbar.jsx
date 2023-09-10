import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import NavDropdown from "react-bootstrap/NavDropdown";

function NavBar() {
  const user = localStorage.getItem("user");
  const loggedIn = user ? JSON.parse(user).loggedIn : false;

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  }

  return (
    <Navbar className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href={loggedIn ? "/all" : "/login"}>My Jira</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {loggedIn ? (
            <>
              <Button
                style={{ marginLeft: 10 }}
                variant="outline-light"
                href="/all"
              >
                All Task
              </Button>
              <Button
                variant="outline-light"
                href="/create"
                style={{ marginLeft: 10 }}
              >
                Create
              </Button>
              <Button
                style={{ marginLeft: 10 }}
                variant="outline-light"
                href="/find"
              >
                Search
              </Button>
              <Button
                style={{ marginLeft: 10 }}
                variant="light"
                type="submit"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline-light" href="/login">
                Log In
              </Button>
              <Button
                style={{ marginLeft: 10 }}
                variant="outline-light"
                href="/register"
              >
                Register
              </Button>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
