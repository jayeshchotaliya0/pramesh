import React, { useEffect } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setMainproductimage } from "../../../redux/actions/productActions";
import { Link } from "react-router-dom";
import  getEnvironment  from '../../../components/environment';
import LazyLoad from 'react-lazyload';

const Maincategory = () => {
    const dispatch = useDispatch();
    const envConfig = getEnvironment();
    const apiUrl    = envConfig.apiUrl;  
    const urls      = `${apiUrl}/product_listing_image`;
    
    const mainproductdata = async () => {
        // ****************iamge****************
        const imagedata = await axios.get(urls).catch((err) => {
        });
        if (imagedata.data.data) {
            dispatch(setMainproductimage(imagedata.data.data));
        }
    };
    useEffect(() => {
        mainproductdata();
    }, []);

    const maindata      = useSelector((state) => state.Mainproductlisting.MainproductArray);
    const Banner_image  = useSelector((state) => state.Mainproductimage.MainproductimageArray);

    return (
        <>
            <Navbar />
            {/* *********** SAREE Banner****************  */}
            <section className="banner mb-5" >
                <div className="img">
                    {Banner_image.map(function (img, index) {
                        if (img.vImageType == "4") {
                            return (
                                <img
                                    src={img.vImage}
                                    className="img-fluid"
                                    alt="Responsive image"
                                />
                            );
                        }
                    })}
                </div>
            </section>

            {/* ***************** SAREES SECTION*********** */}

            <section className=" container-fluid saree mb-5">
                <div className="row justify-content-center">
                    {
                        maindata.map((sarees, index) => (
                            <div className=" customCol customcol col-xl-3  col-lg-4 col-md-5 col-sm-10 my-3 ">
                                <h1 className="text mb-5">{sarees.vTitle}</h1>
                                <LazyLoad height={200} once>
                                    <Link style={{display : 'contents'}} to={`/product-listing/${sarees.iCategoryId}`}>
                                        <div className="img flex">
                                            <img src={sarees.vImage} />
                                        </div>
                                    </Link>
                                </LazyLoad>
                            </div>
                        ))
                    }
                </div>
            </section>

            {/* *********** SAREE Banner 2****************  */}

            <section className="banner mb-5">
                <div className="img">
                    {Banner_image.map(function (img, index) {
                        if (img.vImageType == "5") {
                            return (
                                <img
                                    src={img.vImage}
                                    className="img-fluid"
                                    alt="Responsive image"
                                />
                            );
                        }
                    })}
                </div>
                {/* <button className="sareeBtn">
          SHOP NOW<i className="fa fa-chevron-right" aria-hidden="true"></i>
        </button> */}
            </section>
            <Footer />
        </>
    );
};

export default Maincategory;
