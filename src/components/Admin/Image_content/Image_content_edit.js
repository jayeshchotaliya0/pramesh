import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
import axios from "axios";
import { useHistory } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router";
import  getEnvironment  from '../../../components/environment';

const Image_content_edit = () => {
  const { apiUrl } = getEnvironment();;
  const url = `${apiUrl}/image_content_added`;
 
  let history = useHistory();
  const [Title, setTitle] = useState("");
  const [Image, setImage] = useState("");
  const [Status, setStatus] = useState("");
  const [Desc, setDesc] = useState("");
  const [ImageType, setImageType] = useState("");
  const [Gif, setGif] = useState(false);
  const [TitleError, setTitleError] = useState("");
  const [ImageError, setImageError] = useState("");
  const [DescError, setDescError] = useState("");
  const [disable, setdisable] = useState(false);

  const { id: iContentId } = useParams();

  function addbanner_content() {
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
    fd.append("vImage", Image);
    fd.append("eStatus", Status);
    fd.append("tDesc", Desc);
    fd.append("vImageType", ImageType);
    fd.append("iContentId", iContentId);

    if (Title != "" && Image != "") {
      setGif(true);
      axios.post(url, fd).then((res) => {
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
              history.push("/admin/image-content");
            }, 2000);
          } else {
            setdisable(false);
            setGif(false);
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
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/all_image_content_get?iContentId=${iContentId}`);
        const { vTitle, vImage, tDescription, eStatus, vImageType } = data.data;
        setTitle(vTitle);
        setImage(vImage);
        setDesc(tDescription);
        setStatus(eStatus);
        setImageType(vImageType);
      } catch (err) {
        // Handle errors if needed
        console.error('Error in useEffect:', err);
      }
    };
  
    fetchData();
  }, [iContentId]);

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
                      <h3 className="mb-0">Image Content Edit</h3>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <form>
                    <h6 className="heading-small text-muted mb-4">
                      IMAGE CONTENT INFORMATION
                    </h6>
                    <div className="pl-lg-4">
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label" for="vTitle">
                              Title {TitleError}
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
                        <div className="col-lg-6"></div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label" for="vEmail">
                              Status
                            </label>
                            <select
                              className="form-control"
                              onChange={(e) => setStatus(e.target.value)}
                            >
                              <option value="inActive" selected={Status === "inActive"}>
                                Inactive
                              </option>
                              <option value="Active" selected={Status === "Active"}>
                                Active
                              </option>
                            </select>
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
                              <option
                                selected={ImageType == "1" ? "selected" : ""}
                                value="1"
                              >
                                First Image
                              </option>

                              <option
                                selected={ImageType == "2" ? "selected" : ""}
                                value="2"
                              >
                                Second Image
                              </option>
                              <option
                                selected={ImageType == "3" ? "selected" : ""}
                                value="3"
                              >
                                Third Image
                              </option>
                              <option
                                selected={ImageType == "4" ? "selected" : ""}
                                value="4"
                              >
                                Product First Image
                              </option>
                              <option
                                selected={ImageType == "5" ? "selected" : ""}
                                value="5"
                              >
                                Product Second Image
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
                              accept="image/*"
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
                              onClick={addbanner_content}
                              className={`btn  btn-primary ${
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

export default Image_content_edit;
