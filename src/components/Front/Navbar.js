import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import axios from "axios";
import { gsap } from "gsap/all";
import LoginPopup from "./Login/LoginPopup";
import { GoogleLogout } from "react-google-login";
import  getEnvironment  from '../../components/environment';
import "../../css/home.css";

import {
  setMainheader,
  setProductListing,
  setMainproductdata,
  setAddtocartsavedata,
  setAddtocartsubtotal,
  setAllstories,
  setAllfabric,
  setSearchdata,
  setWishlist,
  setTermsCondition,
} from "../../redux/actions/productActions";

const Navbar = () => {
  let history     = useHistory();
  const envConfig = getEnvironment();
  const apiUrl    = envConfig.apiUrl;   
  const cookie    = localStorage.getItem("cookie");
  const iUserId   = localStorage.getItem("iUserId");
  const Name      = localStorage.getItem("Name");
  const vGoogleId = localStorage.getItem("vGoogleId");
  const clientId  = "3076278999-d3dc119t0ircn8573inrgl6inivo6mrg.apps.googleusercontent.com";
  const GuestcheckoutId = localStorage.getItem("GuestcheckoutId"); 

  const [slide, setSlide]   = useState(false);
  const [search, setsearch] = useState(false);
  const [pop, setpop]       = useState(false);
  const [logpop, setlogpop] = useState(false);
  const [stick, setstick]   = useState(false);
  const [image_zooming, setimage_zooming] = useState("");
  const [Calorcategory, setCalorcategory] = useState([]);
  const [SingleProductSearch, setSingleProductSearch] = useState("");

  const poped = () => {
    if (pop == false) {
      setpop(true);
    }
    if (pop == true) {
      setpop(false);
    }
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY > 10) {
      setstick(true);
    } else {
      setstick(false);
    }
  });

  const AllSearchData = (e) => {
    const keyword     = e.target.value;
    const search_url  = `${apiUrl}/search`;
    const fd          = new FormData();
    fd.append("keyword", keyword);
    if (keyword.length > 1) {
      const dataa = axios
        .post(search_url, fd)
        .then((res) => {
          if (res.data.Status == "0") {
            dispatch(setSearchdata(res.data.data));

            setCalorcategory(res.data.alldata);
          } else {
            setCalorcategory(res.data.alldata);
            dispatch(setSearchdata(res.data.data));
          }
        })
        .catch((error) => { });
    } else {
      dispatch(setSearchdata([]));
      setCalorcategory([]);
    }
  };

  const Logout = () => {
      localStorage.clear();
      history.push("/login");
      window.location.reload();
      console.clear();
  };
  const logPop = () => {
    if (logpop == false) {
      setlogpop(true);
    }
    if (logpop == true) {
      setlogpop(false);
    }
  };

  function mouse_hover(e) {
    var image = e.target.getAttribute("data-id");
    setimage_zooming(image);
  }

  function searching() {
    if (search == false) {
      setsearch(true);
      gsap.fromTo(
        ".searched",
        { y: -50, opacity: 0, display: "none" },
        { y: 0, opacity: 1, display: "flex", duration: 0.5 }
      );
    }

    if (search == true) {
      gsap.fromTo(
        ".searched",
        { y: 0, opacity: 1, display: "flex" },
        { y: -50, opacity: 0, display: "none", duration: 0.5 }
      );
      setsearch(false);
    }
  }

  const dispatch = useDispatch();
    const header  = `${apiUrl}/header`;
    const srories = `${apiUrl}/stories`;
    const url     = `${apiUrl}/main_product_listing`;
    const cartdatasave  = `${apiUrl}/addtocartdataget?cookie=${cookie}@@${iUserId}`;
    const terms         = `${apiUrl}/all_terms_condition_get`;
  

  const mainNavbar = async () => {
    // ***************HEADER***************
    const headerdata = await axios.get(header).catch((err) => { });
    if (headerdata.data.data) {
      dispatch(setMainheader(headerdata.data.data));
      dispatch(setAllfabric(headerdata.data.fabric));
    }
    // *********************ADD TO CART DATA ******************
    const addtocart = await axios.get(cartdatasave);

    if (addtocart.data.data) {
      dispatch(setAddtocartsavedata(addtocart.data.data));
      dispatch(setAddtocartsubtotal(addtocart.data.subtotal));
    }
    if (addtocart.data.wishlist) {
      dispatch(setWishlist(addtocart.data.wishlist));
    }
    // *********************ALL STORIES DATA ******************
    const StoriesArray = await axios.get(srories);

    if (StoriesArray.data.data) {
      dispatch(setAllstories(StoriesArray.data.data));
    }
    // *********************ALL Terms DATA ******************
    const TermsArray = await axios.get(terms);

    if (TermsArray.data.data) {
      dispatch(setTermsCondition(TermsArray.data.data));
    }
  };

  useEffect(() => {
    mainNavbar();
  }, []);

  const Remove_addtocart = (e) => {
    const iAddtocartId  = e.target.id;
    const remove_product = `${apiUrl}/addtocartdelete`;
    const fd = new FormData();
    fd.append("iAddtocartId", iAddtocartId);
    fd.append("vCookie", cookie);
    fd.append("iUserId", iUserId);
    if (iAddtocartId != "undefined") {
      const dataa = axios
        .post(remove_product, fd)
        .then((res) => {
          if (res.data.Status == "0") {
            dispatch(setAddtocartsavedata(res.data.data));
            dispatch(setAddtocartsubtotal(res.data.subtotal));
          } else {
          }
        })
        .catch((error) => { });
    }
  };

  const Header_data = useSelector((state) => state.Mainheader.MainheaderArray);
  const Addtocart = useSelector(
    (state) => state.MainAddtocartsavedata.MainAddtocartsavedataArray
  );
  const SubTotal = useSelector(
    (state) => state.MainAddtocartsubtotal.MainAddtocartsubtotalArray
  );
  const AllFabricData = useSelector(
    (state) => state.MainMiniallfabricdata.AllFabricdataArray
  );
  const SearchData = useSelector(
    (state) => state.MainMiniallsearchdata.AllSearchdataArray
  );
  const WishlistData = useSelector(
    (state) => state.MainMiniallwishdata.AllWishlistArray
  );

  if (SearchData.length == 1) {
  }

  var c_size = "";
  if (window.screen.width <= "991") {
    var c_size = "hiding";
  } else {
    var c_size = "show";
  }

  const SubcategortClick = async (e) => {
    var iSubCategoryId = e.target.id;
    const product_listing = `${apiUrl}/product_listing`;
    const fd = new FormData();
    fd.append("iSubCategoryId", iSubCategoryId);
    const data = axios.post(product_listing, fd)
    .then((response) => {
      if (response?.data?.data) {
        dispatch(setProductListing(response?.data?.data));
      }
    }).catch((err) => {});
  };

  const mainproductdata = async () => {
    const maindata = await axios.get(url).catch((err) => {

    });
    if (maindata.data.data) {
      dispatch(setMainproductdata(maindata.data.data));
    }
  };

  const show_addtocart_data = () => {
    setSlide(true);
  };
  const sliding = () => {
    setSlide(false);
  };

  useEffect(() => {
    mainproductdata();
  }, []);

  document.onclick = function (e) {
    if (e.target.id != "test" && e.target.id != "test2" && search == true) {
      setsearch(false);
      gsap.fromTo(
        ".searched",
        { y: 0, opacity: 1, display: "flex" },
        { y: -50, opacity: 0, display: "none", duration: 0.3 }
      );
    }
  };

  return (
    <>
      <nav
        className={`navbar ${stick ? "sticked" : ""
          } navbar-expand-lg navbar-light bg-light`}
      >
        <div className="nav-div">
          <Link to="/">
            <div className="navbar-brand" href="/">
              <img
                src={process.env.PUBLIC_URL + "/Images/Animated_pramesh.svg"}
                alt="logo"
              />
            </div>
          </Link>
          <div>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        </div>

        <div className="  collapse navbar-collapse " id="navbarNavDropdown">
          <ul className="navbar-nav">
            {Header_data.map(function (header, index) {
              if (header.sub.length > 0) {
                var x = header.sub.length;
                if (x > 20) {
                  var p = "col-xl-2  col-lg-4 col-md-6 col-sm-6";
                  var size = "left_size1";
                } else if (x < 5) {
                  var p = "col-xl-12";
                  var size = "left_size3";
                } else if (x < 10) {
                  var p = "col-xl-3 col-lg-4 col-md-4 col-sm-6";
                  var size = "left_size4";
                } else if (x < 15 && x != 3) {
                  var p = "col-xl-3 col-lg-4 col-md-4 col-sm-6";
                  var size = "left_size2";
                }
                return (
                  <li className={`nav-item  ${c_size} dropdown`}>
                    <Link to={index == 0 ? "/typeofsarees" : ""}>
                      {header.vTitle}
                    </Link>

                    <div
                      className={`dropdown-menu custm  ${header.vTitle} ${c_size} nItem`}
                      aria-labelledby="navbarDropdownMenuLink"
                    >
                      {/* <div className="row nItem pl-5"> */}
                      {AllFabricData.map(function (fabric, ids) {
                        if (fabric.iHeaderId == header.iHeaderId) {
                          return (
                            <>
                              <div>
                                <div
                                  id="maincate"
                                >
                                  {fabric.vTitle}
                                </div>
                                <div>
                                  {header.sub.map(function (sub1, idss) {
                                    if (sub1.iFabricId == fabric.iFabricId) {
                                      var subcatname = "";
                                      var subcatname = sub1.vSubTitle;
                                      var name = subcatname.replace(/ /g, "");
                                      return (
                                        <div>
                                          <Link
                                            to={`/product-listing/${name}/${sub1.iSubcategoryId}`}
                                          >
                                            <a
                                              onMouseOver={mouse_hover}
                                              data-id={`${sub1.vImage}`}
                                              id={`${sub1.iSubcategoryId}`}
                                              onClick={SubcategortClick}
                                              className="dropdown-item"
                                            >
                                              {sub1.vSubTitle}
                                            </a>
                                          </Link>
                                        </div>
                                      );
                                    }
                                  })}
                                </div></div>
                            </>
                          );
                        }
                      })}
                      {/* </div> */}

                      <div className=" previewImg">
                        {image_zooming != "" ? (
                          <img src={image_zooming} alt="Image" />
                        ) : (
                          <img src={header.vImage} alt="Image" />
                        )}
                      </div>
                    </div>
                  </li>
                );
              } else {
                if (header.vTitle == "STORIES") {
                  return (
                    <Link to="/stories">
                      <li className={`nav-item ${c_size}`}>
                        <a className="nav-link">{header.vTitle}</a>
                      </li>
                    </Link>
                  );
                } else {
                  return (
                    <Link to="/product-listing">
                      <li className={`nav-item ${c_size}`}>
                        <a className="nav-link">{header.vTitle}</a>
                      </li>
                    </Link>
                  );
                }
              }
            })}
          </ul>
        </div>
        <div className="d-flex iconBox">
          <div className="icons ">
            <span onClick={searching}>
              <i className="fa fa-search" id="test" aria-hidden="true"></i>
            </span>
            <span>
              <i onClick={poped} className="fa fa-heart-o" aria-hidden="true">
              </i>
            </span>
            <span className="position-relative ">
              {
                iUserId ? 
                  <span className="luser" onClick={logPop}>
                    {Name}
                  </span>
                :
                <Link to="/register">
                  <i className="fa fa-user" aria-hidden="true"></i>
                </Link>
              }
              <span  className={`logout ${logpop ? "d-inline-flex" : "d-none"}`} style={{display:logpop?'none !important':''}}>
                {vGoogleId ? (
                  <GoogleLogout
                    clientId={clientId}
                    buttonText="Logout"
                    onLogoutSuccess={Logout}
                    className="google_logout"
                  >
                    <span>
                      Logout
                      <i className="fa fa-sign-out" aria-hidden="true"></i>
                    </span>
                  </GoogleLogout>
                ) : (
                  <>
                    {
                      iUserId ? <>
                                <span style={{marginTop:'-5rem'}} onClick={Logout}>Logout &nbsp;<i className="fa fa-sign-out" aria-hidden="true"></i></span>
                                <span style={{marginTop:"4rem",marginLeft:"-12rem",color:"#5e000a"}}>Order &nbsp;&nbsp;<i className="fa fa-first-order" aria-hidden="true"></i></span>  
                              </> : ''
                    }
                  
                  </>
                )}
              </span>
            </span>
          </div>
          <div className="cart position-relative" onClick={show_addtocart_data}>
            <i className="fa fa-shopping-cart mr-3" aria-hidden="true"></i>
            <span id="cartNum">{Addtocart.length}</span>
          </div>
          <div className="inr">
            <span>
              <i className="fa fa-chevron-down mr-2" aria-hidden="true"></i>INR
            </span>
          </div>
        </div>
        <div className="searched ">
          <div className="search" id="test2">
            <div className="position-relative" id="test2">
              <input
                type="text"
                placeholder="Search"
                onChange={AllSearchData}
                id="test2"
              />
              {SingleProductSearch ? (
                <></>
              ) : (
                // <a href={`/product-listing/${'search/' + SingleProductSearch}`}>
                //     <i className="fa fa-search"></i>
                // </a>
                <i className="fa fa-search">{SingleProductSearch}</i>
              )}

              <div
                className={`drop ${SearchData.length >= 7 ? "dropdownshow" : ""
                  }`}
              >
                {SearchData.map(function (sea, index) {
                  return (
                    <a
                      href={`/product-listing/${btoa(
                        "search/" + sea.vProductName
                      )}`}
                    >
                      <div className="items">
                        <h3 id={`${sea.vProductName}`}>{sea.vProductName}</h3>

                        {/* <p>{sea.count}</p> */}
                      </div>
                    </a>
                  );
                })}
                {/* ***********************************COLOR********************************** ****** */}
                {Calorcategory.map(function (color_category, index) {
                  return (
                    <a
                      href={`/product-listing/${btoa(
                        "color/" + color_category
                      )}`}
                    >
                      <div className="items">
                        <h3 id={`${color_category}`}>{color_category}</h3>

                        {/* <p>{sea.count}</p> */}
                      </div>
                    </a>
                  );
                })}
                {/* ******************* ********************** COLOR ********** ************* ******* ****/}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* <a href={`/product-listing/${btoa('search/' + sea.vProductName)}`}>
                <h3 id={`${sea.vProductName}`}>{sea.vProductName}</h3>
            </a> */}

      {/* ******************************* */}
      {/* Add on Cart section   */}

      <div className={`clickoncart ${slide == true ? "slide" : ""}`}>
        <button className="closed" onClick={sliding}>
          <i className="fa fa-close"></i>
        </button>

        <div className="scroll">
          {Addtocart.length > 0 ? (
            Addtocart.map(function (addtoct, index) {
              return (
                <>
                  <div className="mycards">
                    <button
                      id={`${addtoct.iAddtocartId}`}
                      onClick={Remove_addtocart}
                      className="close"
                    >
                      X
                    </button>
                    <div className="cardimg mr-4">
                      <img className="img" src={addtoct.vImage} alt="img" />
                    </div>
                    <div className="cartinfo">
                      <h2>{addtoct.vProductName}</h2>
                      {addtoct.vSize != "" ? (
                        <p>
                          SIZE : <span>{addtoct.vSize}</span>
                        </p>
                      ) : (
                        <></>
                      )}
                      <p>
                        Qty : <span>{addtoct.vQty}</span>
                      </p>
                      <h4>र {addtoct.vTotal}</h4>
                    </div>
                  </div>
                </>
              );
            })
          ) : (
            <>
              <hr></hr>
              <h1 className="text-center">Record Not Found!</h1>
              <hr></hr>
            </>
          )}
        </div>

        <div className="total p-3">
          <h2>CART SUBTOTAL :</h2>
          <h3>र {SubTotal}</h3>
        </div>
        <div className="checkout">
          <Link style={{ display: "contents" }} to="/viewcart">
            <button className="cbtn">VIEW CART</button>
          </Link>
          {iUserId || GuestcheckoutId ? (
            <Link style={{ display: "contents" }} to="/checkout">
              <button className="pbtn">PROCEED TO CHECKOUT</button>
            </Link>
          ) : (
            <Link style={{ display: "contents" }} to="/loginType">
              <button className="pbtn">PROCEED TO CHECKOUT</button>
            </Link>
          )}
        </div>
      </div>
      {/* login popup  */}

      <LoginPopup classes={`d-none  ${pop ? "d-block" : ""}`} remove={poped} />
    </>
  );
};

export default Navbar;
