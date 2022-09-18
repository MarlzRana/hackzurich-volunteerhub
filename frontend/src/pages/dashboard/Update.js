import "./update.css";

const Update = ({type, orgUsername, orgName, title, description}) => {
    return (
    <div className="update">
        <div className="update-left">
            <p>{type}</p>
        </div>
        <div className="update-right">
            <div className="update-right-upper">
                <p>@{orgUsername} : {orgName}</p>
            </div>
            <div className="update-right-middle">
                <p>{title}</p>
            </div>
            <div className="update-right-lower">
                <p>{description}</p>
            </div>
        </div>
    </div>);
}

export default Update;