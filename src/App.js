import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import LoginNavigation from "./utils/LoginNavigation";
import { useDispatch, useSelector } from "react-redux";
import { retrieveToken } from "./redux/AuthSlice";
import LoggedinNavigation from "./utils/LoggedinNavigation";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.authSite);


  useEffect(() => {
    setTimeout(() => {
      let mPin;
      try {
        mPin = localStorage.getItem("mPin");
      } catch (e) {
        console.log(e);
      }
      dispatch(retrieveToken(mPin));
    }, 1000);
  }, []);

  return (
    <Router>
      {auth.mPin !== null ? <LoggedinNavigation /> : <LoginNavigation />}
    </Router>
  );
}

export default App;
