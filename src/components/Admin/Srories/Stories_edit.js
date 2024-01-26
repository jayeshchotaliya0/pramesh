import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import axios from "axios";
import { useHistory } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Stories_edit = () => {
  let history = useHistory();
  const [Gif, setGif] = useState(false);
  const [VStories1_image, setVStories1_image] = useState("");
  const [vStories1_Title, setvStories1_Title] = useState("");
  const [vStories1_Desc, setvStories1_Desc] = useState("");

  const [vSecond_image1, setvSecond_image1] = useState("");
  const [vSecond_image2, setvSecond_image2] = useState("");
  const [vSecond_image3, setvSecond_image3] = useState("");

  const [vVideo_Title, setvVideo_Title] = useState("");
  const [vVideo_Link1, setvVideo_Link1] = useState("");
  const [vVideo_Link2, setvVideo_Link2] = useState("");
  const [vVideo_Link3, setvVideo_Link3] = useState("");
  const [vVideo_Link4, setvVideo_Link4] = useState("");
  const [vVideo_Desc, setvVideo_Desc] = useState("");

  const [vSecond_image, setvSecond_image] = useState("");
  const [vSecond_Title, setvSecond_Title] = useState("");
  const [vSecond_Desc, setvSecond_Desc] = useState("");

  const [eStatus, seteStatus] = useState("");
  const [disable, setdisable] = useState(false);

  var iStoriesId = window.location.pathname.substring(
    window.location.pathname.lastIndexOf("/") + 1
  );

  let images = [];
  const handleChangeStatus = ({ meta }, status) => {
    images.push(meta.name);
  };
  // *********************************************************DATA ADDED************************************
  // function chosenVideo(e) {
  //     var file = e.target.files[0];
  //     var file_state = e.target;
  //     var reader = new FileReader();
  //     reader.onloadend = () => {
  //     };
  //     reader.readAsDataURL(file);
  //     setVideo(file);
  //     setLiveVideo(URL.createObjectURL(file));
  // }
  const handleSubmit = (event) => {
    setGif(true);
    event.preventDefault();

    const data = new FormData(event.target);
    if (answer_array[2] == "localhost:3000") {
      var url = "http://localhost/pramesh/backend/api/stories_added";
    } else {
      var url = "https://prameshsilks.com/backend/api/stories_added";
    }

    const dataa = axios
      .post(url, data)
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
            history.push("/admin/stories");
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
  };

  // const addstories = () => {
  //     if (Title) {
  //         setErrroTitle('');
  //     }
  //     else {
  //         setErrroTitle('Please Enter Stories Title');
  //     }
  //     if (Image) {
  //         setErrroImage('');
  //     }
  //     else {
  //         setErrroImage('Please Select Stories Image');
  //     }

  //     if (Video) {
  //         setErrroVideo('');
  //     }
  //     else {
  //         setErrroVideo('Please Select Stories Video');
  //     }

  //     if (Desc) {
  //         setErrroDesc('');
  //     }
  //     else {
  //         setErrroDesc('Please Enter Discription');
  //     }

  //     var answer = window.location.href;
  //     const answer_array = answer.split('/');

  //     if (answer_array[2] == 'localhost:3000') {
  //         var url = 'http://localhost/pramesh/backend/api/stories_added';
  //     }
  //     else {
  //         var url = 'https://prameshsilks.com/backend/api/stories_added';
  //     }

  //     const fd = new FormData();
  //     fd.append('vTitle', Title);
  //     fd.append('vImage', Image);
  //     fd.append('vvideo', Video);
  //     fd.append('tDesc', Desc);
  //     fd.append('eStatus', Status);
  //     fd.append('iStoriesId', iStoriesId);

  //     if (Title && Desc) {
  //         setGif(true);
  //         const dataa = axios.post(url, fd)
  //             .then(res => {
  //                 if (res.data.Status == '0') {
  //                     setGif(false);
  //                     toast.success(res.data.message, {
  //                         position: "top-center",
  //                         autoClose: 5000,
  //                         hideProgressBar: false,
  //                         closeOnClick: true,
  //                         pauseOnHover: true,
  //                         draggable: true,
  //                         progress: undefined,
  //                     });

  //                     setTimeout(function () {
  //                         history.push("/admin/stories");
  //                     }, 1000);
  //                 }
  //                 else {
  //                     setGif(false);
  //                     toast.error(res.data.message, {
  //                         position: "top-center",
  //                         autoClose: 5000,
  //                         hideProgressBar: false,
  //                         closeOnClick: true,
  //                         pauseOnHover: true,
  //                         draggable: true,
  //                         progress: undefined,
  //                     });
  //                 }
  //             })
  //             .catch(error => {
  //             })
  //     }

  // }

  // *********************************************FETCHING DATA*************************************

  var answer = window.location.href;
  const answer_array = answer.split("/");
  if (answer_array[2] == "localhost:3000") {
    var urls = `http://localhost/pramesh/backend/api/all_stories?iStoriesId=${iStoriesId}`;
  } else {
    var urls = `https://prameshsilks.com/backend/api/all_stories?iStoriesId=${iStoriesId}`;
  }
  useEffect(() => {
    axios
      .get(urls)
      .then((res) => {
        setVStories1_image(res.data.data.vStories1_image);
        setvStories1_Title(res.data.data.vStories1_Title);
        setvStories1_Desc(res.data.data.vStories1_Desc);
        setvSecond_image1(res.data.data.vSecond_image1);
        setvSecond_image2(res.data.data.vSecond_image2);
        setvSecond_image3(res.data.data.vSecond_image3);
        setvVideo_Title(res.data.data.vVideo_Title);
        setvVideo_Link1(res.data.data.vVideo_Link1);
        setvVideo_Link2(res.data.data.vVideo_Link2);
        setvVideo_Link3(res.data.data.vVideo_Link3);
        setvVideo_Link4(res.data.data.vVideo_Link4);
        setvVideo_Desc(res.data.data.vVideo_Desc);
        setvSecond_image(res.data.data.vSecond_image);
        setvSecond_Title(res.data.data.vSecond_Title);
        setvSecond_Desc(res.data.data.vSecond_Desc);
        seteStatus(res.data.data.eStatus);
      })
      .catch((err) => {});
  }, []);
  // if (Status == 'Active') {
  //     var Active = 'selected';
  // }
  // else if (Status == 'Inactive') {
  //     var Inactive = 'selected';
  // }
  // else {
  //     var Active = '';
  //     var Inactive = '';
  // }

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
                    <div className="">
                      <h3 className="mb-0">Stories Edit</h3>
                    </div>
                    <div className="ml-5">
                      <Link to={`/admin/stories/edit/${iStoriesId}`}>
                        <button className="btn btn-primary">
                          First Page All Image
                        </button>
                      </Link>
                    </div>
                    <div className="ml-5">
                      <Link to={`/admin/second/image/${iStoriesId}`}>
                        <button className="btn btn-primary">Second Page</button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <input type="hidden" name="iStoriesId" value={iStoriesId} />
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
                                name="Stories1_image"
                                id="vImage"
                                accept="image/*"
                                className="form-control vImage"
                              />
                              <img src={VStories1_image} className="h-101" />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="form-group">
                            <label className="form-control-label" for="vTitle">
                              Title
                            </label>
                            <input
                              type="text"
                              onChange={(e) =>
                                setvStories1_Title(e.target.value)
                              }
                              value={vStories1_Title}
                              name="Stories1_title"
                              id="vTitle"
                              className="form-control"
                              placeholder="Title"
                            />
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
                              onChange={(e) =>
                                setvStories1_Desc(e.target.value)
                              }
                              value={vStories1_Desc}
                              name="Stories1_desc"
                              id="vDescription"
                              rows="4"
                              className="form-control"
                              placeholder="Description..."
                            ></textarea>
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
                                name="second_image1"
                                type="file"
                                id="vImage"
                                accept="image/*"
                                className="form-control vImage"
                              />
                              <img src={vSecond_image1} className="h-101" />
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
                                name="second_image2"
                                type="file"
                                id="vImage"
                                className="form-control vImage"
                              />
                              <img src={vSecond_image2} className="h-101" />
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
                                name="second_image3"
                                type="file"
                                id="vImage"
                                accept="image/*"
                                className="form-control vImage"
                              />
                              <img src={vSecond_image3} className="h-101" />
                            </div>
                          </div>
                        </div>
                        {/* **************Third *************** */}
                        {/* <div className="col-lg-3">
                                                    <div className="form-group">
                                                        <div className="form-group">
                                                            <label className="form-control-label" for="vVideo">Stories Video</label>
                                                            <input type="file" name="stories_video" className="vVideo_change" accept="video/*" className="form-control" />
                                                            {
                                                                vStories_Video
                                                                    ?
                                                                    <video style={{height : '100px',width : '120px'}} controls autoplay>
                                                                        <source src={vStories_Video} type="video/mp4" />
                                                                    </video>
                                                                    :
                                                                    <p></p>
                                                            }

                                                        </div>
                                                    </div>
                                                </div> */}
                        {/* <div className="col-lg-3">
                                                    <div className="form-group">
                                                        <label className="form-control-label" for="vTitle">Video Link</label>
                                                        <input onChange={(e) => setvVideo_Link(e.target.value)} value={vVideo_Link} name="video_link" type="text" id="vTitle" className="form-control" placeholder="Title" />
                                                    </div>
                                                </div> */}
                        <div className="col-lg-3">
                          <div className="form-group">
                            <label className="form-control-label" for="vTitle">
                              Video Link 1
                            </label>
                            <input
                              value={vVideo_Link1}
                              onChange={(e) => setvVideo_Link1(e.target.value)}
                              name="video_link1"
                              type="text"
                              id="vTitle"
                              className="form-control"
                              placeholder="Title"
                            />
                          </div>
                        </div>
                        <div className="col-lg-3">
                          <div className="form-group">
                            <label className="form-control-label" for="vTitle">
                              Video Link 2
                            </label>
                            <input
                              value={vVideo_Link2}
                              onChange={(e) => setvVideo_Link2(e.target.value)}
                              name="video_link2"
                              type="text"
                              id="vTitle"
                              className="form-control"
                              placeholder="Title"
                            />
                          </div>
                        </div>
                        <div className="col-lg-3">
                          <div className="form-group">
                            <label className="form-control-label" for="vTitle">
                              Video Link 3
                            </label>
                            <input
                              value={vVideo_Link3}
                              onChange={(e) => setvVideo_Link3(e.target.value)}
                              name="video_link3"
                              type="text"
                              id="vTitle"
                              className="form-control"
                              placeholder="Title"
                            />
                          </div>
                        </div>
                        <div className="col-lg-3">
                          <div className="form-group">
                            <label className="form-control-label" for="vTitle">
                              Video Link 4
                            </label>
                            <input
                              value={vVideo_Link4}
                              onChange={(e) => setvVideo_Link4(e.target.value)}
                              name="video_link4"
                              type="text"
                              id="vTitle"
                              className="form-control"
                              placeholder="Title"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label" for="vTitle">
                              Title
                            </label>
                            <input
                              onChange={(e) => setvVideo_Title(e.target.value)}
                              value={vVideo_Title}
                              type="text"
                              name="video_title"
                              id="vTitle"
                              className="form-control"
                              placeholder="Title"
                            />
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
                              onChange={(e) => setvVideo_Desc(e.target.value)}
                              value={vVideo_Desc}
                              name="video_desc"
                              id="vDescription"
                              rows="4"
                              className="form-control"
                              placeholder="Description..."
                            ></textarea>
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
                                name="second_stories_image"
                                type="file"
                                id="vImage"
                                accept="image/*"
                                className="form-control vImage"
                              />
                              <img src={vSecond_image} className="h-101" />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="form-group">
                            <label className="form-control-label" for="vTitle">
                              Title
                            </label>
                            <input
                              onChange={(e) => setvSecond_Title(e.target.value)}
                              type="text"
                              value={vSecond_Title}
                              name="second_stories_title"
                              id="vTitle"
                              className="form-control"
                              placeholder="Title"
                            />
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
                              onChange={(e) => setvSecond_Desc(e.target.value)}
                              value={vSecond_Desc}
                              name="second_stories_desc"
                              id="vDescription"
                              rows="4"
                              className="form-control"
                              placeholder="Description..."
                            ></textarea>
                          </div>
                        </div>

                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label" for="vEmail">
                              Status
                            </label>
                            <select
                              onChange={(e) => seteStatus(e.target.value)}
                              name="eStatus"
                              className="form-control"
                            >
                              <option
                                selected={
                                  eStatus == "Inactive" ? "selected" : ""
                                }
                                value="inActive"
                              >
                                Inactive
                              </option>
                              <option
                                selected={eStatus == "Active" ? "selected" : ""}
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
                              type="submit"
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
                            <Link to="/admin/stories">
                                <button type="button" className="btn btn-warning">Back </button>
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

export default Stories_edit;
