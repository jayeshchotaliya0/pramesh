import React, { useEffect, useState } from "react";
import "../../../css/home.css";
import Navbar from "../../Front/Navbar";
import Footer from "../../Front/Footer";
import Swal from 'sweetalert2';
import axios from "axios";
import { useHistory } from "react-router";
const ContactUs = () => {
  let history = useHistory();
  var answer = window.location.href;
  const answer_array = answer.split('/');

  const [vUserName, setvUserName] = useState("");
  const [vEmail, setvEmail]       = useState("");
  // const [ErrorEmail, setErrorEmail] = useState("");
  const [EmailDone, setEmailDone] = useState("0");

  const [vMobile, setvMobile]     = useState("");
  const [vSubject, setvSubject]   = useState("");
  const [vMessage, setvMessage]   = useState("");
  const [Gif, setGif]             = useState(false);

  function validateEmail() {
    var emailText = document.getElementById('vEmail').value;
    var pattern = /^[a-zA-Z0-9\-_]+(\.[a-zA-Z0-9\-_]+)*@[a-z0-9]+(\-[a-z0-9]+)*(\.[a-z0-9]+(\-[a-z0-9]+)*)*\.[a-z]{2,4}$/;
    if (pattern.test(emailText)) {
      if (answer_array[2] == 'localhost:3000') {
        var email_verify = 'http://localhost/pramesh/backend/api/email_varify';
      }
      else {
        var email_verify = 'https://prameshsilks.com/backend/api/email_varify';
      }

      const fd = new FormData();
      fd.append('vEmail', emailText);

      const dataa = axios.post(email_verify, fd)
        .then(res => {
          if (res.data.Status == '1') {
            setEmailDone(0);
            setvEmail('email address already exists');
            return false;
          }
          else {
            setvEmail('');
            setEmailDone(1);
            return true;
          }
        })
        .catch(error => {
        })
    } else {
      setvEmail("Invalid email address:" + emailText);
      setEmailDone(1);
      return false;
    }
  }
  
  const save_contactus_data = (event) =>
  {
    var Emaildata = validateEmail();
    event.preventDefault();
    const data = new FormData(event.target);

    var vUserName = document.getElementById('vUserName').value;
    var vEmail    = document.getElementById('vEmail').value;
    var vMobile   = document.getElementById('vMobile').value;
    var vSubject  = document.getElementById('vSubject').value;
    var vMessage  = document.getElementById('vMessage').value;
    
    if (vUserName)
    {
          setvUserName('');
    }
    else
    {
         setvUserName('Please Enter UserName');
    }

    if (vEmail) 
    {
      setvEmail('');
    }
    else 
    {
      setvEmail('Please Enter Email');
    }

    if (vMobile) 
    {
      setvMobile('');
    }
    else 
    {
      setvMobile('Please Enter Mobile Number');
    }
    
    if (vSubject) {
      setvSubject('');
    }
    else {
      setvSubject('Please Enter Subject');
    }

    if (vMessage) {
      setvMessage('');
    }
    else {
      setvMessage('Please Enter Message');
    }

    if (vUserName && vEmail && vMobile && vSubject && vMessage && EmailDone == 1) 
    {
      setGif(true);
     
      if (answer_array[2] == 'localhost:3000') 
      {
        var url = 'http://localhost/pramesh/backend/api/contact_us';
      }
      else 
      {
        var url = 'https://prameshsilks.com/backend/api/contact_us';
      }

      const dataa = axios.post(url, data)
        .then(res => {
          if (res.data.Status == '0') {
            setGif(false);
            Swal.fire(
              'Good job!',
              res.data.message,
              'success'
            )
            setTimeout(function () {
              history.push("/");
            }, 2000);
          }
          else {
            setGif(false);
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
    <>
      <Navbar />
      <div className="contactus row ">
          <div className="lef col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 ">
              <img   src={process.env.PUBLIC_URL + "/Images/left1.jpg"} alt="Contact Image" />
          </div>


          <div className="rig col-xl-6 col-lg-6 col-md-10 col-sm-10 col-10 ">
              <div className="call my-5">
                  <h2>CALL US</h2>
                  <p>MON - SAT</p>
                  <p>11:00 AM - 8:00 PM (IST)</p>
                  <p>+91 123456789</p>
              </div>

              <div className="mail my-5">
                  <h2>EMAIL US</h2>
                  <p>pramesh@gmail.com</p>
              </div>

              <h2 className="my-4">HAVE A QUESTION?</h2>
              <form className="form_contactus" onSubmit={save_contactus_data}>
                  <div className="form">
                      <input type="text" name="vUserName" id="vUserName" placeholder="Name" />
                      <span className="red">{vUserName}</span>

                      <input type="text" name="vEmail" id="vEmail" placeholder="Email Address" />
                      <span className="red">{vEmail}</span>

                      <input type="number" name="vMobile" id="vMobile" placeholder="Phone Number" />
                      <span className="red">{vMobile}</span>

                      <input type="text" name="vSubject" id="vSubject" placeholder="Subject" />
                      <span className="red">{vSubject}</span>

                      <textarea name="vMessage" id="vMessage" placeholder="Message"  ></textarea>
                      <span className="red">{vMessage}</span>
                  </div>
                  {/* <button className="sub">SUBMIT</button> */}
                  <input type="submit" className="checkoutbtn" value="CONTINUE CHECKOUT" />
                  {
                    Gif == true ?
                      <img className="loding_gif_product" src={process.env.PUBLIC_URL + "/Images/3.svg"} alt="img" />
                      :
                      <></>
                  }
              </form>



          </div>

      </div>

      <Footer />
    </>
  );
};

export default ContactUs;
