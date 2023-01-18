import React from "react";
import { useFormik } from "formik";
import "../css/SignUp.css";
import eye from "../images/eye_on.png";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const Navigate= useNavigate()
  const formik = useFormik({
    initialValues: {
      Number: "",
      Mpin: "",
      confirmMpin: "",
    },
    onSubmit: (values) => {
      Navigate('/Signin')
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
            type="number"
            name="Number"
            required
          />
          <div className="mpinVisible">
            <input
              onChange={formik.handleChange}
              name="Mpin"
              placeholder="Enter 4 digit MPin"
              className="inp2"
              type="password"
              required
            />
            <div className="eyeImg">
              <img src={eye} alt="eye" />
            </div>
          </div>
          <div className="mpinVisible">
            <input
              onChange={formik.handleChange}
              name="confirmMpin"
              placeholder="Re-Enter 4 digit MPin"
              className="inp2"
              type="password"
              required
            />
            <div className="eyeImg">
              <img src={eye} alt="eye" />
            </div>
          </div>
          <div className="loginButCon">
            <button className="loginBut" type="submit">
              SIGN UP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
