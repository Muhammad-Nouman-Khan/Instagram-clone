import React, { useEffect, useState } from "react";
import "./Feed.css";
import Story from "./Story";
import Post from "./Post";
import { db } from "../../firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import ronaldo from "../../assets/ronaldo.jpeg";
import rockstar from "../../assets/rockstar.jpeg";
import four from "../../assets/433.jpeg";
import messi from "../../assets/messi.jpeg";
import selena from "../../assets/selena.jpeg";
import virat from "../../assets/virat.jpeg";
import babar from "../../assets/babar.jpeg";

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
  }, []);
  return (
    <div className="feed">
      <div className="stories">
        <Story image={ronaldo} name="cristiano" />
        <Story image={rockstar} name="rockstar" />
        <Story image={four} name="433" />
        <Story image={messi} name="leomessi" />
        <Story image={selena} name="selenagomez" />
        <Story image={virat} name="virat.kohli" />
        <Story image={babar} name="babarazam" />
      </div>

      <div className="posts">
        {posts.map(
          ({
            id,
            data: {
              name,
              description,
              message,
              photoUrl,
              likes,
              Comments,
              likedBy,
              profileImg,
            },
          }) => (
            <Post
              key={id}
              id={id}
              name={name}
              description={description}
              message={message}
              photoUrl={photoUrl}
              likes={likes}
              Comments={Comments}
              likedBy={likedBy}
              profileImg={profileImg}
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
