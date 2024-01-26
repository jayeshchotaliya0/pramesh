import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';
import Swal from 'sweetalert2'
import { useHistory } from "react-router";

const clientId = "785983706091-s396vomd8t3ms340tfn1d0oeg17qsr30.apps.googleusercontent.com";


function Logindata() {
    let history             = useHistory();
    var answer              = window.location.href;
    const answer_array      = answer.split('/');
    const [showloginButton, setShowloginButton]     = useState(true);
    const [showlogoutButton, setShowlogoutButton]   = useState(false);
    
    const onLoginSuccess = (res) => {
        var vFirstName  = res.profileObj.name;
        var vLastName   = res.profileObj.givenName;
        var Email       = res.profileObj.email;
        var vGoogleId   = res.profileObj.googleId;
        
        if (answer_array[2] == 'localhost:3000') {
            var register = 'http://localhost/pramesh/backend/api/login_user';
        }
        else {
            var register = 'https://prameshsilks.com/backend/api/login_user';
        }
        var cookie = localStorage.getItem("cookie");
        const fd = new FormData();
        fd.append('vFirstName', vFirstName);
        fd.append('vLastName', vLastName);
        fd.append('vEmail', Email);
        fd.append('vGoogleId', vGoogleId);
        fd.append('vCookie', cookie);

        const dataa = axios.post(register, fd)
            .then(res => {
                if (res.data.Status == '0') {
                    setShowloginButton(false);
                    setShowlogoutButton(true);
                    localStorage.setItem("iUserId", res.data.iUserId);
                    localStorage.setItem("Name", res.data.sortname);
                    localStorage.setItem("vGoogleId", res.data.vGoogleId);
                    localStorage.removeItem("cookie");
                    Swal.fire(
                        'Good job!',
                        res.data.message,
                        'success'
                    )
                    setTimeout(function () {
                        history.push("/");
                        window.location.reload(1);
                    }, 3000);
                }
                else 
                {
                    Swal.fire(
                        'Error',
                        res.data.message,
                        'error'
                    )
                }
            })
            .catch(error => {
            })
    };

    const onLoginFailure = (res) => {
        // console.log('Login Failed:', res);
    };


    return (
        <div>
            { showloginButton ?
                <GoogleLogin
                    clientId={clientId}
                    buttonText="Sign In"
                    className='Google_Login_hide'
                    onSuccess={onLoginSuccess}
                    onFailure={onLoginFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                /> : null}
        </div>
    );
}
export default Logindata;