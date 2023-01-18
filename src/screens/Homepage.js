import React from "react";
import "../css/Home.css";
import logo from "../images/logo.png";
import { NavLink,useNavigate,Routes,Route } from "react-router-dom";
import { useFormik } from "formik";
import eye from "../images/eye_on.png";
import Signin from '../screens/Signin'
import SignUp from '../screens/SignUp'

function Homepage() {
  const Navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      Number: "",
      Mpin: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <div className="homeCon">
      <div className="authCon">
        <div className="logoDisp">
          <img className="logoImg" src={logo} alt="Logo" />
          <p className="logoText">PASS MANAGER</p>
        </div>
        <div className="logoDisp1">
          <img className="logoImg1" src={logo} alt="Logo" />
          <p className="logoText1">
            Protect & Manage every password in your business
          </p>
        </div>
        <div className="navLinks">
          <div className="authLinks">
            <div className="authLinksContent">
              <NavLink
                className="link1"
                style={({ isActive }) => {
                  return {
                    borderBottom: isActive ? "3.5px solid #FFA222" : "none",
                  };
                }}
                to="/"
              >
                SIGN IN
              </NavLink>
              <NavLink
                style={({ isActive }) => {
                  return {
                    borderBottom: isActive ? "3.5px solid #FFA222" : "none",
                  };
                }}
                className="link1"
                to="/SignUp"
              >
                SIGN UP
              </NavLink>
            </div>
          </div>
              <Routes>
                <Route path="/" element={<Signin />} />
                <Route path="/SignUp" element={<SignUp />} />
              </Routes>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
