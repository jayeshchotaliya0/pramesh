import React, { useState, useEffect } from "react";
import "../../css/home.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from "react-router";

const Footer = () => {
    let history = useHistory();
    var answer = window.location.href;
    const answer_array = answer.split("/");
    const [vEmail, setvEmail] = useState('');
    const [Status, setStatus] = useState(false);
    const [EmailDone, setEmailDone] = useState("0");
    const [ErrorEmail, setErrorEmail] = useState('');


    function validateEmail() {
        var emailText = vEmail;
        var pattern = /^[a-zA-Z0-9\-_]+(\.[a-zA-Z0-9\-_]+)*@[a-z0-9]+(\-[a-z0-9]+)*(\.[a-z0-9]+(\-[a-z0-9]+)*)*\.[a-z]{2,4}$/;
        if (pattern.test(emailText)) {
            if (answer_array[2] == 'localhost:3000') {
                var email_verify = 'http://localhost/pramesh/backend/api/email_varify_news_letter';
            }
            else {
                var email_verify = 'https://prameshsilks.com/backend/api/email_varify_news_letter';
            }

            const fd = new FormData();
            fd.append('vEmail', emailText);

            const dataa = axios.post(email_verify, fd)
                .then(res => {
                    if (res.data.Status == '1') {
                        setEmailDone(0);
                        setStatus(true);
                        setErrorEmail('email address already exists');
                        return false;
                    }
                    else {
                        setErrorEmail('');
                        setEmailDone(1);
                        return true;
                    }
                })
                .catch(error => {
                })
        } else {
            setErrorEmail("Invalid email address:" + emailText);
            setEmailDone(0);
            return false;
        }
    }

    const newsletter = () => {
        var Emaildata = validateEmail();
        if (vEmail) {
            setStatus(false);
        }
        else {
            setStatus(true);
        }

        if (answer_array[2] == "localhost:3000") {
            var news_letter = `http://localhost/pramesh/backend/api/newsLetter`;
        }
        else {
            var news_letter = `https://prameshsilks.com/backend/api/newsLetter`;
        }

        const fd = new FormData();
        fd.append("vEmail", vEmail);

        if (vEmail && EmailDone == 1) {
            const dataa = axios
                .post(news_letter, fd)
                .then((res) => {
                    if (res.data.Status == "0") {
                        toast('Email Added Successfully!', {
                            position: "top-left",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        setTimeout(function () {
                            window.location.reload(1);
                        }, 2000);
                    }
                    else {
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


    }
    return (
        <>
            <footer className="contact">
                <div className="logo mb-5">
                    <img
                        src={process.env.PUBLIC_URL + "/Images/Animated_pramesh.svg"}
                        alt="Image"
                        className="img-fluid"
                    />
                </div>
                <div className="mb-5">
                    <h1>NEWS LETTER </h1>
                    <p>
                        Sign up and get notified about the latest launches and surprises
                    </p>
                </div>
                <div className="input   mb-5 " >
                    <input
                        onChange={(e) => setvEmail(e.target.value)}
                        type="email"
                        name="vEmail"
                        id="vEmail"
                        placeholder="EMAIL ID"
                        className={Status == true ? 'borderadded' : ''}
                    />
                    <span className="red">{ErrorEmail}</span>
                    <br></br>
                    <button className="footerBtn" onClick={newsletter} >SUBSCRIBE   <i className="fa fa-caret-right" aria-hidden="true"></i></button>
                    {/* <label htmlFor="email">
                        SUBSCRIBE <i className="fa fa-caret-right" aria-hidden="true"></i>
                    </label> */}
                </div>

                <div className="mb-5">
                    <h1>CUSTOMER CARE</h1>
                    <p>MON - SAT | 9:00 AM - 6:00 PM (IST)</p>
                    <p>+919289044698 | pramesh.orders@gmail.com</p>
                </div>

                <div className="mb-5">
                    <h1>STORE TIMINGS </h1>
                    <p> MON - SUN | 11:00 AM - 8:00 PM (IST)</p>
                    <p>Commerce House, 21, Saibaba Road, Kala Ghoda, Fort, Mumbai.</p>
                    <p>
                        Shop no. 10, Sefa House, Pali Mala Road, Opposite Bagle Shop Bandra,
                        Mumbai.
                    </p>
                    <p>
                        38 A & B, middle lane, Opposite Khan Chacha, Khan Market, New Delhi.
                    </p>
                </div>

                <div className="mb-5">
                    <h1>FOLLOW US</h1>
                    <div className="iconss">
                        <span>
                            <i className="fa fa-facebook" aria-hidden="true"></i>
                        </span>
                        <span>
                            <i className="fa fa-instagram" aria-hidden="true"></i>
                        </span>
                        <span>
                            <i className="fa fa-twitter" aria-hidden="true"></i>
                        </span>
                        <span>
                            <i className="fa fa-pinterest-p" aria-hidden="true"></i>
                        </span>
                    </div>
                </div>

                <div className="footers">
                    <ul>
                        <li>
                            <Link to="/aboutus">ABOUT US |</Link>
                        </li>
                        <li>
                            <Link to="/stories">STORIES |</Link>
                        </li>
                        <li>
                            <Link to="/contactus">CONTACT US |</Link>
                        </li>
                        <li>
                            <Link to="/returnexchange">RETURN & EXCHANGE |</Link>
                        </li>
                        {/* <li>
                            <Link to="/privacypolicy">PRIVACY |</Link>
                        </li> */}
                        <li>
                            <Link to="/termscondition"> TERMS & CONDITIONS </Link>
                        </li>
                    </ul>
                    <p>
                        Powered by Just Code Softwares. All Rights Reserved &copy; Copyright
                        2021
                    </p>
                </div>
            </footer>
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

export default Footer;

