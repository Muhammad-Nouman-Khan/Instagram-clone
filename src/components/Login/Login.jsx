import React, { useState } from "react";
import "./Login.css";
import logo from "../../assets/logoBlack.svg";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { login } from "../../store/userSlice";
import { auth } from "../../firebase";

const Login = () => {
  const [signUp, setSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const dispatch = useDispatch();

  const register = (e) => {
    e.preventDefault();
    if (!name) {
      return alert("Please enter your Full Name");
    } else if (!userName) {
      return alert("Please enter your Username");
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userAuth) => {
        updateProfile(userAuth.user, {
          displayName: name,
          photoURL: profilePic,
        }).then(() => {
          dispatch(
            login({
              email: userAuth.user.email,
              uid: userAuth.user.uid,
              displayName: name,
              photoUrl: profilePic,
            })
          );
        });
      })
      .catch((error) => alert(error.message));
  };

  const loginToApp = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userAuth) => {
        dispatch(
          login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            displayName: userAuth.user.displayName,
            photoUrl: userAuth.user.photoURL,
          })
        );
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <div className="login__container">
        <img src={logo} alt="" />
        <form>
          <input
            type="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
          {signUp && (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
            />
          )}
          {signUp && (
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Username"
            />
          )}
          {signUp && (
            <input
              type="text"
              value={profilePic}
              onChange={(e) => setProfilePic(e.target.value)}
              placeholder="Profile pic URL (Optional)"
            />
          )}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          {signUp ? (
            <button type="submit" onClick={register}>
              Sign up
            </button>
          ) : (
            <button type="submit" onClick={loginToApp}>
              Login
            </button>
          )}
          {!signUp && <span className="forgot__pass">Forgot password?</span>}
          <p>
            {!signUp ? "Don't have an account?" : "Have an account?"}
            <span onClick={() => setSignUp(!signUp)} className="sign__up">
              {!signUp ? "Sign up" : "Sign in"}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
