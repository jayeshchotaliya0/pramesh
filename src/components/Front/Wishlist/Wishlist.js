import React, { useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";

const Wishlist = () => {
    const [setting, setsetting] = useState(true);
    const [order, setorder] = useState(false);
    const [wishlist, setwishlist] = useState(false);
    const [address, setaddress] = useState(false);

    function myFunction(e) {
        if (document.querySelector(".wishNav li.active") !== null) {
            document.querySelector(".wishNav li.active").classList.remove("active");
        }
        e.target.classList.add("active");
    }

    const link_1 = () => {
        setsetting(true);
        setorder(false);
        setwishlist(false);
        setaddress(false);
    };
    const link_2 = () => {
        setsetting(false);
        setorder(true);
        setwishlist(false);
        setaddress(false);
    };
    const link_3 = () => {
        setsetting(false);
        setorder(false);
        setwishlist(true);
        setaddress(false);
    };
    const link_4 = () => {
        setsetting(false);
        setorder(false);
        setwishlist(false);
        setaddress(true);
    };

    return (
        <>
            <Navbar />

            <div className="wishNav" onClick={myFunction}>
                <li className="link active" onClick={link_1}>
                    SETTINGS <i className="fas fa-user-cog"></i>
                </li>
                <li className="link" onClick={link_2}>
                    MY ORDERS <i className="fas fa-cart-arrow-down"></i>
                </li>
                <li className="link" onClick={link_3}>
                    WISHLIST <i className="fas fa-heart"></i>
                </li>
                <li className="link" onClick={link_4}>
                    ADDRESS <i className="fas fa-location-arrow"></i>
                </li>
            </div>

            <div className={`settings ${setting ? "" : "d-none"} `}>
                <div>
                    <h1>PROFILE</h1>
                    <h4>firstname lastname</h4>
                    <h5>firstname@gmail.com</h5>

                    <h1>Customer Care</h1>
                    <p>MON - SAT | 9:00 AM - 6:00 PM (IST)</p>
                    <p>+91 9802200111 | +91 9821212121</p>
                    <p>care@pramesh.com</p>
                </div>
            </div>

            <div className={`order ${order ? "" : "d-none"} `}>
                
                <h1>ORDERS HERE</h1>
            </div>

            {/* wishlist row justify-content-center */}

            <div className={` mt-5 ${wishlist ? "" : "d-none"} `}>

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
                        <div className="row mt-2 bordb">
                            <span className="close">
                                <button className="close"> <i className="fas fa-trash-alt"></i> </button>
                            </span>

                            <div
                                className="col-xl-5 col-lg-5  
              col-md-4 col-sm-4 d-flex align-items-center"
                            >
                                <img
                                    src={process.env.PUBLIC_URL + "/Images/festive1.png"}
                                    alt="Image"
                                    className="mr-3"
                                />
                                <div>
                                    <h2>Denim Trench Jacket</h2>
                                </div>
                            </div>
                            <div
                                className="col-xl-3 col-lg-3 col-md-3 col-sm-3
               d-flex align-items-center"
                            >
                                <h2>12</h2>
                            </div>

                            <div
                                className="col-xl-3 col-lg-3 col-md-3 col-sm-3
               d-flex align-items-center"
                            >
                                <h2>₹11,800</h2>
                            </div>
                        </div>





                    </div>


                </section>
            </div>

            <div className={`address my-4 ${address ? "" : "d-none"} `}>
                <div className=" row justify-content-center">
                    <div className="col-4 mr-2">
                        
                        <input type="text" placeholder="First Name" />
                    </div>
                    <div className="col-4 mr-2">
                        
                        <input type="text" placeholder="Last Name" />
                    </div>
                    <div className="col-4 mr-2">
                        
                        <input type="text" placeholder="Phone Number" />
                    </div>
                    <div className="col-4 mr-2">
                        
                        <input type="text" placeholder="Zip/Postal Code" />
                    </div>
                    <div className="col-4 mr-2">
                        
                        <input type="text" placeholder="State" />
                    </div>
                    <div className="col-4 mr-2">
                        
                        <input type="text" placeholder="Street Address" />
                    </div>
                    <div className="col-4 mr-2">
                        
                        <input type="text" placeholder="City" />
                    </div>
                    <div className="col-4 mr-2">
                        
                        <input type="text" placeholder="Country" />
                    </div>
                    <div className="col-8 mr-2">
                        <button className="adrsBtn">SAVE ADDRESS</button>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Wishlist;
