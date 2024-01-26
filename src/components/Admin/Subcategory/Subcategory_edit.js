import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
import axios from 'axios';
import { useHistory } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  getEnvironment  from '../../../components/environment';

const Subcategory_edit = () => {
    let history     = useHistory();
    const envConfig = getEnvironment();
    const apiUrl    = envConfig.apiUrl;       
    const [FabricArray, setFabricArray] = useState([]);
    const [Title, setTitle]             = useState("");
    const [SubTitle, setSubTitle]       = useState("");
    
    const [Status, setStatus]           = useState("");
    const [TitleError, setTitleError]   = useState("");
    const [Fabric, setFabric]           = useState("");
    const [ErrorFabric, setErrorFabric] = useState("");
    const [iFabricId, setiFabricId]     = useState("");
    const [Gif, setGif]                 = useState(false);
    const [Image, setImage]             = useState("");
    const [ImageError, setImageError]   = useState("");
    const [iHeaderId, setHeaderId]     = useState("");
    const [iHeaderMenuArray, setHeaderMenuArray] = useState([]);
   
    var iSubcategoryId = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);

    function addcategory() 
    {
        if (Title) {
            setTitleError('');
        }
        else {
            setTitleError("Please Enter Title");
        }
        if (Fabric) {
            setErrorFabric('');
        }
        else {
            setErrorFabric('Please Select Main Category');
        }
        if (Image) {
            setImageError('');
        }
        else {
            setImageError("Please Select Image");
        }

        const url = `${apiUrl}/subcategory_add`;
       
        const fd = new FormData();
        fd.append('iSubcategoryId', iSubcategoryId);
        fd.append('iHeaderId', iHeaderId);
        fd.append('vTitle', SubTitle);
        fd.append('vImage', Image);
        fd.append('iFabricId', Fabric);
        fd.append('eStatus', Status);
    
        if (Title && iSubcategoryId && Fabric && Image) {
            setGif(true);
            const dataa = axios.post(url, fd)
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
                            history.push("/admin/subcategory/listing/0");
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

    }

    const urls = `${apiUrl}/all_subcategory_get?iSubcategoryId=${iSubcategoryId}`;
    
    useEffect(()=>{
        axios.get(urls)
        .then(res=>{
            setHeaderId(res.data.data.iHeaderId)
            setTitle(res.data.data.vTitle);
            setSubTitle(res.data.data.vSubTitle);
            setStatus(res.data.data.eStatus);
            setiFabricId(res.data.data.iFabricId);
            setImage(res.data.data.vImage);
            setFabric(res.data.data.iFabricId);
            setFabricArray(res?.data?.fabric);
            setHeaderMenuArray(res?.data?.HeaderMenuArray);
        })
        .catch(err =>{
            
        })
        
    },[])
    
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
                                            <h3 className="mb-0">Material Edit</h3>

                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <form>
                                        <h6 className="heading-small text-muted mb-4">Material information</h6>
                                        <div className="pl-lg-4">
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label className="form-control-label" for="vTitle">Header Menu</label>
                                                        <select
                                                            className="form-control"
                                                            onChange={(e) => setHeaderId(e.target.value)}
                                                            >
                                                            <option value="">Select Category</option>
                                                            {iHeaderMenuArray?.map(function (v, i) {
                                                                return (<option
                                                                    selected={
                                                                        v.iHeaderId == iHeaderId
                                                                        ? "selected"
                                                                        : ""
                                                                    }
                                                                    value={v.iHeaderId}
                                                                    >
                                                                    {v.vTitle}
                                                                    </option>
                                                                );
                                                            })}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label className="form-control-label" for="vTitle">Fabric</label>
                                                        <select className="form-control" onChange={(e) => setFabric(e.target.value)}>
                                                            <option value="">Select Fabric</option>
                                                            {FabricArray.map(function(cat){
                                                                if(cat.iHeaderId==iHeaderId)
                                                                {
                                                                    return <option 
                                                                        selected={cat.iFabricId == iFabricId ? 'selected' : ''}
                                                                    value={cat.iFabricId}>{cat.vTitle}</option>
                                                                }
                                                            })}
                                                        </select>

                                                        <span className="red">{ErrorFabric}</span>
                                                    </div>
                                                </div>

                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label className="form-control-label" for="vTitle">Material Title</label>
                                                        <input type="text" id="vTitle" onChange={(e) => setSubTitle(e.target.value)} className="form-control" placeholder="Title" value={SubTitle} />
                                                        <span className="red">{TitleError}</span>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label className="form-control-label" for="vImage">Material Image</label>
                                                        <input type="file" id="vImage" onChange={(e) => setImage(e.target.files[0])} className="form-control vImage" />
                                                        <img src={Image} className="img1 h-101" />
                                                        {
                                                            Image ?
                                                                (<span className="red"></span>)
                                                                :
                                                                (<span className="red">{ImageError}</span>)
                                                        }

                                                    </div>
                                                </div>
                                                
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label className="form-control-label" for="vEmail">Status</label>
                                                        <select className="form-control" onChange={(e) => setStatus(e.target.value)}>
                                                            <option selected={
                                                                Status=='Inactive' ?
                                                                'selected'
                                                                :
                                                                ''
                                                            } value="inActive">Inactive</option>
                                                            <option selected={
                                                                Status == 'Active' ?
                                                                    'selected'
                                                                    :
                                                                    ''
                                                            }
                                                            value="Active">Active</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="col-lg-12">
                                                    <div className="form-group">
                                                        <button type="button" onClick={addcategory} className="btn  btn-primary">
                                                            {
                                                                Gif == true ?
                                                                    <img className="loding_gif" src={process.env.PUBLIC_URL + "/Images/3.svg"} alt="img" />
                                                                    :
                                                                    <>Submit</>
                                                            }
                                                        </button>
                                                        <Link to='/admin/subcategory/listing/0'>
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


export default Subcategory_edit;