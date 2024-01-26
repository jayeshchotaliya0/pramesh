import React, { useState, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import { useBeforeunload } from "react-beforeunload";
import axios from "axios";
import  getEnvironment  from '../../components/environment';


const Dashboard = () => {

  const envConfig = getEnvironment();
  const apiUrl    = envConfig.apiUrl;        

  const [count, setCount] = useState([]);
  const [Last, setLast] = useState([{}]);
  const [Banner, setBanner] = useState([]);
  const [Stories, setStories] = useState([]);
  const [Order, setOrder] = useState([]);

  const category_filter = async (e) => {
    
    var url = `${apiUrl}/all_user_get`;
    
    const alldata = await axios.get(url);
    setCount(alldata.data.count);
    setLast(alldata.data.last);
    setBanner(alldata.data.banner);
    setStories(alldata.data.stories);
    setOrder(alldata.data.order);
  };
  useEffect(() => {
    category_filter();
  }, []);

  return (
    <>
      <Sidebar />
      <div className="main-content" id="panel">
        <Header />
        <div className="header bg-primary pb-6">
          <div className="container-fluid">
            <div className="header-body">
              <div className="row align-items-center py-4">
                <div className="col-lg-6 col-7">
                  <h6 className="h2 text-white d-inline-block mb-0">
                    Dashboard
                  </h6>
                  <nav
                    aria-label="breadcrumb"
                    className="d-none d-md-inline-block ml-md-4"
                  ></nav>
                </div>
              </div>
              {/* <!-- Card stats --> */}
              <div className="row">
                <div className="col-xl-3 col-md-6">
                  <div className="card dashShadow card-stats">
                    {/* <!-- Card body --> */}
                    <Link to="/admin/listing">
                      <div className="card-body   ">
                        <div className="row">
                          <div className="col">
                            <h5 className="card-title text-uppercase text-muted mb-0">
                              Total User
                            </h5>
                            <span className="h2 font-weight-bold mb-0">
                              {count}
                            </span>
                          </div>
                          <div className="col-auto">
                            <div className="icon icon-shape bg-gradient-red text-white rounded-circle shadow">
                              <i className="fa fa-users"></i>
                            </div>
                          </div>
                        </div>
                        <p className="mt-3 mb-0 text-sm">
                          <span className="text-success mr-2">
                            <i className="fa fa-arrow-up"></i> 3.48%
                          </span>
                          <span className="text-nowrap">Since last month</span>
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="col-xl-3 col-md-6">
                  <div className="card dashShadow card-stats">
                    {/* <!-- Card body --> */}
                    <Link to="/admin/banner">
                      <div className="card-body  ">
                        <div className="row">
                          <div className="col">
                            <h5 className="card-title text-uppercase text-muted mb-0">
                              Total Banner
                            </h5>
                            <span className="h2 font-weight-bold mb-0">
                              {Banner}
                            </span>
                          </div>
                          <div className="col-auto">
                            <div className="icon icon-shape bg-gradient-orange text-white rounded-circle shadow">
                              <i className="fa fa-circle-o"></i>
                            </div>
                          </div>
                        </div>
                        <p className="mt-3 mb-0 text-sm">
                          <span className="text-success mr-2">
                            <i className="fa fa-arrow-up"></i> 3.48%
                          </span>
                          <span className="text-nowrap">Since last month</span>
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="col-xl-3 col-md-6">
                  <div className="card dashShadow card-stats">
                    {/* <!-- Card body --> */}
                    <Link to="/admin/stories">
                      <div className="card-body ">
                        <div className="row">
                          <div className="col">
                            <h5 className="card-title text-uppercase text-muted mb-0">
                              Total Stories
                            </h5>
                            <span className="h2 font-weight-bold mb-0">
                              {Stories}
                            </span>
                          </div>
                          <div className="col-auto">
                            <div className="icon icon-shape bg-gradient-green text-white rounded-circle shadow">
                              <i className="fa fa-money"></i>
                            </div>
                          </div>
                        </div>
                        <p className="mt-3 mb-0 text-sm">
                          <span className="text-success mr-2">
                            <i className="fa fa-arrow-up"></i> 3.48%
                          </span>
                          <span className="text-nowrap">Since last month</span>
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
                {/* <Link to='/admin/order/listing'> */}
                <div className="col-xl-3 col-md-6">
                  <Link to="/admin/order/listing">
                    <div className="card dashShadow card-stats">
                      <div className="card-body ">
                        <div className="row">
                          <div className="col">
                            <h5 className="card-title text-uppercase text-muted mb-0">
                              Order
                            </h5>
                            <span className="h2 font-weight-bold mb-0">
                              {Order}
                            </span>
                          </div>
                          <div className="col-auto">
                            <div className="icon icon-shape bg-gradient-info text-white rounded-circle shadow">
                              <i className="fa fa-first-order"></i>
                            </div>
                          </div>
                        </div>
                        <p className="mt-3 mb-0 text-sm">
                          <span className="text-success mr-2">
                            <i className="fa fa-arrow-up"></i> 3.48%
                          </span>
                          <span className="text-nowrap">Since last month</span>
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Page content --> */}
        <div className="container-fluid mt--6">
          <div className="row">
            <div className="col-xl-4">
              <div className="card">
                <div className="card-header bg-transparent">
                  <div className="row align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-muted ls-1 mb-1">
                        Performance
                      </h6>
                      <h5 className="h3 mb-0">Total orders</h5>
                    </div>
                  </div>
                </div>
                <div className="card-body"></div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-8">
              <div className="card  dashShadow">
                <div className="card-header border-0">
                  <div className="row align-items-center">
                    <div className="col">
                      <h3 className="mb-0">LATEST USER DATA</h3>
                    </div>
                    <div className="col text-right">
                       <Link to="/admin/listing" className="btn btn-sm btn-primary">
                        See all
                       </Link>
                    </div>
                  </div>
                </div>
                <div className="table-responsive">
                  {/* <!-- Projects table --> */}
                  <table className="table align-items-center table-flush">
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Id</th>
                        <th scope="col">FirstName</th>
                        <th scope="col">LastName</th>
                        <th scope="col">Email</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Last?.map(function (user, index) {
                        return (
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{user.vFirstName}</td>
                            <td>{user.vLastName}</td>
                            <td>{user.vEmail}</td>
                            <td>{user.eStatus}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-xl-4"></div>
          </div>
          {/* <!-- Footer --> */}
          <footer className="footer pt-0">
            <div className="row align-items-center justify-content-lg-between">
              <div className="col-lg-6">
                <div className="copyright text-center  text-lg-left  text-muted">
                  &copy; 2021{" "}
                  <Link
                    to="https://prameshsilks.com"
                    className="font-weight-bold ml-1"
                    target="_blank"
                  >
                    Pramesh.com
                  </Link>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
