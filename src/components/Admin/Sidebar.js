import React from "react";
import logo from '../../image/0000003.png';
import {Link} from "react-router-dom";

const Sidebar = () =>
{
    return(
            <nav className="sidenav navbar navbar-vertical  fixed-left  navbar-expand-xs navbar-light bg-white" id="sidenav-main">
                <div className="scrollbar-inner">
                {/* <!-- Brand --> */}
                <div className="sidenav-header  align-items-center">
                    <Link to='/admin/'>
                        <img src={ logo }  className="navbar-brand-img" alt="..." />
                    </Link>
                </div>
                <div className="navbar-inner">
                    {/* <!-- Collapse --> */}
                    <div className="collapse navbar-collapse" id="sidenav-collapse-main">
                    {/* <!-- Nav items --> */}
                    <ul className="navbar-nav">
                        <li className="nav-item">
                        <Link to='/admin/'>
                            <a className="nav-link active">
                                <i className="fas fa-tachometer-alt text-primary"></i>
                                <span className="nav-link-text">Dashboard</span>
                            </a>
                        </Link>
                      
                        </li>
                        <li className="nav-item">
                            <Link to='/admin/listing'>
                                <a className="nav-link">
                                    <i className="fas fa-user-circle text-orange"></i>
                                    <span className="nav-link-text">User</span>
                                </a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/admin/banner'>
                                <a className="nav-link">
                                    <i className="fas fa-sliders-h text-primary"></i>
                                    <span className="nav-link-text">Banner</span>
                                </a>
                            </Link>

                        </li>
                        <li className="nav-item">
                            <Link to='/admin/image-content'>
                                <a className="nav-link">
                                    <i className="fas fa-images text-dark"></i>
                                    <span className="nav-link-text">Image Content</span>
                                </a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/admin/stories'>
                                <a className="nav-link">
                                    <i className="fas fa-gem text-yellow"></i>
                                    <span className="nav-link-text">Stories</span>
                                </a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/admin/product/listing' className="nav-link">
                                <i className="fab fa-product-hunt" style={{ 'color': '#22c099e0' }}></i>
                                <span className="nav-link-text">Product</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                                <Link to='/admin/header_menu/listing' className="nav-link">
                                    <i className="fas fa-sliders-h text-primary" style={{ 'color': 'pink' }}></i>
                                        <span className="nav-link-text" >Header Menu</span>
                                </Link>
                        </li>

                        <li className="nav-item">
                                <Link to='/admin/category/listing' className="nav-link">
                                <i className="fa fa-window-restore" style={{ 'color': 'red' }}></i>
                                    <span className="nav-link-text" >Category</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/admin/fabric/listing' className="nav-link">
                                    <i className="fab fa-algolia text-default"></i>
                                    <span className="nav-link-text">Fabric</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/admin/subcategory/listing' className="nav-link">
                                <i className="fas fa-subway"></i>
                                <span className="nav-link-text">Material</span>
                            </Link>
                        </li>
                        {/* <li className="nav-item">
                            <Link to='/admin/material/listing'>
                                <a className="nav-link">
                                        <i className="fa fa-first-order text-info" style={{color:'blue'}}></i>
                                    <span className="nav-link-text">Materials</span>
                                </a>
                            </Link>
                        </li> */}
                        <li className="nav-item">
                            <Link to='/admin/color/listing' className="nav-link">
                                <i className="fas fa-eye-dropper text-yellow"></i>
                                <span className="nav-link-text">Color</span>
                            </Link>
                        </li>
                       
                        <li className="nav-item">
                            <Link to='/admin/newsletter' className="nav-link">
                                <i className="fa fa-caret-square-o-left text-primary"></i>
                                <span className="nav-link-text">NewsLetter</span>
                            </Link>

                        </li>

                        <li className="nav-item">
                            <Link to='/admin/variants/listing' className="nav-link">
                                <i className="fab fa-accusoft" style={{'color':'blue'}}></i>
                                <span className="nav-link-text">Variants</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/admin/variant_option/listing' className="nav-link">
                                <i className="fas fa-filter" style={{ 'color': '#22c099e0' }}></i>
                                <span className="nav-link-text">Variants Options</span>
                            </Link>
                        </li>
                            
                        <li className="nav-item">
                            <Link to='/admin/order/listing' className="nav-link">
                                <i className="fa fa-first-order text-info"></i>
                                <span className="nav-link-text">Order</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/admin/terms/listing' className="nav-link">
                                <i className="fa fa-comment" style={{ 'color': 'rgb(245 10 64 / 88%)' }}></i>
                                <span className="nav-link-text">Terms Page</span>
                            </Link>
                        </li>
                    </ul>
                    <hr className="my-3" />
                    </div>
                </div>
                </div>
            </nav>
    )
}

export default Sidebar;