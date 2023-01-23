import React, { useState, useRef } from "react";
import { useFormik } from "formik";
import "../css/SignUp.css";
import eye from "../images/eye_on.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/AuthSlice";
import { v4 as uuid } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function SignUp() {
  const passRef = useRef(null);
  const passRef1 = useRef(null);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const user = useSelector((state) => state.authSite.userData);
  const [eye1, setEye1] = useState(true);
  const [eye2, setEye2] = useState(true);
  const formik = useFormik({
    initialValues: {
      Number: "",
      Mpin: "",
      confirmMpin: "",
    },
    onSubmit: (values) => {
      if((values.Number.toString()).length === 10){
      values["id"] = uuid();
      if (user.length > 0) {
        if (
          user.filter((ele) => ele.Number.toString() === values.Number).length >
          0
        ) {
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
    }
    else{
      alert("Enter proper mobile number")
    }
    },
  });
  return (
    <div className="loginCon">
      <div className="loginContent">
        <form
          autoComplete="off"
          className="loginForm"
          onSubmit={formik.handleSubmit}
        >
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
              ref={passRef}
              onChange={formik.handleChange}
              name="Mpin"
              placeholder="Enter 4 digit MPin"
              className="inp2"
              type="password"
              maxLength={4}
              minLength={4}
              required
            />
            {eye1 && (
              <div className="eyeImg">
                <img
                  onClick={() => {
                    setEye1(false);
                    passRef.current.type = "text";
                  }}
                  style={{ cursor: "pointer" }}
                  src={eye}
                  alt="eye"
                />
              </div>
            )}

            {!eye1 && (
              <div className="eyeImg">
                <FontAwesomeIcon
                  fontSize={14}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    passRef.current.type = "password";
                    setEye1(true);
                  }}
                  color="#a3a3a3"
                  icon={faEyeSlash}
                />
              </div>
            )}
          </div>
          <div className="mpinVisible">
            <input
              ref={passRef1}
              onChange={formik.handleChange}
              name="confirmMpin"
              placeholder="Re-Enter 4 digit MPin"
              className="inp2"
              type="password"
              maxLength={4}
              minLength={4}
              required
            />
            {eye2 && (
              <div className="eyeImg">
                <img
                  onClick={() => {
                    setEye2(false);
                    passRef1.current.type = "text";
                  }}
                  style={{ cursor: "pointer" }}
                  src={eye}
                  alt="eye"
                />
              </div>
            )}

            {!eye2 && (
              <div className="eyeImg">
                <FontAwesomeIcon
                  fontSize={14}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    passRef1.current.type = "password";
                    setEye2(true);
                  }}
                  color="#a3a3a3"
                  icon={faEyeSlash}
                />
              </div>
            )}
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
