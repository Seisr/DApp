import React from "react";
import "./Main.css";
const Main = () => {
  return (
    <div className="containerMain">
      <img src={require("../assets/sollogo.png")} className="imageSol" />
      <div>
        <div className="title">Course Management System</div>
        <div className="description">
          A 100% decentralized application for managing student's record
        </div>
      </div>
    </div>
  );
};

export default Main;
