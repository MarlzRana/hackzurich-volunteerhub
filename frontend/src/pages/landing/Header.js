import { Link } from "react-router-dom";
import "./landing-page.css";

const Header = () => {
    return (
        <div className="landing-header">
            <div className="landing-title">
                <h1>VolunteerHub</h1>
            </div>
            <div className="landing-nav">
                <p>An Organisation?</p>
                <Link to="/register">Sign Up</Link>
                <Link to="/login">Login</Link>
            </div>
        </div>
    );
}

export default Header;