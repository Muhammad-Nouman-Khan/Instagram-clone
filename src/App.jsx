import React from "react";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Feed from "./components/Feed/Feed";
import Widgets from "./components/Widgets/Widgets";
import { db } from "./firebase";
import { useEffect } from "react";
const App = () => {
  return (
    <div className="container">
      <Sidebar />
      <Feed />
      <Widgets />
    </div>
  );
};

export default App;
