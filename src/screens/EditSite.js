import React, { useState } from "react";
import { useFormik } from "formik";
import "../css/Addsite.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import close from "../images/close_btn.png";
import { updateData } from "../redux/CrudSice";
import { useDispatch } from "react-redux";

function Editsite({ setModal1, data1 }) {
  console.log(data1);
  const [edit, setEdit] = useState(true);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      url: data1.url,
      siteName: data1.siteName,
      sector: data1.sector,
      userName: data1.userName,
      password: data1.password,
      notes: data1.notes,
    },
    onSubmit: (values) => {
      console.log(values)
      values["id"] = data1.id;
      dispatch(updateData(values));
      setModal1(false);
    },
  });
  return (
    <div className="addSiteCon">
      {/* Small screen design */}
      <div className="addSiteCon1">
        <div className="addSiteNav1">
          <FontAwesomeIcon
            onClick={() => {
              setModal1(false);
            }}
            className="backIcon"
            color="white"
            icon={faArrowLeftLong}
          />
          <p className="addText1">Site Details</p>
          <p
            onClick={() => {
              setEdit(false);
            }}
            style={{
              marginRight: "50px",
              color: "white",
              fontSize: "18px",
              fontfamily: "Open Sans, sans-serif",
              fontfamily: "Roboto sans-serif",
              cursor: "pointer",
            }}
          >
            Edit
          </p>
        </div>
        <div className="addSiteEntry">
          <form className="addSiteForm" onSubmit={formik.handleSubmit}>
            <div className="addSiteInput">
              <label className="urlLabel" for="url">
                URL
              </label>
              <input
                onChange={formik.handleChange}
                name="url"
                className="addSiteEntryInput"
                type="text"
                disabled={edit}
                defaultValue={data1.url}
                required
              />

              <label className="siteLabel" for="siteName">
                Site Name
              </label>
              <input
                onChange={formik.handleChange}
                name="siteName"
                className="addSiteEntryInput"
                type="text"
                disabled={edit}
                defaultValue={data1.siteName}
                required
              />

              <label className="dropLabel" for="sector">
                Sector/Folder
              </label>
              <select
                onChange={formik.handleChange}
                defaultValue={data1.sector}
                required
                className="dropdown"
                name="sector"
                id="media"
              >
                <option value={data1.sector} name="sector">
                  {data1.sector}
                </option>
                <option
                  value={
                    data1.sector === "Social Media" ? "Website" : "Social Media"
                  }
                  name="sector"
                >
                  {data1.sector === "Social Media" ? "Website" : "Social Media"}
                </option>
              </select>

              <label className="userLabel" for="userName">
                User Name
              </label>
              <input
                onChange={formik.handleChange}
                name="userName"
                className="addSiteEntryInput"
                defaultValue={data1.userName}
                type="text"
                disabled={edit}
                required
              />

              <label className="passwordLabel" for="password">
                Site Password
              </label>
              <input
                onChange={formik.handleChange}
                name="password"
                className="addSiteEntryInput"
                type="password"
                defaultValue={data1.password}
                disabled={edit}
                required
              />

              <label className="notesLabel" for="notes">
                Notes
              </label>
              <textarea
                onChange={formik.handleChange}
                name="notes"
                defaultValue={data1.notes}
                disabled={edit}
                className="addSiteEntryInput1"
              />
            </div>
            <div className="butCon">
              <button type="submit" className="addSiteBut9">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Bigger screen design */}
      <div className="addSiteCon2">
        <div className="siteAdder">
          <div className="closeBtn">
            <img
              onClick={() => {
                setModal1(false);
              }}
              src={close}
              alt="close_btn"
            />
          </div>
          <p className="siteAdderText">Edit</p>
          <div className="sitesAddingCon">
            <form onSubmit={formik.handleSubmit}>
              <div className="addSiteFormInput">
                <label className="input5Label" for="url">
                  URL
                </label>
                <input
                  name="url"
                  onChange={formik.handleChange}
                  className="input5"
                  type="text"
                  defaultValue={data1.url}
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
                      onChange={formik.handleChange}
                      className="input6"
                      defaultValue={data1.siteName}
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
                      required
                      className="dropdown"
                      name="sector"
                      id="media"
                    >
                      <option value={data1.sector} name="sector">
                        {data1.sector}
                      </option>
                      <option
                        value={
                          data1.sector === "Social Media"
                            ? "Website"
                            : "Social Media"
                        }
                        name="sector"
                      >
                        {data1.sector === "Social Media"
                          ? "Website"
                          : "Social Media"}
                      </option>
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
                      defaultValue={data1.userName}
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
                      defaultValue={data1.password}
                      type="password"
                      required
                    />
                  </div>
                </div>
                <label className="input7Label" for="notes">
                  Notes
                </label>
                <textarea
                  name="notes"
                  defaultValue={data1.notes}
                  onChange={formik.handleChange}
                  className="addSiteEntryInput1"
                />
              </div>
              <div className="butCon1">
                <button type="submit" className="addSiteBut4">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Editsite;