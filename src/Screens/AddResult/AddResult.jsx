import React, { useEffect, useState } from "react";
import "./AddResult.css";

const AddResult = () => {
  let role = "teacher";
  const contractAddress = "0xD2cF4af28a0434B3E6f054300D89dd3bf19D900C"; //QLMH3
  // const authAddress = "0xfB4d5Ce1583b01c5a50264e833eCdF7F0C98a87a"; //Auth
  const authAddress = "0x8497cB9D99Bfe76a3577cE639a6eeEd0CC28dFE2"; //Auth2

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
  // const [role, setRole] = useState("");

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
  return (
    <>
      <div className="container">
        {role === "teacher" && (
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
        )}
      </div>
    </>
  );
};

export default AddResult;
