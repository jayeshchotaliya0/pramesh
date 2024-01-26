import React, { useState, useEffect } from "react";
import "../../../css/home.css";
import Navbar from '../Navbar';
import axios from 'axios';
import Footer from "../Footer";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
    setProducts, setMinibanner,
    setFirstImage, setSecondImage,
    setThirdImage, setHomepagedata
} from "../../../redux/actions/productActions";
import ScrollToTop from "../ScrollToTop";
import  getEnvironment  from '../../../components/environment';

import { Link } from "react-router-dom";

const HomePage = () => {
    const envConfig = getEnvironment();
    const apiUrl    = envConfig.apiUrl;

    const [image_zooming, setimage_zooming] = useState('');
    const [MobileBanner, setMobileBanner]   = useState([]);
    const dispatch = useDispatch();

    var urls        = `${apiUrl}/banner`;
    var minibanner  = `${apiUrl}/mini_banner`;
    var FirstImage  = `${apiUrl}/first_image`;
    var Secondimage = `${apiUrl}/second_image`;
    var Thirdimage  = `${apiUrl}/third_image`;
    var homepage_producturl = `${apiUrl}/homepage_product`;
    
    // *******************banner Data Get*****************************
    const fetchbanner = async () => {
        const response = await axios.get(urls).catch((err) => {
        });

        const res = await axios.get(minibanner).catch((err) => {
        });

        const firstimage = await axios.get(FirstImage).catch((err) => {
        });

        if (response.data.data) {
            dispatch(setProducts(response.data.data));
            setMobileBanner(response.data.mobile);
        }
        if (res.data.data) {
            dispatch(setMinibanner(res.data.data));
        }
        if (firstimage.data.data) {
            dispatch(setFirstImage(firstimage.data.data));
        }

    };
    const fetchsecondimage = async () => {
        const secondimage = await axios.get(Secondimage).catch((err) => {
        });
        if (secondimage.data.data) {
            dispatch(setSecondImage(secondimage.data.data));
        }
    };
    const fetchthirddimage = async () => {
        const thirdimage = await axios.get(Thirdimage).catch((err) => {
        });

        const homepage_data = await axios.get(homepage_producturl).catch((err) => {
        });

        if (thirdimage.data.data) {
            dispatch(setThirdImage(thirdimage.data.data));
        }
        if (homepage_data.data.data) {
            dispatch(setHomepagedata(homepage_data.data.data));
        }
    };

    useEffect(() => {
        fetchbanner();
        fetchsecondimage();
    }, []);

    useEffect(() => {
        fetchthirddimage();
    }, []);

    function mouse_hover(e) {
        setimage_zooming(e.currentTarget.src)
    }

    const products_data     = useSelector((state) => state.allProducts.products);
    const mini_banner       = useSelector((state) => state.minibanner.minibanner);
    const firstiamgedata    = useSelector((state) => state.FirstimageData.FirstiamgeArray);
    const secondiamgedata   = useSelector((state) => state.SecondimageData.SecondiamgeArray);
    const thirdiamgedata    = useSelector((state) => state.ThirdimageData.ThirdiamgeArray);
    const homepage_productdata = useSelector((state) => state.Homepageproduct.HomepageproductArray);

    var img     = firstiamgedata.vImage;
    var img1    = secondiamgedata.vImage;
    var img2    = thirdiamgedata.vImage;

    const bannerList = products_data.map((pro, index) => {
        if (index == '0') {
            var ac = 'active';
        }
        else {
            var ac = '';
        }
        return (
            <div className={`carousel-item  ${ac}`}>
                <Link to='/product-listing'>
                    <img className="d-block w-100  myslider" src={pro.vImage} alt="First slide" />
                </Link>

            </div>
        );
    })
    // *****************************************BannerMobile  Dynamic************************************
    const Mobilebanner = MobileBanner.map((pro1, index1) => {
        if (index1 == '0') {
            var ac1 = 'active';
        }
        else {
            var ac1 = '';
        }
        return (
            <div className={`carousel-item  ${ac1}`}>
                <Link to='/product-listing'>
                    <img className="d-block w-100  myslider" src={pro1.vImage} alt="First slide" />
                </Link>

            </div>
        );
    })

    // *****************************************Mini Banner Dynamic************************************
    const minibanner_list = mini_banner.map((banner, index) => {
        if (index == '0') {
            var ac = 'active';
        }
        else {
            var ac = '';
        }
        return (
            <div className={`carousel-item active_image ${ac}`}>
                <Link to='/product-listing'>
                    <img onMouseOver={mouse_hover} className="d-block w-100 image_zooming" src={banner.vImage} alt="First slide" />
                </Link>
            </div>

        );
    })
    function handleContextMenu(event)
    {
        event.preventDefault();
    }

    return (
        <>
            <ScrollToTop />
            <Navbar />
            {/* ********** Main Section **************** */}
            <main onContextMenu={handleContextMenu}>
                {/* DESKTOP SLIDER ************************************* */}
                <div
                    id="carouselExampleIndicators2"
                    className=" desktop carousel slide"
                    data-ride="carousel"
                >
                    <ol className="carousel-indicators">{
                            products_data.map(function (mainslider, index) {
                                return <li data-target={`#carouselExampleIndicators${index}`} data-slide-to={index} className={index == 0 ? 'active' : ''}></li>
                            })
                        }
                    </ol>

                    <div className="carousel-inner overflow-hidden">
                        {bannerList}
                    </div>
                    <a
                        className="carousel-control-prev"
                        href="#carouselExampleIndicators2"
                        role="button"
                        data-slide="prev"
                    >
                        <span
                            className="carousel-control-prev-icon"
                            aria-hidden="true"
                        ></span>
                        <span
                            className="carousel-control-prev-icon"
                            aria-hidden="true"
                        ></span>
                    </a>
                    <a
                        className="carousel-control-next"
                        href="#carouselExampleIndicators2"
                        role="button"
                        data-slide="next"
                    >
                        <span
                            className="carousel-control-next-icon"
                            aria-hidden="true"
                        ></span>
                        <span
                            className="carousel-control-next-icon"
                            aria-hidden="true"
                        ></span>
                    </a>
                </div>
                {/* MOBILE SLIDER ******************************************** */}
                <div
                    id="carouselExampleIndicators"
                    className=" mobile carousel slide"
                    data-ride="carousel"
                >
                    <ol className="carousel-indicators">
                        {
                            MobileBanner.map(function (mainslider, index) {
                                return <li data-target={`#carouselExampleIndicators${index}`} data-slide-to={index} className={index == 0 ? 'active' : ''}></li>
                            })
                        }

                    </ol>

                    <div className="carousel-inner overflow-hidden">
                        {Mobilebanner}
                    </div>
                    <a
                        className="carousel-control-prev"
                        href="#carouselExampleIndicators"
                        role="button"
                        data-slide="prev"
                    >
                        <span
                            className="carousel-control-prev-icon"
                            aria-hidden="true"
                        ></span>
                        <span
                            className="carousel-control-prev-icon"
                            aria-hidden="true"
                        ></span>
                    </a>
                    <a
                        className="carousel-control-next"
                        href="#carouselExampleIndicators"
                        role="button"
                        data-slide="next"
                    >
                        <span
                            className="carousel-control-next-icon"
                            aria-hidden="true"
                        ></span>
                        <span
                            className="carousel-control-next-icon"
                            aria-hidden="true"
                        ></span>
                    </a>
                </div>
            </main>
            {/* **********Section Nostalgic************* */}
            <section className="nostalgic mb-6">
                <div className="row">
                    <div className="left col-xl-6 col-lg-7 col-md-8 col-sm-10 mx-auto">
                        <Link to='/product-listing'>
                            <img
                                src={

                                    image_zooming ? image_zooming : img
                                }
                                className="img-fluid"
                                alt="Image"
                            />
                        </Link>
                    </div>
                    <div className="right text-center col-xl-6 col-lg-6 col-md-8 col-sm-10  mx-auto">
                        <h1>NOSTALGIC MASTERPIECES</h1>
                        <p>RICH PLAY OF SURFACE TEXTURES ON PURE COTTON AND LINEN</p>
                        <div
                            id="carouselExampleIndicators1"
                            className="carousel slide "
                            data-ride="carousel"
                        >
                            <ol className="carousel-indicators">
                                {
                                    mini_banner.map(function (minibanner, index) {
                                        return <li
                                            data-target={`#carouselExampleIndicators${index}`}
                                            data-slide-to={index}
                                            className={index == '0' ? 'active' : ''}
                                        ></li>

                                    })
                                }
                            </ol>
                            <div className="carousel-inner">
                                {minibanner_list}
                            </div>
                            <a
                                className="carousel-control-prev"
                                href="#carouselExampleIndicators1"
                                role="button"
                                data-slide="prev"
                            >
                                <span
                                    className="carousel-control-prev-icon"
                                    aria-hidden="true"
                                ></span>

                            </a>
                            <a
                                className="carousel-control-next"
                                href="#carouselExampleIndicators1"
                                role="button"
                                data-slide="next"
                            >
                                <span
                                    className="carousel-control-next-icon"
                                    aria-hidden="true"
                                ></span>

                            </a>
                        </div>
                    </div>
                </div>
            </section>
            {/************* Section Festive ********* */}
            <section className="festive container-fluid mt-5">
                <h1>FESTIVE ENSEMBLES</h1>
                <p>EFFORTLESS STYLES TO THROW ON AND GO...</p>
                <div className="row">
                    {
                        homepage_productdata.map((product, index) => (
                            <>
                                <div className=" col-xl-3 col-lg-4 col-md-6 col-sm-12 mx-auto p-0">
                                    <div className="overflow-hidden">
                                        <Link to={`/product-listing/${btoa(product.iCategoryId)}`}>
                                            <img
                                                src={product.vImage}
                                                className="img-fluid"
                                                alt="Image"
                                            />
                                        </Link>
                                    </div>
                                    <h3>{product.vProductName}</h3>
                                    <p> र {product.vPrice}</p>
                                </div>
                            </>
                        ))
                    }
                </div>
            </section>
            {/* *********** Classic Section ************* */}
            <section className="classic">
                <div className="img">
                    <img src={img1} alt="Image" className="img-fluid" />
                </div>
            </section>
            {/* ************ Diwali section************  */}
            <section className="diwali">
                <div className="img">
                    <img
                        src={img2}
                        alt="Image"
                        className="img-fluid"
                        style={{ width: "100%" }}
                    />
                </div>
            </section>
            {/* *************Contact Section ************* */}
            <Footer />
        </>
    );
};

export default HomePage;
