import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import axios from 'axios';
import { useHistory } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrderNote = () => {
    let history = useHistory();
    var answer = window.location.href;
    const answer_array = answer.split('/');
    var iOrderId = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);
    const [Desc, setDesc] = useState("");
    const [Gif, setGif] = useState(false);

    function EditNote() 
    {
        if (answer_array[2] == 'localhost:3000') 
        {
            var url = `http://localhost/pramesh/backend/api/order_note_add?iOrderId=${iOrderId}`;
        }
        else 
        {
            var url = `https://prameshsilks.com/backend/api/order_note_add?iOrderId=${iOrderId}`;
        }
        const fd = new FormData();
        fd.append('tDesc', Desc);
        if (Desc) {
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
                            history.push("/admin/order/listing");
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

    }


    if (answer_array[2] == 'localhost:3000') {
        var url = `http://localhost/pramesh/backend/api/order_note_add?iOrderId=${iOrderId}`;
    }
    else {
        var url = `https://prameshsilks.com/backend/api/order_note_add?iOrderId=${iOrderId}`;
    }

    useEffect(() => {
        axios.get(url)
            .then(res => {
                setDesc(res.data.data);
                // setStatus(res.data.data.eStatus);

            })
            .catch(err => {
                
            })

    }, [])

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
                                            <h3 className="mb-0">Order Note </h3>

                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <form>
                                        <h6 className="heading-small text-muted mb-4">Order Note information</h6>
                                        <div className="pl-lg-4">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="form-group">
                                                        <label className="form-control-label" for="vTitle">Order Note</label>
                                                        <textarea onChange={(e) => setDesc(e.target.value)} className="form-control" value={ Desc ? Desc : '' } name="tDescription" rows="4" cols="50"></textarea>
                                                    </div>
                                                </div>

                                                

                                                <div className="col-lg-12">
                                                    <div className="form-group">
                                                        <button type="button" onClick={EditNote} className="btn  btn-primary">
                                                            {
                                                                Gif == true ?
                                                                    <img className="loding_gif" src={process.env.PUBLIC_URL + "/Images/3.svg"} alt="img" />
                                                                    :
                                                                    <>Submit</>
                                                            }
                                                        </button>
                                                        <Link to='/admin/order/listing'>
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

export default OrderNote;