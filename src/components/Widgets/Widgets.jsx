import React from "react";
import "./Widgets.css";
import { Avatar } from "@mui/material";
import { profile } from "../../assets/assets";
import { useDispatch } from "react-redux";
import { logout } from "../../store/userSlice";
import { auth } from "../../firebase";
import amazon from "../../assets/amazon.jpeg";
import google from "../../assets/google.jpeg";
import Logo from "../../assets/Logo.png";
const Widgets = ({ name, email, pic }) => {
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
    <div className="widgets">
      <div className="profiles">
        <Avatar
          className="widgets__avatar"
          style={{ fontSize: "20px" }}
          src={pic}
        >
          {name ? name[0] : ""}
        </Avatar>
        <div className="name">
          <h2>{name}</h2>
          <p>{email}</p>
        </div>
        <button onClick={logoutOfApp}>Switch</button>
      </div>
      <p style={{ fontSize: "15px", fontWeight: "bolder" }}>
        Suggested for you
      </p>
      <div className="profiles">
        <Avatar src={amazon} />
        <div className="name">
          <h2>Amazon</h2>
          <p>@amazon</p>
        </div>
        <button>Follow</button>
      </div>
      <div className="profiles">
        <Avatar src={google} />
        <div className="name">
          <h2>Google</h2>
          <p>@google</p>
        </div>
        <button>Follow</button>
      </div>
      <div className="profiles">
        <Avatar src={Logo} />
        <div className="name">
          <h2>LinkedIn</h2>
          <p>@linkedin</p>
        </div>
        <button>Follow</button>
      </div>
      <div className="profiles">
        <Avatar src={profile} />
        <div className="name">
          <h2>noman_younas</h2>
          <p>Nouman</p>
        </div>
        <button>Follow</button>
      </div>
    </div>
  );
};

export default Widgets;
