import "./authentication-page.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { register } from "../../services/auth.service";

const Register = ({ isLoggedIn, setIsLoggedIn }) => {
    let navigate = useNavigate();
    
    useEffect(() => {
        if (isLoggedIn) navigate("/");
    });

    const [isOrganisation, setIsOrganisation] = useState(false);

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
        register(username, password, isOrganisation ? "organisation" : "volunteer")
        .then(res => {
            if (!res.data.success) {
                setError(res.data.message);
            } else {
                localStorage.setItem("username", username);
                localStorage.setItem("accountType", isOrganisation ? "organisation" : "volunteer");
                setIsLoggedIn(true);
                isOrganisation ? navigate('/onboarding/charity') : navigate('/onboarding/volunteer');
            }
        })
        .catch(err => {
            console.error(err);
            setError("An unknown error has occurred");
        });
    }

    const handleCheckBoxClick = (e) => {
        setIsOrganisation(!isOrganisation);
    }

    return (
        <div className="authentication-page">
            <h1><Link to="/">VolunteerHub</Link></h1>
            <div className="authentication-form">
                <p>Register as {isOrganisation ? "an organisation" : "a volunteer" }</p>
                <form>
                    {/* <input type="text" name="organisation" placeholder="Organisation Name" /> */}
                    <input type="text" name="username" placeholder="Username" value={username} onChange={handleUsernameChange} />
                    <input type="password" name="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
                    Are you an organisation? <input type="checkbox" onChange={handleCheckBoxClick} />
                    <p>Already registered? <Link to="/login">Sign In</Link></p>
                    <input type="submit" value="Login" onClick={handleSignUp} />
                    { error !== "" ? <p className='error'>{error}</p> : "" }
                </form>
            </div>
        </div>
    );
}

export default Register;