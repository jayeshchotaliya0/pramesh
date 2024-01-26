import React, { useState, useEffect } from "react";
import "../../../css/home.css";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { gsap } from "gsap/all";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
  setAddtocartpage,
  setAddtocartsavedata,
  setAddtocartsubtotal,
  setWishlist
} from "../../../redux/actions/productActions";
import { Link } from "react-router-dom";

const Addtocart = () => {
  // *****************************Single Data get query**************************************
  const Single_product = useSelector((state) => state.MainAddtocartPage.MainAddtocartArray);

  // ****************Add to cart Cookie Proccess-***************
  var cookie = localStorage.getItem("cookie");
  var iUserId = localStorage.getItem("iUserId");

  if (cookie === null) {
    var now = new Date().getTime();
    localStorage.setItem("cookie", now);
  }

  const [num, setnum]                   = useState(0);
  const [Quntity, setQuntity]           = useState('');
  const [Totalquntity, setTotalquntity] = useState('');
  const [Pricenum, setPricenum]         = useState('');
  const [slide, setSlide]               = useState(false);
  const [Qtyerror, setQtyerror]         = useState("");
  const [Size, setSize]                 = useState("");
  const [ErrorSize, setErrorSize]       = useState("");
  const [SliderArray, setSliderArray]   = useState([]);

  


  const dispatch      = useDispatch();
  var answer          = window.location.href;
  const answer_array  = answer.split("/");
  var iProductId      = atob(answer_array[4]);
  var vPrice          = atob(answer_array[5]);

  const AddtocartProduct = async () => {
    if (answer_array[2] == "localhost:3000") {
      var product_listing = `http://localhost/pramesh/backend/api/single_product_get?iProductId=${iProductId}@@${vPrice}`;
      var cartdatasave = `http://localhost/pramesh/backend/api/addtocartdataget?cookie=${cookie}@@${iUserId}`;
    } else {
      var product_listing = `https://prameshsilks.com/backend/api/single_product_get?iProductId=${iProductId}@@${vPrice}`;
      var cartdatasave = `https://prameshsilks.com/backend/api/addtocartdataget?cookie=${cookie}@@${iUserId}`;
    }

    const productdata = await axios.get(product_listing);
    if (productdata.data.data) 
    {
      dispatch(setAddtocartpage(productdata.data.data));
      setSliderArray(productdata.data.Slider);
    }
    // *********************ADD TO CART DATA ********************
    const addtocart = await axios.get(cartdatasave);

    if (addtocart.data.data) {
      dispatch(setAddtocartsavedata(addtocart.data.data));
      dispatch(setAddtocartsubtotal(addtocart.data.subtotal));
    }
  };
  useEffect(() => {
    AddtocartProduct();
  }, []);
  useEffect(() => {
    if(Single_product[0]?.product_variants.length==0)
    {
      setTotalquntity(Single_product[0]?.vQty);
    }
  }, [SliderArray]);


  var settings = {
    dots: true,
    cssEase: "linear",
    infinite: true,
    speed: 2000,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  var Carousel = require("react-responsive-carousel").Carousel;
  
  
  const plus = () => {
    var vQty = document.getElementById("vQty").value;
   
    if (vQty != '0' && vQty!="") 
    {
      setQuntity(vQty - 1);
      if (num < 30) {
        setnum(num + 1);
      }
    }else{
      setTotalquntity(0);
    }
  };

  const minus = () => {
    if (num > 0) {
      setnum(num - 1);
    }
  };

  const sliding = () => {
    setSlide(false);
  };

  const sizechange = (e) => {
    setTotalquntity(0);
    var vSize = e.target.value;
    setErrorSize('');
    setSize(vSize);
    setnum(0);
    setQuntity(0);

    if (answer_array[2] == "localhost:3000") {
      var product_url = "http://localhost/pramesh/backend/api/product_size_wise_data_get";
    }
    else {
      var product_url = "https://prameshsilks.com/backend/api/product_size_wise_data_get";
    }

    Single_product[0]?.product_variants?.map(function(v,i){
       if(v?.vOptions==vSize)
       {
         setPricenum(v?.vPrice);
         setTotalquntity(v.vQty);
       }
     
    })
  
    const fd = new FormData();
    fd.append("vSize", vSize);
    fd.append("iProductId", iProductId);

  }

  const addtocart = () => {
    var vImage = document.getElementById("vImage").value;
    var Addqty = document.getElementById("Addqty").value;
    var vPrice = document.getElementById("vPrice").value;
    var sizedata = document.getElementById("sizedata").value;
    var vProductName = document.getElementById("vProductName").value;

    if (Addqty > 0) {
      setQtyerror("");
    } else {
      setQtyerror("Please Select Quntity");
    }

    if (Size) {
      setErrorSize('');
    }
    else {
      setErrorSize('borderadded');
    }

    const fd = new FormData();
    fd.append("iProductId", iProductId);
    fd.append("vProductName", vProductName);
    fd.append("vPrice", vPrice);
    fd.append("vImage", vImage);
    fd.append("vQty", Addqty);
    fd.append("vCookie", cookie);
    fd.append("vSize", Size);
    fd.append("iUserId", iUserId);


    if (Size || sizedata == '0') {
      if (Addqty != '0') {
        if (answer_array[2] == "localhost:3000") {
          var addtocart = "http://localhost/pramesh/backend/api/addtocart";
        } else {
          var addtocart = "https://prameshsilks.com/backend/api/addtocart";
        }
        const dataa = axios
          .post(addtocart, fd)
          .then((res) => {
            if (res.data.Status == "0") {
              setSlide(true);
              dispatch(setAddtocartsavedata(res.data.data));
              dispatch(setAddtocartsubtotal(res.data.subtotal));
            } else {
            }
          })
          .catch((error) => { });
      }
    }
  };
  // ************************************************WISH LIST ADDED DATA************************************************
  const wishlistAdded = (e) => {
    var iProductId = e.target.id;
    const fd = new FormData();
    fd.append("iProductId", iProductId);
    fd.append("iUserId", iUserId);

    if (iProductId != '0') {
      if (answer_array[2] == "localhost:3000") {
        var wishlist_url = "http://localhost/pramesh/backend/api/wishlishadded";
      } else {
        var wishlist_url = "https://prameshsilks.com/backend/api/wishlishadded";
      }
      const dataa = axios
        .post(wishlist_url, fd)
        .then((res) => {
          if (res.data.Status == "0") {
            AddtocartProduct();
            dispatch(setWishlist(res.data.data));
          }
          else {
            AddtocartProduct();
          }
        })
        .catch((error) => { });
    }
  }
  // ************************************************WISH LIST ADDED DATA END************************************************
  const Remove_addtocart = (e) => {
    var iAddtocartId = e.target.id;
    var p = "." + iAddtocartId + "";

    if (answer_array[2] == "localhost:3000") {
      var remove_product = `http://localhost/pramesh/backend/api/addtocartdelete`;
    } else {
      var remove_product = `https://prameshsilks.com/backend/api/addtocartdelete`;
    }

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
            gsap.fromTo(
              "" + p + "",
              { y: 0, opacity: 1 },
              { y: 40, opacity: 0, duration: 2 }
            );
          } else {
          }
        })
        .catch((error) => { });
    }
  };
 
  const Addtocart = useSelector(
    (state) => state.MainAddtocartsavedata.MainAddtocartsavedataArray
  );
  const SubTotal = useSelector(
    (state) => state.MainAddtocartsubtotal.MainAddtocartsubtotalArray
  );
  
  // ***************Size validation *****************************
  return (
    <>
      <Navbar />
      <section className="addtocart  container-fluid">
        <div className="row  ">
          {Single_product.map(function (product, i) {
            return (
              <>
                <div className="col-xl-5 col-lg-5 leftcart product-slider-mobile">
                  <Carousel showArrows={false}>
                    {product.image.map(function (img, index) {
                      return (
                        <div>
                          {
                            index == 0 ?
                              <input type="hidden" id="vImage" value={img.vImage} />
                              :
                              <></>
                          }
                          <img src={img.vImage} alt="saree" />
                        </div>
                      );
                    })}
                  </Carousel>
                </div>
                <div className="col-xl-5 col-lg-5 leftcart product-slider-pc">
                  {product.image.map(function (img, index) {
                    return (
                      <div>
                        <img src={img.vImage} alt="saree" />
                      </div>
                    );
                  })}
                </div>

                <div className="col-xl-7 col-lg-7 rightcart">
                  <h1>{product.vProductName}</h1>
                  <input type="hidden" id="vProductName" value={product.vProductName} />
                  <input type="hidden" id="vQty" value={Totalquntity?Totalquntity:product.vQty} />
                  <input type="hidden" id="Addqty" value={num} />
                  {/* <input type="hidden" id="vPrice" value={product.vPrice} /> */}
                  <input type="hidden" id="sizedata" value={product.iOptionId} />
                  {
                    Pricenum ? <div>
                      <p className="mb-5 pri"> र {Pricenum} </p>
                      <input type="hidden" id="vPrice" value={Pricenum} />
                    </div>
                      :
                      <div>
                        <p className="mb-5 pri"> र {product.vPrice} </p>
                        <input type="hidden" id="vPrice" value={product.vPrice} />
                      </div>
                  }
                  {
                    product.iOptionId > 0 ?
                      <div className="sizes">
                        <h3>Size</h3>
                        <div className="d-flex">
                          <div>
                            <input onChange={sizechange} type="radio" value="XS" name="size" id="sizexs" />
                            <label className={ErrorSize} htmlFor="sizexs">XS</label>
                          </div>
                          <div>
                            <input onChange={sizechange} type="radio" value="S" name="size" id="sizes" />
                            <label className={ErrorSize} htmlFor="sizes">S</label>
                          </div>
                          <div>
                            <input onChange={sizechange} type="radio" value="M" name="size" id="sizem" />
                            <label className={ErrorSize} htmlFor="sizem">M</label>
                          </div>
                          <div>
                            <input onChange={sizechange} type="radio" value="L" name="size" id="sizel" />
                            <label className={ErrorSize} htmlFor="sizel">L</label>
                          </div>
                          <div>
                            <input onChange={sizechange} type="radio" value="XL" name="size" id="sizexl" />
                            <label className={ErrorSize} htmlFor="sizexl">XL</label>
                          </div>
                        </div>
                      </div>
                      :
                      <></>
                  }
                  {
                    Totalquntity>0 ?
                        <div className="qty mt-5">
                        <span className="mr-4">Quantity : </span>
                        <button className="qty-count" onClick={minus}>
                          <i className="fa fa-minus"></i>
                        </button>
                        <span className="product-qty"> {num} </span>
                        {
                          num <= Quntity ?
                            <button className="qty-count" onClick={plus}>
                              <i className="fa fa-plus"></i>
                            </button> : <>
                            <button style={{ cursor: 'not-allowed' }} disabled className="qty-count" onClick={plus}>
                              <i className="fa fa-plus"></i>
                            </button>
                            </>
                        }
                        {
                          Totalquntity===0 ? <span className="red quantity_error">Product not available</span> : ''
                        }
                        <span className="red">{Totalquntity>0 ? Qtyerror : ''}</span>
                      </div>
                    : ''
                  }
                  
                  <div className="bag mb-5 ">
                    {
                      Totalquntity>0 ? <button className="btnbag" onClick={addtocart}><i className="fa fa-shopping-bag mr-3" aria-hidden="true"
                      ></i> ADD TO CART </button> 
                      :
                      <Link to="/contactus">
                        <button className="btnbag"> Contact to seller  <span role="img" aria-label="sheep">👋</span> </button>
                      </Link>
                     

                    }
                    
                    <span className="heart ml-4">
                      {
                        iUserId ?
                          <i
                            onClick={wishlistAdded}
                            id={`${product.iProductId}`}
                            className={`fa fa-heart ${product.vWishlist == '1' ? 'hartred' : ''
                              }`}
                            aria-hidden="true">
                          </i>
                          :
                          <Link to="/login">
                            <i className="fa fa-heart" style={{color:'#e8b5b5'}} aria-hidden="true"></i>
                          </Link>

                      }
                    </span>
                  </div>
                  <h2 className="mt-5">Estimated Shipping : 10-12 DAYS</h2>
                  <div className="desc">
                    <div className="tabs">
                      <input type="radio" name="tabs" id="tabone" checked />
                      <label for="tabone">DESCRIPTION</label>
                      <div className="tab">
                        <p>{product.iDescription}</p>
                      </div>

                      <input type="radio" name="tabs" id="tabtwo" />
                      <label for="tabtwo">MORE INFORMATION</label>
                      <div className="tab">
                        <p>{product.tMoreInformation}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>

        {/* SLICK MINI  Slider  */}

        <div className="slickslider">
          <Slider {...settings}>
            {
              SliderArray.map(function (slider, index) {
                return <div className="sliderImg">
                  {
                    slider.image.map(function (img, index) {
                      return <Link key={index} to={`/addtocart/${btoa(slider.iProductId)}/${btoa(slider.vPrice)}`}>
                        <img src={img.vImage} alt="img"  onClick={(e) => {
                            e.stopPropagation();
                        }}/>
                      </Link>
                    })
                  }
                  <h3 className="text-center">{slider.vProductName}</h3>
                  <p className="text-center">र {slider.vPrice}</p>
                </div>
              })
            }
          </Slider>
        </div>

        {/* <Link to={`/addtocart/${btoa(slider.iProductId)}/${btoa(slider.vPrice)}`}></Link> */}
        {/* Add on Cart section   */}

        <div className={`clickoncart ${slide == true ? "slide" : ""}`}>
          <button className="closed" onClick={sliding}>
            <i className="fa fa-times"></i>
          </button>

          <div className="scroll">
            {Addtocart.length > 0 ? (
              Addtocart.map(function (addtoct, index) {
                return (
                  <>
                    <div className={`mycards ${addtoct.iAddtocartId}`}>
                      <button
                        id={`${addtoct.iAddtocartId}`}
                        onClick={Remove_addtocart}
                        className="close"
                      >
                        X
                        {/* <i className="fa fa-close"></i> */}
                      </button>
                      <div className="cardimg mr-4">
                        <img className="img" src={addtoct.vImage} alt="img" />
                      </div>
                      <div className="cartinfo">
                        <h2>{addtoct.vProductName}</h2>
                        {
                          addtoct.vSize != '' ?
                            <p> SIZE : <span>{addtoct.vSize}</span></p>
                            :
                            <></>
                        }

                        <p>
                          Qty : <span>{addtoct.vQty}</span>
                        </p>
                        <h4>र {addtoct.vTotal}</h4>
                      </div>
                    </div>
                  </>
                );

                // return<><h1>Record Not Found!</h1></>
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
            <Link to="/viewcart" style={{ display: "contents" }}>
              <button className="cbtn">VIEW CART</button>
            </Link>
            <Link to="/checkout" style={{ display: "contents" }}>
              <button className="pbtn">PROCEED TO CHECKOUT</button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Addtocart;
