import Button from 'react-bootstrap/Button';
import './index.css'

export const Home = () => {

    const user = localStorage.getItem("user");
    const loggedIn = user ? JSON.parse(user).loggedIn : false;

    return (
        <div className="page home">
            <h2>👋🏻</h2>
            <h1>Welcome to my Jira</h1>
            <span>~ made by Jayesh Vashishtha 🧑🏻‍💻</span>

            <div className="home__links">
                <Button href={loggedIn ? '/all' : "/login"} variant="outline-primary">View Tasks</Button>
            </div>
        </div>
    )
}