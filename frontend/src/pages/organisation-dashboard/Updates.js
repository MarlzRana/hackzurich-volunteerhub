import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { getUpdates } from "../../services/user.service";

const SweetAlert = withReactContent(Swal);

const Updates = () => {

    const [updates, setUpdates] = useState(false);

    let navigate = useNavigate();
    useEffect(() => {
        getUpdates()
        .then(res => {
            setUpdates(res.data.updates);
        });
    }, []);

    const handleNewUpdate = () => {
        navigate("./new-update");
    }

    return (
        <div className="dashboard-updates-page">
            <h2>Your Updates</h2>
            {
                updates === false ?
                <p>Loading updates...</p>
                :
                updates.map((update) =>
                    <div className="dash-update-container" key={update._id}>
                        <p className="dash-update-type">{update.type}</p>
                        <p className="dash-update-title">{update.title}</p>
                        <p className="dash-update-description">{update.description}</p>
                    </div>
                )
            }
            {updates.length === 0 && <p>You haven't created any updates yet.</p>}
            <button onClick={handleNewUpdate}>Create New Update</button>
            
        </div>
    );
}

export default Updates;