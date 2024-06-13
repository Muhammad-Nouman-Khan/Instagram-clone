import React, { useEffect } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Feed from "./components/Feed/Feed";
import Widgets from "./components/Widgets/Widgets";
import { useDispatch, useSelector } from "react-redux";
import Login from "./components/Login/Login";
import { login, logout, selectUser } from "./store/userSlice";
import { auth } from "./firebase";
const App = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
            photoUrl: userAuth.photoURL,
            displayUserName: userAuth.displayUserName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);

  return (
    <>
      {!user ? (
        <Login />
      ) : (
        <div className="container">
          <Sidebar />
          <Feed />
          <Widgets name={user.displayName} email={user.email} />
        </div>
      )}
    </>
  );
};

export default App;
