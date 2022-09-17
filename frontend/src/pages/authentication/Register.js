import "./authentication-page.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { register, isAuthenticated } from "../../services/auth.service";

const Register = () => {
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

    const handleSignUp = e => {
        e.preventDefault();
        register(username, password)
        .then(res => {
            if (!res.data.success) {
                setError(res.data.message);
            } else {
                isAuthenticated()
                .then(res => {
                    console.log(res.data);
                });
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
                <p>Register as a volunteer</p>
                <form>
                    {/* <input type="text" name="organisation" placeholder="Organisation Name" /> */}
                    <input type="text" name="username" placeholder="Username" value={username} onChange={handleUsernameChange} />
                    <input type="password" name="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
                    <p>Already registered? <Link to="/login">Sign In</Link></p>
                    <input type="submit" value="Login" onClick={handleSignUp} />
                    { error !== "" ? <p className='error'>{error}</p> : "" }
                </form>
            </div>
        </div>
    );
}

export default Register;