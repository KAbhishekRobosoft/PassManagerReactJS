import React from "react";
import { useFormik } from "formik";
import "../css/Addsite.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import close from "../images/close_btn.png";
import { addData } from "../redux/CrudSice";
import { useDispatch, useSelector } from "react-redux";
import { picLinks } from "../utils/Hardcoded";

function Addsite({ setModal, toastRef, setToast }) {
  const dispatch = useDispatch();
  setToast(true);
  const data = useSelector((state) => state.addDetails.userData);
  const userId = useSelector((state) => state.authSite.userId);
  const initialValues = {
    url: "",
    siteName: "",
    sector: "",
    password: "",
    userName: "",
    notes: "",
  };

  const formik = useFormik({
    initialValues: { initialValues },
    onSubmit: (values) => {
      values["id"] = data.length + 1;
      values["userId"] = userId;
      if (picLinks.hasOwnProperty(values.siteName)) {
        dispatch(addData(values));
        setModal(false);
        toastRef.current.style.display = "flex";
        setTimeout(() => {
          toastRef.current.style.display = "none";
        }, 4000);
      } else {
        alert("Please enter proper sitename");
      }
    },
  });
  return (
    <div className="addSiteCon">
      {/* Small screen design */}
      <div className="addSiteCon1">
        <div className="addSiteNav">
          <FontAwesomeIcon
            onClick={() => {
              setModal(false);
            }}
            className="backIcon"
            color="white"
            icon={faArrowLeftLong}
          />
          <p className="addText">Add Site</p>
        </div>
        <div className="addSiteEntry">
          <form
            autoComplete="off"
            className="addSiteForm"
            onSubmit={formik.handleSubmit}
          >
            <div className="addSiteInput">
              <label className="urlLabel" for="url">
                URL
              </label>
              <input
                name="url"
                onChange={formik.handleChange}
                className="addSiteEntryInput"
                type="text"
                required
              />

              <label className="siteLabel" for="siteName">
                Site Name
              </label>
              <input
                name="siteName"
                onChange={formik.handleChange}
                className="addSiteEntryInput"
                type="text"
                required
              />

              <label className="dropLabel" for="sector">
                Sector/Folder
              </label>
              <select
                onChange={formik.handleChange}
                className="dropdown"
                name="sector"
                id="media"
              >
                <option selected>Select Option</option>
                <option value="Social Media">Social Media</option>
                <option value="Website">Website</option>
              </select>

              <label className="userLabel" for="userName">
                User Name
              </label>
              <input
                name="userName"
                onChange={formik.handleChange}
                className="addSiteEntryInput"
                type="text"
                required
              />

              <label className="passwordLabel" for="password">
                Site Password
              </label>
              <input
                name="password"
                onChange={formik.handleChange}
                className="addSiteEntryInput"
                type="password"
                required
              />

              <label className="notesLabel" for="notes">
                Notes
              </label>
              <textarea
                onChange={formik.handleChange}
                name="notes"
                className="addSiteEntryInput1"
              />
            </div>
            <div className="butCon">
              <button
                type="reset"
                onClick={(e) => {
                  formik.resetForm({ initialValues });
                }}
                className="addSiteBut1"
              >
                Reset
              </button>
              <button type="submit" className="addSiteBut2">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Big screen design */}
      <div className="addSiteCon2">
        <div className="siteAdder">
          <div className="closeBtn">
            <img
              onClick={() => {
                setModal(false);
              }}
              src={close}
              alt="close_btn"
            />
          </div>
          <p className="siteAdderText">Add Sites</p>
          <div className="sitesAddingCon">
            <form autoComplete="off" onSubmit={formik.handleSubmit}>
              <div className="addSiteFormInput">
                <label className="input5Label" for="url">
                  URL
                </label>
                <input
                  onChange={formik.handleChange}
                  name="url"
                  className="input5"
                  type="text"
                  required
                />
                <div className="formRow">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "50%",
                    }}
                  >
                    <label className="input6Label" for="siteName">
                      Site Name
                    </label>
                    <input
                      name="siteName"
                      className="input6"
                      onChange={formik.handleChange}
                      type="text"
                      required
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "50%",
                    }}
                  >
                    <label className="input6Label" for="sectors">
                      Sector/Folder
                    </label>
                    <select
                      onChange={formik.handleChange}
                      className="dropdown1"
                      name="sector"
                      required
                      id="media"
                    >
                      <option selected>Select Option</option>
                      <option value="Social Media">Social media</option>
                      <option value="Website">Website</option>
                    </select>
                  </div>
                </div>

                <div className="formRow">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "50%",
                    }}
                  >
                    <label className="input6Label" for="userName">
                      User Name
                    </label>
                    <input
                      name="userName"
                      onChange={formik.handleChange}
                      className="input6"
                      type="text"
                      required
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "50%",
                    }}
                  >
                    <label className="input6Label" for="password">
                      Site Password
                    </label>
                    <input
                      name="password"
                      onChange={formik.handleChange}
                      className="input7"
                      type="password"
                      required
                    />
                  </div>
                </div>
                <label className="input7Label" for="notes">
                  Notes
                </label>
                <textarea
                  onChange={formik.handleChange}
                  name="notes"
                  className="addSiteEntryInput1"
                />
              </div>
              <div className="butCon1">
                <button className="addSiteBut3">Reset</button>
                <button className="addSiteBut4">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Addsite;
