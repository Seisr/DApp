import React from "react";
import { Context } from "../../App";
import "./Manage.css";

const ethers = require("ethers");

const Manage = () => {
  const { user, acc, prov, sig, contr, authCon } = React.useContext(Context);
  const [provider, setProvider] = prov;
  const [signer, setSigner] = sig;
  const [contract, setContract] = contr;
  const [authContract, setAuthContract] = authCon;
  const [defaultAccount, setDefaultAccount] = acc;
  const [currentUser, setCurrentUser] = user;

  const setRoleAdd = async (event) => {
    event.preventDefault();
    let addr = event.target.address1.value;
    // let addr2 = ethers.utils.formatBytes32String(addr);
    let role = event.target.role1.value;
    let role2 = ethers.utils.formatBytes32String(role);
    await authContract.addRole(addr, role2);
    console.log(addr);
    console.log(role2);
  };

  return (
    <div className="container">
      <div className="manage">
        <form onSubmit={setRoleAdd}>
          {/* <div> */}
          <label className="p-2">Address</label>
          <input id="address1" type="text" className="mr-8"></input>
          {/* </div> */}
          {/* <div> */}
          <label className="p-2">Role</label>
          <select name="role1" id="role1">
            <option value="admin">Admin</option>
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
          </select>
          {/* </div> */}
          <div className="button1">
            <button className="setRoleBtn btn btn-primary" type={"submit"}>
              Set role
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Manage;
