import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "../screens/Homepage";

function LoginNavigation() {
  return (
    <Routes>
      <Route path="/*" element={<Homepage />} />
    </Routes>
  );
}

export default LoginNavigation;
