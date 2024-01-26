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

class Subcategory_listing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      SubcategoryListingArray: [],
    };
  }

  async componentDidMount() {
    const envConfig = getEnvironment();
    const apiUrl    = envConfig.apiUrl;             

    $(".example").DataTable().destroy();
    setTimeout(function () {
      $(".example").DataTable({
        pageLength: 50,
      });
    }, 1000);
    
    const url = `${apiUrl}/all_subcategory_get`;
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ SubcategoryListingArray: data.data });
  }

  deletedata(e) {
    const envConfig = getEnvironment();
    const apiUrl    = envConfig.apiUrl;
    const del       = `${apiUrl}/delete_subcategory`;
    var iSubcategoryId = e.target.id;
    const fd = new FormData();
    fd.append("iSubcategoryId", iSubcategoryId);
    if (iSubcategoryId != "undefined") {
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
                        <h3 className="mb-0">Material Listing</h3>
                      </div>
                      <div className="col text-right">
                        <Link to="/admin/subcategory/add" className="btn myBtn4">
                          Add
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
                          <th scope="col">Header Menu</th>
                          <th scope="col">AddedDate</th>
                          <th scope="col">Status</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.SubcategoryListingArray.map((cat, index) => (
                          <tr  key={index}>
                            <th>{index + 1}</th>
                            <td>
                              <img className="h-101 w-101" src={cat.vImage} />
                            </td>
                            <td>{cat.vSubTitle}</td>
                            <td>{cat.vTitle}</td>
                            <td>{cat.dtAddedDate}</td>
                            <td>{cat.eStatus}</td>

                            <td>
                              <Link
                                to={`/admin/subcategory/edit/${cat.iSubcategoryId}`}
                              >
                                <a>
                                  <button className="btn myBtn3">Edit</button>
                                </a>
                                &nbsp;&nbsp;&nbsp;
                              </Link>

                              <button
                                id={`${cat.iSubcategoryId}`}
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
export default Subcategory_listing;
