import { useEffect, useState } from "react";

const Tags = ({ name, required, setInputExists, setDataToSave }) => {

    const [chosenTags, setChosenTags] = useState([]);

    const [showNewTag, setShowNewTag] = useState(false);
    const [newTag, setNewTag] = useState("");

    useEffect(() => {
        setNewTag("");
        setShowNewTag(false);
        setChosenTags([]);
    }, [name]);

    // const handleTextChange = e => {
    //     setUserText(e.target.value);
    //     if (e.target.value !== "" && e.target.value.replace(" ", "") !== "") return setInputExists(true);
    //     setInputExists(false);
    // }

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
        setDataToSave([...chosenTags, e.target.value]);
        setNewTag("");
        setShowNewTag(false);
        setInputExists(true);
    }

    const handleRemoveTag = (tag) => {
        const indexOfTag = chosenTags.indexOf(tag);
        if (indexOfTag === -1) return;
        let chosenTagsCopy = [...chosenTags];
        chosenTagsCopy.splice(indexOfTag, 1);
        setChosenTags(chosenTagsCopy);
        if (chosenTagsCopy.length === 0) setInputExists(false);
    }

    return (
        <>
            <h2>{name}</h2>
            <div className="tag-container">
                { chosenTags.map(tag =>
                    <p className="tag" key={tag}>{tag} <span onClick={() => handleRemoveTag(tag)}>x</span></p>
                ) }
                { showNewTag ? <p className="new-tag"><input type="text" value={newTag} onChange={handleNewTagChange} onKeyDown={handleSaveNewTag} placeholder="New tag" /> <span onClick={handleRemoveNewTag}>x</span></p> : "" }
            </div>
            <p onClick={handleAddNewTag} className="create-new-tag">+</p>
            { required ? <p>This question is required</p> : <p>This question is optional</p>}
        </>
    );
}

export default Tags;