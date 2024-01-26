import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
import axios from "axios";
import { useHistory } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import  getEnvironment  from '../../../components/environment';


const Category_edit = () => {
  const envConfig = getEnvironment();
  const apiUrl    = envConfig.apiUrl;      

  let history = useHistory();
  const [Title, setTitle] = useState("");
  const [Image, setImage] = useState("");
  const [Status, setStatus] = useState("");
  const [Gif, setGif] = useState(false);

  const [TitleError, setTitleError] = useState("");
  const [ImageError, setImageError] = useState("");
  const [disable, setdisable] = useState(false);

  const iCategoryId = window.location.pathname.substring(
    window.location.pathname.lastIndexOf("/") + 1
  );

  function addcategory() {
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

    const url = `${apiUrl}/category_add`;
  
    const fd = new FormData();
    fd.append("vTitle", Title);
    fd.append("vImage", Image);
    fd.append("eStatus", Status);
    fd.append("iCategoryId", iCategoryId);
    if (Title && Image) {
      setGif(true);
      axios.post(url, fd)
        .then((res) => {
          setdisable(true);

          if (res.data.Status == "0") {
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
              history.push("/admin/category/listing");
              // window.location.reload(1);
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

  useEffect(() => {
    axios
      .get(`${apiUrl}/all_category_get?iCategoryId=${iCategoryId}`)
      .then((res) => {
        setTitle(res.data.data.vTitle);
        setImage(res.data.data.vImage);
        setStatus(res.data.data.eStatus);
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
                      <h3 className="mb-0">Category Edit</h3>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <form>
                    <h6 className="heading-small text-muted mb-4">
                      Category
                    </h6>
                    <div className="pl-lg-4">
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label" for="vTitle">
                              Category Title
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
                            <label className="form-control-label" for="vImage">
                              Category Image
                            </label>
                            <input
                              type="file"
                              id="vImage"
                              onChange={(e) => setImage(e.target.files[0])}
                              className="form-control vImage"
                            />
                            <img src={Image} className="img1 h-101" />
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
                              Status
                            </label>
                            <select
                              className="form-control"
                              onChange={(e) => setStatus(e.target.value)}
                            >
                              <option
                                selected={
                                  Status == "Inactive" ? "selected" : ""
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

                        <div className="col-lg-12">
                          <div className="form-group">
                            <button
                              type="button"
                              onClick={addcategory}
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
                            <Link to="/admin/category/listing">
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

export default Category_edit;
