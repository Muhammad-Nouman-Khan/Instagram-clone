import React, { useState } from "react";
import "./Sidebar.css";
import { Avatar } from "@mui/material";

import {
  create,
  explore,
  heart,
  home,
  logo,
  media,
  message,
  more,
  profile,
  search,
  send,
  thread,
} from "../../assets/assets";
import SidebarItem from "./SidebarItem";
import Upload from "./Upload";
const Sidebar = () => {
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const handleCreate = () => {
    setIsUploadOpen(true);
  };
  const handleClose = () => {
    setIsUploadOpen(false);
  };
  return (
    <div className="sidebar">
      <img className="logo" src={logo} alt="" />
      <SidebarItem image={home} title="Home" />
      <SidebarItem image={search} title="Search" />
      <SidebarItem image={explore} title="Explore" />
      <SidebarItem image={media} title="Media" />
      <SidebarItem image={message} title="Messages" />
      <SidebarItem image={heart} title="Notifications" />
      <SidebarItem onClick={handleCreate} image={create} title="Create" />
      <div className="sidebarItem">
        <img className="profile__img" src={profile} alt="" />
        <p>Profile</p>
      </div>
      <div className="sidebar__bottom">
        <SidebarItem image={thread} title="Threads" />
        <SidebarItem image={more} title="More" />
      </div>
      {isUploadOpen && <Upload handleClose={handleClose} />}
    </div>
  );
};

export default Sidebar;
