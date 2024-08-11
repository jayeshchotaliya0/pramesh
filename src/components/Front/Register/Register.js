import React, { useState } from "react";
import "../../../css/home.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useHistory } from "react-router";
import  getEnvironment  from '../../environment';
import axios from "axios";

const Register = () => {
  let history = useHistory();
  const {apiUrl} = getEnvironment(); 
  const [FirstName, setFirstName] = useState("");
  const [ErrorFirstName, setErrorFirstName] = useState("");

  const [LastName, setLastName] = useState("");
  const [ErrorLastName, setErrorLastName] = useState("");

  const [Email, setEmail] = useState("");
  const [ErrorEmail, setErrorEmail] = useState("");
  const [EmailDone, setEmailDone] = useState(false);

  const [Password, setPassword] = useState("");
  const [ErrorPassword, setErrorPassword] = useState("");

  const [ConPassword, setConPassword] = useState("");
  const [ErrorConPassword, setErrorConPassword] = useState("");

  const [PasswordMetch, setPasswordMetch] = useState("");
  

  async function validateEmail() {
    const emailText = Email;
    const pattern = /^[a-zA-Z0-9\-_]+(\.[a-zA-Z0-9\-_]+)*@[a-z0-9]+(-[a-z0-9]+)*(\.[a-z0-9]+(-[a-z0-9]+)*)*\.[a-z]{2,4}$/;
  
    if (!pattern.test(emailText)) {
      setErrorEmail("Invalid email address: " + emailText);
      setEmailDone(true);
      return false;
    }
    try {
      const fd = new FormData();
      fd.append("vEmail", emailText);
  
      const res = await axios.post(`${apiUrl}/email_varify`, fd);
  
      if (res.data.Status === "1") {
        setEmailDone(false);
        setErrorEmail("Email address already exists");
        return false;
      } else {
        setEmailDone(true);
        setErrorEmail("");
        return true;
      }
    } catch (error) {
      console.error("Error verifying email:", error);
      return false;
    }
  }
  
  

  const something = (event) => {
    if (event.keyCode === 13) {
      register_data_save();
    }
  };
  
  function register_data_save() {
    validateEmail();
  
    setErrorFirstName(FirstName ? "" : "Please Enter Firstname");
    setErrorLastName(LastName ? "" : "Please Enter Lastname");
  
    setErrorPassword(Password.length === 0 ? "Please Enter Password" : (Password.length >= 6 ? "" : "Please Enter Maximum Six Digits"));
    setErrorConPassword(ConPassword.length === 0 ? "Please Enter Confirm Password" : (ConPassword.length >= 6 ? "" : "Please Enter Maximum Six Digits"));
  
    setPasswordMetch(Password !== ConPassword ? "Password does not meet the requirement" : "");
  
    if (Password !== ConPassword || Password.length < 6 || ConPassword.length < 6) {
      setErrorPassword("");
      setErrorConPassword("");
      setPasswordMetch("Password does not meet the requirement");
    }
  
    if (FirstName && LastName && EmailDone && Password === ConPassword && Password.length >= 6) {
      const fd = new FormData();
      fd.append("vFirstName", FirstName);
      fd.append("vLastName", LastName);
      fd.append("vEmail", Email);
      fd.append("vPassword", Password);
  
      axios.post(`${apiUrl}/api/register`, fd)
        .then((res) => {
          if (res.data.Status === "0") {
            Swal.fire("Good job!", "Registration Successfully", "success");
            setTimeout(() => {
              history.push("/login");
              window.location.reload(1);
            }, 3000);
          } else {
            Swal.fire("Error", "Network Connection Error !", "error");
          }
        })
        .catch((error) => {});
    }
  }
  

  return (
    <section className="registerForm">
      <img
        src={process.env.PUBLIC_URL + "/Images/registerBg.jpg"}
        className="registerBg"
      />
      <div className="rowes">
        <div className=" left1">
          <div className="bg">
            <img
              src={process.env.PUBLIC_URL + "/Images/registerpic.png"}
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
            <form id="register" autocomplete="off">
              <div className="group">
                <input
                  type="text"
                  onChange={(e) => setFirstName(e.target.value)}
                  name="fname"
                  id="fname"
                />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>FIRST NAME</label>
                <span className="red">{ErrorFirstName}</span>
              </div>

              <div className="group">
                <input
                  type="text"
                  onChange={(e) => setLastName(e.target.value)}
                  name="lname"
                  id="lname"
                />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>LAST NAME</label>
                <span className="red">{ErrorLastName}</span>
              </div>

              <div className="group">
                <input
                  type="text"
                  autocomplete="off"
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  id="email"
                />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>Email</label>
                <span className="red">{ErrorEmail}</span>
              </div>

              <div className="group">
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  name="pass"
                  id="pass"
                />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>Password</label>
                <span className="red">{ErrorPassword}</span>
              </div>

              <div className="group">
                <input
                  onKeyDown={(e) => something(e)}
                  type="password"
                  onChange={(e) => setConPassword(e.target.value)}
                  name="setpass"
                  id="setpass"
                />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>SET PASSWORD</label>
                <span className="red">{ErrorConPassword}</span>
                <span className="red">{PasswordMetch}</span>
              </div>

              <div className="group">
                <Link to="/login">
                  <h2> ALREADY A MEMBER ? SIGN IN </h2>
                </Link>
              </div>

              <div className="btn-box">
                <button
                  onClick={register_data_save}
                  className="btn btn-submit"
                  type="button"
                >
                  SIGN UP
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
