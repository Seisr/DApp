import "bootstrap/dist/css/bootstrap.css";
import React, { useEffect, useState } from "react";
import "./Result.css";
import Auth2_abi from "../../abi/Auth2_abi.json";
import QLMH2_abi from "../../abi/QLMH2_abi.json";
import { Context } from "../../App";

const ethers = require("ethers");
const Result = () => {
  // const contractAddress = "0xD2cF4af28a0434B3E6f054300D89dd3bf19D900C"; //QLMH3
  // const contractAddress = "0x09C1e83c85398Fd80D84C8d8D01070fB330A8d9a"; //QLMH3
  // const contractAddress = "0x6ceeCca7c951BaB459593898830558C01CCba196"; //QLMH3
  const contractAddress = "0xAc694F16C05795ef9f8A0CD2D5095a7C35290e90"; //QLMH3

  // const authAddress = "0x8497cB9D99Bfe76a3577cE639a6eeEd0CC28dFE2"; //Auth2
  // const authAddress = "0xb4f80Aed9F18a2C8F4E5bBAcf388550A6DEb8521"; //Auth2
  // const authAddress = "0x7b97FAEBf26aaBA06e8c0C3fe98974da0fa6b172"; //Auth2
  const authAddress = "0x041829DA8fDEe3A6C9368Da6a88049221F70289c"; //Auth2

  console.log(`thời gian cần để thêm 10 record mới vào blockchain: 21285`);

  const [errorMessage, setErrorMessage] = useState([]);
  const [connButtonText, setConnButtonText] = useState("Connect Wallet");
  const [currentContractVal, setCurrentContractVal] = useState([]);
  const [start, setStart] = useState(0);
  const [update, setUpdate] = useState(0);
  const [delete1, setDelete1] = useState(0);
  const [batch, setBatch] = useState([]);
  const [role, setRole] = useState("");
  const [disable, setDisable] = useState([]);

  const { user, acc, prov, sig, contr, authCon } = React.useContext(Context);
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
    try {
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

      console.log(
        `Thời gian cần để record mới được thêm vào blockchain: ${time - start}`
      );
      // console.log(
      //   `Thời gian cần để record mới được cập nhật vào blockchain: ${
      //     time - update
      //   }`
      // );
      // console.log(
      //   `Thời gian cần để record mới được xóa khỏi blockchain: ${time - delete1}`
      // );
    } catch (e) {
      console.log(e);
    }
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
    try {
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
    } catch (error) {
      if (error.code === 4001) {
        console.log(`user rejected request`);
      } else {
        console.log(error);
      }
    }
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
    let checkRole2 = ethers.utils.parseBytes32String(checkRole);
    console.log(checkRole2);
  };

  const checkRole2 = async () => {
    let checkRole = await authContract.checkRole(defaultAccount);
    let checkRole2 = ethers.utils.parseBytes32String(checkRole);
    setRole(checkRole2);
    console.log(checkRole2);
  };

  const handleChangeIdLop = (i) => {
    const newData = currentContractVal.map((record, index) => {
      if (i === index) {
        return {
          ...record,
          idLop: Number(document.querySelector(`#idLop${i}`).value),
        };
      }
      return record;
    });
    setCurrentContractVal(newData);
  };

  const toggleInput = (id) => {
    if (disable.includes(id)) {
      setDisable(disable.filter((item) => item !== id));
    } else {
      setDisable([...disable, id]);
    }
  };

  const handleChangeIdSV = (i) => {
    const newData = currentContractVal.map((record, index) => {
      if (i === index) {
        return {
          ...record,
          idSV: Number(document.querySelector(`#idSV${i}`).value),
        };
      }
      return record;
    });
    setCurrentContractVal(newData);
  };

  const handleChangeTenSV = (i) => {
    const newData = currentContractVal.map((record, index) => {
      if (i === index) {
        return {
          ...record,
          tenSV: ethers.utils.formatBytes32String(
            document.querySelector(`#tenSV${i}`).value
          ),
        };
      }
      return record;
    });
    setCurrentContractVal(newData);
  };
  const handleChangeTenMon = (i) => {
    const newData = currentContractVal.map((record, index) => {
      if (i === index) {
        return {
          ...record,
          tenMon: ethers.utils.formatBytes32String(
            document.querySelector(`#tenMon${i}`).value
          ),
        };
      }
      return record;
    });
    setCurrentContractVal(newData);
  };
  const handleChangeIdGV = (i) => {
    const newData = currentContractVal.map((record, index) => {
      if (i === index) {
        return {
          ...record,
          idGV: Number(document.querySelector(`#idGV${i}`).value),
        };
      }
      return record;
    });
    setCurrentContractVal(newData);
  };
  const handleChangeTenGV = (i) => {
    const newData = currentContractVal.map((record, index) => {
      if (i === index) {
        return {
          ...record,
          tenGV: ethers.utils.formatBytes32String(
            document.querySelector(`#tenGV${i}`).value
          ),
        };
      }
      return record;
    });
    setCurrentContractVal(newData);
  };

  const handleChangeDiemTH = (i) => {
    const newData = currentContractVal.map((record, index) => {
      if (i === index) {
        return {
          ...record,
          diemTH: Number(document.querySelector(`#diemTH${i}`).value),
        };
      }
      return record;
    });
    setCurrentContractVal(newData);
  };

  const handleChangeDiemGK = (i) => {
    const newData = currentContractVal.map((record, index) => {
      if (i === index) {
        return {
          ...record,
          diemGK: Number(document.querySelector(`#diemGK${i}`).value),
        };
      }
      return record;
    });
    setCurrentContractVal(newData);
  };
  const handleChangeDiemCK = (i) => {
    const newData = currentContractVal.map((record, index) => {
      if (i === index) {
        return {
          ...record,
          diemCK: Number(document.querySelector(`#diemCK${i}`).value),
        };
      }
      return record;
    });
    setCurrentContractVal(newData);
    console.log(newData);
  };

  const editRecord = async (id, i) => {
    let idRec = document.querySelector(`#idRec${i}`).value;
    idRec = Number(idRec);
    let idLop = document.querySelector(`#idLop${i}`).value;
    idLop = Number(idLop);
    let idSV = document.querySelector(`#idSV${i}`).value;
    idSV = Number(idSV);
    let idGV = document.querySelector(`#idGV${i}`).value;
    idGV = Number(idGV);
    let tenMon = document.querySelector(`#tenMon${i}`).value;
    let tenMon2 = ethers.utils.formatBytes32String(tenMon);
    let tenSV = document.querySelector(`#tenSV${i}`).value;
    let tenSV2 = ethers.utils.formatBytes32String(tenSV);
    let tenGV = document.querySelector(`#tenGV${i}`).value;
    let tenGV2 = ethers.utils.formatBytes32String(tenGV);
    let diemTH = document.querySelector(`#diemTH${i}`).value;
    diemTH = Number(diemTH);
    let diemGK = document.querySelector(`#diemGK${i}`).value;
    diemGK = Number(diemGK);
    let diemCK = document.querySelector(`#diemCK${i}`).value;
    diemCK = Number(diemCK);
    let data = [
      idRec,
      idLop,
      tenMon2,
      idSV,
      tenSV2,
      idGV,
      tenGV2,
      diemTH,
      diemGK,
      diemCK,
    ];
    try {
      await contract.updateRecById(
        idRec,
        idLop,
        tenMon2,
        idSV,
        tenSV2,
        idGV,
        tenGV2,
        diemTH,
        diemGK,
        diemCK
      );
      toggleInput(id);
      const newData = currentContractVal.map((record, index) => {
        if (i === index) {
          return {
            ...record,
            diemTB: (diemTH + diemGK + diemCK) / 3,
          };
        }
        return record;
      });
      setCurrentContractVal(newData);
    } catch (error) {
      if (error.code === 4001) {
        console.log(`user rejected request`);
      } else {
        console.log(error);
      }
    }
  };

  const deleteRecord1 = (id) => {
    contract.deleteRecById(id);
  };

  return (
    <div className="container">
      <form onSubmit={getAll}>
        <div className="button2">
          <button className="btn btn-primary" type={"submit"}>
            Get All
          </button>
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
            <th>Tên Giáo Viên</th>
            <th>Điểm TH </th>
            <th>Điểm GK</th>
            <th>Điểm CK </th>
            <th>Diem TB </th>
          </tr>
        </thead>
        {currentContractVal?.map((record, i) => {
          {
            return (
              <>
                <tbody key={i}>
                  <tr>
                    <td>
                      <input
                        id={`idRec${i}`}
                        className="inputAddResult"
                        value={record.idRec}
                        disabled={true}
                        size="3"
                      />
                    </td>
                    <td>
                      <input
                        id={`idLop${i}`}
                        className="inputAddResult"
                        value={record.idLop}
                        disabled={!disable.includes(record.idRec)}
                        size="3"
                        onChange={() => handleChangeIdLop(i)}
                      />
                    </td>
                    <td>
                      <input
                        id={`idSV${i}`}
                        className="inputAddResult"
                        value={record.idSV}
                        disabled={!disable.includes(record.idRec)}
                        size="3"
                        onChange={() => handleChangeIdSV(i)}
                      />
                    </td>

                    <td>
                      <input
                        id={`tenSV${i}`}
                        className="inputAddResult"
                        value={ethers.utils.parseBytes32String(record.tenSV)}
                        disabled={!disable.includes(record.idRec)}
                        size="10"
                        onChange={() => handleChangeTenSV(i)}
                      />
                    </td>
                    <td>
                      <input
                        id={`tenMon${i}`}
                        className="inputAddResult"
                        value={ethers.utils.parseBytes32String(record.tenMon)}
                        disabled={!disable.includes(record.idRec)}
                        size="10"
                        onChange={() => handleChangeTenMon(i)}
                      />
                    </td>
                    <td>
                      <input
                        id={`idGV${i}`}
                        className="inputAddResult"
                        value={record.idGV}
                        disabled={!disable.includes(record.idRec)}
                        size="3"
                        onChange={() => handleChangeIdGV(i)}
                      />
                    </td>
                    <td>
                      <input
                        id={`tenGV${i}`}
                        className="inputAddResult"
                        value={ethers.utils.parseBytes32String(record.tenGV)}
                        disabled={!disable.includes(record.idRec)}
                        size="13"
                        onChange={() => handleChangeTenGV(i)}
                      />
                    </td>
                    <td>
                      <input
                        id={`diemTH${i}`}
                        className="inputAddResult"
                        value={record.diemTH}
                        disabled={!disable.includes(record.idRec)}
                        size="3"
                        onChange={() => handleChangeDiemTH(i)}
                      />
                    </td>
                    <td>
                      <input
                        id={`diemGK${i}`}
                        className="inputAddResult"
                        value={record.diemGK}
                        disabled={!disable.includes(record.idRec)}
                        size="3"
                        onChange={() => handleChangeDiemGK(i)}
                      />
                    </td>
                    <td>
                      <input
                        id={`diemCK${i}`}
                        className="inputAddResult"
                        value={record.diemCK}
                        disabled={!disable.includes(record.idRec)}
                        size="3"
                        onChange={() => handleChangeDiemCK(i)}
                      />
                    </td>
                    <td>
                      <input
                        id={`diemTB${i}`}
                        className="inputAddResult"
                        value={record.diemTB}
                        disabled={true}
                        size="3"
                      />
                    </td>
                    <td>
                      {disable.includes(record.idRec) === false ? (
                        <button
                          className="btn btn-warning"
                          type={"submit"}
                          // onClick={() => editRecord(record.idRec)}
                          // onClick={() => show(record.idRec)}
                          onClick={() => toggleInput(record.idRec)}
                        >
                          Edit
                        </button>
                      ) : (
                        <button
                          className="btn btn-warning"
                          type={"submit"}
                          onClick={() => editRecord(record.idRec, i)}
                          // onClick={() => setDisable(!disable)}
                        >
                          Update
                        </button>
                      )}
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        type={"submit"}
                        onClick={() => deleteRecord1(record.idRec)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </>
            );
          }
        })}
      </table>
      {errorMessage}
    </div>
  );
};

export default Result;
