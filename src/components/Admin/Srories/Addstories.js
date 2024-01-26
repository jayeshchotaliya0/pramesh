import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import axios from "axios";
import { useHistory } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Addstories = () => {
  let history = useHistory();
  var answer = window.location.href;
  const answer_array = answer.split("/");
  const [Image, setImage] = useState("");
  const [Image1, setImage1] = useState("");
  const [Image2, setImage2] = useState("");
  const [Image3, setImage3] = useState("");
  const [Image4, setImage4] = useState("");
  const [Image_e, setImage_e] = useState("");
  const [Image1_e, setImage1_e] = useState("");
  const [Image2_e, setImage2_e] = useState("");
  const [Image3_e, setImage3_e] = useState("");
  const [Image4_e, setImage4_e] = useState("");

  const [Title, setTitle] = useState("");
  const [Title1, setTitle1] = useState("");
  const [Title2, setTitle2] = useState("");
  const [Title3, setTitle3] = useState("");
  const [Title4, setTitle4] = useState("");
  const [Title5, setTitle5] = useState("");
  const [Title6, setTitle6] = useState("");
  const [Title7, setTitle7] = useState("");
  const [Title8, setTitle8] = useState("");
  const [Title9, setTitle9] = useState("");

  const [Title_e, setTitle_e] = useState("");
  const [Title1_e, setTitle1_e] = useState("");
  const [Title2_e, setTitle2_e] = useState("");
  const [Title3_e, setTitle3_e] = useState("");
  const [Title4_e, setTitle4_e] = useState("");
  const [Title5_e, setTitle5_e] = useState("");
  const [Title6_e, setTitle6_e] = useState("");
  const [Title7_e, setTitle7_e] = useState("");
  const [Title8_e, setTitle8_e] = useState("");
  const [Title9_e, setTitle9_e] = useState("");
  const [disable, setdisable] = useState(false);

  const [Gif, setGif] = useState(false);

  const handleSubmit = (event) => {
    var error = false;
    if (Image) {
      setImage_e("");
    } else {
      setImage_e("Please Select Image");
      error = true;
    }
    if (Image1) {
      setImage1_e("");
    } else {
      setImage1_e("Please Select Image");
      error = true;
    }
    if (Image2) {
      setImage2_e("");
    } else {
      setImage2_e("Please Select Image");
      error = true;
    }

    if (Image3) {
      setImage3_e("");
    } else {
      setImage3_e("Please Select Image");
      error = true;
    }

    if (Image4) {
      setImage4_e("");
    } else {
      setImage4_e("Please Select Image");
      error = true;
    }
    if (Title) {
      setTitle_e("");
    } else {
      setTitle_e("Please Enter Title");
      error = true;
    }
    if (Title1) {
      setTitle1_e("");
    } else {
      setTitle1_e("Please Enter Desc");
      error = true;
    }
    if (Title2) {
      setTitle2_e("");
    } else {
      setTitle2_e("Please Enter Video Link");
      error = true;
    }
    if (Title3) {
      setTitle3_e("");
    } else {
      setTitle3_e("Please Enter Video Link");
      error = true;
    }
    if (Title4) {
      setTitle4_e("");
    } else {
      setTitle4_e("Please Enter Video Link");
      error = true;
    }
    if (Title5) {
      setTitle5_e("");
    } else {
      setTitle5_e("Please Enter Video Link");
      error = true;
    }
    if (Title6) {
      setTitle6_e("");
    } else {
      setTitle6_e("Please Enter Title");
      error = true;
    }
    if (Title7) {
      setTitle7_e("");
    } else {
      setTitle7_e("Please Enter Desc");
      error = true;
    }
    if (Title8) {
      setTitle8_e("");
    } else {
      setTitle8_e("Please Enter Title");
      error = true;
    }
    if (Title9) {
      setTitle9_e("");
    } else {
      setTitle9_e("Please Enter Desc");
      error = true;
    }

    event.preventDefault();
    const data = new FormData(event.target);
    if (answer_array[2] == "localhost:3000") {
      var url = "http://localhost/pramesh/backend/api/stories_added";
    } else {
      var url = "https://prameshsilks.com/backend/api/stories_added";
    }

    if (error == false) {
      setGif(true);
      const dataa = axios
        .post(url, data)
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
              history.push("/admin/stories");
              // window.location.reload(1);
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
                      <h3 className="mb-0">Stories Add</h3>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <h6 className="heading-small text-muted mb-4">
                      Stories information
                    </h6>
                    <div className="pl-lg-4">
                      <div className="row">
                        {/* ******* First Image and description ***************** */}
                        <div className="col-lg-4">
                          <div className="form-group">
                            <div className="form-group">
                              <label
                                className="form-control-label"
                                for="vImage"
                              >
                                Stories Image
                              </label>
                              <input
                                type="file"
                                onChange={(e) => setImage(e.target.files)}
                                name="Stories1_image"
                                id="Stories1_image vImage"
                                accept="image/*"
                                className="form-control vImage"
                              />
                              <span className="red">{Image_e}</span>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="form-group">
                            <label className="form-control-label" for="vTitle">
                              Title
                            </label>
                            <input
                              onChange={(e) => setTitle(e.target.value)}
                              type="text"
                              name="Stories1_title"
                              id="vTitle"
                              className="form-control"
                              placeholder="Title"
                            />
                            <span className="red">{Title_e}</span>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="form-group">
                            <label
                              className="form-control-label"
                              for="vDescription"
                            >
                              Description
                            </label>
                            <textarea
                              name="Stories1_desc"
                              onChange={(e) => setTitle1(e.target.value)}
                              id="vDescription"
                              rows="4"
                              className="form-control"
                              placeholder="Description..."
                            ></textarea>
                            <span className="red">{Title1_e}</span>
                          </div>
                        </div>
                        {/* ******** Second Image and description ********* */}
                        <div className="col-lg-4">
                          <div className="form-group">
                            <div className="form-group">
                              <label
                                className="form-control-label"
                                for="vImage"
                              >
                                First Image
                              </label>
                              <input
                                onChange={(e) => setImage1(e.target.files)}
                                name="second_image1"
                                type="file"
                                id="vImage"
                                accept="image/*"
                                className="form-control vImage"
                              />
                              <span className="red">{Image1_e}</span>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="form-group">
                            <div className="form-group">
                              <label
                                className="form-control-label"
                                for="vImage"
                              >
                                Second Image
                              </label>
                              <input
                                onChange={(e) => setImage2(e.target.files)}
                                name="second_image2"
                                type="file"
                                id="vImage"
                                className="form-control vImage"
                              />
                              <span className="red">{Image2_e}</span>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="form-group">
                            <div className="form-group">
                              <label
                                className="form-control-label"
                                for="vImage"
                              >
                                Third Image
                              </label>
                              <input
                                onChange={(e) => setImage3(e.target.files)}
                                name="second_image3"
                                type="file"
                                id="vImage"
                                accept="image/*"
                                className="form-control vImage"
                              />
                              <span className="red">{Image3_e}</span>
                            </div>
                          </div>
                        </div>
                        {/* **************Third *************** */}
                        {/* <div className="col-lg-3">
                                                    <div className="form-group">
                                                        <div className="form-group">
                                                            <label className="form-control-label" for="vVideo">Stories Video</label>
                                                            <input type="file" name="stories_video" className="vVideo_change" accept="video/*" className="form-control" />
                                                        </div>
                                                    </div>
                                                </div> */}
                        <div className="col-lg-3">
                          <div className="form-group">
                            <label className="form-control-label" for="vTitle">
                              Video Link 1
                            </label>
                            <input
                              onChange={(e) => setTitle2(e.target.value)}
                              name="video_link1"
                              type="text"
                              id="vTitle"
                              className="form-control"
                              placeholder="Title"
                            />
                            <span className="red">{Title2_e}</span>
                          </div>
                        </div>
                        <div className="col-lg-3">
                          <div className="form-group">
                            <label className="form-control-label" for="vTitle">
                              Video Link 2
                            </label>
                            <input
                              onChange={(e) => setTitle3(e.target.value)}
                              name="video_link2"
                              type="text"
                              id="vTitle"
                              className="form-control"
                              placeholder="Title"
                            />
                            <span className="red">{Title3_e}</span>
                          </div>
                        </div>
                        <div className="col-lg-3">
                          <div className="form-group">
                            <label className="form-control-label" for="vTitle">
                              Video Link 3
                            </label>
                            <input
                              onChange={(e) => setTitle4(e.target.value)}
                              name="video_link3"
                              type="text"
                              id="vTitle"
                              className="form-control"
                              placeholder="Title"
                            />
                            <span className="red">{Title4_e}</span>
                          </div>
                        </div>
                        <div className="col-lg-3">
                          <div className="form-group">
                            <label className="form-control-label" for="vTitle">
                              Video Link 4
                            </label>
                            <input
                              onChange={(e) => setTitle5(e.target.value)}
                              name="video_link4"
                              type="text"
                              id="vTitle"
                              className="form-control"
                              placeholder="Title"
                            />
                            <span className="red">{Title5_e}</span>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label" for="vTitle">
                              Title
                            </label>
                            <input
                              onChange={(e) => setTitle6(e.target.value)}
                              type="text"
                              name="video_title"
                              id="vTitle"
                              className="form-control"
                              placeholder="Title"
                            />
                            <span className="red">{Title6_e}</span>
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
                              onChange={(e) => setTitle7(e.target.value)}
                              name="video_desc"
                              id="vDescription"
                              rows="4"
                              className="form-control"
                              placeholder="Description..."
                            ></textarea>
                            <span className="red">{Title7_e}</span>
                          </div>
                        </div>

                        {/* *********Last Section ************* */}
                        <div className="col-lg-4">
                          <div className="form-group">
                            <div className="form-group">
                              <label
                                className="form-control-label"
                                for="vImage"
                              >
                                Stories Image
                              </label>
                              <input
                                onChange={(e) => setImage4(e.target.files)}
                                name="second_stories_image"
                                type="file"
                                id="vImage"
                                accept="image/*"
                                className="form-control vImage"
                              />
                              <span className="red">{Image4_e}</span>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="form-group">
                            <label className="form-control-label" for="vTitle">
                              Title
                            </label>
                            <input
                              onChange={(e) => setTitle8(e.target.value)}
                              type="text"
                              name="second_stories_title"
                              id="vTitle"
                              className="form-control"
                              placeholder="Title"
                            />
                            <span className="red">{Title8_e}</span>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="form-group">
                            <label
                              className="form-control-label"
                              for="vDescription"
                            >
                              Description
                            </label>
                            <textarea
                              onChange={(e) => setTitle9(e.target.value)}
                              name="second_stories_desc"
                              id="vDescription"
                              rows="4"
                              className="form-control"
                              placeholder="Description..."
                            ></textarea>
                            <span className="red">{Title9_e}</span>
                          </div>
                        </div>

                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label" for="vEmail">
                              Status
                            </label>
                            <select name="eStatus" className="form-control">
                              <option value="inActive">Inactive</option>
                              <option value="Active">Active</option>
                            </select>
                          </div>
                        </div>

                        <div className="col-lg-12">
                          <div className="form-group">
                            <button
                              type="submit"
                              className={`btn btn-primary ${disable ? "disabled" : ""}`}>
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
                            <Link to="/admin/stories">
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

export default Addstories;
