import React, { useState, useEffect } from "react";
import Navbar from "../../Front/Navbar";
import Footer from "../../Front/Footer";
import ScrollToTop from "../../Front/ScrollToTop";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Link ,useParams} from "react-router-dom";
import ReactPaginate from "react-paginate";
import { setProductListing,setAddtocartpage,setWishlist} from "../../../redux/actions/productActions";
import { gsap } from "gsap/all";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  getEnvironment  from '../../environment';


const AllProduct = () => {
    const iUserId   = localStorage.getItem("iUserId");
    const envConfig = getEnvironment();
    const apiUrl    = envConfig.apiUrl; 
    const { id } = useParams();
    const [animation2, setanimation2]   = useState(false);
    const [filter, setfilter]           = useState(false);
    const [show1, setshow1]             = useState(false)
    const [show2, setshow2]             = useState(false)
    const [show3, setshow3]             = useState(false)
    const [ColorArray, setColorArray]   = useState([]);
    const [FabricArray, setFabricArray] = useState([]);
    const [ColorFilter, setColorFilter] = useState("");
    const [SelectedPrice, setSelectedPrice] = useState("");
    const [iFabricId, setiFabricId]         = useState("");
    const [Sort, setSort]                   = useState("");
    const [Pagenumber, setPagenumber]       = useState(0);
    const [filterslide, setfilterslide]             = useState(false);
    
    const dispatch = useDispatch();
    var answer = window.location.href;
    const answer_array = answer.split("/");

    

    if (answer_array.length == 4) 
    {
        var iCategoryId = "";
        var vProductName = '';
    } else 
    {
        var vProductNm = answer_array[4];
        var vProductName = vProductNm.split("/");

        if (vProductName[0]=='search')
        {
            var vProductName = 'Search'+'@@'+vProductName[1];
            var iCategoryId = "";
        }
        else if (vProductName[0] == 'color')
        {
            var vProductName = 'color' + '@@' + vProductName[1];
            var iCategoryId = "";
        }
        else
        {
            var iCategoryId = answer_array[4];
        }
    }

    const Filter = iFabricId + '/' + SelectedPrice + '/' + ColorFilter + '/' + Sort + '/' + iCategoryId + '/' + vProductName;
    

    


    const product_listing = `${apiUrl}/product_listing`;
    const Color = `${apiUrl}/get_category`;
    

    const mainNavbar = async () => {
        const fd = new FormData();
        fd.append("iCategoryId",id);
        const data = axios.post(product_listing, fd)
        .then((response) => {
          if (response?.data?.data) {
            dispatch(setProductListing(response?.data?.data));
          }
        }).catch((err) => {});

        // *************************COLOR DATA GET***********************
        const colordata = await axios.get(Color).catch((err) => {
            
        });
        if (colordata.data.color) {
            setColorArray(colordata.data.color);
        }
        if (colordata.data.fabric) {
            setFabricArray(colordata.data.fabric);
        }
    };
    const AddtocartProduct = async (e) => {
        var iProductId = e.target.id;
        var vPrice = e.target.getAttribute("data-id");

        if (answer_array[2] == "localhost:3000") {
            var product_listing = `http://localhost/pramesh/backend/api/single_product_get?iProductId=${iProductId}@@${vPrice}`;
        } else {
            var product_listing = `https://prameshsilks.com/backend/api/single_product_get?iProductId=${iProductId}@@${vPrice}`;
        }
        const productdata = await axios.get(product_listing);
        if (productdata.data.data) {
            dispatch(setAddtocartpage(productdata.data.data));
        }
    };
    useEffect(() => {
        mainNavbar();
    }, []);

// ************************************************WISH LIST ADDED DATA************************************************
    const wishlistAdded = (e) =>
    {
        var iProductId = e.target.id;
        const fd = new FormData();
        fd.append("iProductId", iProductId);
        fd.append("iUserId", iUserId);

        if (iProductId != '0') 
        {
            if (answer_array[2] == "localhost:3000") 
            {
                var wishlist_url = "http://localhost/pramesh/backend/api/wishlishadded";
            } else {
                var wishlist_url = "https://prameshsilks.com/backend/api/wishlishadded";
            }
            const dataa = axios
                .post(wishlist_url, fd)
                .then((res) => {
                    if (res.data.Status == "0") 
                    {
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
                    } 
                    else 
                    {
                        mainNavbar();
                    }
                })
                .catch((error) => { });
        }
        
    }
// ************************************************WISH LIST ADDED DATA END************************************************
    const Product_data = useSelector((state) => state.MainProductListing.MainProductListingArray);
    const usersPerPage = 28;
    const pagesvisited = Pagenumber * usersPerPage;

    const displayproduct = Product_data.slice(
        pagesvisited,
        pagesvisited + usersPerPage
    ).map((product) => {
        var countdata = product.image.length;
        if (countdata > 0) {
            return (
                <div className={`customCol  col-xl-3  col-lg-4 col-md-5 col-sm-10`}>
                    <div className=" imgEffect overflow-hidden position-relative">
                        <div className="heartDiv">
                            {
                                iUserId ?
                                    <i 
                                        onClick={wishlistAdded} 
                                        id={`${product.iProductId}`} 
                                        className={`fa fa-heart ${
                                            product.vWishlist=='1' ? 'hartred' : ''
                                        }`} 
                                        aria-hidden="true">
                                    </i>
                                :
                                <Link to="/login">
                                        <i className="fa fa-heart" aria-hidden="true"></i>
                                </Link>

                            }
                           
                        </div>
                        {product.image.map(function (Pimg, index) {
                            // var $productid = encode_id(Pimg.iProductId);

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
                                            id={`${Pimg.iProductId}`}
                                            data-id={`${product.vPrice}`}
                                            onClick={AddtocartProduct}
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
                    <p> र {product.vPrice}</p>
                </div>
            );
        }
    });

    const pageCount = Math.ceil(Product_data.length / usersPerPage);

    const changePage = ({ selected }) => {
        setPagenumber(selected);
    };

    const filterclick = async (e) => {
        var SortByFilter = e.target.value;
        setSort(SortByFilter);
        var Price = SelectedPrice;
        var Filter = iFabricId + '/' + Price + '/' + ColorFilter + '/' + SortByFilter;

        if (answer_array[2] == "localhost:3000") {
            var product_listing = `http://localhost/pramesh/backend/api/product_listing?Filter=${Filter}`;
        } else {
            var product_listing = `https://prameshsilks.com/backend/api/product_listing?Filter=${Filter}`;
        }

        const productdata = await axios.get(product_listing);
        
        if (productdata.data.data) {
            dispatch(setProductListing(productdata.data.data));
        }
    };
    // *********************************FILTER*************************************
    const category_filter = async (e) => {
        var Price = e.target.value;
        setSelectedPrice(Price);

        var Filter = iFabricId + '/' + Price + '/' + ColorFilter + '/' + Sort;

        if (answer_array[2] == "localhost:3000") {
            var product_listing = `http://localhost/pramesh/backend/api/product_listing?Filter=${Filter}`;
        } else {
            var product_listing = `https://prameshsilks.com/backend/api/product_listing?Filter=${Filter}`;
        }

        const productdata = await axios.get(product_listing);

        if (productdata.data.data) {
            dispatch(setProductListing(productdata.data.data));
        }
    };
    // *****************************************************SUBCATEGORY FILTER********************************************
    const fabric_filter = async (e) => {
        var iFabricIddata = e.target.value;
        setiFabricId(iFabricIddata);
        var Price = SelectedPrice;
        var Filter = iFabricIddata + '/' + Price + '/' + ColorFilter + '/' + Sort;
        if (answer_array[2] == "localhost:3000") {
            var product_listing = `http://localhost/pramesh/backend/api/product_listing?Filter=${Filter}`;
        } else {
            var product_listing = `https://prameshsilks.com/backend/api/product_listing?Filter=${Filter}`;
        }
        const productdata = await axios.get(product_listing);
        if (productdata.data.data) {
            dispatch(setProductListing(productdata.data.data));
        }
    };

    const ClickColorFilter = async (e) => {
        var iColorId = e.target.value;
        setColorFilter(iColorId);
        var Price = SelectedPrice;
        var Filter = iFabricId + '/' + Price + '/' + iColorId + '/' + Sort;

        if (answer_array[2] == "localhost:3000") {
            var color_url = `http://localhost/pramesh/backend/api/product_listing?Filter=${Filter}`;
        } else {
            var color_url = `https://prameshsilks.com/backend/api/product_listing?Filter=${Filter}`;
        }
        const productdata = await axios.get(color_url);

        if (productdata.data.data) {
            dispatch(setProductListing(productdata.data.data));
        }
    };

    const maindata = useSelector((state) => state.Mainproductlisting.MainproductArray);

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
            setfilterslide(true)
        } else {
            setfilterslide(false)
        }

    }

    return (
        <>
            <Navbar />
            <ScrollToTop />

            <section className="festive2 container-fluid mt-5 position-relative" style={{ overflowX: "hidden" }}>
                <h1>FESTIVE ENSEMBLES</h1>
                <p>EFFORTLESS STYLES TO THROW ON AND GO... </p>

                {/* Filter design  */}

                <div
                    id="filter"
                    className={`dropdown `}
                >
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

                    <div className={` sidebar  mymenu dropdown-menu  ${filterslide ? "now" : ""}  `}>

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
                                                onClick={category_filter}
                                                name="price1"
                                                id="price1"
                                            />
                                            <div className="state p-maroon">
                                                <i className="icon fa fa-check"></i>
                                                <label htmlFor="price1">ALL PRICE</label>
                                            </div>
                                        </div>

                                        <div className="pretty p-icon p-smooth">
                                            <input
                                                type="radio"
                                                onClick={category_filter}
                                                value="5000-10000"
                                                name="price1"
                                                id="price1"
                                            />
                                            <div className="state p-maroon">
                                                <i className="icon fa fa-check"></i>
                                                <label htmlFor="price1">5000 - 10000</label>
                                            </div>
                                        </div>
                                        <div className="pretty p-icon p-smooth">
                                            <input
                                                type="radio"
                                                onClick={category_filter}
                                                value="10000-20000"
                                                name="price1"
                                                id="price2"
                                            />
                                            <div className="state p-maroon">
                                                <i className="icon fa fa-check"></i>
                                                <label htmlFor="price2">10000 - 20000</label>
                                            </div>
                                        </div>
                                        <div className="pretty p-icon p-smooth">
                                            <input
                                                type="radio"
                                                onClick={category_filter}
                                                value="30000-40000"
                                                name="price1"
                                                id="price3"
                                            />
                                            <div className="state p-maroon">
                                                <i className="icon fa fa-check"></i>
                                                <label htmlFor="price3">30000 - 40000</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="color">
                                    <h2 onClick={show_2} className="d-flex justify-content-between"> <span>COLOUR</span>  <span className="ml-5"><i className="fa fa-chevron-down" aria-hidden="true"></i></span></h2>
                                    <div id="show2" className={`flex ${show2 ? "d-none" : ""}`}>
                                        <div className="pretty p-icon p-smooth">
                                            <input type="radio" onClick={ClickColorFilter} name="colour" id="allcolor" />
                                            <div className="state p-maroon">
                                                <i className="icon fa fa-check"></i>
                                                <label htmlFor="allcolor">All COLOR {show2}</label>
                                            </div>
                                        </div>
                                        {
                                            ColorArray.map(function (color, index) {
                                                return <div className="pretty p-icon p-smooth">
                                                    <input type="radio" onClick={ClickColorFilter} value={color.iColorId} name="colour" id="yellow" />
                                                    <div className="state p-maroon">
                                                        <i className="icon fa fa-check"></i>
                                                        <label htmlFor="yellow">{color.vColor}</label>
                                                    </div>
                                                </div>
                                            })
                                        }
                                    </div>
                                </div>

                                <div className="fabric" style={{display:'none'}}>
                                    <h2 onClick={show_3} className="d-flex justify-content-between"> <span>FABRIC</span>  <span className="ml-5"><i className="fa fa-chevron-down" aria-hidden="true"></i></span></h2>
                                    <div id='show3' className={`flex ${show3 ? "d-none" : ""}`}>
                                        <div className="pretty p-icon p-smooth">
                                            <input type="radio" onClick={fabric_filter} name="silk" id="silk" />
                                            <div className="state p-maroon">
                                                <i className="icon fa fa-check"></i>
                                                <label htmlFor="silk">All FABRIC</label>
                                            </div>
                                        </div>
                                        {FabricArray.map(function (Fabric, index) {
                                            return (
                                                <div className="pretty p-icon p-smooth">
                                                    <input
                                                        type="radio"
                                                        onClick={fabric_filter}
                                                        value={Fabric.iFabricId}
                                                        name="silk"
                                                        id="silk"
                                                    />
                                                    <div className="state p-maroon">
                                                        <i className="icon fa fa-check"></i>
                                                        <label htmlFor="silk">{Fabric.vTitle}</label>
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

                {/* ********CATEGORIES SECTION ********** */}

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
                                            value='DESC'
                                        />
                                        <div className="state p-maroon">
                                            <i className="icon fa fa-check"></i>
                                            <label htmlFor="highest">LATEST PRODUCTS</label>
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

                <div
                    className="row justify-content-center  mt-5 "
                    id="imgHolder"
                >
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

export default AllProduct;
