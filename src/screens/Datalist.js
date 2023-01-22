import React, { useRef, useState } from "react";
import "../css/Datalist.css";
import burger from "../images/burger_Menu.png";
import sync from "../images/sync1_icn.png";
import profile from "../images/profile1.png";
import search from "../images/search1.png";
import ListDisplay from "../components/ListDisplay";
import { faArrowRight, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import home from "../images/home_icn.png";
import logo from "../images/logo_name.png";
import sync1 from "../images/sync.png";
import profile1 from "../images/profile.png";
import search1 from "../images/search.png";
import add from "../images/add_btn.png";
import Addsite from "./Addsite";
import EditSite from "./EditSite";
import { useDispatch, useSelector } from "react-redux";
import { filterData } from "../redux/CrudSice";
import { filterCategory } from "../redux/CrudSice";
import { logout } from "../redux/AuthSlice";

function Datalist() {
  const [searchOn, setSearchOn] = useState(false);
  const toastRef = useRef(null);
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [data1, setData1] = useState({});
  const [toast, setToast] = useState(true);
  const userData = useSelector((state) => state.addDetails.userData);
  const userId = useSelector((state) => state.authSite.userId);
  const data = userData.filter((ele) => ele.userId === userId);
  const dispatch = useDispatch();
  return (
    <div className="listCon">
      {modal && <Addsite toastRef={toastRef} setModal={setModal} />}
      {modal1 && <EditSite data1={data1} setModal1={setModal1} />}

      {!modal && !modal1 && (
        <div className="listMainCon">
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
              <img
                onClick={() => {
                  dispatch(logout());
                }}
                className="profileImg"
                src={profile}
                alt="sync"
              />
            </div>
          </div>
          {!searchOn && (
            <div className="lockerSites">
              <div>
                <p className="sitesText">Sites</p>
                <div className="siteUnder"></div>
              </div>
              <div className="optionCon">
                <select
                  onChange={(val) => {
                    dispatch(filterCategory(val.target.value));
                  }}
                  className="dropdown"
                  name="media"
                  id="media"
                >
                  <option value="All" selected>
                    All
                  </option>
                  <option value="Social Media">Social Media</option>
                  <option value="Website">Website</option>
                </select>
                <div className="lengthTextCon">
                  <p className="lengthText">{data.length}</p>
                </div>
              </div>
            </div>
          )}
          {searchOn && (
            <div className="searchBar">
              <input
                className="searchBarText"
                type="text"
                onChange={(val) => {
                  dispatch(filterData(val.target.value));
                }}
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
                  return (
                    <ListDisplay
                      setData1={setData1}
                      setModal1={setModal1}
                      key={ele.id}
                      ele={ele}
                    />
                  );
                })
              : null}
          </div>
          <img
            onClick={() => {
              setModal(true);
            }}
            className="addBtn0"
            src={add}
            alt="buttonAdd"
          />
        </div>
      )}

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
            {toast && (
              <div ref={toastRef} className="toastCon">
                <div className="toastText">
                  <p>Site Added Successfully</p>
                </div>
                <div className="toastIcon">
                  <FontAwesomeIcon
                    className="iconDes"
                    fontSize={22}
                    fontWeight="bold"
                    color="#63d995"
                    icon={faXmark}
                    onClick={() => {
                      setToast(false);
                    }}
                  />
                </div>
              </div>
            )}
            <div className="navIcons">
              <img src={sync1} alt="sync1" />
              <img
                onClick={() => {
                  dispatch(logout());
                }}
                className="profile1"
                src={profile1}
                alt="profile1"
              />
            </div>
          </div>
          <div className="lockerSites1">
            <div className="sitesDesc1">
              <p className="siteText1">Sites</p>
              <div className="optionCon">
                <select
                  onChange={(val) => {
                    dispatch(filterCategory(val.target.value));
                  }}
                  className="dropdown"
                  name="media"
                  id="media"
                >
                  <option value="All" selected>
                    All
                  </option>
                  <option value="Social Media">Social Media</option>
                  <option value="Website">Website</option>
                </select>
                <div className="lengthTextCon">
                  <p className="lengthText">{data.length}</p>
                </div>
              </div>
            </div>
            <div className="searchCon1">
              <div className="inputStyle1">
                <input
                  className="searchText1"
                  type="text"
                  placeholder="Search"
                  onChange={(val) => {
                    dispatch(filterData(val.target.value));
                  }}
                />
                <img className="searchIcon1" src={search1} alt="searchicon" />
              </div>
              <img
                onClick={() => {
                  setModal(true);
                }}
                className="addBtn1"
                src={add}
                alt="addBtn"
              />
            </div>
          </div>
          <div className="listDisplay1">
            {data.length > 0
              ? data.map((ele) => {
                  return (
                    <ListDisplay
                      setData1={setData1}
                      setModal1={setModal1}
                      key={ele.id}
                      ele={ele}
                    />
                  );
                })
              : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Datalist;
