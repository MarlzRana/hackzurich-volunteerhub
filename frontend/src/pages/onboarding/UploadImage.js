import { useState } from "react";

const UploadImage = ({ name, required, setInputExists, setDataToSave }) => {
    const [selectedImage, setSelectedImage] = useState(undefined);

    const handleImageUpload = (e) => {
        e.preventDefault();
        setSelectedImage(e.target.files[0]);
        setDataToSave(e.target.files[0]);
        setInputExists(true);
    }

    const handleImageRemoval = (e) => {
        e.preventDefault();
        setSelectedImage(undefined);
        setInputExists(false);
        document.getElementById("image").value = "";
    }

    return (
        <>
            <h2>{name}</h2>
            {selectedImage && (
                <div>
                    <img alt="Cover image" className="image-preview" src={typeof selectedImage === 'string' ? selectedImage : URL.createObjectURL(selectedImage)} />
                    <button onClick={handleImageRemoval} className="remove-button">Remove</button>
                </div>
            )}
            <label htmlFor="image" className="file-upload-button">
                Choose file
            </label>
            <input
                type="file"
                name="image"
                id="image"
                onChange={handleImageUpload}
            />
            { required ? <p>This question is required</p> : <p>This question is optional</p>}
        </>
    );
}

export default UploadImage;