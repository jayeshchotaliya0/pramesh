import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import axios from "axios";
import { useHistory } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import  getEnvironment  from '../../../components/environment';
import { useParams } from "react-router-dom/cjs/react-router-dom";


const Color_Edit = () => {
  let history = useHistory();
  const envConfig = getEnvironment();
  const apiUrl    = envConfig.apiUrl;       

  var answer = window.location.href;
  const answer_array = answer.split("/");
  const { id } = useParams();
  const [Color, setColor] = useState("");
  const [ColorError, setColorError] = useState("");

  const [Status, setStatus] = useState("Inactive");
  const [Gif, setGif] = useState(false);
  const [disable, setdisable] = useState(false);

  function Editcolor() {
    setColorError(Color ? "" : "Please Enter Color Name");
  
    if (!Color) return;
  
    const fd = new FormData();
    fd.append("vColor", Color);
    fd.append("eStatus", Status);
    fd.append("iColorId", id);
    
    setGif(true);
  
    axios.post(`${apiUrl}/color_add`, fd)
      .then((res) => {
        setdisable(res.data.Status === "0");
        setGif(false);
        const toastFunction = res.data.Status === "0" ? toast.success : toast.error;
        toastFunction(res.data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
  
        if (res.data.Status === "0") {
          setTimeout(() => history.push("/admin/color/listing"), 2000);
        }
      })
      .catch((error) => {});
  }
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await axios.get(`${apiUrl}/all_color_get?iColorId=${id}`);
          const { vColor, eStatus } = res.data.data;
          setColor(vColor);
          setStatus(eStatus);
        } catch (err) {
          // Handle errors if needed
        }
      };
  
      if (id) {
        fetchData();
      }
    }, [id]);
  


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
                      <h3 className="mb-0">Color Add </h3>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <form>
                    <h6 className="heading-small text-muted mb-4">
                      Color information
                    </h6>
                    <div className="pl-lg-4">
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label" for="vTitle">
                              Color
                            </label>
                            <input
                              type="text"
                              id="vTitle"
                              onChange={(e) => setColor(e.target.value)}
                              value={Color}
                              className="form-control"
                              placeholder="Title"
                            />
                            <span className="red">{ColorError}</span>
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
                              onClick={Editcolor}
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
                            <Link to="/admin/color/listing">
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

export default Color_Edit;
