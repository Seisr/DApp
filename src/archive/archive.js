let provider1 = new ethers.providers.Web3Provider(window.ethereum);
let signer1 = provider1.getSigner();
let contract1 = new ethers.Contract(contractAddress, QLMH2_abi, signer1);
let authContract1 = new ethers.Contract(authAddress, Auth_abi, signer1);

const getAll2 = () => {
  console.log("đang chạy getAll2");
  let array = [];
  let n = contract.getLength();
  let m = n.toNumber();
  for (let i = 0; i < m; i++) {
    let temp = {};
    let data = contract.getRecByInd(i);
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
    array.push(temp);
  }
  setCurrentContractVal(array);
  console.log(array);
};

const getListRecord2 = () => {
  // let temp1 = [...currentContractVal];
  const getA = async () => {
    const a = await contract.get();
    return a;
  };
  let a = getA().then(() => {
    let array = [];
    for (let i = 0; i < a.length; i++) {
      let temp = {};
      let data = a[i];
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
      array.push(temp);
      // temp1 = temp;
      setCurrentContractVal(array);
    }
    console.log(currentContractVal);
  });
};
const getAll = async (event) => {
  event.preventDefault();
  let array = [];
  let val2 = await contract.get();
  for (let i = 0; i < n; i++) {
    let temp = {};
    let data = await contract.getRecByInd(i);

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
    array.push(temp);
  }
  await setCurrentContractVal(array);
  console.log(array);
};

const updateRecord = async (event) => {
  const start = Date.now();
  event.preventDefault();
  let idRec = event.target.idRec.value;
  await contract.updateRecById();
  const end = Date.now();
  console.log(end - start);
};

const getAll22 = () => {
  const getA = async () => {
    const a = await contract.get();
    return a;
  };
  let a = getA().then(() => {
    let array = [];
    for (let i = 0; i < a.length; i++) {
      let temp = {};
      let data = a[i];
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
      array.push(temp);
    }
    console.log(array);
    setCurrentContractVal(array);
  });
};
const firstUpdate = useRef(true);
let flag = false;
