import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
import axios from "axios";
import { useHistory } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import  getEnvironment  from '../../../components/environment';

import "react-toastify/dist/ReactToastify.css";

const Useradd = () => {
  let history = useHistory();
  const { apiUrl } = getEnvironment();
  const [FirstName, setFirstname] = useState("");
  const [LastName, setLastname] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Status, setStatus] = useState("");
  const [Gif, setGif] = useState(false);

  const [ErrorFirstName, setErrorFirstname] = useState("");
  const [ErrorLastName, setErrorLastname] = useState("");
  const [ErrorEmail, setErrorEmail] = useState("");
  const [ErrorPassword, setErrorPassword] = useState("");
  const [ErrorStatus, setErrorStatus] = useState("");
  const [EmailDone, setEmailDone] = useState(0);
  const [disable, setdisable] = useState(false);

  const Emailchnage = (e) => {
    setEmail(e.target.value);

    validateEmail();
  };

  function validateEmail() {
    const emailText = document.getElementById("vEmail").value;
    const pattern = /^[a-zA-Z0-9-_]+(\.[a-zA-Z0-9-_]+)*@[a-z0-9]+(-[a-z0-9]+)*(\.[a-z0-9]+(-[a-z0-9]+)*)*\.[a-z]{2,4}$/;

    if (pattern.test(emailText)) {
     
      var email_verify = `${apiUrl}/email_varify`;
      const fd = new FormData();
      fd.append("vEmail", emailText);

      axios.post(email_verify, fd).then((res) => {
          if (res.data.Status === "1") {
            setEmailDone(0);
            setErrorEmail("email address already exists");
            return false;
          } else {
            setErrorEmail("");
            setEmailDone(1);
            return true;
          }
        })
        .catch((error) => {});
    } else {
      setErrorEmail("Invalid Email Address:" + emailText);
      setEmailDone(0);
      return false;
    }
  }

  function adduserdata() {
    validateEmail();
    var errormsg = false;

    if (EmailDone === 0) {
      errormsg = true;
    } else {
      errormsg = false;
    }

    if (FirstName !== "") {
      setErrorFirstname("");
    } else {
      setErrorFirstname("Please Enter Firstname");
      errormsg = true;
    }

    if (LastName !== "") {
      setErrorLastname("");
    } else {
      setErrorLastname("Please Enter Lastname");
      errormsg = true;
    }

    if (Password !== "") {
      setErrorPassword("");
    } else {
      setErrorPassword("Please Enter Password");
      errormsg = true;
    }

    if (Status) {
      setErrorStatus("");
    } else {
      setErrorStatus("Please Select Status");
      errormsg = true;
    }

    if (errormsg === false) {
      const fd = new FormData();
      fd.append("vFirstName", FirstName);
      fd.append("vLastName", LastName);
      fd.append("vEmail", Email);
      fd.append("vPassword", Password);
      fd.append("eStatus", Status);

      setGif(true);
     
      const url = `${apiUrl}/useradd`;
      
       axios.post(url, fd).then((res) => {
          setdisable(true);
          if (res.data.Status === "0") {
            setdisable(true);
            setGif(false);
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
            setdisable(false);
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
                      <h3 className="mb-0">User Add</h3>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <form>
                    <h6 className="heading-small text-muted mb-4">
                      User information
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
                              onKeyUp={Emailchnage}
                              type="text"
                              id="vEmail"
                              className="form-control"
                              placeholder="Email"
                            />
                            <span className="red">{ErrorEmail}</span>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label" for="vEmail">
                              Password
                            </label>
                            <input
                              onChange={(e) => setPassword(e.target.value)}
                              type="password"
                              id="vPassword"
                              className="form-control"
                              placeholder="Password"
                            />
                            <span className="red">{ErrorPassword}</span>
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
                              <option value="inactive">Inactive</option>
                              <option value="Active">Active</option>
                            </select>
                            <span className="red">{ErrorStatus}</span>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-group">
                            <button
                              type="button"
                              onClick={adduserdata}
                              className={`btn  btn-primary ${
                                disable ? "disabled" : ""
                              }`}
                            >
                              {Gif === true ? (
                                <img
                                  className="loding_gif"
                                  src={process.env.PUBLIC_URL + "/Images/3.svg"}
                                  alt="img"
                                />
                              ) : (
                                <>Submit</>
                              )}
                            </button>
                            <Link to="/admin/listing" className="btn btn-warning">Back</Link>
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

export default Useradd;
