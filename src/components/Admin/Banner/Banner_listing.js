import React, { useState, useEffect } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import {Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import  getEnvironment  from '../../../components/environment';

const $ = require("jquery");
$.DataTable = require("datatables.net");

class Banner_listing extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      banner: [],
    };
  }

  async componentDidMount() {
    const envConfig = getEnvironment();
    const apiUrl = envConfig.apiUrl;
    try {
      const url = `${apiUrl}/all_banner_get`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      this.setState({ banner: data.data }, () => {
        // Initialize DataTable after setting the state
        setTimeout(() => {
          $(".example").DataTable({
            pageLength: 50,
          });
        }, 0); // No need for a delay, using 0ms delay
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error or set state to handle the error case
    }
  }
  

  deletedata(e) {
    const envConfig = getEnvironment();
    const apiUrl    = envConfig.apiUrl;
    const Url       = `${apiUrl}/delete`;
    const iBannerId = e.target.id;
    const fd = new FormData();
    fd.append("iBannerId", iBannerId);
    if (iBannerId) 
    {
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
            const response = axios.post(Url, fd);
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
    var banners = this.state.banner;
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
                        <h3 className="mb-0">Banner</h3>
                      </div>
                      <div className="col text-right">
                        <Link to="/admin/banner/add">
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
                          <th scope="col">Type</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {banners.map((banner, index) => (
                          <tr key={index}>
                            <th>{index + 1}</th>
                            <td>
                              <img
                                className="h-101 w-101"
                                src={banner.vImage}
                              />
                            </td>
                            <td>{banner.vTitle}</td>
                            <td>{banner.dtAddedDate}</td>
                            <td>{banner.eStatus}</td>
                            <td>
                              {banner.eShowtype == "Mobile" ? (
                                <i className="fa fa-mobile" aria-hidden="true"></i>
                              ) : (
                                <i className="fa fa-desktop" aria-hidden="true"></i>
                              )}
                            </td>

                            <td>
                              <Link
                                to={`/admin/banner/edit/${banner.iBannerId}`}
                              >
                                <a>
                                  <button className="btn myBtn3">Edit</button>
                                </a>
                                &nbsp;&nbsp;&nbsp;
                              </Link>

                              <button
                                id={`${banner.iBannerId}`}
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
export default Banner_listing;
