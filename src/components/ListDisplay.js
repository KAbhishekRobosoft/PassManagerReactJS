import React from "react";
import "../css/ListDisplay.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { picLinks } from "../utils/Hardcoded";
import { CopyToClipboard } from "react-copy-to-clipboard";

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
          <CopyToClipboard text={ele.password}>
            <div style={{cursor:"pointer"}} onClick={()=>{
              alert("Password copied")
            }} className="copyCon">
              <span>
                <FontAwesomeIcon color="#0E85FF" icon={faCopy} />
              </span>

              <p className="copyText">Copy Password</p>
            </div>
          </CopyToClipboard>
        </div>
      </div>
      <div className="urlCon">
        <p className="urlText">{ele.url}</p>
      </div>
    </div>
  );
}

export default ListDisplay;
