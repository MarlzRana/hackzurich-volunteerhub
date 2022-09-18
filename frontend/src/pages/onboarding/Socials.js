import { useState } from "react";

const Socials = ({ name, required, setInputExists, setDataToSave }) => {
    const [instagramText, setInstagramText] = useState("");
    const [linkedInText, setLinkedInText] = useState("");
    const [twitterText, setTwitterText] = useState("");

    const handleTextChange = (e, typ) => {
        if (typ === "IG") setInstagramText(e.target.value);
        if (typ === "LI") setLinkedInText(e.target.value);
        if (typ === "TW") setTwitterText(e.target.value);

        setDataToSave({twitter: twitterText, linkedin: linkedInText, instagram: instagramText});
        if (twitterText !== "" && linkedInText !== "" && instagramText !== "") return setInputExists(true);
        setInputExists(false);
    }

    return (
        <>
            <h2>{name}</h2>
            <input value={instagramText} onChange={(e) => handleTextChange(e, 'IG')} placeholder="Instagram account" />
            <input value={linkedInText} onChange={(e) => handleTextChange(e, 'LI')} placeholder="LinkedIn account" />
            <input value={twitterText} onChange={(e) => handleTextChange(e, 'TW')} placeholder="Twitter account" />
            { required ? <p>This question is required</p> : <p>This question is optional</p>}
        </>
    );
}

export default Socials;