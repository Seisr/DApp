import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import Record5_abi from "./abi/Record5_abi.json";
import Auth3_abi from "./abi/Auth3_abi.json";
import Auth_abi from "./abi/Auth_abi.json";
import QLMH2_abi from "./abi/QLMH2_abi.json";
import "./App.css";
import useDidMountEffect from "./useDidMountEffect";
import SignUp from "./Screens/SignUp";
import SignIn from "./Screens/SignIn";
import Result from "./Screens/Result/Result";
import AddResult from "./Screens/AddResult/AddResult";
import Home from "./Screens/Home";
import Auth2_abi from "./abi//Auth2_abi.json";
import "bootstrap/dist/css/bootstrap.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
const ethers = require("ethers");

export const Context = React.createContext();

const SimpleStore = () => {
  const [currentUser, setCurrentUser] = useState(false);
  const [defaultAccount, setDefaultAccount] = useState(false);
  const [provider, setProvider] = useState([]);
  const [signer, setSigner] = useState([]);
  const [contract, setContract] = useState(null);
  const [authContract, setAuthContract] = useState(null);
  const [role, setRole] = useState("");

  return (
    <Context.Provider
      value={{
        user: [currentUser, setCurrentUser],
        acc: [defaultAccount, setDefaultAccount],
        prov: [provider, setProvider],
        sig: [signer, setSigner],
        contr: [contract, setContract],
        authCon: [authContract, setAuthContract],
        rol: [role, setRole],
      }}
    >
      <>
        <Header />
        <h1>{currentUser ? "User" : "No user"}</h1>
        <h1>{defaultAccount ? "Acc" : "No acc"}</h1>
        <h1>{provider ? "Prov" : "No Prov"}</h1>
        <h1>{signer ? "Signer" : "No Sign"}</h1>
        <h1>{contract ? "Contract" : "No Contr"}</h1>
        <h1>{authContract ? "AuthContract" : "No authCon"}</h1>
        <Routes>
          <Route path="/" element={<Result />} />
          <Route path="/result" element={<Result />} />
          <Route path="/add-result" element={<AddResult />} />
          <Route path="/login" element={<SignIn />} />
        </Routes>
      </>
    </Context.Provider>
  );
};

export default SimpleStore;
