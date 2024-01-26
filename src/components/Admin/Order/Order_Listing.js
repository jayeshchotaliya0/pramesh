import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
import axios from "axios";
// import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import $ from "jquery";
import * as $ from "jquery";
window["jQuery"] = window["$"] = $;

$.DataTable = require("datatables.net");

class Order_Listing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            order: [],
        };
    }

    async componentDidMount() {
        $(".example").DataTable().destroy();
        setTimeout(function () {
            $(".example").DataTable({
                pageLength: 50,
            });
        }, 1000);

        var answer = window.location.href;
        const answer_array = answer.split("/");
        if (answer_array[2] == "localhost:3000") {
            var url = "http://localhost/pramesh/backend/api/get_all_order";
        } else {
            var url = "https://prameshsilks.com/backend/api/get_all_order";
        }
        const response = await fetch(url);
        const data = await response.json();
        this.setState({ order: data.data });
    }

    status_manage(e) {
        var answer = window.location.href;
        const answer_array = answer.split('/');
        if (answer_array[2] == 'localhost:3000') {
            var del = 'http://localhost/pramesh/backend/api/order_active_inactive';
        }
        else {
            var del = 'https://prameshsilks.com/backend/api/order_active_inactive';
        }
        var iOrderId = '';
        var iOrderId = e.target.getAttribute('data-id');

        const fd = new FormData();
        fd.append('iOrderId', iOrderId);
        if (iOrderId) {
            const dataa = axios.post(del, fd)
                .then(res => {
                    if (res.data.Status == '0') {
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
                            // window.location.reload(1);
                        }, 2000);

                    }
                    else {
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

    render() {
        var order_data = this.state.order;
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
                                        <div className="row align-items-center justify-content-between">
                                            <div className="col-4">
                                                <h3 className="mb-0">Page visits</h3>
                                            </div>
                                            <div className="col-8 d-flex justify-content-end">
                                                <div className="status">
                                                    <div className=" bg-warning"></div>
                                                    <h3>Pending</h3>
                                                </div>
                                                <div className="status">
                                                    <div className="bg-success"></div>
                                                    <h3>Complete</h3>
                                                </div>
                                                <div className="status">
                                                    <div className="bg-danger"></div>
                                                    <h3>Reject</h3>
                                                </div>
                                                <div className="status">
                                                    <div className="bg-primary"></div>
                                                    <h3>View</h3>
                                                </div>
                                                <div className="status">
                                                    <div className="bg-info"></div>
                                                    <h3>Note</h3>
                                                </div>
                                                <div className="status">
                                                    <div className="bg-book"></div>
                                                    <h3>Invoice</h3>
                                                </div>
                                            </div>
                                            <div className="col text-right"></div>
                                        </div>
                                    </div>
                                    <div className="table-responsive">
                                        {/* <!-- Projects table --> */}
                                        <table
                                            id="example"
                                            className="table align-items-center table-flush example"
                                        >
                                            <thead className="thead-light">
                                                <tr>
                                                    <th scope="col">Id</th>
                                                    <th scope="col">TransactionId</th>
                                                    <th scope="col">Order Qty</th>
                                                    <th scope="col">Order Amount</th>
                                                    <th scope="col">City</th>
                                                    <th scope="col">State</th>
                                                    <th scope="col">Phone No</th>
                                                    <th scope="col">AddedDate</th>
                                                    <th scope="col">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {order_data.map((user, index) => (
                                                    <tr  key={index}>
                                                        <th>{index + 1}</th>
                                                        <td>{user.vTransactionId}</td>
                                                        <td>{user.vOrderQty}</td>
                                                        <td>{user.vOrderAmount}</td>
                                                        <td>{user.vOrderCity}</td>
                                                        <td>{user.vOrderState}</td>
                                                        <td>{user.vOrderPhone}</td>
                                                        <td>{user.dtAddedDate}</td>
                                                        <td className="customtd">

                                                            {/* Pending & complete switch  */}

                                                            <div className="custom-control custom-switch mr-3">
                                                                <input
                                                                    type="checkbox"
                                                                    className="custom-control-input"
                                                                    onClick={this.status_manage}
                                                                    id={`customSwitches_${user.iOrderId}`}
                                                                    data-id={`Complete@${user.iOrderId}`}
                                                                    defaultChecked={
                                                                        user.eOrderStatus == 'Complete' ?
                                                                            true
                                                                            :
                                                                            false
                                                                    }
                                                                />
                                                                <label
                                                                    className="pending custom-control-label "
                                                                    for={`customSwitches_${user.iOrderId}`}
                                                                ></label>
                                                            </div>

                                                            {/* Reject Switch **** */}

                                                            <div className="custom-control custom-switch">
                                                                <input
                                                                    type="checkbox"
                                                                    className="custom-control-input"
                                                                    id={`customSwitches_${index + 1 / 2}`}
                                                                    data-id={`Rejected@${user.iOrderId}`}
                                                                    onClick={this.status_manage}
                                                                    defaultChecked={
                                                                        user.eOrderStatus == 'Rejected' ?
                                                                            true
                                                                            :
                                                                            false
                                                                    }

                                                                />
                                                                <label
                                                                    className="reject custom-control-label"
                                                                    for={`customSwitches_${index + 1 / 2}`}
                                                                ></label>
                                                            </div>
                                                            <Link to={`/admin/order_view/${user.iOrderId}`}>
                                                                <i className="fas fa-edit text-primary"></i>
                                                            </Link>
                                                            <Link to={`/admin/order_note/${user.iOrderId}`}>
                                                                <i className="far fa-sticky-note ml-3 text-info"></i>
                                                            </Link>
                                                            <Link to={`/admin/pdf/${user.iOrderId}`}>
                                                                <i className="fa fa-book ml-3 "></i>
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
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
                    </div>
                </div>
            </>
        );
    }
}

export default Order_Listing;
