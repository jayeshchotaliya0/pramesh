import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
import axios from "axios";
import { useHistory } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const User_Edit = () => {
  let history = useHistory();
  var answer = window.location.href;
  const answer_array = answer.split("/");
  const [FirstName, setFirstname] = useState("");
  const [LastName, setLastname] = useState("");
  const [Email, setEmail] = useState("");
  const [Status, setStatus] = useState("");
  const [Gif, setGif] = useState(false);

  const [ErrorFirstName, setErrorFirstname] = useState("");
  const [ErrorLastName, setErrorLastname] = useState("");
  const [ErrorEmail, setErrorEmail] = useState("");
  const [ErrorStatus, setErrorStatus] = useState("");
  const [EmailDone, setEmailDone] = useState("0");
  const [disable, setdisable] = useState(false);

  var iUserId = window.location.pathname.substring(
    window.location.pathname.lastIndexOf("/") + 1
  );

  function edituserdata() {
    var error = false;

    if (FirstName) {
      setErrorFirstname("");
    } else {
      setErrorFirstname("Please Enter Firstname");
      var error = true;
    }

    if (LastName) {
      setErrorLastname("");
    } else {
      setErrorLastname("Please Enter Lastname");
      var error = true;
    }

    if (Email) {
      setErrorEmail("");
    } else {
      setErrorEmail("Please Enter Email Address");
      var error = true;
    }

    if (Status) {
      setErrorStatus("");
    } else {
      setErrorStatus("Please Select Status");
      var error = true;
    }

    if (error == false) {
      setGif(true);
      const fd = new FormData();
      fd.append("vFirstName", FirstName);
      fd.append("vLastName", LastName);
      fd.append("eStatus", Status);
      fd.append("iUserId", iUserId);

      if (answer_array[2] == "localhost:3000") {
        var url = "http://localhost/pramesh/backend/api/useradd";
      } else {
        var url = "https://prameshsilks.com/backend/api/useradd";
      }
      const dataa = axios
        .post(url, fd)
        .then((res) => {
          setdisable(true);
          if (res.data.Status == "0") {
              setGif(false);
              setdisable(true);
            toast.success(res.data.message, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });

            setTimeout(function () {
              history.push("/admin/listing");
            }, 2000);
          } else {
            setdisable(false)
            toast.error(res.data.message, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        })
        .catch((error) => {});
    }
  }

  if (answer_array[2] == "localhost:3000") {
    var urls = `http://localhost/pramesh/backend/api/all_user_get?iUserId=${iUserId}`;
  } else {
    var urls = `https://prameshsilks.com/backend/api/all_user_get?iUserId=${iUserId}`;
  }

  useEffect(() => {
    axios
      .get(urls)
      .then((res) => {
        setFirstname(res.data.data.vFirstName);
        setLastname(res.data.data.vLastName);
        setEmail(res.data.data.vEmail);
        setStatus(res.data.data.eStatus);
      })
      .catch((err) => {});
  }, []);

  if (Status == "Active") {
    var Active = "selected";
  } else if (Status == "Inactive") {
    var Inactive = "selected";
  } else {
    var Active = "";
    var Inactive = "";
  }

  return (
    <>
      <Sidebar />
      <div className="main-content" id="panel">
        <Header />
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-12 col-md-12 col-sm-12">
              <div className="card">
                <div className="card-header border-0">
                  <div className="row align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Edit Add</h3>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <form>
                    <h6 className="heading-small text-muted mb-4">
                      Edit information
                    </h6>
                    <div className="pl-lg-4">
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label
                              className="form-control-label"
                              for="vFirstName"
                            >
                              FirstName
                            </label>
                            <input
                              value={FirstName}
                              onChange={(e) => setFirstname(e.target.value)}
                              type="text"
                              id="vFirstName"
                              className="form-control"
                              placeholder="FirstName"
                            />
                            <span className="red">{ErrorFirstName}</span>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label
                              className="form-control-label"
                              for="vLastName"
                            >
                              LastName
                            </label>
                            <input
                              value={LastName}
                              onChange={(e) => setLastname(e.target.value)}
                              type="text"
                              id="vLastName"
                              className="form-control"
                              placeholder="Lastname"
                            />
                            <span className="red">{ErrorLastName}</span>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label" for="vEmail">
                              Email
                            </label>
                            <input
                              value={Email}
                              onChange={(e) => setEmail(e.target.value)}
                              type="text"
                              id="vEmail"
                              className="form-control"
                              readOnly
                              placeholder="Email"
                            />
                            <span className="red">{ErrorEmail}</span>
                          </div>
                        </div>

                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label" for="vEmail">
                              Status
                            </label>
                            <select
                              className="form-control"
                              id="eStatus"
                              onChange={(e) => setStatus(e.target.value)}
                            >
                              <option value="">Select Status</option>
                              <option selected={Inactive} value="inactive">
                                Inactive
                              </option>
                              <option selected={Active} value="Active">
                                Active
                              </option>
                            </select>
                            <span className="red">{ErrorStatus}</span>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-group">
                            <button
                              type="button"
                              onClick={edituserdata}
                              className={`btn btn-primary ${
                                disable ? "disabled" : ""
                              }`}
                            >
                              {Gif == true ? (
                                <img
                                  className="loding_gif"
                                  src={process.env.PUBLIC_URL + "/Images/3.svg"}
                                  alt="img"
                                />
                              ) : (
                                <>Submit</>
                              )}
                            </button>
                            <Link to="/admin/listing">
                              <a>
                                <button
                                  type="button"
                                  className="btn btn-warning"
                                >
                                  Back
                                </button>
                              </a>
                            </Link>
                          </div>
                          <ToastContainer
                            position="top-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default User_Edit;
