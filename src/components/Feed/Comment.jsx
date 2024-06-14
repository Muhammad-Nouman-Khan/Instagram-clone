import React from "react";
import "./Comment.css";
import { Avatar } from "@mui/material";
import { useUpload } from "../UploadContext";

const Comment = ({ name, message, photoUrl }) => {
  const { isUploadOpen } = useUpload();

  return (
    <div className="comment">
      <Avatar
        style={{ width: "30px", height: "30px", fontSize: "15px" }}
        className={`comment__profileImg ${isUploadOpen ? "hidden" : ""}`}
        src={photoUrl}
      >
        {name[0]}
      </Avatar>
      <div className="comment__info">
        <h4>{name}</h4>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Comment;
