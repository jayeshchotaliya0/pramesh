import React, { useState, useEffect, Component } from "react";
import { Link } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
import axios from "axios";
import jsPDF from "jspdf";
import logo from "../../../image/0000003.png";

const OrderPdf = () => {
    const [PDF, setPDF] = useState([]);
    const [vTransactionId, setvTransactionId] = useState("");
    const [Name, setName] = useState("");
    const [Address, setAddress] = useState("");
    const [Mobile, setMobile] = useState("");
    const [Email, setEmail] = useState("");
    const [TotalPrice, setTotalPrice] = useState("");
    const [CurrentDate, setCurrentDate] = useState("");

    var today = new Date(),
        Curredate =
            today.getDate() +
            "-" +
            (today.getMonth() + 1) +
            "-" +
            today.getFullYear();
    // setCurrentDate(Curredate);

    var answer = window.location.href;
    const answer_array = answer.split("/");
    var iOrderId = window.location.pathname.substring(
        window.location.pathname.lastIndexOf("/") + 1
    );

    if (answer_array[2] == "localhost:3000") {
        var url = `http://localhost/pramesh/backend/api/invoice_view?iOrderId=${iOrderId}`;
    } else {
        var url = `https://prameshsilks.com/backend/api/invoice_get?iOrderId=${iOrderId}`;
    }

    useEffect(() => {
        axios
            .get(url)
            .then((res) => {
                setPDF(res.data.data);
                setvTransactionId(res.data.vTransactionId);
                setTotalPrice(res.data.product_sum);
                setName(res.data.User.vFirstName + "  " + res.data.User.vLastName);
                setAddress(res.data.User.tAddress);
                setMobile(res.data.User.vPhone);
                setEmail(res.data.User.vEmail);
            })
            .catch((err) => {
                
            });
    }, []);

    const pfddownload = () => {
        const input = document.getElementById("pdf-element");
        const pdf = new jsPDF({ unit: "px", format: "letter", userUnit: "px" });
        pdf.html(input, { html2canvas: { scale: 0.57 } }).then(() => {
            pdf.save("test.pdf");
        });
    };

    return (
        <>
            <Sidebar />
            <div className="main-content" id="panel">
                <Header />
                <div className="row invoice">
                    <div className="col-md-6">
                        <div id="pdf-element">
                            <div className="row align-items-baseline">
                                <div className="col-6 invoice_head_div">
                                    <div>
                                        <img src={logo} />
                                    </div>
                                </div>
                                <div className="col-6 invoice_head_div">
                                    <h3 className="invoice_h3">
                                        Invoice Number : {vTransactionId}
                                    </h3>
                                    <h3 className="invoice_h3">Date : {Curredate}</h3>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6 invoice_head_div">
                                    <h3>Bill To :</h3>
                                    <p>Name : {Name}</p>
                                    <p>Address : {Address}</p>
                                    <p>Phone : {Mobile} </p>
                                    {/* <p>E-Mail : {Email} </p> */}
                                </div>
                                <div className="col-6 invoice_head_div">
                                    <h3>Bill From :</h3>
                                    <p>
                                        Address : Shangrila Arcade, 109, above Dangee Dums, <br />{" "}
                                        Ahmedabad, Gujarat 380015{" "}
                                    </p>
                                    <p>Phone : 9157535754</p>
                                    <p>E-Mail : JayeshSmash@gmail.com </p>
                                    <h4 className="my-3">Tax Number : 354674613548913</h4>
                                </div>
                            </div>

                            <div id="print-list-body">
                                <table className="custom table table-bordered">
                                    <thead className="table_head">
                                        <tr>
                                            <th className="per70 text-center">Product Name</th>
                                            <th className="per25 text-center">Size</th>
                                            <th className="per25 text-center">Unit Rate</th>
                                            <th className="per5 text-center">Qty</th>
                                            <th className="per25 text-center">Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {PDF.map(function (pdf, index) {
                                            return (
                                                <tr  key={index}>
                                                    <td className="text-center">{pdf.vProductName}</td>
                                                    <td className="text-center">{pdf.vOptions}</td>
                                                    <td className="text-center">{pdf.vPrice}</td>
                                                    <td className="text-center">{pdf.vQty}</td>
                                                    <td className="text-center">{pdf.cal_price}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <th colspan="4" className="text-right">
                                                Sub Total:
                                            </th>
                                            <th className="text-center">{TotalPrice}</th>
                                        </tr>

                                        <tr>
                                            <th colspan="4" className="text-right">
                                                Discount :
                                            </th>
                                            <th className="text-center">00.00</th>
                                        </tr>
                                        <tr>
                                            <th colspan="4" className="text-right">
                                                Total:
                                            </th>
                                            <th className="text-center">{TotalPrice}</th>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <button onClick={pfddownload} className="btn btn-primary invoicebtn">
                    Download Invoice <i className="fa fa-download" aria-hidden="true"></i>
                </button>
                <Link to="/admin/order/listing">
                    <button type="button" className="btn btn-warning invoiceback">
                        Back
                    </button>
                </Link>
            </div>
        </>
    );
};

export default OrderPdf;
