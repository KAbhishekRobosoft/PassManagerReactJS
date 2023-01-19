import React from "react";
import { useFormik } from "formik";
import "../css/Addsite.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";

function Addsite({ setModal }) {
  const formik = useFormik({
    initialValues: {
      url: "",
      siteName: "",
      sector: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <div className="addSiteCon">
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
        <form className="addSiteForm" onSubmit={formik.handleSubmit}>
          <div className="addSiteInput">
            <label className="urlLabel" for="url">
              URL
            </label>
            <input
              name="url"
              className="addSiteEntryInput"
              type="text"
              required
            />

            <label className="siteLabel" for="siteName">
              Site Name
            </label>
            <input
              name="siteName"
              className="addSiteEntryInput"
              type="text"
              required
            />

            <label className="dropLabel" for="sector">
              Sector/Folder
            </label>
            <select className="dropdown" name="category" id="media">
              <option value="Select Option" selected>
                Select Option
              </option>
              <option value="Social Media">Social media</option>
              <option value="Social Media">Website</option>
            </select>

            <label className="userLabel" for="userName">
              User Name
            </label>
            <input
              name="userName"
              className="addSiteEntryInput"
              type="text"
              required
            />

            <label className="passwordLabel" for="password">
              Site Password
            </label>
            <input
              name="password"
              className="addSiteEntryInput"
              type="password"
              required
            />

            <label className="notesLabel" for="notes">
              Notes
            </label>
            <textarea className="addSiteEntryInput1" />
          </div>
          <div className="butCon">
            <button className="addSiteBut1">Reset</button>
            <button className="addSiteBut2">Save</button>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
}

export default Addsite;
