import Footer from "./Footer";
import Header from "./Header";
import Profile from "./Profile";
import "./dashboard.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Feed from "./Feed";
import Opportunities from "./Opportunities";
import { useEffect } from "react";

const Dashboard = ({ isLoggedIn, setIsLoggedIn, handleLogout }) => {
    let navigate = useNavigate();
    
    useEffect(() => {
        if (!isLoggedIn) navigate("/");
    });

    return (
        <div className="dashboard-container">
            <Header handleLogout={handleLogout} />
            <Routes>
                <Route path="feed" element={<Feed />} />
                <Route path="/" element={<Opportunities />} />
                <Route path="profile" element={<Profile />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default Dashboard;