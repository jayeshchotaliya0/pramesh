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

class Newsletter_listing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      news_letter: [],
    };
  }

  async componentDidMount() {
    const { apiUrl } = getEnvironment();
    // Destroy existing DataTable before reinitializing
    const dataTable = $(".example").DataTable();
    if (dataTable !== null) {
      dataTable.destroy();
    }
  
    setTimeout(function () {
      // Reinitialize DataTable after destroying
      $(".example").DataTable({
        pageLength: 50,
      });
    }, 1000);
  
    const url = `${apiUrl}/all_news_letter_get`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      this.setState({ news_letter: data.data });
    } catch (error) {
      // Handle errors if needed
      console.error('Error fetching data:', error);
    }
  }
  
  deletedata(e) {
    const { apiUrl } = getEnvironment();
    const del = `${apiUrl}/delete_news_letter`;
    const iNewsLetterId = e.target.id;
    const fd = new FormData();
    fd.append("iNewsLetterId", iNewsLetterId);
    if (iNewsLetterId != "undefined") {
      
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
            const data = axios.post(del, fd);
            Swal.fire("Deleted!", "Your record has been deleted.", "success");
            setTimeout(() => {
              window.location.reload(1);
            }, 1000);
          }
        })
        .then((res) => {
          if (res.data.Status === "0") {
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
    var news_letter = this.state.news_letter;
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
                        <h3 className="mb-0">News Letter Listing</h3>
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
                          <th scope="col">Email</th>
                          <th scope="col">AddedDate</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {news_letter.map((cat, index) => (
                          <tr  key={index}>
                            <th>{index + 1}</th>
                            <td>{cat.vEmail}</td>
                            <td>{cat.dtAddedDate}</td>
                            <td>
                              <Link
                                to={`/admin/news_letter/edit/${cat.iNewsLetterId}`}
                              >
                                <a>
                                  <button className="btn myBtn3">Edit</button>
                                </a>
                                &nbsp;&nbsp;&nbsp;
                              </Link>
                              <button
                                id={`${cat.iNewsLetterId}`}
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
export default Newsletter_listing;
