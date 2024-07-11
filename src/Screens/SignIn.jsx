import "bootstrap/dist/css/bootstrap.min.css";
import React, { useContext, useEffect, useState } from "react";
import Auth2_abi from "../abi/Auth2_abi.json";
import QLMH2_abi from "../abi/QLMH2_abi.json";
import "./SignIn.css";
import { Context } from "../App";
const ethers = require("ethers");

const SignIn = () => {
  // const contractAddress = "0xD2cF4af28a0434B3E6f054300D89dd3bf19D900C"; //QLMH3
  // const contractAddress = "0x09C1e83c85398Fd80D84C8d8D01070fB330A8d9a"; //QLMH3
  const contractAddress = "0xAc694F16C05795ef9f8A0CD2D5095a7C35290e90"; //QLMH3

  // const authAddress = "0x8497cB9D99Bfe76a3577cE639a6eeEd0CC28dFE2"; //Auth2
  // const authAddress = "0xb4f80Aed9F18a2C8F4E5bBAcf388550A6DEb8521"; //Auth2
  // const authAddress = "0x7b97FAEBf26aaBA06e8c0C3fe98974da0fa6b172"; //Auth2
  const authAddress = "0x73c48000f76fCd0f372c464972750B75054885e2"; //Auth2

  const [errorMessage, setErrorMessage] = useState([]);
  // const [defaultAccount, setDefaultAccount] = useState([]);
  const [currentContractVal, setCurrentContractVal] = useState([]);
  const [start, setStart] = useState(0);
  const [update, setUpdate] = useState(0);
  const [delete1, setDelete1] = useState(0);
  const [batch, setBatch] = useState([]);
  const [role, setRole] = useState("");

  const { user, acc, prov, sig, contr, authCon, connButton } =
    React.useContext(Context);
  const [connButtonText, setConnButtonText] = connButton;
  const [provider, setProvider] = prov;
  const [signer, setSigner] = sig;
  const [contract, setContract] = contr;
  const [authContract, setAuthContract] = authCon;
  const [defaultAccount, setDefaultAccount] = acc;
  const [currentUser, setCurrentUser] = user;

  useEffect(() => {
    checkCurrentAccount();
  }, []);

  const checkCurrentAccount = async () => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", async () => {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        setDefaultAccount(accounts[0]);
      });
    }
  };

  const connectWalletHandler = async () => {
    if (window.ethereum) {
      await window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          accountChangedHandler(result[0]);
          setConnButtonText("Wallet Connected");
          setCurrentUser(true);
        });
    } else {
      setErrorMessage("Need to install Metamask!");
    }
  };

  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    updateEthers();
  };

  const updateEthers = async () => {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(tempProvider);
    let tempSigner = tempProvider.getSigner();
    setSigner(tempSigner);
    let tempContract = new ethers.Contract(
      contractAddress,
      QLMH2_abi,
      tempSigner
    );
    setContract(tempContract);
    let authContract = new ethers.Contract(authAddress, Auth2_abi, tempSigner);
    setAuthContract(authContract);
  };

  const getAll = async (event) => {
    event.preventDefault();
    let val = await contract.get();
    let array = [];
    for (let i = 0; i < val.length; i++) {
      let temp = {};
      let data = val[i];
      console.log(data);
      let diemTB =
        (data[7].toNumber() + data[8].toNumber() + data[9].toNumber()) / 3;
      temp = {
        idRec: data[0].toNumber(),
        idLop: data[1].toNumber(),
        tenMon: data[2],
        idSV: data[3].toNumber(),
        tenSV: data[4],
        idGV: data[5].toNumber(),
        tenGV: data[6],
        diemTH: data[7].toNumber(),
        diemGK: data[8].toNumber(),
        diemCK: data[9].toNumber(),
        diemTB: diemTB,
      };
      // console.log(temp);
      array.push(temp);
      setCurrentContractVal(array);
    }
    const time = Date.now();
    // console.log(array);
    console.log(batch);

    // console.log(
    //   `Thời gian cần để record mới được thêm vào blockchain: ${time - start}`
    // );
    // console.log(
    //   `Thời gian cần để record mới được cập nhật vào blockchain: ${
    //     time - update
    //   }`
    // );
    // console.log(
    //   `Thời gian cần để record mới được xóa khỏi blockchain: ${time - delete1}`
    // );
  };

  const setHandler = async (event) => {
    event.preventDefault();
    let idRec = event.target.idRec.value;
    idRec = Number(idRec);
    let idLop = event.target.idLop.value;
    idLop = Number(idLop);
    let idSV = event.target.idSV.value;
    idSV = Number(idSV);
    let idGV = event.target.idGV.value;
    idGV = Number(idGV);
    let tenMon = event.target.tenMon.value;
    let tenSV = event.target.tenSV.value;
    let tenGV = event.target.tenGV.value;
    let diemTH = event.target.diemTH.value;
    diemTH = Number(diemTH);
    let diemGK = event.target.diemGK.value;
    diemGK = Number(diemGK);
    let diemCK = event.target.diemCK.value;
    diemCK = Number(diemCK);
    let data = [
      idLop,
      tenMon,
      idSV,
      tenSV,
      idGV,
      tenGV,
      diemTH,
      diemGK,
      diemCK,
    ];
    let batch2 = [...batch, data];

    if (event.nativeEvent.submitter.name === "addDiem") {
      const start1 = Date.now();
      setStart(start1);
      await contract.insertRec(
        idLop,
        tenMon,
        idSV,
        tenSV,
        idGV,
        tenGV,
        diemTH,
        diemGK,
        diemCK
      );
      //   .then(() => {
      //     getAll(event);
      //   });
      // let test = getAll(event);
      // console.log(test);
      const end = Date.now();
      console.log(
        `Thời gian "Thêm điểm" đến khi block mới được đào ${end - start1}`
      );
    } else if (event.nativeEvent.submitter.name === "updateDiem") {
      const update = Date.now();
      setUpdate(update);
      await contract.updateRecById(
        idRec,
        idLop,
        tenMon,
        idSV,
        tenSV,
        idGV,
        tenGV,
        diemTH,
        diemGK,
        diemCK
      );
    } else if (event.nativeEvent.submitter.name === "addBatch") {
      setBatch(batch2);
    } else if (event.nativeEvent.submitter.name === "addBatchToDiem") {
      await contract.insertRec2(batch);
      setBatch([]);
    }
    const end = Date.now();
    // console.log(start);
  };

  const deleteRecord = (event) => {
    event.preventDefault();
    const time = Date.now();
    setDelete1(time);
    let idRec = event.target.idRec.value;
    contract.deleteRecById(idRec);
  };

  const register = async (event) => {
    event.preventDefault();
    let addr = event.target.addr.value;
    let name = event.target.name.value;
    let password = event.target.password.value;
    let role = event.target.role.value;
    await authContract.register(addr, name, password, role);
  };

  const checkRole = async (event) => {
    event.preventDefault();
    let checkRole = await authContract.checkRole(event.target.authAddr.value);
    console.log(checkRole);
  };

  const checkRole2 = async () => {
    let checkRole = await authContract.checkRole(defaultAccount);
    let checkRole2 = ethers.utils.parseBytes32String(checkRole);
    setRole(checkRole2);
    console.log(checkRole2);
  };

  const setRoleAdd = async (event) => {
    event.preventDefault();
    let addr = event.target.address1.value;
    let role = event.target.role1.value;
    await authContract.addRole(addr, role);
    console.log(addr);
    console.log(role);
  };
  return (
    <div className="container">
      <div className="signIn">
        {defaultAccount && <h3>Address connected: {defaultAccount}</h3>}

        <button
          className="loginBtn btn btn-primary"
          onClick={connectWalletHandler}
        >
          {connButtonText}
        </button>
        {errorMessage}
      </div>
    </div>
    // <form className="formLogin">
    //   <div className="input1">
    //     <label htmlFor="address">Address</label>
    //     <input id="address" placeholder="0x12345" type="text" />
    //   </div>
    //   <div className="input2">
    //     <label htmlFor="password">Password</label>
    //     <input id="password" type="text" />
    //   </div>
    //   <button type={"submit"}>Sign in</button>
    // </form>
  );
};

export default SignIn;
