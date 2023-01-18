import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "../screens/Homepage";
import Signin from "../screens/Signin";
import SignUp from "../screens/SignUp";
import Datalist from "../screens/Datalist";

function LoginNavigation() {
  return (
    <Routes>
      <Route path="/*" element={<Homepage />} />
      <Route path="/Datalist" element={<Datalist />} />
    </Routes>
  );
}

export default LoginNavigation;
