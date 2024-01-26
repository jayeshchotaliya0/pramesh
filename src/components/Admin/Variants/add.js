import { Link } from "react-router-dom";
import React, { useState, Component } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import axios from "axios";
import { useHistory } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Variantsadd = () => {
  var answer = window.location.href;
  const answer_array = answer.split("/");
  if (answer_array[2] == "localhost:3000") {
    var url = "http://localhost/pramesh/backend/api/variants_add";
  } else {
    var url = "https://prameshsilks.com/backend/api/variants_add";
  }

  let history = useHistory();
  const [Title, setTitle] = useState("");
  const [Status, setStatus] = useState("Inactive");
  const [TitleError, setTitleError] = useState("");
  const [disable, setdisable] = useState(false);

  function addcategory() {
    if (Title) {
      setTitleError("");
    } else {
      setTitleError("Please Enter Category Name");
    }

    const fd = new FormData();
    fd.append("vLabel", Title);
    fd.append("eStatus", Status);
    if (Title && Status) {
      const dataa = axios
        .post(url, fd)
        .then((res) => {
          setdisable(true);

          if (res.data.Status == "0") {
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
              history.push("/admin/variants/listing");
              // window.location.reload(1);
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
                      <h3 className="mb-0">Variant Add </h3>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <form>
                    <h6 className="heading-small text-muted mb-4">
                      variants information
                    </h6>
                    <div className="pl-lg-4">
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label" for="vTitle">
                              Variant Name(Size,Color)
                            </label>
                            <input
                              type="text"
                              id="vTitle"
                              onChange={(e) => setTitle(e.target.value)}
                              className="form-control"
                              placeholder="Title"
                              value={Title}
                            />
                            <span className="red">{TitleError}</span>
                          </div>
                        </div>

                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label" for="vEmail">
                              Status
                            </label>
                            <select
                              className="form-control"
                              onChange={(e) => setStatus(e.target.value)}
                            >
                              <option value="inActive">Inactive</option>
                              <option value="Active">Active</option>
                            </select>
                          </div>
                        </div>

                        <div className="col-lg-12">
                          <div className="form-group">
                            <button
                              type="button"
                              onClick={addcategory}
                              className={`btn btn-primary ${
                                disable ? "disabled" : ""
                              }`}
                            >
                              Submit
                            </button>
                            <Link to="/admin/variants/listing">
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

export default Variantsadd;
