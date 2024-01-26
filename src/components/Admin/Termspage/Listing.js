import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
import axios from "axios";
import Swal from "sweetalert2";
// import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const $ = require("jquery");
$.DataTable = require("datatables.net");

class Listing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userdata: [],
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
      var url = "http://localhost/pramesh/backend/api/all_terms_condition_get";
    } else {
      var url =
        "https://prameshsilks.com/backend/api/all_terms_condition_get";
    }
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ userdata: data.data });
  }

  deletedata(e) {
    var answer = window.location.href;
    const answer_array = answer.split("/");
    if (answer_array[2] == "localhost:3000") {
      var del = "http://localhost/pramesh/backend/api/delete_terms_condition";
    } else {
      var del =
        "https://prameshsilks.com/backend/api/delete_terms_condition";
    }

    var iTermsPage = e.target.id;
    const fd = new FormData();
    fd.append("iTermsPage", iTermsPage);
    if (iTermsPage) {
      const dataa = axios.post(del, fd);
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      })
        .then((result) => {
          if (result.isConfirmed) {
            Swal.fire("Deleted!", "Your record has been deleted.", "success");
            setTimeout(() => {
              window.location.reload(1);
            }, 1000);
          }
        })
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
        .catch((error) => {});
    }
  }

  render() {
    var Terms = this.state.userdata;
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
                        <h3 className="mb-0">Page visits</h3>
                      </div>
                      <div className="col text-right">
                        <Link to="/admin/terms/add">
                          <a className="btn myBtn4">Add</a>&nbsp;&nbsp;&nbsp;
                        </Link>
                        <Link to={`/admin/terms/edit/${Terms.iTermsPage}`}>
                          <a>
                            <button className="btn myBtn3">Edit</button>
                          </a>
                          &nbsp;&nbsp;&nbsp;
                        </Link>
                        <button
                          id={`${Terms.iTermsPage}`}
                          className="btn myBtn2"
                          onClick={this.deletedata}
                        >
                          Delete
                        </button>
                      </div>
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
                          <th scope="col">Aboutus </th>
                          <th scope="col">Exchange </th>
                          <th scope="col">Terms Condition </th>
                          <th scope="col">AddedDate </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th>{Terms.iTermsPage}</th>
                          <td
                            style={{
                              "white-space": "pre-wrap",
                              "overflow-wrap": "break-word",
                            }}
                            dangerouslySetInnerHTML={{ __html: Terms.tAboutus }}
                          />
                          <td
                            style={{
                              "white-space": "pre-wrap",
                              "overflow-wrap": "break-word",
                            }}
                            dangerouslySetInnerHTML={{
                              __html: Terms.tExchange,
                            }}
                          />
                          <td
                            style={{
                              "white-space": "pre-wrap",
                              "overflow-wrap": "break-word",
                            }}
                            dangerouslySetInnerHTML={{
                              __html: Terms.tTermsCondition,
                            }}
                          />
                          <td>{Terms.dtAddedDate}</td>
                        </tr>
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

export default Listing;
