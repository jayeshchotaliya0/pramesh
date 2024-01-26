import { Link } from "react-router-dom";
import React, { useState, useEffect, Component } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import axios from "axios";
import { useHistory } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import  getEnvironment  from '../../../components/environment';

const Fabric_add = () => {
  let history     = useHistory();
  const envConfig = getEnvironment();
  const apiUrl    = envConfig.apiUrl;   
  const [headerMenu, setHeaderMenu] = useState([]);
  const [Fabric, setFabric]         = useState("");
  const [FabricError, setFabricError] = useState("");
  const [iHeaderId, setiHeaderId]   = useState("");
  const [iHeaderIdError, setiHeaderIdError] = useState("");

  const [Status, setStatus] = useState("Inactive");
  const [Gif, setGif] = useState(false);
  const [disable, setdisable] = useState(false);

  function addfabric() {
    var error = false;
    if (iHeaderId) {
      setiHeaderIdError("");
    } else {
      setiHeaderIdError("Please Select Header Menu");
      error = true;
    }
    if (Fabric) {
      setFabricError("");
    } else {
      setFabricError("Please Enter Fabric Name");
      error = true;
    }

    const url = `${apiUrl}/fabric_add`;
  
    const fd = new FormData();
    fd.append("vTitle", Fabric);
    fd.append("iHeaderId", iHeaderId);
    fd.append("eStatus", Status);
    if (error == false) {
      setGif(true);
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
              history.push("/admin/fabric/listing");
            }, 2000);
          } else {
            setGif(false);
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

  const urls = `${apiUrl}/get_header_manu`;

  useEffect(() => {
    axios
      .get(urls)
      .then((res) => {
        setHeaderMenu(res?.data?.data?.filter((v,i)=>v.eStatus==='Active'));
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
                      <h3 className="mb-0">Fabric Add</h3>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <form>
                    <h6 className="heading-small text-muted mb-4">
                      Fabric information
                    </h6>
                    <div className="pl-lg-4">
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label" for="vTitle">
                              Header Menu
                            </label>
                            <select
                              className="form-control"
                              onChange={(e) => setiHeaderId(e.target.value)}
                            >
                              <option value="">Select Header Menu</option>
                              {headerMenu.map(function (cat, index) {
                                  return (
                                    <option value={cat.iHeaderId}>
                                      {cat.vTitle}
                                    </option>
                                  );
                              })}
                            </select>
                            <span className="red">{iHeaderIdError}</span>
                          </div>
                        </div>

                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label" for="vTitle">
                              Fabric
                            </label>
                            <input
                              type="text"
                              id="vTitle"
                              onChange={(e) => setFabric(e.target.value)}
                              className="form-control"
                              placeholder="Title"
                            />
                            <span className="red">{FabricError}</span>
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
                              onClick={addfabric}
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
                            <Link to="/admin/fabric/listing">
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

export default Fabric_add;