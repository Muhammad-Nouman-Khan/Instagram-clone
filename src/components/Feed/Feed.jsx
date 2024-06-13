import React, { useEffect, useState } from "react";
import "./Feed.css";
import Story from "./Story";
import { profile } from "../../assets/assets";
import Post from "./Post";
import { db } from "../../firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const postsRef = collection(db, "posts");
    const postsQuery = query(postsRef, orderBy("timestamp", "desc"));
    const unsubsribe = onSnapshot(postsQuery, (querySnapshot) => {
      const postData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      setPosts(postData);
    });
    return unsubsribe;
  }, [posts]);
  return (
    <div className="feed">
      <div className="stories">
        <Story image={profile} name="Nouman" />
        <Story image={profile} name="Nouman" />
        <Story image={profile} name="Nouman" />
        <Story image={profile} name="Nouman" />
        <Story image={profile} name="Nouman" />
        <Story image={profile} name="Nouman" />
        <Story image={profile} name="Nouman" />
      </div>

      <div className="posts">
        {posts.map(
          ({ id, data: { name, description, message, photoUrl, likes } }) => (
            <Post
              key={id}
              id={id}
              name={name}
              description={description}
              message={message}
              photoUrl={photoUrl}
              likes={likes}
            />
          )
        )}
        {/* <Post />
        <Post /> */}
      </div>
    </div>
  );
};

export default Feed;
