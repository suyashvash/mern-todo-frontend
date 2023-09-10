import Button from 'react-bootstrap/Button';
import './index.css'

export const Home = () => {


    return (
        <div className="page home">
            <h2>👋🏻</h2>
            <h1>Welcome to my TODO List</h1>
            <span>~ made by Jayesh Vashishtha 🧑🏻‍💻</span>

            <div className="home__links">
                <Button  variant="outline-primary">Create Task</Button>
            </div>
        </div>
    )
}