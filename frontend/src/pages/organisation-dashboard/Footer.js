import { useNavigate } from "react-router-dom";

const Footer = () => {
    let navigate = useNavigate();

    return (
        <div className="dashboard-footer">
            <div className="dashboard-footer-feed" onClick={()=>{navigate('./volunteers')}}>
                Volunteers
            </div>
            <div className="dashboard-footer-opportunities" onClick={()=>{navigate('./')}}>
                Your Posts
            </div>
            <div className="dashboard-footer-profile" onClick={()=>{navigate('./profile')}}>
                Your Profile
            </div>
        </div>
    );
}

export default Footer;