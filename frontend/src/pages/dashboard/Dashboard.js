import Footer from "./Footer";
import Header from "./Header";
import Profile from "./Profile";
import "./dashboard.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Updates from "./Updates";
import Opportunities from "./Opportunities";
import { useEffect, useState } from "react";
import { getVolunteerBio, getVolunteerLocation, getVolunteerSocials, getVolunteerTags } from "../../services/user.service";

const Dashboard = ({ isLoggedIn, setIsLoggedIn, handleLogout }) => {
    let navigate = useNavigate();

    let tempUserData = false;
    if (localStorage.getItem("bio") !== null) {
        tempUserData = {};
        tempUserData.username = localStorage.getItem("username");
        tempUserData.bio = localStorage.getItem("bio");
        tempUserData.tags = localStorage.getItem("tags");
        tempUserData.socials = JSON.parse(localStorage.getItem("socials") || {});
    }
    const [userData, setUserData] = useState(tempUserData);

    useEffect(() => {
        if (!isLoggedIn) navigate("/");
    });
    
    useEffect(() => {
        let tempUserData = {};
        // check if data is in local storage already
        if (localStorage.getItem("bio") === null) {
            // we gotta fetch it!
            
            getVolunteerBio()
            .then(res => {
                localStorage.setItem("bio", res.data.bio);
                tempUserData.bio = res.data.bio;

                getVolunteerTags()
                .then(res => {
                    localStorage.setItem("tags", res.data.tags);
                    tempUserData.tags = localStorage.getItem("tags");

                    getVolunteerLocation()
                    .then(res => {
                        localStorage.setItem("location", res.data.location);
                        tempUserData.location = localStorage.getItem("location");

                        getVolunteerSocials()
                        .then(res => {
                            localStorage.setItem("socials", JSON.stringify(res.data.socialLinks));
                            tempUserData.socials = res.data.socialLinks;
                            tempUserData.username = localStorage.getItem("username");

                            setUserData(tempUserData);

                        });
                    });
                });
            });
        }
    }, []);

    return (
        <div className="dashboard-container">
            <Header handleLogout={handleLogout} />
            <Routes>
                <Route path="feed" element={<Updates />} />
                <Route path="/" element={<Opportunities />} />
                <Route path="profile" element={<Profile userData={userData} setUserData={setUserData} />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default Dashboard;