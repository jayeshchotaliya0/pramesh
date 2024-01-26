import React, { useEffect, useState } from "react";
import { Country, State, City } from "country-state-city";

import { gsap } from "gsap";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "../../../css/home.css";
import axios from "axios";
import {
  setAddtocartsavedata,
  setAddtocartsubtotal,
} from "../../../redux/actions/productActions";
// import Pincode from 'react-pincode';


function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

const __DEV__ = document.domain === "localhost";

const Checkout = () => {
  let history = useHistory();
  var iUserId = localStorage.getItem("iUserId");
  const GuestcheckoutId = localStorage.getItem("GuestcheckoutId"); 
  // ****************Payment Method****************************
  const SubTotal = useSelector(
    (state) => state.MainAddtocartsubtotal.MainAddtocartsubtotalArray
  );

  const [Image, setImage] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUhaEtwdVj9mwAFuc8HPoTVcYvUr8fhiwXXYl9WA9g0_73sb1NX9tzgW-TlU2f25cgBQ&usqp=CAU"
  );

  const displayRazorpay = () => {
    var MainPrice = SubTotal * 100;
    const options = {
      key: "rzp_test_mfrfon3wnUoQ20",
      currency: "INR",
      amount: MainPrice.toString(),
      // amount: "100",
      name: "Pramesh",
      description: "Pramesh Shopping",
      image: Image,
      handler(response) {
        localStorage.setItem(
          "UUID",
          response.razorpay_payment_id
        );
        setTimeout(function () {
          setCounter(5);
          PaymentsuccessProccess();
        },1000);
      },
      theme: {
        color: "#40A9FF",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };


  const PaymentsuccessProccess = () => {
    var answer = window.location.href;
    const answer_array = answer.split("/");
    if (answer_array[2] == "localhost:3000") {
      var url = "http://localhost/pramesh/backend/api/paymentsuccessproccess";
    } else {
      var url =
        "https://prameshsilks.com/backend/api/paymentsuccessproccess";
    }

    var iCheckoutDetailId = localStorage.getItem("iCheckoutDetailId");
    var iPaymentId = localStorage.getItem("UUID");

    const fd = new FormData();
    fd.append("iPaymentId", iPaymentId);
    fd.append("iCheckoutDetailId", iCheckoutDetailId);

    const dataa = axios
      .post(url, fd)
      .then((res) => {
        if (res.data.Status == "0") {
          localStorage.removeItem("iPaymentId");
          localStorage.removeItem("iCheckoutDetailId");

          setTimeout(function () {
            history.push("/paymentsuccess");
          }, 1000);
        } else {
        }
      })
      .catch((error) => {});
  };

  const country = Country.getAllCountries();
  const state   = State.getAllStates();
  const city    = City.getAllCities();

  state.sort((a, b) => a.name.localeCompare(b.name));
  city.sort((a, b) => a.name.localeCompare(b.name));

  var cookie = localStorage.getItem("cookie");
  const [hideinfos, sethideinfos] = useState(false);
  const [Gif, setGif] = useState(false);
  const [vFirstName, setvFirstName] = useState("");
  const [vLastName, setvLastName] = useState("");
  const [vPhone, setvPhone] = useState("");
  const [tAddress, settAddress] = useState("");
  const [vCity, setvCity] = useState("");
  const [vState, setvState] = useState("");
  const [vChangeState, setvChangeState] = useState("");
  const [vChangeCity, setChangeCity] = useState("");
  

  const [vChangeState1, setvChangeState1] = useState("");
  const [vCountry, setvCountry] = useState("");
  const [vChangeCountry, setvChangeCountry] = useState("");
  const [vChangeCountry1, setvChangeCountry1] = useState("");

  const [vZipcode, setvZipcode] = useState("");
  // ********************************BILLING ADDRESS ALL STATE********************************
  const [vBillingFirstName, setvBillingFirstName] = useState("");
  const [vBillingLastName, setvBillingLastName]   = useState("");
  const [vBillingPhone, setvBillingPhone]         = useState("");
  const [vBillingAddress, setvBillingAddress]     = useState("");
  const [vBillingCity, setvBillingCity]           = useState("");
  const [vBillingState, setvBillingState]         = useState("");
  const [vBillingCountry, setvBillingCountry]     = useState("");
  const [vBillingZipcode, setvBillingZipcode]     = useState("");
  const [EmailDone, setEmailDone]                 = useState(iUserId?0:1);
  const [ErrorEmail, setErrorEmail]               = useState("Please Enter Email Address");
  // **********************Country Name Save  *********************************
  const [countryName, setcountryName]     = useState("");
  const [stateName, setstateName]         = useState("");
  const [cityName, setcityName]           = useState("");


  const [billCountryName, setbillCountryName] = useState("0");
  const [billStateName, setbillStateName]     = useState("0");
  const [billCityName, setbillCityName]       = useState("0");
  const [counter, setCounter]                 = useState("");

  const [checkoutPageData, setcheckoutPageData] = useState("");

  useEffect(()=>{
    const Country = country.filter((v,i)=>v?.isoCode==vChangeCountry)[0]?.name;
    setcountryName(Country?Country:'')
    const Statename = state.filter((v,i)=>v.countryCode==vChangeCountry && v.isoCode==vChangeState)[0]?.name;
    setstateName(Statename);
    setcityName(vChangeCity);
  
  },[vChangeCountry,vChangeState,vChangeCity])
  
  useEffect(()=>{
    //Billing Country name Save in Database
    const billCountryName = country.filter((v,i)=>v?.isoCode==vChangeCountry1)[0]?.name;
    setbillCountryName(billCountryName);
    //Billing state Name Save In Database
    const billStateName = state.filter((v,i)=>v.countryCode==vChangeCountry1 && v.isoCode==vChangeState1)[0]?.name;
    setbillStateName(billStateName);
  },[vChangeCountry1,vChangeState1,billCityName])

  const emailverify = (e) => {
    var emailText = e.target.value;
    var emailText = document.getElementById("vEmail").value;
    var pattern =
      /^[a-zA-Z0-9\-_]+(\.[a-zA-Z0-9\-_]+)*@[a-z0-9]+(\-[a-z0-9]+)*(\.[a-z0-9]+(\-[a-z0-9]+)*)*\.[a-z]{2,4}$/;
    if (pattern.test(emailText))
    {
        setErrorEmail("");
        setEmailDone(2);
        return 2;

      // if (answer_array[2] == "localhost:3000") 
      // {
      //   var email_verify = "http://localhost/pramesh/backend/api/email_varify";
      // } else {
      //   var email_verify =
      //     "https://prameshsilks.com/backend/api/email_varify";
        
      // }
      // const fd = new FormData();
      // fd.append("vEmail", emailText);
      // const dataa = axios
      //   .post(email_verify, fd)
      //   .then((res) => {
      //     if (res.data.Status == "0") {
      //       setErrorEmail("");
      //       setEmailDone(2);
      //       return 2;
      //     } else {
      //       setEmailDone(1);
      //       setErrorEmail("email address already exists");
      //       return 1;
      //     }
      //   })
      //   .catch((error) => {});
    } 
    else 
    {
      if (emailText.length > 5) {
        setErrorEmail("Invalid email address:" + emailText);
        setEmailDone(1);
        return 1;
      }
    }
  };
  useEffect(()=>{
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  },[counter])

  const Checkoutdatasave = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const phoneNumberPattern = /^\d{10}$/;

    const pattern =/^[a-zA-Z0-9\-_]+(\.[a-zA-Z0-9\-_]+)*@[a-z0-9]+(\-[a-z0-9]+)*(\.[a-z0-9]+(\-[a-z0-9]+)*)*\.[a-z]{2,4}$/;
    const vFirstName  = document.getElementById("vFirstName").value;
    const vLastName   = document.getElementById("vLastName").value;
    const vPhone      = document.getElementById("vPhone").value;
    const tAddress    = document.getElementById("tAddress").value;
    const emailText   = document.getElementById("vEmail").value;
    

    const vCountry    = countryName?countryName:0;
    const vState      = stateName?stateName:0;
    const vCity       = cityName?cityName:0;
    const vZipcode    = document.getElementById("vZipcode").value;

    // *********************************BILLING ADDRESS***************
    const vBillingFirstName = document.getElementById("vBillingFirstName").value;
    const vBillingLastName  = document.getElementById("vBillingLastName").value;
    const vBillingPhone     = document.getElementById("vBillingPhone").value;
    const vBillingAddress   = document.getElementById("vBillingAddress").value;

    const vBillingCountry   = billCountryName;
    const vBillingState     = billStateName;
    const vBillingCity      = document.getElementById("vBillingCity").value;
   
    const vBillingZipcode   = document.getElementById("vBillingZipcode").value;
    
    var error = false;
    if (vFirstName) {
      setvFirstName("");
    } else {
      setvFirstName("Please Enter FirstName");
      var error = true;
    }
    if (vLastName) {
      setvLastName("");
    } else {
      setvLastName("Please Enter Lastname");
      var error = true;
    }
 
    if (vPhone) 
    {
      if(phoneNumberPattern.test(vPhone))
      {
         setvPhone("");
      }
      else
      {
        setvPhone("Invalid Phone No");
        var error = true;
      }
    } else {
      setvPhone("Please Enter Phone No");
      var error = true;
    }
    if (tAddress) {
      settAddress("");
    } else {
      settAddress("Please Enter Address");
      var error = true;
    }
    
    if (vCity) {
      setvCity("");
    } else {
      setvCity("Please Enter City");
      var error = true;
    }
    if (vState) {
      setvState("");
    } else {
      setvState("Please Select State");
      var error = true;
    }
    if (vCountry) {
      setvCountry("");
    } else {
      setvCountry("Please Select Country");
      var error = true;
    }
    if (vZipcode) {
      if(vZipcode.length==6){
        setvZipcode("");
      }else{
        setvZipcode("Please Enter Valid Zipcode");
        var error = true;
      }
    } else {
      setvZipcode("Please Enter Zipcode");
      var error = true;
    }
  
    if (hideinfos == false) 
    {
      if (vBillingFirstName) {
        setvBillingFirstName("");
      } else {
        setvBillingFirstName("Please Enter FirstName");
        var error = true;
      }
      if (vBillingLastName) {
        setvBillingLastName("");
      } else {
        setvBillingLastName("Please Enter Lastname");
        var error = true;
      }
      if (vBillingPhone) 
      {
        if(phoneNumberPattern.test(vBillingPhone)){
          setvBillingPhone("");
        }else{
          setvBillingPhone("Invalid Phone No");
          var error = true;
        }
      } else {
        setvBillingPhone("Please Enter Phone No");
        var error = true;
      }
      if (vBillingAddress) {
        setvBillingAddress("");
      } else {
        setvBillingAddress("Please Enter Address");
        var error = true;
      }
      if (vBillingCity) {
        setvBillingCity("");
      } else {
        setvBillingCity("Please Enter City");
        var error = true;
      }
      if (vBillingState) {
        setvBillingState("");
      } else {
        setvBillingState("Please Select State");
        var error = true;
      }
      if (vBillingCountry) {
        setvBillingCountry("");
      } else {
        setvBillingCountry("Please Select Country");
        var error = true;
      }
      if (vBillingZipcode) {
        if(vBillingZipcode.length==6)
        {
          setvBillingZipcode("");
        }else
        {
          setvBillingZipcode("Please Enter Valid Zipcode");
          var error = true;
        }
      } else {
        setvBillingZipcode("Please Enter Zipcode");
        var error = true;
      }
    }
    
    if (error === false && pattern.test(emailText)) 
    {
      setErrorEmail('');
      var answer = window.location.href;
      const answer_array = answer.split("/");
      if (answer_array[2] == "localhost:3000") {
        var url = "http://localhost/pramesh/backend/api/checkoutdata";
      } else {
        var url = "https://prameshsilks.com/backend/api/checkoutdata";
      }
      const dataa = axios
        .post(url, data)
        .then((res) => {
          if (res.data.Status == "0") {
            localStorage.setItem(
              "iCheckoutDetailId",
              res.data.iCheckoutDetailId
            );
            displayRazorpay();
            // Swal.fire(
            //     'Good job!',
            //     res.data.message,
            //     'success'
            // )

            // setTimeout(function () {
            //     history.push("/");
            // }, 2000);
          } else {
            setGif(false);
            Swal.fire(
                'Error',
                res.data.message,
                'error'
            )
          }
        })
        .catch((error) => {});
    }
    else
    {
      if(!emailText)
      {
        setErrorEmail("Please Enter Valid Email Address");
      }
    }
  };

  const dispatch = useDispatch();
  var answer = window.location.href;
  const answer_array = answer.split("/");
  const AddtocartProduct = async () => {
    if (answer_array[2] == "localhost:3000") {
      var cartdatasave = `http://localhost/pramesh/backend/api/addtocartdataget?cookie=${cookie}@@${iUserId}@@${GuestcheckoutId}`;
    } else {
      var cartdatasave = `https://prameshsilks.com/backend/api/addtocartdataget?cookie=${cookie}@@${iUserId}@@${GuestcheckoutId}`;
    }
    // *********************ADD TO CART DATA ********************
    const addtocart = await axios.get(cartdatasave);

    setcheckoutPageData(addtocart?.data?.checkoutdata);

    if (addtocart.data.data) {
      dispatch(setAddtocartsavedata(addtocart.data.data));
      dispatch(setAddtocartsubtotal(addtocart.data.subtotal));
    }
  };
  useEffect(() => {
    AddtocartProduct();
  }, []);

  window.onload = () => {
    gsap.fromTo(
      ".leftcheck",
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    );
    gsap.fromTo(
      ".rightcheck",
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    );
  };

  const hideinfo = () => {
    if (hideinfos == false) {
      sethideinfos(true);
    }
    if (hideinfos == true) {
      sethideinfos(false);
    }
  };

  const Addtocart = useSelector(
    (state) => state.MainAddtocartsavedata.MainAddtocartsavedataArray
  );

  useEffect(()=>{
   
    console.log("email address",checkoutPageData?.vEmail)
    document.getElementById("vFirstName").setAttribute('value',checkoutPageData?.vFirstName?checkoutPageData?.vFirstName:'');
    document.getElementById("vLastName").setAttribute('value',checkoutPageData?.vLastName?checkoutPageData?.vLastName:'');
    document.getElementById("vPhone").setAttribute('value',checkoutPageData?.vPhone?checkoutPageData?.vPhone:'');
    document.getElementById("tAddress").setAttribute('value',checkoutPageData?.tAddress?checkoutPageData?.tAddress:'');
    document.getElementById("vEmail").setAttribute('value',checkoutPageData?.vEmail?checkoutPageData?.vEmail:'');

    document.getElementById("vBillingFirstName").setAttribute('value',checkoutPageData?.vBillingFirstName?checkoutPageData?.vBillingFirstName:'');
    document.getElementById("vBillingLastName").setAttribute('value',checkoutPageData?.vBillingLastName?checkoutPageData?.vBillingLastName:'');
    document.getElementById("vBillingPhone").setAttribute('value',checkoutPageData?.vBillingPhone);
    document.getElementById("vBillingAddress").setAttribute('value',checkoutPageData?.vBillingAddress?checkoutPageData?.vBillingAddress:'');

    const Country = country.filter((v,i)=>v?.name==checkoutPageData?.vCountry)[0]?.isoCode;
    if(Country)
    { 
      document.getElementById('vCountry').value = Country;
    }
   
    const State = state.filter((v,i)=>v?.name==checkoutPageData?.vState)[0]?.isoCode;
    setvChangeCountry(Country);
    setvChangeState(State);
    setTimeout(function () {
      if(State)
      {
        document.getElementById('vState').value = State;
      }
      if(checkoutPageData?.vCity)
      {
        document.getElementById('vCity').value = checkoutPageData?.vCity;
      }

      setcityName(checkoutPageData?.vCity);
      document.getElementById('vZipcode').value = checkoutPageData?.vZipcode ? checkoutPageData?.vZipcode:'';
      //billinf country and state data fill
      const billCountryNameSave = country.filter((v,i)=>v?.name==checkoutPageData?.vBillingCountry)[0]?.isoCode;
      const billStateNameSave   = state.filter((v,i)=>v?.name==checkoutPageData?.vBillingState)[0]?.isoCode;
  
      if(billCountryNameSave){ 
        setvChangeCountry1(billCountryNameSave);
        document.getElementById('vBillingCountry').value = billCountryNameSave;
      }
      if(billStateNameSave)
      {
        setvChangeState1(billStateNameSave);
        document.getElementById('vBillingState').value = billStateNameSave;
      }
      if(checkoutPageData?.vBillingCity)
      {
        document.getElementById('vBillingCity').value = checkoutPageData?.vBillingCity;
      }
      
      document.getElementById('vBillingZipcode').value = checkoutPageData?.vBillingZipcode ? checkoutPageData?.vBillingZipcode:'';

      console.log("jayesh",billCountryNameSave);

  
    },1000);
  },[checkoutPageData]);

  return (
    <>
      <form onSubmit={Checkoutdatasave}>
        <input type="hidden" name="cookie" value={cookie} />
        <input type="hidden" name="iUserId" value={iUserId} />
        <input type="hidden" name="bill_Address_check" value={hideinfos?1:0} />
        <section className="checkoutp">
          <h1 className="text-center my-4">CHECKOUT</h1>
          <div className="row justify-content-center">
            {/* LEFT CHECK */}

            <div className="leftcheck   col-xl-6 col-lg-8 mx-auto ">
              <h1>SHIPPING ADDRESS</h1>
              {
                 <div className="loginoption" style={{display:iUserId?'none':''}}>
                  <h3>Login Options</h3>
                  <input
                    type="text"
                    onKeyUp={emailverify}
                    name="vEmail"
                    id="vEmail"
                    placeholder="Email Address"
                  />
                  <span className="red">{ErrorEmail}</span>
                  <p>You can create an account after Checkout</p>
                </div>
              }
              
              <hr />
              <div className="contactdetails">
                <h3 className="mb-2">Contact Details</h3>
                <div className="row">
                  <div className="col-md-6 mt-3">
                    <input
                      type="text"
                      id="vFirstName"
                      name="vFirstName"
                      className="form-control"
                      placeholder="First name"
                    />
                    <span className="red">{vFirstName}</span>
                  </div>
                  <div className="col-md-6 mt-3">
                    <input
                      type="text"
                      id="vLastName"
                      name="vLastName"
                      className="form-control"
                      placeholder="Last name"
                    />
                    <span className="red">{vLastName}</span>
                  </div>
                  <div className="col-md-6 mt-3">
                    <input
                      type="number"
                      id="vPhone"
                      name="vPhone"
                      className="form-control"
                      placeholder="Phone Number"
                    />
                    <span className="red">{vPhone}</span>
                  </div>
                  <div className="col-md-6 mt-3">
                    <input
                      type="text"
                      id="tAddress"
                      className="form-control"
                      placeholder="Address "
                      name="tAddress"
                    />
                    <span className="red">{tAddress}</span>
                  </div>

                  <div className="col-md-6 mt-3">
                    <input type="hidden"  name="vCountry" value={countryName}/>
                    <select
                      onChange={(e) =>(setvChangeCountry(e.target.value), setvChangeState(''))}
                      id="vCountry"
                      className="form-control"
                      style={{height:"42px"}}
                      defaultValue='AF'
                    >
                      <option value="">Please Select Country</option>
                      {country.map(function (coun, index) {
                        return (
                          <option value={coun.isoCode}>{coun.name}</option>
                        );
                      })}
                    </select>
                    <span className="red">{vCountry}</span>
                  </div>
                  <div className="col-md-6 mt-3">
                    <input type="hidden" name="vState" value={stateName}/>
                    <select
                      id="vState"
                      onChange={(e) => (setvChangeState(e.target.value),setChangeCity(''))}
                      className="form-control"
                      style={{height:"42px"}}
                    >
                      <option value="">Please Select State</option>
                      {state.map(function (st, index) {
                        if (st.countryCode == vChangeCountry) 
                        {
                          return <option value={st.isoCode}>{st.name}</option>;
                        }
                      })}
                    </select>
                    <span className="red">{vState}</span>
                  </div>
                  <div className="col-md-6 mt-3">
                    <select id="vCity" name="vCity"  onChange={(e) => setChangeCity(e.target.value)} className="form-control" style={{height:"42px"}}>
                      <option value="">Please Select City </option>
                      {city.map(function (ct, index) {
                        if (ct.stateCode == vChangeState) {
                          return (
                            <option value={ct.name}>{ct.name}</option>
                          );
                        }
                      })}
                    </select>
                    <span className="red">{vCity}</span>
                  </div>
                  <div className="col-md-6 mt-3">
                    <input
                      type="number"
                      className="form-control"
                      name="vZipcode"
                      id="vZipcode"
                      placeholder="Zip/Postal code"
                    />
                    <span className="red">{vZipcode}</span>
                  </div>
                </div>
              </div>

              <div className="pay">
                <h1>PAYMENT METHOD</h1>
                <p>How would you like to pay for your order?</p>
                <div className="pretty p-icon p-smooth mt-3" onClick={hideinfo}>
                  <input type="checkbox" name="bill" id="bill" />
                  <div className="state p-maroon">
                    <i className="icon fa fa-check"></i>
                    <label htmlFor="bill">
                      My billing and shipping addresses are the same
                    </label>
                  </div>
                </div>
              </div>

              <div
                className={`row hideinfo ${hideinfos ? "hide" : " "}  mt-4 `}
              >
                <input
                  type="text"
                  id="vBillingFirstName"
                  name="vBillingFirstName"
                  className="col-xl-8 col-lg-7 col-md-10 col-sm-8   mb-2 "
                  placeholder="First name"
                />
                <span className="red">{vBillingFirstName}</span>
                <input
                  type="text"
                  id="vBillingLastName"
                  name="vBillingLastName"
                  className="col-xl-8 col-lg-7 col-md-10 col-sm-8  mb-2 "
                  placeholder="Last name"
                />
                <span className="red">{vBillingLastName}</span>
                <input
                  type="number"
                  id="vBillingPhone"
                  name="vBillingPhone"
                  className="col-xl-8 col-lg-7 col-md-10 col-sm-8  mb-2"
                  placeholder="Phone Number"
                />
                <span className="red">{vBillingPhone}</span>
                <input
                  type="text"
                  id="vBillingAddress"
                  className="col-xl-8 col-lg-7 col-md-10 col-sm-8  mb-2"
                  placeholder="Address "
                  name="vBillingAddress"
                />
                <span className="red">{vBillingAddress}</span>
                <input type="hidden" name="vBillingCountry" value={billCountryName} />
                <select
                  onChange={(e) => (setvChangeCountry1(e.target.value),setvChangeState1(''))}
                  id="vBillingCountry"
                  className="col-xl-8 col-lg-7 col-md-10 col-sm-8  mb-2 "
                >
                  <option value="">Please Select Country</option>
                  {country.map(function (coun, index) {
                    return <option value={coun.isoCode}>{coun.name}</option>;
                  })}
                </select>

                <span className="red">{vBillingCountry}</span>
                <input type="hidden" name="vBillingState" value={billStateName} />
                <select
                  id="vBillingState"
                  onChange={(e) => (setvChangeState1(e.target.value),setbillCityName(''))}
                  className="col-xl-8 col-lg-7 col-md-10 col-sm-8  mb-2 "
                >
                  <option value="">Please Select State</option>
                  {state.map(function (st, index) {
                    if (st.countryCode == vChangeCountry1) {
                      return <option value={st.isoCode}>{st.name}</option>;
                    }
                  })}
                </select>
                <span className="red">{vBillingState}</span>

                <select
                  id="vBillingCity"
                  name="vBillingCity"
                  className="col-xl-8 col-lg-7 col-md-10 col-sm-8  mb-2"
                  onChange={(e)=>setbillCityName(e.target.value)}
                >
                  <option value="">Please Select City</option>
                  {city.map(function (ct, index) {
                    if (ct.stateCode == vChangeState1) 
                    {
                      return <option value={ct.name}>{ct.name}</option>;
                    }
                  })}
                </select>

                <span className="red">{vBillingCity}</span>
                <input
                  type="number"
                  id="vBillingZipcode"
                  className="col-xl-8 col-lg-7 col-md-10 col-sm-8  "
                  name="vBillingZipcode"
                  placeholder="Zip/Postal code"
                />
                 {/* <Pincode
                  invalidError="Please check pincode"
                  lengthError="check length"
                  getData={(data) => console.log(data)}
                /> */}

                <span className="red">{vBillingZipcode}</span>
              </div>

              <div className="shipping mt-5" style={{display:'none'}}>
                <h1>SHIPPING METHOD</h1>
                <p>₹200 Shipping Charges</p>
              </div>
            </div>

            {/* RIGHT CHECK  */}

            <div className="rightcheck  col-xl-5  col-lg-8 mx-auto">
              <h1>ORDER SUMMARY</h1>
              <h3>{Addtocart.length} ITEM IN CART</h3>
              <hr />

              <div className="scroll">
                {Addtocart.length > 0 ? (
                  Addtocart.map(function (add, index) {
                    return (
                      <div className="mycards d-flex mb-4">
                        <div className="cardimg mr-4">
                          <img className="img" src={add.vImage} alt="img" />
                        </div>
                        <div className="cartinfo">
                          <div className="d-flex justify-content-between">
                            <h2>{add.vProductName}</h2>
                            <h2>र {add.vTotal}</h2>
                          </div>
                          <p>Qty : {add.vQty}</p>
                          {add.vSize.length > 0 ? (
                            <p>Size : {add.vSize}</p>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="col-md-4" style={{fontSize:'18px',marginLeft:'38%'}}>Record Not Found!</div>
                )}
              </div>

              <div className="cartTotal">
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

              <div className="discount mt-4" >
                <h3 style={{display:'none'}}>Apply Discount Code</h3>
                <div className="position-relative" style={{display:'none'}}>
                  <input
                    type="text"
                    name="coupon"
                    className="discode"
                    placeholder="ENTER DISCOUNT CODE"
                  />
                  <i className="fa fa-caret-right" aria-hidden="true"></i>
                </div>

                <div className="" style={{display:'none'}}>
                  <input type="checkbox" name="bill" id="bill" />
                  <div className="state p-maroon">
                    <i className="icon fa fa-check"></i>
                    <label htmlFor="bill">Sign up for our Newsletter</label>
                  </div>
                </div>
                <div className="comment mt-3" style={{display:'none'}}>
                  <h3>Order Comment</h3>
                  <textarea
                    id="tOrderComment"
                    name="tOrderComment"
                    style={{
                      width: "100%",
                      height: "10rem",
                      border: "3px solid #efeae6",
                    }}
                  ></textarea>
                </div>
                <div className="loaderDiv">
                  {
                    SubTotal>0?
                        <button type="submit" className="checkoutbtn">
                        {Gif == true ? (
                          <img
                            className="loding_gif_product"
                            src={process.env.PUBLIC_URL + "/Images/3.svg"}
                            alt="img"
                          />
                        ) : (
                          `CONTINUE CHECKOUT ${counter}`
                        )}
                      </button> :''
                  }
                  

                </div>
              </div>
            </div>
          </div>
        </section>
      </form>
    </>
  );
};

export default Checkout;
