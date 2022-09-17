import { useState } from "react";

const FullQuestion = ({ name, required, setInputExists, placeholder}) => {
    const [userText, setUserText] = useState("");

    const handleTextChange = e => {
        setUserText(e.target.value);
        if (e.target.value !== "" && e.target.value.replace(" ", "") !== "") return setInputExists(true);
        setInputExists(false);
    }

    return (
        <>
            <h2>{name}</h2>
            <textarea placeholder={placeholder} value={userText} onChange={handleTextChange}></textarea>
            { required ? <p>This question is required</p> : <p>This question is optional</p>}
        </>
    );
}

export default FullQuestion;