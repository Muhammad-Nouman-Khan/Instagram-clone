import React, { useEffect, useState } from "react";
import "./Post.css";
import { Avatar } from "@mui/material";
import { comment, heart, profile, save, send } from "../../assets/assets";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  addDoc,
  collection,
  doc,
  increment,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import Comment from "./Comment";
import { selectUser } from "../../store/userSlice";
import { useSelector } from "react-redux";
const Post = ({
  name,
  description,
  message,
  photoUrl,
  likes,
  id,
  Comments,
}) => {
  const user = useSelector(selectUser);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [viewCommentSection, setViewCommentSection] = useState(false);

  const viewComments = () => {};
  const handleLike = async () => {
    setLiked(!liked);
  };
  const sendComment = async (e) => {
    e.preventDefault();

    const commentsRef = collection(db, "posts", id, "comments");
    await addDoc(commentsRef, {
      name: user.displayName,
      message: commentInput,
      photoUrl: user.photoUrl || "",
      timestamp: serverTimestamp(),
    });

    const postRef = doc(db, "posts", id);
    await updateDoc(postRef, {
      Comments: increment(1),
    });

    setCommentInput("");
  };
  useEffect(() => {
    const commentsRef = collection(db, "posts", id, "comments");
    const unsubscribe = onSnapshot(commentsRef, (querySnapshot) => {
      const commentsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      setComments(commentsData);
    });
    return unsubscribe;
  }, [id]);
  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          style={{ width: "40px", height: "40px" }}
          src=""
          className="post__profileImg"
        />
        <h2 style={{ cursor: "pointer" }}>{name}</h2>
      </div>
      <img className="post__img" src={photoUrl} alt="" />
      <div className="actions">
        <div className="like__icon" onClick={handleLike}>
          {liked ? (
            <FavoriteIcon className="heart__icon" style={{ fill: "red" }} />
          ) : (
            <img onClick={handleLike} src={heart} alt="" />
          )}
        </div>
        <img src={comment} alt="" />
        <img src={send} alt="" />
        <img className="save__icon" src={save} alt="" />
      </div>
      <p style={{ cursor: "pointer" }} className="likes">
        {likes} likes
      </p>
      <p className="post__info">
        <span style={{ cursor: "pointer" }}>{name}</span>
        {message}
      </p>
      <p
        style={{ cursor: "pointer" }}
        onClick={() => setViewCommentSection(!viewCommentSection)}
      >
        View all {Comments} comments
      </p>
      {viewCommentSection && (
        <div className="post__comments">
          {comments.map(({ id, data: { name, message, photoUrl } }) => (
            <Comment
              key={id}
              name={name}
              message={message}
              photoUrl={photoUrl}
            />
          ))}
        </div>
      )}

      <form className="add__comment" onSubmit={sendComment}>
        <input
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          type="text"
          placeholder="Add a comment"
        />
        <button type="submit" className="submit__comment">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Post;
