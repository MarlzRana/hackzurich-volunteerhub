import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { useState } from 'react';
import { saveVolunteerBio, saveVolunteerTags } from '../../services/user.service';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const SweetAlert = withReactContent(Swal);

const Profile = ({ userData, setUserData }) => {
    const [chosenTags, setChosenTags] = useState(userData?.tags === undefined ? [] : userData.tags.split(","));

    const [showNewTag, setShowNewTag] = useState(false);
    const [newTag, setNewTag] = useState("");

    const [bio, setBio] = useState(userData?.bio);

    const handleAddNewTag = () => {
        setShowNewTag(true);
    }

    const handleRemoveNewTag = () => {
        setShowNewTag(false);
        setNewTag("");
    }

    const handleNewTagChange = (e) => {
        setNewTag(e.target.value.toLowerCase());
    }

    const handleSaveNewTag = (e) => {
        if (e.key !== "Enter") return;
        if (e.target.value === "" || e.target.value.replace(" ", "") === "") return;
        if (chosenTags.indexOf(e.target.value) !== -1) return;
        setChosenTags([...chosenTags, e.target.value]);
        setNewTag("");
        setShowNewTag(false);

        saveVolunteerTags([...chosenTags, e.target.value]);
        localStorage.setItem("tags", [...chosenTags, e.target.value]);
        let userDataCopy = structuredClone(userData);
        userDataCopy.tags = [...chosenTags, e.target.value].join(",");
        setUserData(userDataCopy);
    }

    const handleRemoveTag = (tag) => {
        const indexOfTag = chosenTags.indexOf(tag);
        if (indexOfTag === -1) return;
        let chosenTagsCopy = [...chosenTags];
        chosenTagsCopy.splice(indexOfTag, 1);
        setChosenTags(chosenTagsCopy);

        saveVolunteerTags(chosenTagsCopy);
        localStorage.setItem("tags", chosenTagsCopy);
        let userDataCopy = structuredClone(userData);
        userDataCopy.tags = chosenTagsCopy.join(",");
        setUserData(userDataCopy);
    }

    const handleBioChange = (e) => {
        setBio(e.target.value);
    }

    const saveBio = e => {
        saveVolunteerBio(bio);
        localStorage.setItem("bio", bio);
        let userDataCopy = structuredClone(userData);
        userDataCopy.bio = bio;
        setUserData(userDataCopy);
        SweetAlert.fire({icon: "success", title: "Success", text: "Your bio has been saved successfully"});
    }

    return (
        <div className="dashboard-profile">
            <div className="profile-top-row">
                <div className="profile-picture">
                    <h3>Profile Picture</h3>
                    <img src="https://t3.ftcdn.net/jpg/00/64/67/80/360_F_64678017_zUpiZFjj04cnLri7oADnyMH0XBYyQghG.jpg" />
                </div>
                <div className="profile-summary">
                    <h3>Your Profile</h3>
                    <h4>Username</h4>
                    <p>This cannot be changed</p>
                    <input type="text" value={userData?.username} readOnly />
                    <h4>Tags</h4>
                    <p>Your tags help us find opportunities relevant to you</p>
                    <div className="tag-container">
                        { chosenTags.map(tag =>
                            <p className="tag" key={tag}>{tag} <span onClick={() => handleRemoveTag(tag)}>x</span></p>
                        ) }
                        { showNewTag ? <p className="new-tag"><input type="text" value={newTag} onChange={handleNewTagChange} onKeyDown={handleSaveNewTag} placeholder="New tag" /> <span onClick={handleRemoveNewTag}>x</span></p> : "" }
                        <p onClick={handleAddNewTag} className="create-new-tag">+</p>
                    </div>
                </div>
            </div>
            <div className="profile-bottom-row">
                <div className="social-links">
                    <h3>Social Links</h3>
                    <p><FontAwesomeIcon icon={faInstagram} />  {userData?.socials?.instagram || "Not set"}</p>
                    <p><FontAwesomeIcon icon={faTwitter} />  {userData?.socials?.twitter || "Not set"}</p>
                    <p><FontAwesomeIcon icon={faLinkedin} />  {userData?.socials?.linkedin || "Not set"}</p>
                </div>
                <div className="bio">
                    <h3>Your Bio</h3>
                    <textarea value={bio} onChange={handleBioChange}></textarea>
                    <button onClick={saveBio}>Save Bio</button>
                </div>
            </div>
        </div>
    );
}

export default Profile;