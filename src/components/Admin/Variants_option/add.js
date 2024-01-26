import { Link } from "react-router-dom";
import React, { useState, Component, useEffect } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import axios from "axios";
import { useHistory } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Subcategoryadd = () => {
  var answer = window.location.href;
  const answer_array = answer.split("/");
  if (answer_array[2] == "localhost:3000") {
    var urls = `http://localhost/pramesh/backend/api/get_variants`;
    var url = "http://localhost/pramesh/backend/api/option_add";
  } else {
    var urls = `https://prameshsilks.com/backend/api/get_variants`;
    var url = "https://prameshsilks.com/backend/api/option_add";
  }

  let history = useHistory();
  const [ArrayVariants, setArrayVariants] = useState([]);
  const [Variants, setVariants] = useState("");
  const [Title, setTitle] = useState("");

  const [Status, setStatus] = useState("Inactive");
  const [TitleError, setTitleError] = useState("");
  const [VariantsError, setVariantsError] = useState("");
  const [disable, setdisable] = useState(false);

  function addcategory() {
    if (Variants) {
      setVariantsError("");
    } else {
      setVariantsError("Select Variants Name");
    }
    if (Title) {
      setTitleError("");
    } else {
      setTitleError("Please Enter Option Name");
    }

    const fd = new FormData();
    fd.append("iVariantId", Variants);
    fd.append("vOptions", Title);
    fd.append("eStatus", Status);

    if (Title && Variants) {
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
              history.push("/admin/variant_option/listing");
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

  useEffect(() => {
    axios
      .get(urls)
      .then((res) => {
        setArrayVariants(res.data.data);
      })
      .catch((err) => {});
  }, []);

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
                      <h3 className="mb-0">Variants Option Add </h3>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <form>
                    <h6 className="heading-small text-muted mb-4">
                      Variants Option information
                    </h6>
                    <div className="pl-lg-4">
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label" for="vTitle">
                              Variants Name
                            </label>
                            <select
                              className="form-control"
                              onChange={(e) => setVariants(e.target.value)}
                            >
                              <option value="">Select Variants</option>
                              {ArrayVariants.map((vari, index) => (
                                <option value={vari.iVariantId}>
                                  {vari.vLabel}
                                </option>
                              ))}
                            </select>
                            <span className="red">{VariantsError}</span>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label" for="vTitle">
                              Option Name(Red,Black)
                            </label>
                            <input
                              type="text"
                              id="vTitle"
                              onChange={(e) => setTitle(e.target.value)}
                              className="form-control"
                              placeholder="Option Name"
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
                            <Link to="/admin/variant_option/listing">
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

export default Subcategoryadd;
