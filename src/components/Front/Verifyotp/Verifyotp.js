import React, { useState, useEffect } from "react";
import { gsap } from "gsap";
import axios from "axios";
import Swal from "sweetalert2";
import { useHistory } from "react-router";
import "../../../css/home.css";
import  getEnvironment  from '../../../components/environment';

const Verifyotp = () => {
  const envConfig = getEnvironment();
  const apiUrl    = envConfig.apiUrl;             

  const [Gif, setGif] = useState(false);

  useEffect(() => {
    var codes = document.querySelectorAll(".code");

    codes.forEach((curr, index) => {
      curr.addEventListener("keydown", (e) => {
        if (e.key >= 0 && e.key <= 9) {
          curr.value = "";
          setTimeout(() => {
            if(index === 4)
            { }
            else
            {
                codes[index + 1].focus();
            }
           
          }, 10);
        }
        if (e.key === "Backspace") {
          setTimeout(() => {
              if(index === 0)
              { }
              else{
                codes[index - 1].focus();
              }

          }, 10);
        }
      });
    });
  });
  let history = useHistory();

  const [show, setshow] = useState(false);
  const [UserId, setUserId] = useState("");
  const [Password, setPassword] = useState("");
  const [ErrorPassword, setErrorPassword] = useState("");
  const [ConPassword, setConPassword] = useState("");
  const [ErrorConPassword, setErrorConPassword] = useState("");
  const [ErrConfirmPassword, setErrConfirmPassword] = useState("");

  function verify() {
    var otp0 = document.getElementById('otpdata0').value;
    var otp1 = document.getElementById('otpdata1').value;
    var otp2 = document.getElementById('otpdata2').value;
    var otp3 = document.getElementById('otpdata3').value;
    var otp4 = document.getElementById('otpdata4').value;
    
    var UserOtp = otp0+""+otp1+""+otp2+""+otp3+""+otp4;
    if (UserOtp) {
      var resetpass = `${apiUrl}/otp_verify`;

      const fd = new FormData();
      fd.append("vOTP", UserOtp);
      axios.post(resetpass, fd)
        .then((res) => {
          if (res.data.Status === "0") {
            if (show === true) {
              setshow(false);
            }
            setUserId(res.data.iUserId);
            gsap.fromTo(
              ".fa-check-circle",
              { y: 100, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.5 }
            );

            if (show === false) {
              setshow(true);
              gsap.fromTo(
                ".passDiv",
                { x: "200rem" },
                { x: 0, duration: 0.2, delay: 0.5 }
              );
            }
          } else {
            Swal.fire(
                'Error',
                res.data.message,
                'error'
            )
          }
        })
        .catch((error) => {});
    }
  }

  const password_change = () => 
  {
    
    if (Password.length > 0) 
    { 
        if (Password.length >= 6)
        {
          setErrorPassword("");
        }
        else
        {
          setErrorConPassword('');
          setErrorPassword("Please Enter Maximum Six Digits");
        }
    } 
    else 
    {
      setErrorPassword("Please Enter Password");
    }

    if (ConPassword.length > 0) 
    {
        if (ConPassword.length >= 6)
        {
          setErrorConPassword("");
        }
        else
        {
          setErrorConPassword('');
          setErrorConPassword("Please Enter Maximum Six Digits");
        }
    } 
    else 
    {
      setErrorConPassword('');
      setErrorConPassword("Please Enter Confirm Password");
    }

    if (Password.length >0 && ConPassword.length>0) 
    {
      if (Password === ConPassword) 
      {
        if (Password.length >= 6 && ConPassword.length >= 6) 
        {
            setErrConfirmPassword("");
            setErrorConPassword("");
            setErrorPassword("");
        }
        else if (Password.length <= 6 && ConPassword.length <= 6)
        {
          
        }
        else
        {
            setErrorConPassword("");
            setErrorPassword("");
            setErrConfirmPassword("Password and confirm password does not match");
        }
      } 
    }

    if (UserId && Password && Password === ConPassword) 
    {
      setErrConfirmPassword('');
      var resetpass = `${apiUrl}/password_update`;
      const fd = new FormData();
      fd.append("UserId", UserId);
      fd.append("vPassword", Password);
     
      if (Password.length >= 6 && ConPassword.length >= 6)
      {
    
        setGif(true);
         axios.post(resetpass, fd)
          .then((res) => {
            if (res.data.Status === "0") {
              setGif(false);
              Swal.fire("Password Updated", res.data.message, "success");
              setTimeout(function () {
                history.push("/login");
                window.location.reload(1);
              }, 2000);
            } else {
              setGif(false);
              Swal.fire("Error", res.data.message, "error");
            }
          })
          .catch((error) => {});
      }
    }
    else
    {
      setErrConfirmPassword("Password and confirm password does not match");
    }
  };

  return (
    <>
      <div className="otpsection">
        <img
          src={process.env.PUBLIC_URL + "/Images/login.jpg"}
          alt=""
          className="registerBg"
        />
        <div className="c-email">
          <div className="c-email__header">
            <h1 className="c-email__header__title">Your Verification Code</h1>
          </div>
          <div className="c-email__content">
            <p className="c-email__content__text text-title">
              Please Enter your OTP in field:
            </p>
            <div className="c-email__code code-container">
              <input id="otpdata0" type="number" className="code" min="0" max="9" />
              <input id="otpdata1" type="number" className="code" min="0" max="9" />
              <input id="otpdata2" type="number" className="code" min="0" max="9" />
              <input id="otpdata3" type="number" className="code" min="0" max="9" />
              <input id="otpdata4" type="number" className="code" min="0" max="9" />
              {/* <input type="text"    className="c-email__code__text" /> */}
            </div>
            <p className="c-email__content__text text-title ">
              Verification code is valid only for 30 minutes
            </p>
          </div>
          <button className="c-email__footer" onClick={verify}>
            Verify OTP <i className="far fa-check-circle"></i>{" "}
          </button>
        </div>
      </div>

      {/* Confirm PAssword  */}

      <div className={`passDiv ${show ? "show" : ""}`}>
        <div className={`confirmPass `}>
          {/* <div className="black" ></div> */}
          {/* <div className="red" ></div> */}
          <img
            src={process.env.PUBLIC_URL + "/Images/registerBg.jpg"}
            alt=""
            className="registerBg"
          />
          <div className="pass">
            <h1>Create New Password</h1>
            <div className="passInput">
              <label htmlFor="pass">Enter New Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="pass"
                id="pass"
              />
              <span className="red">{ErrorPassword}</span>
            </div>
            <div className="passInput">
              <label htmlFor="confirmpass">Confirm Password</label>
              <input
                onChange={(e) => setConPassword(e.target.value)}
                type="password"
                name="confirmpass"
                id="confirmpass"
              />
              <span className="red">{ErrorConPassword}</span>
            </div>
            <span className="red">{ErrConfirmPassword}</span>

            <button onClick={password_change} className="passBtn">
              {
                Gif === true ?
                  <img className="loding_gif" src={process.env.PUBLIC_URL + "/Images/3.svg"} alt="img" />
                  :
                  <>Submit</>
              }

              
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Verifyotp;
