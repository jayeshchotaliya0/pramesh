import React, { useState, useEffect,useMemo } from "react";
import { Link } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getEnvironment from '../../../components/environment';
import Swal from "sweetalert2";

const Listing = () => {
  const [userdata, setUserdata] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const envConfig = getEnvironment();
      const apiUrl = envConfig.apiUrl;
      const url = `${apiUrl}/all_use_listing`;

      const response = await axios.get(url);
      setUserdata(response.data.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const deleteData = (e) => {
    const iUserId = e.target.id;
    if (iUserId) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          const del = `https://prameshsilks.com/backend/api/delete_user`; // Update your delete API endpoint

          const fd = new FormData();
          fd.append("iUserId", iUserId);

          axios
            .post(del, fd)
            .then((res) => {
              if (res.data.Status === "0") {
                Swal.fire("Deleted!", "Your record has been deleted.", "success");
                fetchData(); // Fetch data again after deletion
              } else {
                alert("Your record has not been deleted");
              }
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        }
      });
    }
  };

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
                  {userdata.length > 0 ? (
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
                        {userdata.map((user, index) => (
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
                              <button
                                id={`${user.iUserId}`}
                                className="btn myBtn2"
                                onClick={deleteData}
                              >
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
};

export default Listing;
