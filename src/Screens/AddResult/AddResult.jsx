import React, { useEffect, useState } from "react";
import "./AddResult.css";
import Auth2_abi from "../../abi/Auth2_abi.json";
import QLMH2_abi from "../../abi/QLMH2_abi.json";
import { Context } from "../../App";

const AddResult = () => {
  const contractAddress = "0xD2cF4af28a0434B3E6f054300D89dd3bf19D900C"; //QLMH3
  const authAddress = "0x8497cB9D99Bfe76a3577cE639a6eeEd0CC28dFE2"; //Auth2

  const [errorMessage, setErrorMessage] = useState([]);
  const [connButtonText, setConnButtonText] = useState("Connect Wallet");
  const [currentContractVal, setCurrentContractVal] = useState([]);

  const [start, setStart] = useState(0);
  const [update, setUpdate] = useState(0);
  const [delete1, setDelete1] = useState(0);
  const [batch, setBatch] = useState([]);

  const { user, acc, prov, sig, contr, authCon, rol } =
    React.useContext(Context);
  const [provider, setProvider] = prov;
  const [signer, setSigner] = sig;
  const [contract, setContract] = contr;
  const [authContract, setAuthContract] = authCon;
  const [defaultAccount, setDefaultAccount] = acc;
  const [currentUser, setCurrentUser] = user;
  const [role, setRole] = rol;

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
    console.log(batch2);

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

      const end = Date.now();
      console.log(
        `Thời gian "Thêm điểm" đến khi block mới được đào ${end - start1}`
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

  const deleteRecord1 = (index) => {
    const newArray = [...batch];
    newArray.splice(index, 1);
    setBatch(newArray);
  };
  return (
    <>
      <div className="container">
        {role === "teacher" && (
          <>
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
                              value={record[0]}
                              disabled={true}
                              size="3"
                            />
                          </td>
                          <td>
                            <input
                              id={`idSV${i}`}
                              className="inputAddResult"
                              value={record[2]}
                              disabled={true}
                              size="3"
                            />
                          </td>

                          <td>
                            <input
                              id={`tenSV${i}`}
                              className="inputAddResult"
                              value={record[3]}
                              disabled={true}
                              size="10"
                            />
                          </td>
                          <td>
                            <input
                              id={`tenMon${i}`}
                              className="inputAddResult"
                              value={record[1]}
                              disabled={true}
                              size="10"
                            />
                          </td>
                          <td>
                            <input
                              id={`idGV${i}`}
                              className="inputAddResult"
                              value={record[4]}
                              disabled={true}
                              size="3"
                            />
                          </td>
                          <td>
                            <input
                              id={`tenGV${i}`}
                              className="inputAddResult"
                              value={record[5]}
                              disabled={true}
                              size="7"
                            />
                          </td>
                          <td>
                            <input
                              id={`diemTH${i}`}
                              className="inputAddResult"
                              value={record[6]}
                              disabled={true}
                              size="3"
                            />
                          </td>
                          <td>
                            <input
                              id={`diemGK${i}`}
                              className="inputAddResult"
                              value={record[7]}
                              disabled={true}
                              size="3"
                            />
                          </td>
                          <td>
                            <input
                              id={`diemCK${i}`}
                              className="inputAddResult"
                              value={record[8]}
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
