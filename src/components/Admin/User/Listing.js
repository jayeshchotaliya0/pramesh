import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import  getEnvironment  from '../../../components/environment';
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
    const { apiUrl } = getEnvironment();
    $(".example").DataTable().destroy();
    setTimeout(() => $(".example").DataTable({ pageLength: 50 }), 1000);
  
    try {
      const response = await fetch(`${apiUrl}/all_use_listing`);
      const { data } = await response.json();
      this.setState({ userdata: data });
    } catch (error) {
      console.error('Error in componentDidMount:', error);
    }
  }

  deletedata(e) {
    const { apiUrl } = getEnvironment();
    const del = `${apiUrl}/delete_user`;
    const iUserId = e.target.id;
    const fd = new FormData();
    fd.append("iUserId", iUserId);
    if (iUserId != "undefined") {
     
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
            axios.post(del, fd);
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
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-12 col-md-12 col-sm-12">
              <div className="card">
                <div className="card-header border-0">
                  <div className="row align-items-center">
                    <div className="col">
                      <h3 className="mb-0">User Content</h3>
                    </div>
                    <div className="col text-right">
                      <Link to="/admin/listing/useradd">
                        <a className="btn myBtn4">Add</a>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="table-responsive">
                  {this.state.userdata.length > 0 ? (
                    <table className="table align-items-center table-flush example">
                      <thead className="thead-light">
                        <tr>
                          <th scope="col">Id</th>
                          <th scope="col">FirstName</th>
                          <th scope="col">LastName</th>
                          <th scope="col">Email</th>
                          <th scope="col">AddedDate</th>
                          <th scope="col">Status</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.userdata.map((user, index) => (
                          <tr  key={index}>
                            <th>{index + 1}</th>
                            <td>{user.vFirstName}</td>
                            <td>{user.vLastName}</td>
                            <td>{user.vEmail}</td>
                            <td>{user.dtAddedDate}</td>
                            <td>{user.eStatus}</td>
                            <td>
                              <Link to={`/admin/user/edit/${user.iUserId}`}>
                                <button className="btn myBtn3">Edit</button>
                              </Link>
                              <button id={`${user.iUserId}`} className="btn myBtn2" onClick={this.deletedata}>
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p className="loading">Loading data.........</p>
                  )}
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
