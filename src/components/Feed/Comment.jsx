import React from "react";
import "./Comment.css";
import { Avatar } from "@mui/material";
const Comment = ({ name, message, photoUrl }) => {
  return (
    <div className="comment">
      <Avatar
        style={{ width: "30px", height: "30px" }}
        className="comment__profileImg"
        src={photoUrl}
      />
      <div className="comment__info">
        <h4>{name}</h4>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Comment;
