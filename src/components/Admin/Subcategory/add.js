import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import axios from "axios";
import { useHistory } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import  getEnvironment  from '../../../components/environment';


const Subcategoryadd = () => {
  let history = useHistory();
  const envConfig = getEnvironment();
  const apiUrl    = envConfig.apiUrl; 

  const [iHeaderIdArray, setHeaderIdArray]       = useState([]);
  const [FabricArray, setFabricArray] = useState([]);
  const [iHeaderId, setHeaderId]   = useState("");
  const [Title, setTitle]             = useState("");
  const [Image, setImage]             = useState("");
  const [ImageError, setImageError]   = useState("");
  const [Fabric, setFabric]           = useState("");
  const [ErrorFabric, setErrorFabric] = useState("");
  const [Gif, setGif]                 = useState(false);
  const [Status, setStatus]           = useState("Inactive");
  const [TitleError, setTitleError]   = useState("");

  const [iHeaderIdError, setHeaderIdError] = useState("");
  const [disable, setdisable]             = useState(false);

  function addcategory() {
    if (Title) {
      setTitleError("");
    } else {
      setTitleError("Please Enter Category Name");
    }
    if (iHeaderId) {
      setHeaderIdError("");
    } else {
      setHeaderIdError("Select Category");
    }
    if (Fabric) {
      setErrorFabric("");
    } else {
      setErrorFabric("Please Select Main Category");
    }
    if (Image) {
      setImageError("");
    } else {
      setImageError("Please Select Image");
    }

    var url = `${apiUrl}/subcategory_add`;
   
    const fd = new FormData();
    fd.append("iHeaderId", iHeaderId);
    fd.append("vTitle", Title);
    fd.append("vImage", Image);
    fd.append("iFabricId", Fabric);
    fd.append("eStatus", Status);

    if (Title && iHeaderId && Image) {
      setGif(true);
      axios.post(url, fd)
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
              history.push("/admin/subcategory/listing");
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
      .get(`${apiUrl}/get_category`)
      .then((res) => {
        setHeaderIdArray(res?.data?.data?.filter((v,i)=>v.eStatus==='Active'));
        setFabricArray(res.data.fabric);
      })
      .catch((err) => {});
  }, [apiUrl]);

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
                      <h3 className="mb-0">Material Add </h3>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <form>
                    <h6 className="heading-small text-muted mb-4">
                      Material information
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
                              onChange={(e) => setHeaderId(e.target.value)}
                            >
                              <option>Select Category</option>
                              {iHeaderIdArray.map((cat, index) => (
                                <option value={cat.iHeaderId}>
                                  {cat.vTitle}
                                </option>
                              ))}
                            </select>

                            <span className="red">{iHeaderIdError}</span>
                          </div>
                        </div>
                        {
                          iHeaderId ? 
                              <div className="col-lg-6">
                                  <div className="form-group">
                                    <label className="form-control-label" for="vTitle">
                                      Fabric
                                    </label>
                                    <select
                                      className="form-control"
                                      onChange={(e) => setFabric(e.target.value)}
                                    >
                                      <option>Select Fabric</option>
                                      { 
                                        FabricArray.filter((v,i)=>v.iHeaderId===iHeaderId && v.eStatus==='Active').map((cat, index) => (
                                        <option value={cat.iFabricId}>
                                          {cat.vTitle}
                                        </option>
                                      ))}
                                    </select>

                                    <span className="red">{ErrorFabric}</span>
                                  </div>
                            </div>
                          :
                          <div className="col-lg-6">
                          </div>

                        }
                        
                        

                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label" for="vTitle">
                              Material Title
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
                              Material Image
                            </label>
                            <input
                              type="file"
                              id="vImage"
                              onChange={(e) => setImage(e.target.files[0])}
                              className="form-control vImage"
                            />
                            <img src="" alt="A beautiful sunset over the mountains" className="img1 h-101" />
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
                            <Link to="/admin/subcategory/listing" className="btn btn-warning">Back</Link>
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
