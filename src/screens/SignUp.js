import React from "react";
import { useFormik } from "formik";
import "../css/SignUp.css";
import eye from "../images/eye_on.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/AuthSlice";
import { v4 as uuid } from "uuid";

function SignUp() {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const user = useSelector((state) => state.authSite.userData);
  const formik = useFormik({
    initialValues: {
      Number: "",
      Mpin: "",
      confirmMpin: "",
    },
    onSubmit: (values) => {
      values["id"] = uuid();
      if (user.length > 0) {
        if (user.filter((ele) => ele.Number.toString() === values.Number).length > 0) {
          alert("User already exists");
        } else {
          dispatch(register(values));
          alert("User added");
          Navigate("/");
        }
      } else {
        dispatch(register(values));
        alert("User added");
        Navigate("/");
      }
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
