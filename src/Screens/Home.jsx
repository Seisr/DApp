import React, { useEffect, useState } from "react";
import "../App.css";
import Auth_abi from "../abi/Auth_abi.json";
import QLMH2_abi from "../abi/QLMH2_abi.json";
const ethers = require("ethers");

const Home = () => {
  const contractAddress = "0xD2cF4af28a0434B3E6f054300D89dd3bf19D900C"; //QLMH3
  const authAddress = "0xfB4d5Ce1583b01c5a50264e833eCdF7F0C98a87a"; //Auth

  const [errorMessage, setErrorMessage] = useState([]);
  const [defaultAccount, setDefaultAccount] = useState([]);
  const [connButtonText, setConnButtonText] = useState("Connect Wallet");
  const [currentContractVal, setCurrentContractVal] = useState([]);
  const [provider, setProvider] = useState([]);
  const [signer, setSigner] = useState([]);
  const [contract, setContract] = useState(null);
  const [authContract, setAuthContract] = useState(null);
  const [start, setStart] = useState(0);
  const [update, setUpdate] = useState(0);
  const [delete1, setDelete1] = useState(0);
  const [batch, setBatch] = useState([]);

  useEffect(() => {
    connectWalletHandler();
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(tempProvider);
    let tempSigner = tempProvider.getSigner();
    setSigner(tempSigner);
    let authContract = new ethers.Contract(authAddress, Auth_abi, tempSigner);
    setAuthContract(authContract);
    let tempContract = new ethers.Contract(
      contractAddress,
      QLMH2_abi,
      tempSigner
    );
    setContract(tempContract);
    checkCurrentAccount();
  }, []);

  const checkCurrentAccount = () => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", async () => {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        setDefaultAccount(accounts[0]);
      });
    }
  };

  const connectWalletHandler = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          accountChangedHandler(result[0]);
          setConnButtonText("Wallet Connected");
        });
    } else {
      setErrorMessage("Need to install Metamask!");
    }
  };
  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    updateEthers();
  };

  const updateEthers = () => {
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
    let authContract = new ethers.Contract(authAddress, Auth_abi, tempSigner);
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
  return (
    <div className="container">
      <h3>"Get/Set Interaction with contract"</h3>
      <button onClick={connectWalletHandler}>{connButtonText}</button>
      <h3>Address: {defaultAccount}</h3>
      <form onSubmit={getAll}>
        <button type={"submit"}>Get All</button>
      </form>
      <form className="form-add-record" onSubmit={setHandler}>
        <div className="form-detail">
          <div className="input-box">
            {" "}
            <label htmlFor="idRec">ID Rec</label>
            <input id="idRec" type="text" placeholder="Mã record" />
          </div>
          <div className="input-box">
            {" "}
            <label htmlFor="idLop">ID Lớp</label>
            <input id="idLop" type="text" placeholder="Mã Lớp" />
          </div>
          <div className="input-box">
            {" "}
            <label htmlFor="idSV">ID Sinh viên</label>
            <input id="idSV" type="text" placeholder="Mã Sinh Viên" />
          </div>
          <div className="input-box">
            {" "}
            <label htmlFor="idGV">ID Giáo viên</label>
            <input id="idGV" type="text" placeholder="Mã giáo viên" />
          </div>
          <div className="input-box">
            {" "}
            <label htmlFor="tenSV">Tên Giáo Viên</label>
            <input id="tenGV" type="text" placeholder="Kha Nguyễn" />
          </div>
          <div className="input-box">
            {" "}
            <label htmlFor="tenMon">Tên Môn</label>
            <input id="tenMon" type="text" placeholder="Toán" />
          </div>
          <div className="input-box">
            {" "}
            <label htmlFor="tenSV">Tên Sinh Viên</label>
            <input id="tenSV" type="text" placeholder="Bảo Kha" />
          </div>
          <div className="input-box">
            {" "}
            <label htmlFor="diemTH">Điểm Thực hành</label>
            <input id="diemTH" type="text" placeholder="9" />
          </div>
          <div className="input-box">
            <label htmlFor="diemGK">Điểm Giữa Kỳ</label>
            <input id="diemGK" type="text" placeholder="9" />
          </div>
          <div className="input-box">
            <label htmlFor="diemCK">Điểm Cuối Kỳ</label>
            <input id="diemCK" type="text" placeholder="9" />
          </div>
          <div className="input-box">
            {" "}
            {/* <button type={"submit"} name="addDiem">
          Thêm điểm
        </button> */}
            <button type={"submit"} name="addBatch">
              Add to Batch
            </button>
            <button type={"submit"} name="addBatchToDiem">
              Add Batch to Diem
            </button>
            <button type={"submit"} name="updateDiem">
              Update Record
            </button>
          </div>
        </div>
      </form>
      <table className="table">
        <thead>
          <tr>
            <th>ID Rec</th>
            <th>ID Lớp </th>
            <th>ID Sinh Viên </th>
            <th>Tên Sinh Viên </th>
            <th>Tên Môn </th>
            <th>ID Giáo Viên</th>
            <th>Điểm TH </th>
            <th>Điểm GK</th>
            <th>Điểm CK </th>
            <th>Diem TB </th>
          </tr>
        </thead>
        {currentContractVal?.map((record, i) => {
          if (record.idRec !== 0) {
            return (
              <>
                <tbody key={i}>
                  <tr>
                    <td>{record.idRec}</td>
                    <td>{record.idLop}</td>
                    <td>{record.idSV}</td>
                    <td>{record.tenSV}</td>
                    <td>{record.tenMon}</td>
                    <td>{record.idGV}</td>
                    <td>{record.diemTH}</td>
                    <td>{record.diemGK}</td>
                    <td>{record.diemCK}</td>
                    <td>{record.diemTB}</td>
                  </tr>
                </tbody>
              </>
            );
          }
        })}
      </table>
      <p></p>
      {errorMessage}
      <form onSubmit={deleteRecord}>
        <label htmlFor="idRec">ID Record</label>
        <input id="idRec"></input>
        <button type={"submit"}>Delete</button>
      </form>

      <form onSubmit={register}>
        <label htmlFor="addr">Address</label>
        <input id="addr"></input>
        <label htmlFor="name">Name</label>
        <input id="name"></input>
        <label htmlFor="password">Password</label>
        <input id="password"></input>
        <label htmlFor="role">Role</label>
        <input id="role"></input>
        <button type={"submit"}>Register</button>
      </form>
      <p>Check is has role Teacher</p>
      <form onSubmit={checkRole}>
        <label>Address</label>
        <input id="authAddr" type="text"></input>
        <button type={"submit"}>Check role teacher</button>
      </form>
    </div>
  );
};

export default Home;
