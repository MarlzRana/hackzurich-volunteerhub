import { Link } from "react-router-dom";
import "./landing-page.css";

const Header = ({ isLoggedIn, handleLogout }) => {
    const username = localStorage.getItem("username");

    return (
        <div className="landing-header">
            <div className="landing-title">
                <h1>VolunteerHub</h1>
            </div>
            <div className="landing-nav">
                { !isLoggedIn
                ?
                <>
                <p>An Organisation?</p>
                <Link to="/register">Sign Up</Link>
                <Link to="/login">Login</Link>
                </>
                :
                <>
                <p>Welcome back, {username}</p>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/" onClick={() => handleLogout()}>Logout</Link>
                </>
                }
            </div>
        </div>
    );
}

export default Header;