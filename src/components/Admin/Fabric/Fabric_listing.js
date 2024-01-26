import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import { Fab } from "@material-ui/core";
const $ = require("jquery");
$.DataTable = require("datatables.net");

class Fabric_listing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fabric: [],
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
      var url = "http://localhost/pramesh/backend/api/all_fabric_get";
    } else {
      var url = "https://prameshsilks.com/backend/api/all_fabric_get";
    }
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ fabric: data.data });
  }

  deletedata(e) {
    var answer = window.location.href;
    const answer_array = answer.split("/");
    if (answer_array[2] == "localhost:3000") {
      var del = "http://localhost/pramesh/backend/api/delete_fabric";
    } else {
      var del = "https://prameshsilks.com/backend/api/delete_fabric";
    }

    var iFabricId = e.target.id;
    const fd = new FormData();
    fd.append("iFabricId", iFabricId);
    if (iFabricId != "undefined") {
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
    var fabrics = this.state.fabric;
    return (
      <>
        <Sidebar />
        <div className="main-content" id="panel">
          <Header />
          {/* <!-- Page content --> */}
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-12 col-md-12 col-sm-12">
                <div className="card">
                  <div className="card-header border-0">
                    <div className="row align-items-center">
                      <div className="col">
                        <h3 className="mb-0">Fabric Listing</h3>
                      </div>
                      <div className="col text-right">
                        <Link to="/admin/fabric/add">
                          <a className="btn myBtn4">Add</a>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="table-responsive">
                    <table
                      id="example"
                      className="table align-items-center table-flush example"
                    >
                      <thead className="thead-light">
                        <tr>
                          <th scope="col">Id</th>
                          <th scope="col">Fabric Name</th>
                          <th scope="col">Header Menu</th>
                          <th scope="col">Status</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {fabrics.map((fab, index) => (
                          <tr key={index}>
                            <th>{index + 1}</th>
                            <td>{fab.vTitle}</td>
                            <td>{fab.Cat_title}</td>
                            <td>{fab.eStatus}</td>
                            <td>
                              <Link to={`/admin/fabric/edit/${fab.iFabricId}`}>
                                <button className="btn myBtn3">Edit</button>
                                &nbsp;&nbsp;&nbsp;
                              </Link>
                              <button
                                id={`${fab.iFabricId}`}
                                className="btn myBtn2"
                                onClick={this.deletedata}
                              >
                                Delete
                              </button>
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
export default Fabric_listing;
