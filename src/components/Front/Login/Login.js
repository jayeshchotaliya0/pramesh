import React, { useState, useEffect } from "react";
import "../../../css/home.css";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import { useHistory } from "react-router";
import axios from "axios";
import { gsap } from "gsap";
import LoginGoogle from "../Login/Googlelogin";
import  getEnvironment  from '../../../components/environment';


const Login = () => {
    const envConfig = getEnvironment();
    const apiUrl    = envConfig.apiUrl;          

    let history = useHistory();
    var answer = window.location.href;
    const answer_array = answer.split('/');
    var iUserId = localStorage.getItem("iUserId");
    const [Email, setEmail]                 = useState("");
    const [ErrorEmail, setErrorEmail]       = useState("");
    const [Password, setPassword]           = useState("");
    const [ErrorPassword, setErrorPassword] = useState("");
    const [ResetEmail, setResetEmail]       = useState("");
    const [Status, setStatus]               = useState("");
    const [Gif, setGif]                     = useState(false);

    function validateEmail() {
        var emailText = document.getElementById('email').value;
        var pattern = /^[a-zA-Z0-9\-_]+(\.[a-zA-Z0-9\-_]+)*@[a-z0-9]+(\-[a-z0-9]+)*(\.[a-z0-9]+(\-[a-z0-9]+)*)*\.[a-z]{2,4}$/;
        if (pattern.test(emailText)) {
            setErrorEmail('');
            return true;
        } else {
            setErrorEmail("Invalid email address : " + emailText);
            return false;
        }
    }
    // ************************Reset Password Email Check********************************
    function validateResetEmail() {
        var emailText = document.getElementById('resetemail').value;
        var pattern = /^[a-zA-Z0-9\-_]+(\.[a-zA-Z0-9\-_]+)*@[a-z0-9]+(\-[a-z0-9]+)*(\.[a-z0-9]+(\-[a-z0-9]+)*)*\.[a-z]{2,4}$/;
        if (pattern.test(emailText)) {
            setErrorEmail('');
            return true;
        } else {
            setErrorEmail("Invalid email address : " + emailText);
            return false;
        }
    }

    const something = (event) => {
        if (event.keyCode === 13) {
            login();
        }
    };

    function login()
    {  
        localStorage.removeItem("GuestcheckoutId");
        var Emaildata = validateEmail();
        if (Password) {
            if (Password.length >= 6) {
                setErrorPassword('');
            }
            else {
                setErrorPassword('Please Enter Maximum Six Digits');
            }
        }
        else {
            setErrorPassword('Please Enter Password');
        }
        if (Emaildata == true && Password)
        {
            var register = `${apiUrl}/login_user`;
            var cookie = localStorage.getItem("cookie");
            const fd = new FormData();
            fd.append('vEmail', Email);
            fd.append('vPassword', Password);
            fd.append('vCookie', cookie);

            const dataa = axios.post(register, fd)
                .then(res => {
                
                    if (res.data.Status == '0') {
                        localStorage.setItem("iUserId", res.data.data.iUserId);
                        localStorage.setItem("vFirstName", res.data.data.vFirstName);
                        localStorage.setItem("vLastName", res.data.data.vLastName);
                        localStorage.setItem("Name", res.data.sortname);
                        localStorage.removeItem("cookie");
                        setTimeout(function () {
                            history.push("/");
                            window.location.reload(1);
                        }, 0);
                    }
                    else {
                        Swal.fire(
                            'Error',
                            res.data.message,
                            'error'
                        )
                    }
                })
                .catch(error => {
                })
        }
    }

    const [show, setshow] = useState(false)

    const forgot = () => {
        if (show == false) {
            setshow(true);
            gsap.fromTo(
                ".resetpass",
                { opacity: 0 },
                { opacity: 1, duration: 2 }
            );
        }
        if (show == true) {
            setshow(false);
            gsap.fromTo(
                ".registerForm",
                { opacity: 0 },
                { opacity: 1, duration: 2 }
            );
        }
    };

    const ResetPassword = () =>
    {
        var Emaildata = validateResetEmail();
        if (Emaildata == true && ResetEmail) {
            setGif(true);
            if (answer_array[2] == 'localhost:3000') {
                var resetpass = 'http://localhost/pramesh/backend/api/reset_password_email_check';
            }
            else {
                var resetpass = 'https://prameshsilks.com/backend/api/reset_password_email_check';
            }
            const fd = new FormData();
            fd.append('vEmail', ResetEmail);
            const dataa = axios.post(resetpass, fd)
                .then(res => {
                    if (res.data.Status == '0') {
                        setGif(false);
                        history.push("/verifyotp");
                    }
                    else {
                        Swal.fire(
                            'Error',
                            res.data.message,
                            'error'
                        )
                    }
                })
                .catch(error => {
                })
        }
    }

    return (
        <section className="registerForm loginForm">
            <img
                src={process.env.PUBLIC_URL + "/Images/login.jpg"}
                className="registerBg"
            />
            <div className="rowes">
                <div className=" left1">
                    <div className="bg">
                        <img
                            src={process.env.PUBLIC_URL + "/Images/loginpic.png"}
                            alt="Bg"
                        />
                    </div>
                </div>

                <div className="right1">
                    <Link to="/">
                        <div className="logo ">
                            <img src={process.env.PUBLIC_URL + "/Images/logo.png"} />
                        </div>
                    </Link>
                    <h1 className="mb-3">CREATE AN ACCOUNT</h1>

                    <div className="info">
                            <div className="group">
                                <input type="text" onChange={(e) => setEmail(e.target.value)}  name="email" id="email" />
                                <span className="highlight"></span>
                                <span className="bar"></span>
                                <label>Email</label>
                                <span className="red">{ErrorEmail}</span>
                            </div>

                            <div className="group">
                                <input type="password" onKeyDown={(e) => something(e)}  onChange={(e) => setPassword(e.target.value)}  name="pass" id="pass" />
                                <span className="highlight"></span>
                                <span className="bar"></span>
                                <label>Password</label>
                                <span className="red">{ErrorPassword}</span>
                            </div>

                            <div className="remember">
                                <div className=" pretty p-icon p-smooth">
                                    <input type="checkbox" value="1" name="price1" id="price1" />
                                    <div className="state p-maroon">
                                        <i className="icon fa fa-check"></i>
                                        <label for="price1">REMEMBER ME</label>
                                    </div>
                                </div>
                                <div className="forgot">
                                    <a onClick={forgot}>FORGET PASSWORD ?</a>
                                </div>
                            </div>

                            <div className="btn-box my-5">
                                <button onClick={login} className="btn btn-submit mb-4" type="button">
                                    LOGIN
                                </button>
                                {
                                   iUserId ?
                                    <></>
                                    :
                                    <LoginGoogle />
                                }
                            </div>

                            <div className="group">
                                <h3> Don't have an account ?  <Link to="/register"> Create free account </Link> </h3>
                            </div>
                        
                    </div>
                </div>
            </div>
            {/* ******* FORGOT PASSWORD ********** */}

            <div className={`resetpass ${show ? "show" : ""}`}>
                <div className="resetdiv">
                    <div className="border">
                        <i className="fa fa-close" onClick={forgot}></i>
                        <img
                            src={process.env.PUBLIC_URL + "/Images/registerBg.jpg"}
                            className="registerBg"
                        />
                        <h1>FORGOT YOUR PASSWORD</h1>
                        <h3>
                            Please enter your email address below. You will receive a link to <br />
                            reset your password.
                        </h3>
                        <input
                            type="text"
                            name="reset"
                            id="resetemail"
                            onChange={(e) => setResetEmail(e.target.value)}
                            placeholder="Email Address"
                        />
                        <span className="red">{ErrorEmail}</span>
                        <button onClick={ResetPassword}  className="resetbtn">
                            {
                                Gif == true ?
                                    <img className="loding_gif" src={process.env.PUBLIC_URL + "/Images/3.svg"} alt="img" />
                                    :
                                    <>RESET PASSWORD</>
                            }
                            </button>
                        <Link to="/verifyotp">CLICK</Link>
                        <div>


                            <h4 onClick={forgot}>Login</h4>

                            <h4>|</h4>
                            <Link to="/register">
                                <h4>create An Account</h4>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
