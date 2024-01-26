import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
import axios from "axios";
import { useHistory } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import  getEnvironment  from '../../../components/environment';


const Banner_edit = () => {
  let history = useHistory();
  const envConfig = getEnvironment();
  const apiUrl    = envConfig.apiUrl;         

  const [Title, setTitle] = useState("");
  const [Image, setImage] = useState("");
  const [Order, setOrder] = useState("");
  const [Desc, setDesc] = useState("");
  const [Status, setStatus] = useState("");
  const [BannerType, setBannerType] = useState("");
  const [Showtype, setShowtype] = useState("");
  const [Gif, setGif] = useState(false);

  const [TitleError, setTitleError] = useState("");
  const [ImageError, setImageError] = useState("");
  const [OrderError, setOrderError] = useState("");
  const [DescError, setDescError] = useState("");
  const [disable, setdisable] = useState(false);

  var iBannerId = window.location.pathname.substring(
    window.location.pathname.lastIndexOf("/") + 1
  );

  function addbanner() {
    if (Title) {
      setTitleError("");
    } else {
      setTitleError("Please Enter Title");
    }
    if (Image) {
      setImageError("");
    } else {
      setImageError("Please Select Image");
    }
    if (Order) {
      setOrderError("");
    } else {
      setOrderError("Please Enter Order Number");
    }
    if (Desc) {
      setDescError("");
    } else {
      setDescError("Please Enter Description");
    }

    var url = `${apiUrl}/banner_add`;
 
    const fd = new FormData();
    fd.append("vTitle", Title);
    fd.append("vImage", Image);
    fd.append("vOrder", Order);
    fd.append("vdesc", Desc);
    fd.append("eStatus", Status);
    fd.append("vBannerType", BannerType);
    fd.append("eShowtype", Showtype);

    fd.append("iBannerId", iBannerId);
    if (Title && Image && Desc) {
      setGif(true);
      axios
        .post(url, fd)
        .then((res) => {
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
              history.push("/admin/banner");
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

  var urls = `${apiUrl}/all_banner_get?iBannerId=${iBannerId}`;
 
  useEffect(() => {
    axios
      .get(urls)
      .then((res) => {
        setTitle(res.data.data.vTitle);
        setImage(res.data.data.vImage);
        setOrder(res.data.data.iOrder);
        setDesc(res.data.data.tDescription);
        setStatus(res.data.data.eStatus);
        setBannerType(res.data.data.vBannerType);
        setShowtype(res.data.data.eShowtype);
      })
      .catch((err) => {});
  }, []);

  // if (Status == 'Active') {
  //     var select = 'selected';
  // }
  // else if (Status == 'inActive') {
  //     var select = 'selected';
  // }
  // else {
  //     var select = '';
  // }

  if (BannerType === "1") {
    var select = "selected";
  } else if (BannerType === "2") {
    select = "selected";
  } else {
    select = "";
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
                      <h3 className="mb-0">Banner Add </h3>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <form>
                    <h6 className="heading-small text-muted mb-4">
                      Banner information
                    </h6>
                    <div className="pl-lg-4">
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label" for="vTitle">
                              Title
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
                              Banner Type
                            </label>
                            <select
                              className="form-control"
                              onChange={(e) => setBannerType(e.target.value)}
                            >
                              <option selected={select} value="1">
                                Main Slider
                              </option>
                              <option selected={select} value="2">
                                Mini Slider
                              </option>
                            </select>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label" for="vEmail">
                              Order
                            </label>
                            <input
                              type="number"
                              onChange={(e) => setOrder(e.target.value)}
                              id="vOrder"
                              value={Order}
                              className="form-control"
                              placeholder="Order"
                            />
                            <span className="red">{OrderError}</span>
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
                              <option
                                selected={
                                  Status == "inActive" ? "selected" : ""
                                }
                                value="inActive"
                              >
                                Inactive
                              </option>
                              <option
                                selected={Status == "Active" ? "selected" : ""}
                                value="Active"
                              >
                                Active
                              </option>
                            </select>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label" for="vImage">
                              Banner Image
                            </label>
                            <input
                              type="file"
                              id="vImage"
                              onChange={(e) => setImage(e.target.files[0])}
                              className="form-control vImage"
                            />
                            <img
                              src={Image}
                              className="img1 h-101"
                              alt="sareeImages"
                            />
                            {Image ? (
                              <span className="red"></span>
                            ) : (
                              <span className="red">{ImageError}</span>
                            )}
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label" for="vEmail">
                              Show Type(Desktop/Mobile)
                            </label>
                            <select
                              className="form-control"
                              onChange={(e) => setShowtype(e.target.value)}
                            >
                              <option
                                selected={
                                  Showtype == "Desktop" ? "selected" : ""
                                }
                                value="Desktop"
                              >
                                Desktop Show
                              </option>
                              <option
                                selected={
                                  Showtype == "Mobile" ? "selected" : ""
                                }
                                value="Mobile"
                              >
                                Mobile Show
                              </option>
                            </select>
                          </div>
                        </div>

                        <div className="col-lg-6">
                          <div className="form-group">
                            <label
                              className="form-control-label"
                              for="vDescription"
                            >
                              Description
                            </label>
                            <textarea
                              onChange={(e) => setDesc(e.target.value)}
                              id="vDescription"
                              rows="4"
                              className="form-control"
                              placeholder="Description..."
                              value={Desc}
                            ></textarea>
                            <span className="red">{DescError}</span>
                          </div>
                        </div>

                        <div className="col-lg-12">
                          <div className="form-group">
                            <button
                              type="button"
                              onClick={addbanner}
                              className={`btn  btn-primary ${disable ? "disabled" : ""}`}
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
                            <Link to="/admin/banner">
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

export default Banner_edit;
