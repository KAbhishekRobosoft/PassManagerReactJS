import React, { useRef } from "react";
import { useFormik } from "formik";
import "../css/Signin.css";
import eye from "../images/eye_on.png";
import { useNavigate } from "react-router-dom";

function Signin() {
  const Navigate= useNavigate()

  const formik = useFormik({
    initialValues: {
      Number: "",
      Mpin: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      Navigate('/Datalist')
    },
  });
  return (
    <div className="loginCon">
      <div className="loginContent">
        <form className="loginForm" onSubmit={formik.handleSubmit}>
          <input
            placeholder="Mobile Number"
            className="inp1"
            onChange={formik.handleChange}
            type="text"
            name="Number"
            required
          />
          <div className="mpinVisible">
            <input
              onChange={formik.handleChange}
              name="Mpin"
              placeholder="MPin"
              className="inp2"
              type="password"
              required
            />
            <div className="eyeImg">
              <img src={eye} alt="eye" />
            </div>
          </div>
          <div className="forgotTextCon">
            <p className="forgotText">Forgot your password?</p>
          </div>
          <div className="loginButCon">
            <button className="loginBut" type="submit">
              SIGN IN
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signin;
