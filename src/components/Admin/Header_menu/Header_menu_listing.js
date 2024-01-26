import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
import axios from "axios";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import  getEnvironment  from '../../../components/environment';
const $ = require("jquery");
$.DataTable = require("datatables.net");

class Header_menu_listing extends React.Component {
   
  constructor(props) {
    super(props);
    this.state = {
      headerMenuArray: [],
    };
    this.deleteHeaderData = this.deleteHeaderData.bind(this);
  }

  async componentDidMount() {
    const { apiUrl } = getEnvironment();
  
    $(".example").DataTable().destroy();
    setTimeout(() => $(".example").DataTable({ pageLength: 50 }), 1000);
  
    try {
      const response = await fetch(`${apiUrl}/all_categoy_menu_get`);
      const { data } = await response.json();
      this.setState({ headerMenuArray: data });
    } catch (error) {
      console.error('Error in componentDidMount:', error);
    }
  }

  deleteHeaderData(e) {
    const { apiUrl } = getEnvironment();
    var iHeaderId = e.target.id;
    const fd = new FormData();
    fd.append("iHeaderId", iHeaderId);
    if (iHeaderId != "undefined") {
      axios.post(`${apiUrl}/delete_header_menu`, fd);
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
    var headerMenuArray = this.state.headerMenuArray;
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
                        <h3 className="mb-0">Header Menu Listing</h3>
                      </div>
                      <div className="col text-right">
                        <Link to="/admin/header_menu/add">
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
                          <th scope="col">Image</th>
                          <th scope="col">Title</th>
                          <th scope="col">AddedDate</th>
                          <th scope="col">Status</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          headerMenuArray.map((v, i)=>(
                            <tr key={i}>
                              <th>{i + 1}</th>
                              <td>
                                <Link
                                  to={`/admin/header_menu/edit/${v.iHeaderId}`}
                                >
                                  <img className="h-101 w-101" src={v.vImage ? v.vImage : process.env.PUBLIC_URL+"/Images/imageno.jpg"} />
                                </Link>
                              </td>
                              <td>
                                <Link
                                  to={`/admin/header_menu/edit/${v.iHeaderId}`}
                                >
                                  {v.vTitle}
                                </Link>
                              </td>
                              <td>{v.dtAddedDate}</td>
                              <td>{v.eStatus}</td>
                              <td>
                                <Link
                                  to={`/admin/header_menu/edit/${v.iHeaderId}`}
                                >
                                    <button className="btn myBtn3">Edit</button>
                                  &nbsp;&nbsp;&nbsp;
                                </Link>

                                <button
                                  id={`${v.iHeaderId}`}
                                  className="btn myBtn2"
                                  onClick={this.deleteHeaderData}
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))
                        }
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
export default Header_menu_listing;
