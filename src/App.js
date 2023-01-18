import React from "react";
import { BrowserRouter as Router} from "react-router-dom";
import LoginNavigation from "./utils/LoginNavigation";

function App() {
  return (
    <Router>
      <LoginNavigation />
    </Router>
  );
}

export default App;
