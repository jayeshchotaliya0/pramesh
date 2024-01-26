import React, { useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import axios from 'axios';
import Swal from 'sweetalert2'
import { useHistory } from "react-router";

const clientId = "785983706091-s396vomd8t3ms340tfn1d0oeg17qsr30.apps.googleusercontent.com";

function Logindata() {
    let history = useHistory();
    const [showloginButton, setShowloginButton]     = useState(true);
    const [showlogoutButton, setShowlogoutButton]   = useState(false);
 
    const onSignoutSuccess = () => 
    {
        console.clear();
        Swal.fire(
            'Good job!',
            'You have been logged out successfully',
            'success'
        )
        localStorage.removeItem("iUserId");
        localStorage.removeItem("vFirstName");
        localStorage.removeItem("vLastName");
        localStorage.removeItem("Name");

        setTimeout(function () {
            history.push("/login");
            window.location.reload(1);
        }, 100);

        setShowloginButton(true);
        setShowlogoutButton(false);
    };

    return (
        <div>
            <GoogleLogout
                clientId={clientId}
                buttonText="Sign Out"
                onLogoutSuccess={onSignoutSuccess}
            >
            </GoogleLogout>

        </div>
    );
}
export default Logindata;