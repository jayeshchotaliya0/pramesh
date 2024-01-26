import React, { useEffect, useState } from "react";
import "../../../css/home.css";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  setAddtocartsavedata,
  setAddtocartsubtotal,
} from "../../../redux/actions/productActions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  getEnvironment  from '../../../components/environment';


const Viewcart = () => {
    var iUserId = localStorage.getItem("iUserId");
    var cookie  = localStorage.getItem("cookie");
    const envConfig = getEnvironment();
    const apiUrl    = envConfig.apiUrl;

    const [cart, setCart] = useState([]);
    const dispatch        = useDispatch();
    var answer            = window.location.href;
    const AddtocartProduct = async () => {
  
    var cartdatasave = `${apiUrl}/addtocartdataget?cookie=${cookie}@@${iUserId}`;
    
    // *********************ADD TO CART DATA ********************
    const addtocart = await axios.get(cartdatasave);

    if (addtocart.data.data) {
      setCart(addtocart.data.data);
      dispatch(setAddtocartsavedata(addtocart.data.data));
      dispatch(setAddtocartsubtotal(addtocart.data.subtotal));
    }
  };
  useEffect(() => {
    AddtocartProduct();
  }, []);

  const Remove_addtocart = (e) => {
    var iAddtocartId    = e.target.id;
    var remove_product  = `${apiUrl}/addtocartdelete`;
  
    const fd = new FormData();
    fd.append("iAddtocartId", iAddtocartId);
    fd.append("vCookie", cookie);
    fd.append("iUserId", iUserId);
    if (iAddtocartId != "undefined") {
      const dataa = axios
        .post(remove_product, fd)
        .then((res) => {
          if (res.data.Status == "0") {
            setCart(res.data.data);
            dispatch(setAddtocartsavedata(res.data.data));
            dispatch(setAddtocartsubtotal(res.data.subtotal));

            toast('Record Deleted Successfully!', {
              position: "top-left",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });

          } else {
          }
        })
        .catch((error) => { });
    }
  };

 
  const increment = (cart_id) => 
  {
      setCart(
        cart => cart.map((item) =>
          cart_id === item.iAddtocartId ? { ...item, vQty: parseInt(item.vQty) + parseInt((item.vQty < 10 ? 1 : 0)) } : item
        )
      );
    CartproductUpdate(cart_id, 'inc');
  };
  const decrement = (cart_id) =>
  {
    setCart(
      cart => cart.map((item) =>
        cart_id === item.iAddtocartId ? { ...item, vQty: parseInt(item.vQty) - parseInt((item.vQty > 1 ? 1 : 0))} : item
      )
    );
    CartproductUpdate(cart_id, 'des'); 
  }

  const CartproductUpdate = (cart_id,action) => {
    var iAddtocartId      = cart_id;
    var action            = action;
    const remove_product  = `${apiUrl}/viewcartUpdateData`;
   
    const fd = new FormData();
    fd.append("iAddtocartId", iAddtocartId);
    fd.append("action", action);
    fd.append("vCookie", cookie);
    fd.append("iUserId", iUserId);
    if (iAddtocartId != "undefined") 
    {
      const dataa = axios
        .post(remove_product, fd)
        .then((res) => {
          if (res.data.Status == "0") 
          {
              dispatch(setAddtocartsavedata(res.data.data));
              dispatch(setAddtocartsubtotal(res.data.subtotal));

            toast.success('Quantity Update Successfully!', {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              });

          } 
          else 
          {
            toast.error(res.data.message, {
              position: "top-left",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        })
        .catch((error) => { });
    }
  };

  // const Addtocart = useSelector(
  //   (state) => state.MainAddtocartsavedata.MainAddtocartsavedataArray
  // );

  const SubTotal = useSelector(
    (state) => state.MainAddtocartsubtotal.MainAddtocartsubtotalArray
  );

  return (
    <>
      <Navbar />
      {
        cart.length > 0 ?
          <section className="viewcart">
            <div>
              <div className="row bord">
                <div className="col-xl-5 col-lg-5 col-md-4 col-sm-3">
                  <h1>ITEM</h1>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3">
                  <h1>QTY</h1>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3">
                  <h1>PRICE</h1>
                </div>
              </div>
              {
                cart.map(function (add, index) {
                  return (
                    <div className="row mt-2 bordb">
                      <span className="close">
                        <button
                          id={`${add.iAddtocartId}`}
                          onClick={Remove_addtocart}
                          className="close"
                        >
                          X
                        </button>
                        {/* <i className="fa fa-close"></i> */}
                      </span>

                      <div
                        className="col-xl-5 col-lg-5  col-md-3 col-sm-3
              col-md-4 col-sm-4 d-flex"
                      >
                        <img src={add.vImage} alt="Image" className="mr-3" />
                        <div>
                          <h2>{add.vProductName}</h2>
                          {add.vSize.length > 0 ? <h2>SIZE : {add.vSize}</h2> : ""}
                        </div>
                      </div>
                      <div
                        className="col-xl-3 col-lg-3 col-md-3 col-sm-3
              col-md-3 col-sm-3 d-flex align-items-center"
                      >
                        <div className="qty mt-5">
                          {/* <input value={} style={{'border': '1px solid black'}} type="number" onChange={(e) => setvQty(add.vQty)} /> */}
                          <button className="qty-count" onClick={(e) => decrement(add.iAddtocartId)}> - </button>
                          <span className="product-qty"> {add.vQty} </span>

                          <input type="hidden" id="Addqty" value="0" />

                          <button className="qty-count" onClick={(e) => increment(add.iAddtocartId)}> + </button>
                        </div>
                      </div>
                      <div
                        className="col-xl-3 col-lg-3 col-md-3 col-sm-3
              col-md-3 col-sm-3 d-flex align-items-center"
                      >
                        <h2>₹ {add.vPrice * add.vQty}</h2>
                      </div>
                      {/* <div className="col-xl-1">
                    <button id={`${add.iAddtocartId}`} onClick={Remove_addtocart} className="close">X</button>
                  </div> */}
                    </div>
                  );
                })
              }

              <div className="cartTotal mt-5">
                <div className="d-flex justify-content-between">
                  <h5>CART SUBTOTAL</h5>
                  <h5>र {SubTotal}</h5>
                </div>
                <div className="d-flex justify-content-between">
                  <h5>SHIPPING</h5>
                  <h5>र 0</h5>
                </div>
                <div className="d-flex justify-content-between">
                  <h5>ORDER TOTAL </h5>
                  <h5>र {SubTotal}</h5>
                </div>
              </div>

            </div>
            <Link style={{ display: 'contents' }} to='/checkout'>
              <button className="checkBtn">PROCEED TO CHECKOUT</button>
            </Link>
          </section>
        :
          <div className=" overflow-hidden position-relative d-flex">
            <img
              src={process.env.PUBLIC_URL + "/Images/Record_not_found.svg"}
              className="img-fluid catoImgs recordNotFound"
              alt="Image"
            />
          </div>
      }
     

      <Footer />
      <ToastContainer
        position="top-left"
        autoClose={5000}
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

export default Viewcart;
