import "./authentication-page.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { login } from "../../services/auth.service";

const Login = ({ isLoggedIn, setIsLoggedIn }) => {
    let navigate = useNavigate();
    
    useEffect(() => {
        if (isLoggedIn) navigate("/");
    });

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleUsernameChange = e => {
        setUsername(e.target.value);
        setError("");
    }

    const handlePasswordChange = e => {
        setPassword(e.target.value);
        setError("");
    }

    const handleLogin = e => {
        e.preventDefault();
        login(username, password)
        .then(res => {
            if (!res.data.success) {
                setError(res.data.message);
            } else {
                setIsLoggedIn(true);
            }
        })
        .catch(err => {
            console.error(err);
            setError("An unknown error has occurred");
        });
    }

    return (
        <div className="authentication-page">
            <h1><Link to="/">VolunteerHub</Link></h1>
            <div className="authentication-form">
                <p>Login</p>
                <form>
                    <input type="text" name="username" placeholder="Username" value={username} onChange={handleUsernameChange} />
                    <input type="password" name="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
                    <p>Not a volunteer yet? <Link to="/register">Sign Up</Link></p>
                    <input type="submit" value="Login" onClick={handleLogin} />
                    { error !== "" ? <p className='error'>{error}</p> : "" }
                </form>
            </div>
        </div>
    );
}

export default Login;