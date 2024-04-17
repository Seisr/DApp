import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
const ethers = require("ethers");

function App() {
  const [walletAddress, setWalletAddress] = useState("");
  const [userBalance, setUserBalance] = useState("");
  async function requestAccount() {
    console.log("Requesting..");
    if (window.ethereum) {
      console.log("detected");
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
        getUserBalance(accounts[0]);
        console.log(accounts);
      } catch (e) {
        console.log("Error connecting...");
      }
    } else {
      console.log("Metamask not detected");
    }
  }

  const getUserBalance = (address) => {
    window.ethereum
      .request({ method: "eth_getBalance", params: [address, "latest"] })
      .then((balance) => {
        setUserBalance(ethers.utils.formatEther(balance));
      });
  };

  async function connectWallet() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
    }
  }

  const chainChangedHandler = () => {
    window.location.reload();
  };

  window.ethereum.on("accountsChanged", requestAccount);
  window.ethereum.on("chainChanged", chainChangedHandler);

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={connectWallet}>Connect Wallet</button>
        <h3>Wallet Addres: {walletAddress}</h3>
        <h3>Balance: {userBalance}</h3>
      </header>
    </div>
  );
}

export default App;
