import React from "react";
import "./SignIn.css";
const SignIn = () => {
  return (
    <form className="formLogin">
      <div className="input1">
        <label htmlFor="address">Address</label>
        <input id="address" placeholder="0x12345" type="text" />
      </div>
      <div className="input2">
        <label htmlFor="password">Password</label>
        <input id="password" type="text" />
      </div>
      <button type={"submit"}>Sign in</button>
    </form>
  );
};

export default SignIn;
