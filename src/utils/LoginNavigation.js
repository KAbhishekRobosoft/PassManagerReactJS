import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "../screens/Homepage";
import Datalist from "../screens/Datalist";
import Addsite from "../screens/Addsite";

function LoginNavigation() {
  return (
    <Routes>
      <Route path="/*" element={<Homepage />} />
      <Route path="/Datalist" element={<Datalist />} />
    </Routes>
  );
}

export default LoginNavigation;
