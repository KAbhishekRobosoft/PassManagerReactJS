import React, { useState } from "react";
import "../css/Datalist.css";
import burger from "../images/burger_Menu.png";
import sync from "../images/sync1_icn.png";
import profile from "../images/profile1.png";
import search from "../images/search1.png";
import ListDisplay from "../components/ListDisplay";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import home from "../images/home_icn.png";
import logo from "../images/logo_name.png";
import sync1 from "../images/sync.png";
import profile1 from "../images/profile.png";
import search1 from "../images/search.png";
import add from "../images/add_btn.png";
import Addsite from "./Addsite";

function Datalist() {
  const [searchOn, setSearchOn] = useState(false);
  const [modal,setModal]= useState(false)

  const data = [
    {
      id: 1,
      src: "../images/youtube.png",
      name: "Facebook",
      url: "www.facebook.com",
    },
    {
      id: 2,
      src: "../images/youtube.png",
      name: "Facebook",
      url: "www.facebook.com",
    },
    {
      id: 3,
      src: "../images/youtube.png",
      name: "Facebook",
      url: "www.facebook.com",
    },
    {
      id: 4,
      src: "../images/youtube.png",
      name: "Facebook",
      url: "www.facebook.com",
    },
    {
      id: 5,
      src: "../images/youtube.png",
      name: "Facebook",
      url: "www.facebook.com",
    },
    {
      id: 6,
      src: "../images/youtube.png",
      name: "Facebook",
      url: "www.facebook.com",
    },
    {
      id: 7,
      src: "../images/youtube.png",
      name: "Facebook",
      url: "www.facebook.com",
    },
    {
      id: 8,
      src: "../images/youtube.png",
      name: "Facebook",
      url: "www.facebook.com",
    },
    {
      id: 9,
      src: "../images/youtube.png",
      name: "Facebook",
      url: "www.facebook.com",
    },
    {
      id: 10,
      src: "../images/youtube.png",
      name: "Facebook",
      url: "www.facebook.com",
    },
    {
      id: 11,
      src: "../images/youtube.png",
      name: "Facebook",
      url: "www.facebook.com",
    },
    {
      id: 12,
      src: "../images/youtube.png",
      name: "Facebook",
      url: "www.facebook.com",
    },  {
      id: 13,
      src: "../images/youtube.png",
      name: "Facebook",
      url: "www.facebook.com",
    },


  ];
  return (
    <div className="listCon">
      {modal && <Addsite setModal={setModal} />}
      {!modal && <div className="listMainCon">
        <div className="navListDisp">
          <div className="headerStyle">
            <img className="burgerImg" src={burger} alt="burger" />
            <p className="listHeadText">PASS MANAGER</p>
          </div>
          <div className="iconAcc">
            <img
              onClick={() => {
                setSearchOn(true);
              }}
              className="searchImg"
              src={search}
              alt="search"
            />
            <img className="syncImg" src={sync} alt="sync" />
            <img className="profileImg" src={profile} alt="sync" />
          </div>
        </div>
        {!searchOn && (
          <div className="lockerSites">
            <div>
              <p className="sitesText">Sites</p>
              <div className="siteUnder"></div>
            </div>
            <div className="optionCon">
              <select className="dropdown" name="media" id="media">
                <option value="Select Option" selected>
                  Select Option
                </option>
                <option value="Social Media">Social media</option>
                <option value="Social Media">Website</option>
              </select>
              <div className="lengthTextCon">
                <p className="lengthText">07</p>
              </div>
            </div>
          </div>
        )}
        {searchOn && (
          <div className="searchBar">
            <input
              className="searchBarText"
              type="text"
              placeholder="Type keywords to search"
            />
            <span
              onClick={() => {
                setSearchOn(false);
              }}
              className="rightIcon"
            >
              <FontAwesomeIcon className="iconSty" icon={faArrowRight} />
            </span>
          </div>
        )}
        <div className="listDisplay">
          {data.length > 0
            ? data.map((ele) => {
                return <ListDisplay key={ele.id} ele={ele} />;
              })
            : null}
        </div>
        <img onClick={()=>{
          setModal(true)
        }} className="addBtn0" src={add} alt="buttonAdd" />
      </div>}
      <div className="listMainCon1">
        <div className="sideBar">
          <div className="sideIcon">
            <img className="burgerImg1" src={burger} alt="burgerIcon" />
            <div className="homeCon1">
              <img src={home} alt="home" />
              <div className="circle"></div>
            </div>
          </div>
        </div>
        <div className="navCon">
          <div className="navBar">
            <div className="navLogo">
              <img className="navLockerimg" src={logo} alt="Logo" />
            </div>
            <div className="navIcons">
              <img src={sync1} alt="sync1" />
              <img className="profile1" src={profile1} alt="profile1" />
            </div>
          </div>
          <div className="lockerSites1">
            <div className="sitesDesc1">
              <p className="siteText1">Sites</p>
              <div className="optionCon">
                <select className="dropdown" name="media" id="media">
                  <option value="Select Option" selected>
                    Select Option
                  </option>
                  <option value="Social Media">Social media</option>
                  <option value="Social Media">Website</option>
                </select>
                <div className="lengthTextCon">
                  <p className="lengthText">07</p>
                </div>
              </div>
            </div>
            <div className="searchCon1">
              <div className="inputStyle1">
                <input
                  className="searchText1"
                  type="text"
                  placeholder="Search"
                />
                <img className="searchIcon1" src={search1} alt="searchicon" />
              </div>
              <img className="addBtn1" src={add} alt="addBtn" />
            </div>
          </div>
          <div className="listDisplay1">
            {data.length > 0
              ? data.map((ele) => {
                  return <ListDisplay key={ele.id} ele={ele} />;
                })
              : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Datalist;
