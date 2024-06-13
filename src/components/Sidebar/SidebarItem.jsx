import React from "react";
import "./SidebarItem.css";
const SidebarItem = ({ image, title, onClick }) => {
  return (
    <div className="sidebarItem" onClick={onClick}>
      <img src={image} alt="" />
      <p>{title}</p>
    </div>
  );
};

export default SidebarItem;
