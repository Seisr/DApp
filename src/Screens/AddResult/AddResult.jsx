import React, { useEffect, useState } from "react";
import "./AddResult.css";
import Auth2_abi from "../../abi/Auth2_abi.json";
import QLMH2_abi from "../../abi/QLMH2_abi.json";
import { Context } from "../../App";
const ethers = require("ethers");

const AddResult = () => {
  // const contractAddress = "0xD2cF4af28a0434B3E6f054300D89dd3bf19D900C"; //QLMH3
  // const contractAddress = "0x09C1e83c85398Fd80D84C8d8D01070fB330A8d9a"; //QLMH3
  const contractAddress = "0xAc694F16C05795ef9f8A0CD2D5095a7C35290e90"; //QLMH3
  // const authAddress = "0x8497cB9D99Bfe76a3577cE639a6eeEd0CC28dFE2"; //Auth2
  // const authAddress = "0xb4f80Aed9F18a2C8F4E5bBAcf388550A6DEb8521"; //Auth2
  // const authAddress = "0x7b97FAEBf26aaBA06e8c0C3fe98974da0fa6b172"; //Auth2
  const authAddress = "0x73c48000f76fCd0f372c464972750B75054885e2"; //Auth2

  const [errorMessage, setErrorMessage] = useState([]);
  const [connButtonText, setConnButtonText] = useState("Connect Wallet");
  const [currentContractVal, setCurrentContractVal] = useState([]);

  const [start, setStart] = useState(0);
  const [update, setUpdate] = useState(0);
  const [delete1, setDelete1] = useState(0);
  const [batch, setBatch] = useState([]);
  const [addBatchToDiem, setAddBatchToDiem] = useState(0);

  const { user, acc, prov, sig, contr, authCon, rol } =
    React.useContext(Context);
  const [provider, setProvider] = prov;
  const [signer, setSigner] = sig;
  const [contract, setContract] = contr;
  const [authContract, setAuthContract] = authCon;
  const [defaultAccount, setDefaultAccount] = acc;
  const [currentUser, setCurrentUser] = user;
  const [role, setRole] = rol;

  const getAll = async (event) => {
    event.preventDefault();
    let val = await contract.get();
    let array = [];
    for (let i = 0; i < val.length; i++) {
      let temp = {};
      let data = val[i];
      // console.log(data);
      let tenMon = ethers.utils.parseBytes32String(data[2]);
      let tenSV = ethers.utils.parseBytes32String(data[4]);
      let tenGV = ethers.utils.parseBytes32String(data[6]);
      let diemTB =
        (data[7].toNumber() + data[8].toNumber() + data[9].toNumber()) / 3;
      temp = {
        idRec: data[0].toNumber(),
        idLop: data[1].toNumber(),
        tenMon: tenMon,
        idSV: data[3].toNumber(),
        tenSV: tenSV,
        idGV: data[5].toNumber(),
        tenGV: tenGV,
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
    console.log(array);

    console.log(
      `Thời gian cần để record mới được thêm vào blockchain: ${
        time - addBatchToDiem
      }`
    );
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
    let tenMon2 = ethers.utils.formatBytes32String(tenMon);
    console.log(tenMon2);
    let tenMon3 = ethers.utils.hexZeroPad(tenMon2, 32);
    console.log(tenMon3);
    let tenSV = event.target.tenSV.value;
    let tenSV2 = ethers.utils.formatBytes32String(tenSV);
    let tenSV3 = ethers.utils.hexZeroPad(tenSV2, 32);
    let tenGV = event.target.tenGV.value;
    let tenGV2 = ethers.utils.formatBytes32String(tenGV);
    let tenGV3 = ethers.utils.hexZeroPad(tenGV2, 32);
    let diemTH = event.target.diemTH.value;
    diemTH = Number(diemTH);
    let diemGK = event.target.diemGK.value;
    diemGK = Number(diemGK);
    let diemCK = event.target.diemCK.value;
    diemCK = Number(diemCK);
    let data = [
      idRec,
      idLop,
      tenMon3,
      idSV,
      tenSV3,
      idGV,
      tenGV3,
      diemTH,
      diemGK,
      diemCK,
    ];
    let batch2 = [...batch, data];
    console.log(batch2);
    try {
      if (event.nativeEvent.submitter.name === "addDiem") {
        const start1 = Date.now();
        setStart(start1);
        await contract.insertRec(
          idLop,
          tenMon3,
          idSV,
          tenSV3,
          idGV,
          tenGV3,
          diemTH,
          diemGK,
          diemCK
        );

        const end = Date.now();
        console.log(
          `Thời gian "Thêm điểm" đến khi block mới được đào ${end - start1}`
        );
      } else if (event.nativeEvent.submitter.name === "addBatch") {
        setBatch(batch2);
      } else if (event.nativeEvent.submitter.name === "addBatchToDiem") {
        const addBatchToDiem = Date.now();
        setAddBatchToDiem(addBatchToDiem);
        await contract.insertRec2(batch);
        const end = Date.now();
        // console.log(
        //   `Thời gian "Thêm Batch" đến khi block mới được đào ${
        //     end - addBatchToDiem
        //   }`
        // );
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

  const deleteRecord1 = (index) => {
    const newArray = [...batch];
    newArray.splice(index, 1);
    setBatch(newArray);
  };
  return (
    <>
      <div className="container">
        {/* <form onSubmit={getAll}>
          <div className="button2">
            <button className="btn btn-primary" type={"submit"}>
              Get All
            </button>
          </div>
        </form> */}
        {role !== "student" && (
          <>
            <form className="form-add-record" onSubmit={setHandler}>
              <div className="form-detail">
                <div className="input-box">
                  {" "}
                  <label htmlFor="idRec">ID Rec</label>
                  <input
                    id="idRec"
                    type="text"
                    placeholder="Mã record"
                    disabled={true}
                  />
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
                  <button
                    className="addBatch btn btn-primary"
                    type={"submit"}
                    name="addBatch"
                  >
                    Add to Batch
                  </button>
                  <button
                    className="addBatch btn btn-primary"
                    type={"submit"}
                    name="addBatchToDiem"
                  >
                    Add Batch to BlockChain
                  </button>
                </div>
              </div>
            </form>
            <table className="table">
              <thead>
                <tr>
                  <th>ID Lớp </th>
                  <th>ID Sinh Viên </th>
                  <th>Tên Sinh Viên </th>
                  <th>Tên Môn </th>
                  <th>ID Giáo Viên</th>
                  <th>Tên Giáo Viên</th>
                  <th>Điểm TH </th>
                  <th>Điểm GK</th>
                  <th>Điểm CK </th>
                </tr>
              </thead>
              {batch?.map((record, i) => {
                {
                  return (
                    <>
                      <tbody key={i}>
                        <tr>
                          <td>
                            <input
                              id={`idLop${i}`}
                              className="inputAddResult"
                              value={record[1]}
                              disabled={true}
                              size="3"
                            />
                          </td>
                          <td>
                            <input
                              id={`idSV${i}`}
                              className="inputAddResult"
                              value={record[3]}
                              disabled={true}
                              size="3"
                            />
                          </td>

                          <td>
                            <input
                              id={`tenSV${i}`}
                              className="inputAddResult"
                              value={ethers.utils.parseBytes32String(record[4])}
                              disabled={true}
                              size="10"
                            />
                          </td>
                          <td>
                            <input
                              id={`tenMon${i}`}
                              className="inputAddResult"
                              value={ethers.utils.parseBytes32String(record[2])}
                              disabled={true}
                              size="7"
                            />
                          </td>
                          <td>
                            <input
                              id={`idGV${i}`}
                              className="inputAddResult"
                              value={record[5]}
                              disabled={true}
                              size="3"
                            />
                          </td>
                          <td>
                            <input
                              id={`tenGV${i}`}
                              className="inputAddResult"
                              value={ethers.utils.parseBytes32String(record[6])}
                              disabled={true}
                              size="13"
                            />
                          </td>
                          <td>
                            <input
                              id={`diemTH${i}`}
                              className="inputAddResult"
                              value={record[7]}
                              disabled={true}
                              size="3"
                            />
                          </td>
                          <td>
                            <input
                              id={`diemGK${i}`}
                              className="inputAddResult"
                              value={record[8]}
                              disabled={true}
                              size="3"
                            />
                          </td>
                          <td>
                            <input
                              id={`diemCK${i}`}
                              className="inputAddResult"
                              value={record[9]}
                              disabled={true}
                              size="3"
                            />
                          </td>

                          {/* <td>
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
                          </td>*/}
                          <td>
                            <button
                              className="btn btn-danger"
                              type={"submit"}
                              onClick={() => deleteRecord1(i)}
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
          </>
        )}
      </div>
    </>
  );
};

export default AddResult;
