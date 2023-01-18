import React from "react";
import "../css/ListDisplay.css";
import youtube from "../images/Bitmap.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

function ListDisplay({ ele }) {
  return (
    <div className="listDisplayCon">
      <div className="listImg">
        <img src={youtube} alt={ele.name} />
        <div className="listDispName">
          <p className="listText">{ele.name}</p>
        
        </div>
      </div>
    </div>
  );
}

export default ListDisplay;
