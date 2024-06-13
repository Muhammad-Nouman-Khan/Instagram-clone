import React, { useState } from "react";
import "./Upload.css";
import ImageIcon from "@mui/icons-material/Image";
import { db, storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/userSlice";

const Upload = ({ handleClose }) => {
  const user = useSelector(selectUser);
  const [image, setImage] = useState(null);
  const [input, setInput] = useState("");
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleUpload = () => {
    const storageRef = ref(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log("Image upload error : ", error);
        alert(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          addDoc(collection(db, "posts"), {
            name: user.displayName,
            description: user.email,
            message: input,
            photoUrl: downloadURL,
            timestamp: serverTimestamp(),
            likes: 0,
            Comments: 0,
          });
        });
      }
    );
    setInput("");
    setImage(null);
    handleClose();
  };
  return (
    <div className="upload__container">
      <div className="upload__content">
        <span className="upload__close" onClick={handleClose}>
          &times;
        </span>
        <h2>Create new post</h2>
        <div className="upload__section">
          <ImageIcon className="image__icon" />
          <p className="upload__p">Upload photos Here</p>
          <label htmlFor="file_upload" className="file_upload_label">
            Select from computer
          </label>
          <input
            id="file_upload"
            type="file"
            accept="image/*"
            className="file_upload_input"
            onChange={handleImageChange}
          />
          {image && (
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="caption"
              type="text"
              placeholder="Add caption"
            />
          )}
          {image && <button onClick={handleUpload}>Upload</button>}
          <button onClick={handleClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default Upload;
