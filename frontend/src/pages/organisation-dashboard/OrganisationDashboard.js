// import Footer from "./Footer";
// import Header from "./Header";
import "../dashboard/dashboard.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOrganisationBio, getOrganisationLocations, getOrganisationName, getOrganisationTags } from "../../services/user.service";
import Header from "../dashboard/Header";
import Footer from "./Footer";
import Volunteers from "./Volunteers";
import Profile from "./Profile";
import Updates from "./Updates";
import NewUpdate from "./NewUpdate";

const OrganisationDashboard = ({ isLoggedIn, setIsLoggedIn, handleLogout }) => {
    let navigate = useNavigate();

    let tempUserData = false;
    if (localStorage.getItem("bio") !== null) {
        tempUserData = {};
        tempUserData.username = localStorage.getItem("username");
        tempUserData.bio = localStorage.getItem("bio");
        tempUserData.tags = localStorage.getItem("tags");
        tempUserData.socials = localStorage.getItem("socials");
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
            
            getOrganisationName()
            .then(res => {
                localStorage.setItem("name", res.data.name);
                tempUserData.name = res.data.name;

                getOrganisationBio()
                .then(res => {
                    localStorage.setItem("bio", res.data.bio);
                    tempUserData.bio = localStorage.getItem("bio");

                    getOrganisationLocations()
                    .then(res => {
                        localStorage.setItem("location", res.data.location);
                        tempUserData.location = localStorage.getItem("location");

                        getOrganisationTags()
                        .then(res => {
                            localStorage.setItem("tags", res.data.tags);
                            tempUserData.tags = localStorage.getItem("tags");
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
            {/* <Header handleLogout={handleLogout} /> */}
            <Routes>
                <Route path="volunteers" element={<Volunteers />} />
                <Route path="/" element={<Updates />} />
                <Route path="new-update" element={<NewUpdate />} />
                <Route path="profile" element={<Profile userData={userData} setUserData={setUserData} />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default OrganisationDashboard;