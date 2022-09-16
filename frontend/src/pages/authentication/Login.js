import "./authentication-page.css";
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div className="authentication-page">
            <h1><Link to="/">VolunteerHub</Link></h1>
            <div className="authentication-form">
                <p>Login</p>
                <form>
                    <input type="text" name="username" placeholder="Username" />
                    <input type="password" name="password" placeholder="Password" />
                    <p>Not a volunteer yet? <Link to="/register">Sign Up</Link></p>
                    <input type="submit" value="Login" />
                </form>
            </div>
        </div>
    );
}

export default Login;