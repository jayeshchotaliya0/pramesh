import React, { useState } from "react";
import "../../../css/home.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useHistory } from "react-router";
import axios from "axios";
const Register = () => {
  let history = useHistory();
  var answer = window.location.href;
  const answer_array = answer.split("/");
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
  

  function validateEmail() {
    var emailText = Email;
    var pattern =
      /^[a-zA-Z0-9\-_]+(\.[a-zA-Z0-9\-_]+)*@[a-z0-9]+(\-[a-z0-9]+)*(\.[a-z0-9]+(\-[a-z0-9]+)*)*\.[a-z]{2,4}$/;
    if (pattern.test(emailText)) {
      if (answer_array[2] == "localhost:3000") {
        var email_verify = "http://localhost/pramesh/backend/api/email_varify";
      } else {
        var email_verify =
          "https://prameshsilks.com/backend/api/email_varify";
      }

      const fd = new FormData();
      fd.append("vEmail", emailText);

      const dataa = axios.post(email_verify, fd).then((res) => {
        if (res.data.Status == 1) {
          setEmailDone(false);
          console.log("firse aagye");
          setErrorEmail("email address already exists");
          return false;
        } else {
          setEmailDone(true);
          console.log("teste");
          setErrorEmail("");
          return true;
        }
      });
    } else {
      setErrorEmail("Invalid email address:" + emailText);
      setEmailDone(true);
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

    if (FirstName) {
      setErrorFirstName("");
    } else {
      setErrorFirstName("Please Enter Firstname");
    }

    if (LastName) {
      setErrorLastName("");
    } else {
      setErrorLastName("Please Enter Firstname");
    }
    if (Password.length > 0) {
      if (Password.length >= 6) {
        setErrorPassword("");
      } else {
        setErrorPassword("Please Enter Maximum Six Digits");
      }
    } else {
      setErrorPassword("Please Enter Password");
    }

    if (ConPassword.length > 0) {
      if (ConPassword.length >= 6) {
        setErrorConPassword("");
      } else {
        setPasswordMetch("");
        setErrorConPassword("Please Enter Maximum Six Digits");
      }
    } else {
      setPasswordMetch("");
      setErrorConPassword("Please Enter Confirm Password");
    }

    if (Password === ConPassword) {
      if (Password.length >= 6 && ConPassword.length >= 6) {
        setPasswordMetch("");
        setErrorPassword("");
        setErrorConPassword("");
      }
    } else if (Password.length > 0 && ConPassword.length > 0) {
      setErrorConPassword("");
      setErrorPassword("");
      setPasswordMetch("password does not meet the requirement");
    }

    if (answer_array[2] == "localhost:3000") {
      var register = "http://localhost/pramesh/backend/api/register";
    } else {
      var register = "https://prameshsilks.com/backend/api/register";
    }

    if (Password === ConPassword) {
      if (FirstName && LastName && EmailDone) {
        const fd = new FormData();
        fd.append("vFirstName", FirstName);
        fd.append("vLastName", LastName);
        fd.append("vEmail", Email);
        fd.append("vPassword", Password);

        const dataa = axios
          .post(register, fd)
          .then((res) => {
            if (res.data.Status == "0") {
              Swal.fire("Good job!", "Registration Successfully", "success");
              setTimeout(function () {
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
