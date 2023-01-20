import React from "react";
import "../css/ListDisplay.css";
import youtube from "../images/Bitmap.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { picLinks } from "../utils/Hardcoded";

function ListDisplay({ ele, setModal1, setData1 }) {
  return (
    <div
      onClick={() => {
        setModal1(true);
        setData1(ele);
      }}
      className="listDisplayCon"
    >
      <div className="listImg">
        <div className="lockerImg">
          <img src={picLinks[ele.siteName]} alt="youtube" />
        </div>
        <div className="lockerDesc">
          <p className="lockerName">{ele.siteName}</p>
          <div className="copyCon">
            <span>
              <FontAwesomeIcon color="#0E85FF" icon={faCopy} />
            </span>
            <p className="copyText">Copy Password</p>
          </div>
        </div>
      </div>
      <div className="urlCon">
        <p className="urlText">{ele.url}</p>
      </div>
    </div>
  );
}

export default ListDisplay;
