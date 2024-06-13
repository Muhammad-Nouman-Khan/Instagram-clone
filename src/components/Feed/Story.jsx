import React from "react";
import "./Story.css";
const Story = ({ name, image }) => {
  return (
    <div className="story">
      <div className="story__img">
        <img src={image} alt="" />
      </div>
      <p>{name}</p>
    </div>
  );
};

export default Story;
