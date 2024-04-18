import "bootstrap/dist/css/bootstrap.css";
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AddResult from "./Screens/AddResult/AddResult";
import Main from "./Screens/Main";
import Manage from "./Screens/Manage/Manage";
import Result from "./Screens/Result/Result";
import SignIn from "./Screens/SignIn";
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
  const [connButtonText, setConnButtonText] = useState("Connect Wallet");

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
        connButton: [connButtonText, setConnButtonText],
      }}
    >
      <>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/result" element={<Result />} />
          <Route path="/add-result" element={<AddResult />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/manage" element={<Manage />} />
        </Routes>
      </>
    </Context.Provider>
  );
};

export default SimpleStore;
