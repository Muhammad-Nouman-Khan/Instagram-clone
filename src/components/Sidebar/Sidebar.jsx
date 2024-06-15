import React, { useState } from "react";
import "./Sidebar.css";
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import { logout, selectUser } from "../../store/userSlice";
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
import { useUpload } from "../UploadContext";
import SidebarItem from "./SidebarItem";
import Upload from "./Upload";
import { useDispatch } from "react-redux";
import { auth } from "../../firebase";
const Sidebar = () => {
  const { openUploadBar } = useUpload();

  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const logoutOfApp = () => {
    dispatch(logout());
    auth
      .signOut()
      .then(() => {
        console.log("User logged out successfully");
      })
      .catch((error) => {
        console.error("Error signing out:", error.message);
      });
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
      <SidebarItem onClick={openUploadBar} image={create} title="Create" />
      <div className="sidebarItem">
        <Avatar
          onClick={logoutOfApp}
          style={{
            width: "30px",
            height: "30px",
            fontSize: "15px",
          }}
          className="profile__img"
          src={user?.photoUrl || ""}
        >
          {user?.displayName ? user.displayName[0] : ""}
        </Avatar>
        <p>Profile</p>
      </div>
      <div className="sidebar__bottom">
        <SidebarItem image={thread} title="Threads" />
        <SidebarItem image={more} title="More" />
      </div>
      {openUploadBar && <Upload />}
    </div>
  );
};

export default Sidebar;
