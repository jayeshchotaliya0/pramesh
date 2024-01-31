import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";
import ScrollToTop from "../ScrollToTop";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { setProductListing,setWishlist} from "../../../redux/actions/productActions";
import { Link, useParams } from "react-router-dom";
import { gsap } from "gsap/all";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import  getEnvironment  from '../../../components/environment';

const Product_listing = () => {
  const { id } = useParams();
  const { apiUrl } = getEnvironment(); 

  var iUserId = localStorage.getItem("iUserId");
  const [animation2, setanimation2] = useState(false);
  const [show1, setshow1] = useState(false);
  const [show2, setshow2] = useState(false);
  const [show3, setshow3] = useState(false);
  const [filterslide, setfilterslide] = useState(false);
  const [SelectedPrice, setSelectedPrice] = useState("");
  const [ColorArray, setColorArray] = useState([]);
  const [Pagenumber, setPagenumber] = useState(0);
  const [iFabricId, setiFabricId] = useState("");
  const [Sort, setSort] = useState("");
  const [iColorId, setColorFilter] = useState("");

  const Product_data = useSelector((state) => state.MainProductListing.MainProductListingArray);

  // ********************** Load Time  Data Get ***************************
  const dispatch = useDispatch();
  const iSubCategoryId = id;

  const mainNavbar = async () => {
    axios.post(`${apiUrl}/product_listing`, {iSubCategoryId})
    .then((response) => {
      if (response?.data?.data) {
        dispatch(setProductListing(response?.data?.data));
      }
    }).catch((err) => {});
   
    // *************************COLOR DATA GET***********************
    const colordata = await axios.get(`${apiUrl}/get_category`).catch((err) => {});
    if (colordata.data.color) {
      setColorArray(colordata.data.color);
    }
  };

  useEffect(() => {
    mainNavbar();
  }, [id]);
  // ********************************** Filter ***********************************
  const filterclick = async (e) => {
    const SortByFilter = e.target.value;
    setSort(SortByFilter);
    const Price = SelectedPrice;
    const filters = { iFabricId, Price, iColorId,SortByFilter,iSubCategoryId };
    const filteredFilters = {};
    for (const key in filters) {
        if (filters[key] !== '') {
            filteredFilters[key] = filters[key];
        }
    }

    try {
        const product_listing = `${apiUrl}/product_listing`;
        const productdata = await axios.post(product_listing, filteredFilters);
        if (productdata.data.data) {
            dispatch(setProductListing(productdata.data.data));
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
  };

  const priceFilter = async (e) => {
    const Price = e.target.value;
    setSelectedPrice(Price);
    
    const filters = {iFabricId,Price,iColorId, Sort, iSubCategoryId };
     // Filter out blank variables before sending the request
     const filteredFilters = {};
     for (const key in filters) {
         if (filters[key] !== '') {
             filteredFilters[key] = filters[key];
         }
     }
  
    try {
      const productdata = await axios.post(`${apiUrl}/product_listing`, filteredFilters);
      
      if (productdata.data && productdata.data.data) {
        dispatch(setProductListing(productdata.data.data));
      } else {
        console.error("Invalid response from server:", productdata);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  const ClickColorFilter = async (e) => {
    const iColorId = e.target.value;
    setColorFilter(iColorId);
    const Price = SelectedPrice;
    const FilterData = { iFabricId,Price,iColorId, Sort,iSubCategoryId};

    // Filter out blank variables
    const filteredData = {};
    for (const key in FilterData) {
        if (FilterData[key] !== '') {
            filteredData[key] = FilterData[key];
        }
    }

    try {
        const productdata = await axios.post(`${apiUrl}/product_listing`, filteredData);

        if (productdata.data && productdata.data.data) {
            dispatch(setProductListing(productdata.data.data));
        } else {
            console.error("Invalid response from server:", productdata);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
  };

  const numberWithCommas = (number) => {
    const fixedNumber = Number(number).toFixed(2);
    return fixedNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
 
  const wishlistAdded = (e) => {
    var iProductId = e.target.id;
    const fd = new FormData();
    fd.append("iProductId", iProductId);
    fd.append("iUserId", iUserId);

    if (iProductId != "0") {
      const wishlist_url = `${apiUrl}/wishlishadded`;
      axios.post(wishlist_url, fd).then((res) => {
          if (res.data.Status == "0") {
            mainNavbar();
            dispatch(setWishlist(res.data.data));
            toast.success(res.data.message, {
              position: "bottom-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } else {
            mainNavbar();
          }
        })
        .catch((error) => {});
    }
  };

  const usersPerPage = 56;
  const pagesvisited = Pagenumber * usersPerPage;
  const displayproduct = Product_data.slice(
    pagesvisited,
    pagesvisited + usersPerPage
  ).map((product) => {
    var countdata = product.image.length;
    if (countdata > 0) {
      return (
        <div className="customCol col-xl-3  col-lg-4 col-md-5 col-sm-10">
          <div className=" imgEffect overflow-hidden position-relative">
            <div className="heartDiv">
              {iUserId ? (
                <i
                  onClick={wishlistAdded}
                  id={`${product.iProductId}`}
                  className={`fa fa-heart ${
                    product.vWishlist == "1" ? "hartred" : ""
                  }`}
                  aria-hidden="true"
                ></i>
              ) : (
                <Link to="/login">
                  <i className="fa fa-heart" aria-hidden="true"></i>
                </Link>
              )}
            </div>
            {product.image.map(function (Pimg, index) {
              if (index == 0) {
                if (Pimg.vImage != "") {
                  var imagestyle = "";
                } else {
                  var imagestyle = "";
                }
              } else {
                if (Pimg.vImage != "") {
                  var imagestyle = "img2";
                } else {
                  var imagestyle = "";
                }
              }
              return (
                <>
                  <Link
                    to={`/addtocart/${btoa(Pimg.iProductId)}/${btoa(
                      product.vPrice
                    )}`}
                  >
                    <img
                      src={Pimg.vImage}
                      className={`img-fluid catoImg ${imagestyle}`}
                      alt="Image"
                    />
                  </Link>
                </>
              );
            })}
          </div>
          <h3>{product.vProductName}</h3>
          <p> र {numberWithCommas(product.vPrice)}</p>
        </div>
      );
    } else {
      return (
        <div className="imgEffect overflow-hidden position-relative">
          <img
            src={process.env.PUBLIC_URL + "/Images/load.gif"}
            className="img-fluid catoImg"
            alt="Image"
          />
        </div>
      );
    }
  });

  const pageCount = Math.ceil(Product_data.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPagenumber(selected);
  };

  // ****** Filter Button Click in Hide Show ************
  const show_1 = () => {
    if (show1 == false) {
      setshow1(true);
    }
    if (show1 == true) {
      setshow1(false);
      gsap.fromTo(
        "#show1",
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }
      );
    }
  };

  const show_2 = () => {
    if (show2 == false) {
      setshow2(true);
    }
    if (show2 == true) {
      setshow2(false);
      gsap.fromTo(
        "#show2",
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }
      );
    }
  };

  const show_3 = () => {
    if (show3 == false) {
      setshow3(true);
    }
    if (show3 == true) {
      setshow3(false);
      gsap.fromTo(
        "#show3",
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }
      );
    }
  };

  // ****** Filter Button Click in Hide Show ************

  function animEffect2() {
    if (animation2 == false) {
      setanimation2(true);
      gsap.fromTo(
        ".catoFlex2",
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }
      );
    }

    if (animation2 == true) {
      setanimation2(false);
    }
  }

  const filterSlide = () => {
    if (filterslide == false) {
      setfilterslide(true);
    } else {
      setfilterslide(false);
    }
  };

  return (
    <>
      <Navbar />
      <ScrollToTop />
      <section
        className="festive2 container-fluid mt-5 position-relative"
        style={{ overflowX: "hidden" }}
      >
        <h1>FESTIVE ENSEMBLES</h1>
        <p>EFFORTLESS STYLES TO THROW ON AND GO... </p>

        {/* Filter design  */}

        <div id="filter" className={`dropdown `}>
          <button
            className=" myBtn dropdown-toggle"
            type="button"
            aria-haspopup="true"
            aria-expanded="false"
            id="filterBtn"
            onClick={filterSlide}
          >
            <i className="fa fa-th-large mr-4" aria-hidden="true"></i>
            filter
          </button>

          <div
            className={` sidebar  mymenu dropdown-menu  ${
              filterslide ? "now" : ""
            }  `}
          >
            <div className="scrolling ">
              <i className="fa fa-close" onClick={filterSlide}></i>
              <div className="catoFlex flex-column">
                <div className="price">
                  <h2
                    className="d-flex justify-content-between"
                    onClick={show_1}
                  >
                    <span>PRICE</span>
                    <span className="ml-5">
                      <i className="fa fa-chevron-down" aria-hidden="true"></i>
                    </span>
                  </h2>
                  <div className={`flex ${show1 ? "d-none" : ""}`} id="show1">
                    <div className="pretty p-icon p-smooth">
                      <input
                        type="radio"
                        onClick={priceFilter}
                        name="price1"
                        id="price1"
                        value="ALL"
                      />
                      <div className="state p-maroon">
                        <i className="icon fa fa-check"></i>
                        <label htmlFor="price1">ALL PRICE</label>
                      </div>
                    </div>

                    <div className="pretty p-icon p-smooth">
                      <input
                        type="radio"
                        onClick={priceFilter}
                        value="5000-10000"
                        name="price1"
                        id="price1"
                      />
                      <div className="state p-maroon">
                        <i className="icon fa fa-check"></i>
                        <label htmlFor="price1">5,000 - 10,000</label>
                      </div>
                    </div>
                    <div className="pretty p-icon p-smooth">
                      <input
                        type="radio"
                        onClick={priceFilter}
                        value="10000-20000"
                        name="price1"
                        id="price2"
                      />
                      <div className="state p-maroon">
                        <i className="icon fa fa-check"></i>
                        <label htmlFor="price2">10,000 - 20,000</label>
                      </div>
                    </div>
                    <div className="pretty p-icon p-smooth">
                      <input
                        type="radio"
                        onClick={priceFilter}
                        value="30000-40000"
                        name="price1"
                        id="price3"
                      />
                      <div className="state p-maroon">
                        <i className="icon fa fa-check"></i>
                        <label htmlFor="price3">30,000 - 40,000</label>
                      </div>
                    </div>
                    <div className="pretty p-icon p-smooth">
                      <input
                        type="radio"
                        onClick={priceFilter}
                        value="40000"
                        name="price1"
                        id="price4"
                      />
                      <div className="state p-maroon">
                        <i className="icon fa fa-check"></i>
                        <label htmlFor="price4">40,000 - More</label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="color">
                  <h2 onClick={show_2} className="d-flex justify-content-between">
                    <span>COLOUR</span>
                    <span className="ml-5">
                      <i className="fa fa-chevron-down" aria-hidden="true"></i>
                    </span>
                  </h2>
                  <div id="show2" className={`flex ${show2 ? "d-none" : ""}`}>
                    <div className="pretty p-icon p-smooth">
                      <input type="radio" value="ALL" onClick={ClickColorFilter} name="colour" id="allcolor"/>
                      <div className="state p-maroon">
                        <i className="icon fa fa-check"></i>
                        <label htmlFor="allcolor">All COLOR {show2}</label>
                      </div>
                    </div>
                    {ColorArray.map(function (color, index) {
                      return (
                        <div className="pretty p-icon p-smooth">
                          <input type="radio" onClick={ClickColorFilter} value={color.iColorId}  name="colour"
                            id="yellow" />
                          <div className="state p-maroon">
                            <i className="icon fa fa-check"></i>
                            <label htmlFor="yellow">{color.vColor}</label>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ******** CATEGORIES SECTION ********** */}

        <section className=" container-fluid categories mb-5">
          <div className="dropdown" id="sort">
            <button
              className="myBtn dropdown-toggle"
              type="button"
              onClick={animEffect2}
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fa fa-exchange mr-4" aria-hidden="true"></i>
              SORT BY
            </button>
            <div
              className={`mymenu dropdown-menu ${animation2 ? "" : "d-none"}`}
            >
              <div className="catoFlex catoFlex2">
                <div className="flex flexing cflex">
                  <div className="pretty p-icon p-smooth">
                    <input
                      type="radio"
                      onClick={filterclick}
                      name="trending"
                      id="highest"
                      value="DESC"
                    />
                    <div className="state p-maroon">
                      <i className="icon fa fa-check"></i>
                      <label htmlFor="highest">LATTEST PRODUCTS</label>
                    </div>
                  </div>
                  <div className="pretty p-icon p-smooth">
                    <input
                      type="radio"
                      onClick={filterclick}
                      value="HIGHEST"
                      name="trending"
                      id="highest"
                    />
                    <div className="state p-maroon">
                      <i className="icon fa fa-check"></i>
                      <label htmlFor="highest">PRICE - HIGH TO LOW</label>
                    </div>
                  </div>
                  <div className="pretty p-icon p-smooth">
                    <input
                      type="radio"
                      onClick={filterclick}
                      value="LOWEST"
                      name="trending"
                      id="lowest"
                    />
                    <div className="state p-maroon">
                      <i className="icon fa fa-check"></i>
                      <label htmlFor="lowest">PRICE - LOW TO HIGH</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* *************** PHOTOS SECTION ***************** */}

        <div className="row justify-content-center  mt-5 " id="imgHolder">
          {displayproduct.length > 0 ? (
            displayproduct
          ) : (
            <div className="imgEffect overflow-hidden position-relative">
              <img
                src={process.env.PUBLIC_URL + "/Images/Record_not_found.svg"}
                className="img-fluid catoImg"
                alt="Image"
              />
            </div>
          )}
          {pageCount > 1 ? (
            <ReactPaginate
              previousLabel="<"                 
              nextLabel=">"
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={"paginationbtn"}
              previousLinkClassName={"prebtn"}
              nextLinkClassName={"nextbtn"}
              disabledClassName={"paginationdisabled"}
              activeClassName={"paginationActive"}
            />
          ) : (
            ""
          )}
        </div>
      </section>
      <Footer />
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default Product_listing;
