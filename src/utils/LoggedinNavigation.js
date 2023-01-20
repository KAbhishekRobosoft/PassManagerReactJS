import React from "react";
import Datalist from "../screens/Datalist";
import { Route, Routes } from "react-router-dom";

function LoggedinNavigation() {
  return (
    <Routes>
      <Route path="/" element={<Datalist />} />
    </Routes>
  );
}

export default LoggedinNavigation;
