import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import axios from "axios";
import { useHistory } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import  getEnvironment  from '../../../components/environment';

import "react-toastify/dist/ReactToastify.css";

const AddImage = () => {
  const { apiUrl } = getEnvironment();

  const url = `${apiUrl}/image_content_added`;
 
  let history = useHistory();
  const [Title, setTitle] = useState("");
  const [Status, setStatus] = useState("inActive");
  const [ImageType, setImageType] = useState("1");
  const [Image, setImage] = useState([]);
  const [Desc, setDesc] = useState("");
  const [TitleError, setTitleError] = useState("");
  const [ImageError, setImageError] = useState("");
  const [DescError, setDescError] = useState("");
  const [Gif, setGif] = useState(false);
  const [disable, setdisable] = useState(false);


  const addbanner = () => {
    if (Title) {
      setTitleError("");
    } else {
      setTitleError("Please Enter Title");
    }
    if (Image.name) {
      setImageError("");
    } else {
      setImageError("Please Select Image");
    }
    if (Desc) {
      setDescError("");
    } else {
      setDescError("Please Enter Description");
    }

    const fd = new FormData();
    fd.append("vTitle", Title);
    fd.append("eStatus", Status);
    fd.append("vImageType", ImageType);

    fd.append("vImage", Image);
    fd.append("tDesc", Desc);

    if (Title && Desc && Image.name) {
      setGif(true);
      const dataa = axios
        .post(url, fd)
        .then((res) => {
            setdisable(true)
          if (res.data.Status == "0") {
            setGif(false);
            setdisable(true)
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
              history.push("/admin/image-content");
            }, 2000);
          } else {
            setGif(false);
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
  };

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
                      <h3 className="mb-0">Image Content Add</h3>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <form>
                    <h6 className="heading-small text-muted mb-4">
                      Image Content information
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
                              className="form-control"
                              placeholder="Title"
                              onChange={(e) => setTitle(e.target.value)}
                            />
                            <span className="red">{TitleError}</span>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <div className="form-group">
                              <label
                                className="form-control-label"
                                for="vImage"
                              >
                                Banner Image
                              </label>
                              <input
                                type="file"
                                id="vImage"
                                onChange={(e) => setImage(e.target.files[0])}
                                className="form-control vImage"
                              />
                              <img src="" className="img1 h-101" />
                              <span className="red">{ImageError}</span>
                            </div>
                          </div>
                        </div>

                        
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label" for="vEmail">
                              Main Image (HomePage)
                            </label>
                            <select
                              className="form-control"
                              onChange={(e) => setImageType(e.target.value)}
                            >
                              <option value="1">First Image</option>
                              <option value="2">Second Image</option>
                              <option value="3">Third Image</option>
                              <option value="4">Product First Image</option>
                              <option value="5">Product Second Image</option>
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
                              id="vDescription"
                              rows="1"
                              className="form-control"
                              placeholder="Description..."
                              onChange={(e) => setDesc(e.target.value)}
                            ></textarea>
                            <span className="red">{DescError}</span>
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
                            <Link to="/admin/image-content">
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

export default AddImage;
