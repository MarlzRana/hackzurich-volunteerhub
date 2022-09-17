const Header = ({ handleLogout }) => {
    return (
        <div className="dashboard-header">
            <div className="dashboard-title">
                <h1>VolunteerHub</h1>
            </div>
            <div className="dashboard-nav">
                <p onClick={()=>handleLogout()}>LOGOUT</p>
            </div>
        </div>
    );
}

export default Header;