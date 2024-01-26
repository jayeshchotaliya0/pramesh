
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
import 'react-dropzone-uploader/dist/styles.css';
import axios from 'axios';
import { useHistory } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  getEnvironment  from '../../environment';

const SecondePage = () => {
    let history = useHistory();
    const envConfig = getEnvironment();
    const apiUrl    = envConfig.apiUrl; 
    const iStoriesId = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);

    const [Image, setImage] = useState('');
    const [Image1, setImage1] = useState('');
    const [Image2, setImage2] = useState('');
    const [Image3, setImage3] = useState('');
    const [Image4, setImage4] = useState('');
    const [Image_e, setImage_e] = useState('');
    const [Image1_e, setImage1_e] = useState('');
    const [Image2_e, setImage2_e] = useState('');
    const [Image3_e, setImage3_e] = useState('');
    const [Image4_e, setImage4_e] = useState('');

    const [Title, setTitle] = useState('');
    const [Title1, setTitle1] = useState('');
    const [Title2, setTitle2] = useState('');
    const [Title3, setTitle3] = useState('');
    const [Title4, setTitle4] = useState('');
    const [Title5, setTitle5] = useState('');
    const [Title6, setTitle6] = useState('');
    const [Title7, setTitle7] = useState('');
    const [Title8, setTitle8] = useState('');
    const [Title9, setTitle9] = useState('');

    const [Title_e, setTitle_e] = useState('');
    const [Title1_e, setTitle1_e] = useState('');
    const [Title2_e, setTitle2_e] = useState('');
    const [Title3_e, setTitle3_e] = useState('');
    const [Title4_e, setTitle4_e] = useState('');
    const [Title5_e, setTitle5_e] = useState('');
    const [Title6_e, setTitle6_e] = useState('');
    const [Title7_e, setTitle7_e] = useState('');
    const [Title8_e, setTitle8_e] = useState('');
    const [Title9_e, setTitle9_e] = useState('');

    const [Gif, setGif] = useState(false);

    const handleSubmit = (event) => 
    {
        event.preventDefault();
        const data = new FormData(event.target);
        const url = `${apiUrl}/stories_added_secondpage`;
        setGif(true);
        const dataa = axios.post(url, data)
            .then(res => {
                if (res.data.Status == '0') {
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
                        // window.location.reload(1);
                    }, 2000);
                }
                else {
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
            .catch(error => {
            })
    }

    return (
        <>
            <Sidebar />
            <div className="main-content" id="panel" >
                <Header />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-12 col-md-12 col-sm-12">
                            <div className="card">
                                <div className="card-header border-0">
                                    <div className="row align-items-center">
                                        <div className="col">
                                            <h3 className="mb-0">Second Page </h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <h6 className="heading-small text-muted mb-4">Second Page information</h6>
                                        <div className="pl-lg-4">
                                            <div className="row">
                                                {/* ******* First Image and description ***************** */}
                                                <div className="col-lg-4">
                                                    <div className="form-group">
                                                        <div className="form-group">
                                                            <label className="form-control-label" for="vImage">First Image</label>
                                                            <input type="hidden" name="iStoriesId" value={iStoriesId} />
                                                            <input type="file" onChange={(e) => setImage(e.target.files)} name="vImage1" id="Stories1_image vImage" accept="image/*" className="form-control vImage" />
                                                            <span className="red">{Image_e}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4">
                                                    <div className="form-group">
                                                        <label className="form-control-label" for="vTitle">Title</label>
                                                        <input onChange={(e) => setTitle(e.target.value)} type="text" name="	vTitle1" id="vTitle" className="form-control" placeholder="Title" />
                                                        <span className="red">{Title_e}</span>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4">
                                                    <div className="form-group">
                                                        <label className="form-control-label" for="vDescription">Description</label>
                                                        <textarea name="tDesc1" onChange={(e) => setTitle1(e.target.value)} id="vDescription" rows="4" className="form-control" placeholder="Description..."></textarea>
                                                        <span className="red">{Title1_e}</span>
                                                    </div>
                                                </div>
                                                {/* ******** Second Image and description ********* */}
                                                <div className="col-lg-4">
                                                    <div className="form-group">
                                                        <div className="form-group">
                                                            <label className="form-control-label" for="vImage">Second Image</label>
                                                            <input type="file" onChange={(e) => setImage(e.target.files)} name="vImage2" id="Stories1_image vImage" accept="image/*" className="form-control vImage" />
                                                            <span className="red">{Image_e}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4">
                                                    <div className="form-group">
                                                        <label className="form-control-label" for="vTitle">Sub Title</label>
                                                        <input onChange={(e) => setTitle(e.target.value)} type="text" name="vSubTitle" id="vTitle" className="form-control" placeholder="Title" />
                                                        <span className="red">{Title_e}</span>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4">
                                                    <div className="form-group">
                                                        <label className="form-control-label" for="vDescription">Description</label>
                                                        <textarea name="tDesc2" onChange={(e) => setTitle1(e.target.value)} id="vDescription" rows="4" className="form-control" placeholder="Description..."></textarea>
                                                        <span className="red">{Title1_e}</span>
                                                    </div>
                                                </div>

                                                {/* **************Third *************** */}
                                                <div className="col-lg-4">
                                                    <div className="form-group">
                                                        <div className="form-group">
                                                            <label className="form-control-label" for="vImage">Third Image</label>
                                                            <input type="file" onChange={(e) => setImage(e.target.files)} name="vImage3" id="Stories1_image vImage" accept="image/*" className="form-control vImage" />
                                                            <span className="red">{Image_e}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label className="form-control-label" for="vDescription">Description</label>
                                                        <textarea onChange={(e) => setTitle7(e.target.value)} name="tDesc3" id="vDescription" rows="4" className="form-control" placeholder="Description..."></textarea>
                                                        <span className="red">{Title7_e}</span>
                                                    </div>
                                                </div>

                                                {/* *********Last Section ************* */}
                                                <div className="col-lg-4">
                                                    <div className="form-group">
                                                        <div className="form-group">
                                                            <label className="form-control-label" for="vImage">Fourth Image</label>
                                                            <input onChange={(e) => setImage4(e.target.files)} name="vImage4[]" type="file" id="vImage" accept="image/*" className="form-control vImage" />
                                                            <span className="red">{Image4_e}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label className="form-control-label" for="vEmail">Status</label>
                                                        <select name="eStatus" className="form-control">
                                                            <option value="inActive">Inactive</option>
                                                            <option value="Active">Active</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="col-lg-12">
                                                    <div className="form-group">
                                                        <button type="submit" className="btn  btn-primary">
                                                            {
                                                                Gif == true ?
                                                                    <img className="loding_gif" src={process.env.PUBLIC_URL + "/Images/3.svg"} alt="img" />
                                                                    :
                                                                    <>Submit</>
                                                            }
                                                        </button>
                                                        <Link to={`/admin/stories/edit/${iStoriesId}`}>
                                                            <a><button type="button" className="btn btn-warning">Back</button></a>
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
    )
}


export default SecondePage;