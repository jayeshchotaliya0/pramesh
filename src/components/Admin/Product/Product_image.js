import React, { useState, useEffect } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Redirect } from "react-router-dom";
import $ from "jquery";
const Product_image = () => {
    let history = useHistory();
    var answer = window.location.href;
    const answer_array = answer.split("/");
    const p = answer_array[4];
    const [Image, setImage]     = useState([]);
    const [Gif, setGif]         = useState(false);
    var iProductId = window.location.pathname.substring(
        window.location.pathname.lastIndexOf("/") + 1
    );
    if (answer_array[2] == "localhost:3000") {
        var url                 = "http://localhost/pramesh/backend/api/product_image_add";
        var urlimage            = "http://localhost/pramesh/backend/api/product_image_delete";
        var urls                = `http://localhost/pramesh/backend/api/all_product?iProductId=${iProductId}`;
        var product_listing     = `http://localhost/pramesh/backend/api/product_listingpage_data_show`;
    } else {
        var url                 = "https://prameshsilks.com/backend/api/product_image_add";
        var urlimage            = "https://prameshsilks.com/backend/api/product_image_delete";
        var urls                = `https://prameshsilks.com/backend/api/all_product?iProductId=${iProductId}`;
        var product_listing     = `https://prameshsilks.com/backend/api/product_listingpage_data_show`;
    }


    function image_delele(event) {
        var iImageId = event.target.id;
        const fd = new FormData();
        fd.append("iImageId", iImageId);
        const dataa = axios
            .post(urlimage, fd)
            .then((res) => {
                
                if (res.data.Status == "0") {
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
                        window.location.reload(1);
                    }, 1000);
                } else {
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
            .catch((error) => { });
    }

    function Homepageshowimage(event)
    {
        var type = event.target.getAttribute("data-id");
        var iImageId = event.target.id;
        const fd = new FormData();
        fd.append("iImageId", iImageId);
        fd.append("type", type);
        const dataa = axios
            .post(product_listing, fd)
            .then((res) => {
                if (res.data.Status == "0") {
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
                        window.location.reload(1);
                    }, 1000);
                } else {
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
            .catch((error) => { });
    }

    const handleSubmit = (event) => {
        setGif(true);
        event.preventDefault();
        const data = new FormData(event.target);
        const dataa = axios
            .post(url, data)
            .then((res) => {
                if (res.data.Status == "0") {
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
                        var path = `/admin/product/edit/${iProductId}`;
                        history.push(path);
                    }, 1000);
                } else {
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
            .catch((error) => { });
    };

    useEffect(() => {
        axios
            .get(urls)
            .then((res) => {
                setImage(res.data.Image);
            })
            .catch((err) => {
                
            });
    }, []);

    
    return (
        <>
            <Sidebar />
            <div className="main-content" id="panel">
                <Header />
                <div className="container-fluid">
                    <div className="row">
                        <div className="card w-100">
                            <div className=" col-xl-12 col-md-12 col-sm-12 ">
                                <div className="card-header border-0 d-flex">
                                    <div className="row align-items-center">
                                        <div className="col">
                                            <Link to={`/admin/product/edit/${iProductId}`}>
                                                <button className="btn genBtn">Product Edit</button>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="row align-items-center ml-4">
                                        <div className="col">
                                            <Link to={`/admin/product-image/${iProductId}`}>
                                                <button
                                                    className={`btn genBtn ${p == "product-image" ? "Active" : ""
                                                        }`}
                                                >
                                                    Product Image
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <h6 className="heading-small text-muted mb-4">
                                        Product Image information
                                    </h6>
                                    <div className="pl-lg-4">
                                        <div className="row">
                                            <form onSubmit={handleSubmit}>
                                                <div className="col-lg-12">
                                                    <div className="form-group">
                                                        <div className="form-group">
                                                            <input
                                                                type="hidden"
                                                                value={iProductId}
                                                                name="iProductId"
                                                            />
                                                            <label
                                                                className="form-control-label"
                                                                for="vImage"
                                                            >
                                                                Product Image
                                                            </label>
                                                            <input
                                                                name="vImage[]"
                                                                type="file"
                                                                id="vImage"
                                                                accept="image/*"
                                                                className="form-control vImages mb-4"
                                                                multiple
                                                            />

                                                            <div className="gallery"></div>
                                                            {/* <span className="red">{errorImage}</span> */}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-lg-12">
                                                    <div className="form-group">
                                                        <input
                                                            type="submit"
                                                            className="btn  btn-primary"
                                                            value="Submit"
                                                        />
                                                        <Link to={`/admin/product/edit/${iProductId}`}>
                                                            <a>
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-warning"
                                                                >
                                                                    Back
                                                                </button>
                                                            </a>
                                                        </Link>
                                                        {
                                                            Gif == true ?
                                                                <img className="loding_gif_product" src={process.env.PUBLIC_URL + "/Images/3.svg"} alt="img" />
                                                                :
                                                                <></>
                                                        }
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
                                            </form>
                                            {/* <>
                        {Image ? (
                          <div>
                            {Image.map((image, key) => (
                              <>
                                <div className = "position-relative">
                                  <img
                                    src={image.vImage}
                                    className="multiple_image"
                                  />
                                  <span
                                  onClick={image_delele}
                                  id={`${image.iImageId}`}
                                  className="closeBtn"
                                >  <i  className = " fa fa-close  red "></i> </span>
                                </div>
                                
                              </>
                            ))}
                          </div>
                        ) : (
                          <p>NO IMAGE</p>
                        )}
                      </> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <>
                                        {Image ? (
                                            <div>
                                                {Image.map((image, key) => (
                                                    <>
                                                        <div className="position-relative d-inline-block">
                                                            {
                                                              image.vType==1 ?
                                                                    <i data-id="Added" onClick={Homepageshowimage} id={`${image.iImageId}`} className="fas fa-eye" aria-hidden="true"></i>
                                                                   
                                                                :
                                                                    <i data-id="NotAdded" onClick={Homepageshowimage} id={`${image.iImageId}`}
                                                                    className="fa fa-eye-slash" aria-hidden="true"></i>
                                                                
                                                            }
                                                            <img src={image.vImage} className="multiple_image" />
                                                            <span
                                                                onClick={image_delele}
                                                                className="closeBtn"
                                                            >
                                                            <i id={`${image.iImageId}`} className=" fa fa-times  red "  style = {{fontSize : "1rem"}}></i>{" "}
                                                            </span>
                                                        </div>
                                                    </>
                                                ))}
                                            </div>
                                        ) : (
                                            <p>NO IMAGE</p>
                                        )}
                                    </>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Product_image;
