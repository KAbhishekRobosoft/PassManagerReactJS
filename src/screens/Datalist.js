import React from "react";
import "../css/Datalist.css";
import burger from "../images/burger_Menu.png";
import sync from "../images/sync1_icn.png";
import profile from "../images/profile1.png";
import search from "../images/search1.png";
import ListDisplay from "../components/ListDisplay";

function Datalist() {
    const data= [{
        src:"../images/facebook.png",
        name:"Facebook",
        url:"www.facebook.com"
    }]
  return (
    <div className="listCon">
      <div className="listMainCon">
        <div className="navListDisp">
        <div className="headerStyle">
          <img className="burgerImg" src={burger} alt="burger" />
          <p className="listHeadText">PASS MANAGER</p>
          </div>
          <div className="iconAcc">
            <img className="searchImg" src={search} alt="search" />
            <img className="syncImg" src={sync} alt="sync" />
            <img className="profileImg" src={profile} alt="sync" />
          </div>
        </div>
        <div className="lockerSites">
          <div>
            <p className="sitesText">Sites</p>
            <div className="siteUnder"></div>
          </div>
          <div className="optionCon">
            <select className="dropdown" name="media" id="media">
              <option value="Social Media">Social media</option>
              <option value="Social Media">Website</option>
            </select>
            <div className="lengthTextCon">
              <p className="lengthText">07</p>
            </div>
          </div>
        </div>
        <div className="listDisplay">
          {
            data.map(ele=>{
              return(
                  <ListDisplay />
              )
            })
          }
        </div>
      </div>
    </div>
  );
}

export default Datalist;
