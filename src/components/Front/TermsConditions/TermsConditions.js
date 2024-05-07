import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Navbar from "../../Front/Navbar";
import Footer from "../../Front/Footer";
import axios from 'axios';
import { setTermsCondition } from "../../../redux/actions/productActions";
import  getEnvironment  from '../../../components/environment';

const TermsConditions = () => {
    const {apiUrl} = getEnvironment();
    const dispatch      = useDispatch();
    
    useEffect(() => {
        const fetchTermsData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/all_terms_condition_get`);
                dispatch(setTermsCondition(response.data.data));
            } catch (error) {
            }
        };
        fetchTermsData();
    }, [apiUrl,dispatch]);

    const Terms = useSelector((state) => state.MainMiniTermsdata.AllTermsArray);
    
    return (
        <>
            <Navbar/>
            <div className="container">
                <div dangerouslySetInnerHTML={{ __html: Terms.tTermsCondition }} className="container"></div>
            </div>
            <Footer/>   
        </>
    )
}

export default TermsConditions
