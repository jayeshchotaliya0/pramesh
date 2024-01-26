import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Navbar from "../../Front/Navbar";
import Footer from "../../Front/Footer";
import axios from 'axios';
import { setTermsCondition } from "../../../redux/actions/productActions";
const ReturnExchange = () => {
    const dispatch = useDispatch();
    var answer = window.location.href;
    const answer_array = answer.split("/");

    if (answer_array[2] == "localhost:3000") {
        var url = "http://localhost/pramesh/backend/api/all_terms_condition_get";
    } else {
        var url = "https://prameshsilks.com/backend/api/all_terms_condition_get";
    }

    const mainNavbar = async () => {
        const termsdata = await axios.get(url).catch((err) => {
            
        });

        if (termsdata.data.data) {
            dispatch(setTermsCondition(termsdata.data.data));
        }
    };

    useEffect(() => {
        mainNavbar();
    }, []);
    const Terms = useSelector((state) => state.MainMiniTermsdata.AllTermsArray);
    return (
        <>
        <Navbar />
         <div className="container">
                <div dangerouslySetInnerHTML={{ __html: Terms.tExchange }} className="container"></div>
         </div>
        <Footer />    
        </>
    )
}

export default ReturnExchange
