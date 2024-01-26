import React, { useState, useEffect } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import  getEnvironment  from '../../../components/environment';
import "react-toastify/dist/ReactToastify.css";
const $ = require("jquery");
$.DataTable = require("datatables.net");
const envConfig = getEnvironment();
const apiUrl    = envConfig.apiUrl;   

class Productlisting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
    };
  }

  async componentDidMount() {
    await this.fetchDataAndInitializeTable();
  }
  fetchDataAndInitializeTable = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/all_product`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      this.setState({ product: data.data }, () => {
        this.initializeDataTable();
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  initializeDataTable = () => {
    $('.example').DataTable({
      pageLength: 100,
      // Add other DataTable options here
    });
  };
  componentWillUnmount() {
    $('.example').DataTable().destroy(true);
  }

  async deleteData(e) {
    const iProductUrl = `${apiUrl}/api/product_delete`;
    const iProductId = e.target.id;

    if (iProductId) {
      const confirmed = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      });

      if (confirmed.isConfirmed) {
        const fd = new FormData();
        fd.append('iProductId', iProductId);

        try {
          const res = await axios.post(iProductUrl, fd);
          if (res.data.Status === '0') {
            Swal.fire('Deleted!', 'Your record has been deleted.', 'success');
            setTimeout(() => {
              window.location.reload(1);
            }, 1000);
          } else {
            alert('Your record has not been deleted');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    }
  }




  // deletedata(e) {
  //   const iProductUrl = `${apiUrl}/api/product_delete`;
  //   const iProductId = e.target.id;
  //   const fd = new FormData();
  //   fd.append("iProductId", iProductId);
  //   if (iProductId) {
  //     Swal.fire({
  //       title: "Are you sure?",
  //       text: "You won't be able to revert this!",
  //       icon: "warning",
  //       showCancelButton: true,
  //       confirmButtonColor: "#3085d6",
  //       cancelButtonColor: "#d33",
  //       confirmButtonText: "Yes, delete it!",
  //     })
  //     .then((result) => {
  //       if (result.isConfirmed) 
  //       {
  //         const dataa = axios
  //         .post(iProductUrl, fd)
  //         .then((res) => {
  //           if (res.data.Status == "0") {
  //             Swal.fire("Deleted!", "Your record has been deleted.", "success");
  //             setTimeout(() => {
  //               window.location.reload(1);
  //             }, 1000);
  //           } else {
  //             alert("Your record has been not deleted");
  //           }
  //         })
  //         .catch((error) => {});
  //       }
  //     })
  //     .then((res) => {
  //     })
  //     .catch((error) => {});
  //   }
  // }

  render() {
    var product = this.state.product;

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
                        <h3 className="mb-0">Product Content</h3>
                      </div>
                      <div className="col text-right">
                        <Link to="/admin/product/add">
                          <a className="btn myBtn4">Add</a>
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="table-responsive">
                    {
                      product.length >0 ? 
                        <table
                          id="example"
                          className="table align-items-center table-flush example"
                        >
                          <thead className="thead-light">
                            <tr>
                              <th scope="col">Id</th>
                              <th scope="col">Image</th>
                              <th scope="col">ProductName</th>
                              <th scope="col">SKU</th>
                              <th scope="col">Color</th>
                              <th scope="col">Status</th>
                              <th scope="col">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {product.map((product, index) => {
                              return (
                                <tr key={index}>
                                  <th>{index + 1} </th>
                                  <td>
                                    {product.image.length > 0 ? (
                                      product.image.map(function (img, id) {
                                        if (img.vImage != "") {
                                          return (
                                            <img
                                              key={id}
                                              className="h-101 w-101"
                                              src={img.vImage}
                                            />
                                          );
                                        } else {
                                          return (
                                            <img
                                              className="h-101 w-101"
                                              src={
                                                process.env.PUBLIC_URL +
                                                "/Images/imageno.jpg"
                                              }
                                            />
                                          );
                                        }
                                      })
                                    ) : (
                                      <img
                                        className="h-101 w-101"
                                        src={
                                          process.env.PUBLIC_URL +
                                          "/Images/imageno.jpg"
                                        }
                                      />
                                    )}
                                  </td>
                                  <td>{product.vProductName}</td>
                                  <td>{product.vSku}</td>
                                  <td>
                                    {product.color.length > 0 ? (
                                      product.color.map(function (colr, id) {
                                        if (colr.vColor != "") {
                                          return (
                                            <div
                                              key={id}
                                              style={{
                                                "backgroundColor": colr.vColor,
                                              }}
                                              className="color_mng"
                                            ></div>
                                          );
                                        }
                                      })
                                    ) : (
                                      <></>
                                    )}
                                  </td>
                                  <td>{product.eStatus}</td>
                                  <td>
                                    <Link
                                      to={`/admin/product/edit/${product.iProductId}`}
                                    >
                                      <a>
                                        <button className="btn myBtn3 position-relative ">
                                          Edit
                                          {product.vHomePageDisplay == "1" ? (
                                            <span
                                              style={{
                                                color: "#fff",
                                                marginLeft: "0.5rem",
                                              }}
                                              className="fa fa-home"
                                            ></span>
                                          ) : (
                                            <></>
                                          )}
                                        </button>
                                      </a>
                                      &nbsp;&nbsp;&nbsp;
                                    </Link>
                                    <button
                                      id={`${product.iProductId}`}
                                      className="btn myBtn2"
                                      onClick={(e) => this.deleteData(e)}
                                    >
                                      Delete
                                    </button>

                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      : <p className="loading">Loading data.........</p>
                    }
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
export default Productlisting;
