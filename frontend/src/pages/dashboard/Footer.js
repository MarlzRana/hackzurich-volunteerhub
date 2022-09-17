import { useNavigate } from "react-router-dom";

const Footer = () => {
    let navigate = useNavigate();

    return (
        <div className="dashboard-footer">
            <div className="dashboard-footer-feed" onClick={()=>{navigate('./feed')}}>
                Feed
            </div>
            <div className="dashboard-footer-opportunities" onClick={()=>{navigate('./')}}>
                Find New Opportunities
            </div>
            <div className="dashboard-footer-profile" onClick={()=>{navigate('./profile')}}>
                My Profile
            </div>
        </div>
    );
}

export default Footer;