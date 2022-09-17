import Footer from "./Footer";
import Header from "./Header";
import Profile from "./Profile";
import "./dashboard.css";
import { Route, Routes } from "react-router-dom";
import Feed from "./Feed";
import Opportunities from "./Opportunities";

const Dashboard = ({ isLoggedIn, setIsLoggedIn }) => {
    return (
        <div className="dashboard-container">
            <Header />
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