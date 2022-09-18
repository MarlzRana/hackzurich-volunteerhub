import { useState } from "react";
import { createNewUpdate } from "../../services/user.service";
import "./organisation-dashboard.css";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from "react-router-dom";

const SweetAlert = withReactContent(Swal);

const NewUpdate = () => {
    const [title, setTitle] = useState("");
    const [type, setType] = useState("update");
    const [description, setDescription] = useState("");

    const [video, setVideo] = useState();

    const handleVideoUpload = (e) => {
        e.preventDefault();
        setVideo(e.target.files[0]);
    }

    const handleVideoRemoval = (e) => {
        e.preventDefault();
        setVideo(undefined);
        document.getElementById("video").value = "";
    }

    const handleTitleChange = e => {
        setTitle(e.target.value);
    }

    const handleTypeChange = e => {
        setType(e.target.value);
    }

    const handleDescriptionChange = e => {
        setDescription(e.target.value);
    }

    const createUpdate = (e) => {
        e.preventDefault();
        if (title === "" || description === "") return SweetAlert.fire({icon:"error", title:"Error", text:"Please fill in all information"});
        createNewUpdate(type, title, description)
        .then(res => {
            if (res.data.success) {
                SweetAlert.fire({icon: "success", title: "Success", text: "Your update has been posted successfully"}).then(() => navigate("/dashboard"));
            }
        });
    }

    let navigate = useNavigate();


    return (
        <div className="create-new-update">
            <h2>Create New Update</h2>
            <form>
                <label htmlFor="title">Update Title</label>
                <input name="title" type="text" value={title} onChange={handleTitleChange} />
                <label htmlFor="type">Update Type</label>
                <p>Please either select a volunteering event or an update (which might include information about upcoming or past events)</p>
                <select name="type" id="type" value={type} onChange={handleTypeChange}>
                    <option value="event">Volunteering Event</option>
                    <option value="update">Update</option>
                </select>
                <label htmlFor="description">Update Description</label>
                <textarea name="description" value={description} onChange={handleDescriptionChange}></textarea>

                { type === "event" && <>
                    {video && (
                    <div>
                        <video width="400" controls>
                            <source src={URL.createObjectURL(video)}/>
                        </video>
                        <button onClick={handleVideoRemoval} className="remove-button">Remove</button>
                    </div>
                    )}
                    <label htmlFor="video" className="file-upload-button">
                        Choose a video
                    </label>
                    <input
                        type="file"
                        name="video"
                        id="video"
                        onChange={handleVideoUpload}
                    />
                </> }

                <button onClick={createUpdate}>Create Update</button>
            </form>
        </div>
    );
}

export default NewUpdate;