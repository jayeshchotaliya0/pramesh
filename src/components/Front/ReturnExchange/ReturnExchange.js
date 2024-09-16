import React, {useEffect } from 'react';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Navbar from "../../Front/Navbar";
import Footer from "../../Front/Footer";
import axios from 'axios';
import { setTermsCondition } from "../../../redux/actions/productActions";
import  getEnvironment  from '../../../components/environment';

const ReturnExchange = () => {
    const {apiUrl} = getEnvironment();
    const dispatch = useDispatch();
   
    useEffect(() => {
        const mainNavbar = async ()=>
        {
            try{
                const termsdata = await axios.get(`${apiUrl}/all_terms_condition_get`).catch((err) => {});
                if (termsdata.data.data) {
                    dispatch(setTermsCondition(termsdata.data.data));
                }
            }
            catch(error)
            {
                console.log(error)
            }
        }
        mainNavbar();
    }, [apiUrl,dispatch]);
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
