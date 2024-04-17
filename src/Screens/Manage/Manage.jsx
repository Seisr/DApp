import React from "react";
import { Context } from "../../App";

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
    let role = event.target.role1.value;
    await authContract.addRole(addr, role);
    console.log(addr);
    console.log(role);
  };

  return (
    <div className="container">
      <form onSubmit={setRoleAdd}>
        <label>Address</label>
        <input id="address1" type="text"></input>
        <label>Role</label>
        <select name="role1" id="role1">
          <option value="teacher">Teacher</option>
          <option value="student">Student</option>
        </select>
        <button className="btn btn-primary" type={"submit"}>
          Set role
        </button>
      </form>
    </div>
  );
};

export default Manage;
