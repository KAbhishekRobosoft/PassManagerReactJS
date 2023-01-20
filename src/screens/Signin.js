import React, { useRef } from "react";
import { useFormik } from "formik";
import "../css/Signin.css";
import eye from "../images/eye_on.png";
import { login } from "../redux/AuthSlice";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";

function Signin() {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      Number: "",
      Mpin: "",
    },
    onSubmit: (values) => {
      dispatch(login(values));
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
