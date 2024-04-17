import React, { useState } from "react";

const SignUp = () => {
  const contractAddress = "0xD2cF4af28a0434B3E6f054300D89dd3bf19D900C"; //QLMH3
  const authAddress = "0xfB4d5Ce1583b01c5a50264e833eCdF7F0C98a87a"; //Auth
  const [authContract, setAuthContract] = useState(null);

  const register = async (event) => {
    event.preventDefault();
    let addr = event.target.addr.value;
    let name = event.target.name.value;
    let password = event.target.password.value;
    let role = event.target.role.value;
    await authContract.register(addr, name, password, role);
  };
  return (
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
    // <form>
    //   <label htmlFor="name">Name</label>
    //   <input id="name" type="text" placeholder="Kha Nguyen" />
    //   <label htmlFor="address">Address</label>
    //   <input id="address" type="text" placeholder="0x12345.." />
    //   <label htmlFor="password">Password</label>
    //   <input id="password" type="password" />
    //   <label htmlFor="role" type="text" placeholder="teacher">
    //     Role
    //   </label>
    //   <input id="role" type="text" placeholder="0x12345.." />
    //   <button type={"submit"}>Register</button>
    // </form>
  );
};

export default SignUp;
