import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import "../css/Signin.css";
import eye from "../images/eye_on.png";
import { login } from "../redux/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { filterParticular } from "../redux/CrudSice";

function Signin() {
  const passRef = useRef(null);
  const [eye1, setEye1] = useState(true);
  const dispatch = useDispatch();
  let flag = 0;
  const user = useSelector((state) => state.authSite.userData);
  const formik = useFormik({
    initialValues: {
      Number: "",
      Mpin: "",
    },
    onSubmit: (values) => {
      if (values.Number.toString().length === 10) {
        user.map((ele) => {
          if (ele.Number.toString() === values.Number.toString()) {
            alert("Signin Successfull");
            dispatch(login({ id: ele.id, mPin: values.Mpin }));
            dispatch(filterParticular(ele.id))
            flag = 1;
          }
        });
        if (flag === 0) {
          alert("User doesn't exist");
        }
      } else {
        alert("Enter proper mobile number");
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
              onChange={formik.handleChange}
              ref={passRef}
              name="Mpin"
              placeholder="MPin"
              minLength={4}
              maxLength={4}
              className="inp2"
              type="password"
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
                  onClick={() => {
                    passRef.current.type = "password";
                    setEye1(true);
                  }}
                  style={{ cursor: "pointer" }}
                  color="#a3a3a3"
                  icon={faEyeSlash}
                />
              </div>
            )}
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
