import "./authentication-page.css";
import { Link } from "react-router-dom";

const Register = () => {
    return (
        <div className="authentication-page">
            <h1><Link to="/">VolunteerHub</Link></h1>
            <div className="authentication-form">
                <p>Register</p>
                <form>
                    <input type="text" name="organisation" placeholder="Organisation Name" />
                    <input type="text" name="username" placeholder="Username" />
                    <input type="password" name="password" placeholder="Password" />
                    <p>Already registered? <Link to="/login">Sign In</Link></p>
                    <input type="submit" value="Login" />
                </form>
            </div>
        </div>
    );
}

export default Register;