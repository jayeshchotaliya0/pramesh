import React from "react";
import "../../../css/home.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

const Login = () => {
    let history = useHistory();
    const GuestcheckoutId = localStorage.getItem("GuestcheckoutId"); 

    function guestcheckout() 
    {
        localStorage.removeItem("iUserId");
        if (GuestcheckoutId === null)
        {
            localStorage.setItem("GuestcheckoutId", "GuestcheckoutId_"+new Date().getTime());
        }   
        setTimeout(function () {
            history.push("/checkout");
            window.location.reload(1);
         }, 100);
    }
  
    return (
        <section className="registerForm loginForm">
            <img
                src={process.env.PUBLIC_URL + "/Images/login.jpg"}
                className="registerBg"
            />
            <div className="rowes">
                <div className=" left1" style={{height:'47%'}}>
                    
                        <div className="bg">
                            <img
                                src={process.env.PUBLIC_URL + "/Images/loginpic.png"}
                                alt="Background"
                            />
                        </div>
                    
                </div>

                <div className="right1">
                    <Link to="/">
                        <div className="logo ">
                            <img src={process.env.PUBLIC_URL + "/Images/logo.png"} alt="Company Logo" />
                        </div>
                    </Link>
                    <h1 className="mb-3">Hello</h1>
                    <h2 className="mb-3">Please choose how you want to proceed</h2>

                    <div className="info">
                        <div className="btn-box my-5">
                            <Link to="/login">
                                <button style={{width:'100px'}} className="btn btn-submit mb-4" type="button">
                                    LOGIN
                                </button>
                            </Link>
                            <button onClick={guestcheckout} style={{width:'100%'}} className="btn btn-submit mb-4" type="button">
                                Guest Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        
        </section>
    );
};

export default Login;
