import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
import axios from "axios";
import { useHistory } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router";

const OrderView = () => {
    let history = useHistory();
    var answer = window.location.href;
    const answer_array = answer.split("/");
    var iOrderId = window.location.pathname.substring(
        window.location.pathname.lastIndexOf("/") + 1
    );
    const [OrderView, setOrderView] = useState([]);

    if (answer_array[2] == "localhost:3000") {
        var url = "http://localhost/pramesh/backend/api/image_content_added";
    } else {
        var url = "https://prameshsilks.com/backend/api/image_content_added";
    }


    if (answer_array[2] == "localhost:3000") {
        var urls = `http://localhost/pramesh/backend/api/order_view?iOrderId=${iOrderId}`;
    } else {
        var urls = `https://prameshsilks.com/backend/api/order_view?iOrderId=${iOrderId}`;
    }

    useEffect(() => {
        axios
            .get(urls)
            .then((res) => {
                setOrderView(res.data.data);
            })
            .catch((err) => {
                
            });
    }, []);


    return (
        <>
            <Sidebar />
            <Header />

            <section className="viewcart">
                <h3>VIEW ORDER</h3>
                <Link to='/admin/order/listing'>
                    <a><button type="button" className="btn btn-warning">Back</button></a>
                </Link>
                <div>
                    <div className="row bord">
                        <div className="col-xl-2 col-md-3">
                            <h1>Item</h1>
                        </div>
                        <div className="col-xl-2 col-md-3">
                            <h1>Product Name</h1>
                        </div>
                        <div className="col-xl-2 col-md-3">
                            <h1>Quantity</h1>
                        </div>
                        <div className="col-xl-2 col-md-3">
                            <h1>Color</h1>
                        </div>
                        <div className="col-xl-2 col-md-3">
                            <h1>Size</h1>
                        </div>
                        <div className="col-xl-2 col-md-3">
                            <h1>Category</h1>
                        </div>
                    </div>
                    {
                        OrderView.map(function(ord,index)
                        {
                            return <div className="row mt-2 bordb">
                                        <div className="col-xl-2 col-md-3 d-flex">
                                            <img src={ord.vImage}
                                                className="fourthstories_img" />
                                        </div>
                                        <div className="col-xl-2 col-md-3 col-md-3 d-flex align-items-center" >
                                            <h2>{ord.vProductName}</h2>
                                        </div>
                                        <div className="col-xl-2 col-md-3 col-md-3 d-flex align-items-center">
                                            <h2>{ord.vQty}</h2>
                                        </div>

                                        <div className="col-xl-2 col-md-3 col-md-3 d-flex align-items-center" >
                                            <div style={{ 'background-color': ord.vColorAdded }} className="color_mng">
                                            </div>
                                        </div>
                                        <div className="col-xl-2  col-md-3 d-flex align-items-center">
                                            <h2>XS</h2>
                                        </div>
                                        <div className="col-xl-2 col-md-3 d-flex align-items-center" >
                                            <h2>{ord.CategoryName}</h2>
                                        </div>
                                    </div>
                        }) 
                    }

                    
                </div>
            </section>
        </>
    );
};

export default OrderView;
