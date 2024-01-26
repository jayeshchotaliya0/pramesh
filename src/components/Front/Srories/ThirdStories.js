import React ,{useEffect} from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import "../../../css/home.css"

const ThirdStories = () => {
    var settings = {
        dots: true,
        cssEase: "linear",
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 1000,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 550,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    useEffect(() => {
      document.body.style.background = "#ffff !important" 
    }, [])
    

    return (
        <>
            <Navbar />
            <section className="stories flex-column container" style={{ overflowX: "hidden" }}>
                <div className="row img secondStories  main">
                    <div className="row">
                        <div className="col-12 mx-auto">
                            <div className="fourth_img_div">
                                <img
                                    src={process.env.PUBLIC_URL + "/Stories/stories4.jpg"}
                                    alt="img"
                                    className="fourthstories_img"
                                />
                            </div>
                        </div>
                    </div>

                    <h1 className="fourth_h1">
                        Handpicked gifts by Sanjay Garg <br />
                        <em> for the Amazing collectors </em>
                    </h1>

                    <div className="row my-5">
                        <div className="col-xs-11  col-md-6 d-flex justify-content-center">
                            <div className="sec_h2_div">
                                <h2 className="sec_h2 text-center">
                                    "A gift should not only be about what the receiver likes, it
                                    should also have a bit of you in it to capture a special
                                    memory or shared moment."
                                </h2>
                            </div>
                        </div>

                        <div className="col-xs-11  col-md-6 ">
                            <div className="sec_img_div">
                                <iframe
                                    width="80%"
                                    height="500"
                                    src="https://www.youtube.com/embed/_UxfHMkW2uw"
                                    title="YouTube video player"
                                    frameborder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowfullscreen
                                ></iframe>
                            </div>
                        </div>
                    </div>

                    <div className="row my-5">
                        <div className="col-xs-11  col-md-6 ">
                            <div className="sec_img_div">
                                <img
                                    src={process.env.PUBLIC_URL + "/Stories/stories26.jpg"}
                                    alt=""
                                    className="secstories_img"
                                />
                            </div>
                        </div>

                        <div className="col-xs-11  col-md-6 d-flex justify-content-center">
                            <div className="sec_h2_div">
                                <h2 className="sec_h2 text-center">
                                    "A gift should not only be about what the receiver likes, it
                                    should also have a bit of you in it to capture a special
                                    memory or shared moment."
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div className="row my-5">
                        <div className="col-xs-11  col-md-6 d-flex justify-content-center">
                            <div className="sec_h2_div">
                                <h2 className="sec_h2 text-center">
                                    "A gift should not only be about what the receiver likes, it
                                    should also have a bit of you in it to capture a special
                                    memory or shared moment."
                                </h2>
                            </div>
                        </div>

                        <div className="col-xs-11  col-md-6 ">
                            <div className="sec_img_div">
                                <img
                                    src={process.env.PUBLIC_URL + "/Stories/stories5.jpg"}
                                    alt=""
                                    className="thirdstories_img"
                                />
                            </div>
                        </div>
                    </div>

                    <h1 className="fourth_h1">
                        He delves into regional classics and reinterprets them as modern
                        dishes perfect for shared meals. The menu is befitting for home
                        cooking with seasonal and accessible ingredients, but not without
                        Manish’s quintessential twist.
                    </h1>

                    {/* First slider  */}


                    <div
                        className="row"
                        style={{
                            marginBottom: "3rem",
                            overflowX: "hidden",
                        }}
                    >
                        <div className="col-xl-11 mx-auto">
                            <div className="slickslider">
                                <Slider {...settings}>
                                    <div className="sliderImg">
                                        <img
                                            src={process.env.PUBLIC_URL + "/Stories/slider1.jpg"}
                                            alt="img"
                                        />
                                    </div>
                                    <div className="sliderImg">
                                        <img
                                            src={process.env.PUBLIC_URL + "/Stories/slider2.jpg"}
                                            alt="img"
                                        />
                                    </div>

                                    <div className="sliderImg">
                                        <img
                                            src={process.env.PUBLIC_URL + "/Stories/slider3.jpg"}
                                            alt="img"
                                        />
                                    </div>
                                    <div className="sliderImg">
                                        <img
                                            src={process.env.PUBLIC_URL + "/Stories/slider4.jpg"}
                                            alt="img"
                                        />
                                        <p className="text-center fontsize_none">र 16000</p>
                                    </div>
                                    <div className="sliderImg">
                                        <img
                                            src={process.env.PUBLIC_URL + "/Stories/slider5.jpg"}
                                            alt="img"
                                        />
                                    </div>
                                    <div className="sliderImg">
                                        <img
                                            src={process.env.PUBLIC_URL + "/Stories/slider6.jpg"}
                                            alt="img"
                                        />
                                    </div>
                                </Slider>
                            </div>
                        </div>
                    </div>


                    {/* Second slider  */}

                    <div
                        className="row"
                        style={{
                            marginBottom: "3rem",
                            overflowX: "hidden",
                        }}
                    >
                        <div className="col-xl-11 mx-auto">
                            <div className="slickslider">
                                <Slider {...settings}>
                                    <div className="sliderImg">
                                        <img
                                            src={process.env.PUBLIC_URL + "/Stories/slider7.jpg"}
                                            alt="img"
                                        />
                                    </div>
                                    <div className="sliderImg">
                                        <img
                                            src={process.env.PUBLIC_URL + "/Stories/slider8.jpg"}
                                            alt="img"
                                        />
                                    </div>

                                    <div className="sliderImg">
                                        <img
                                            src={process.env.PUBLIC_URL + "/Stories/slider9.jpg"}
                                            alt="img"
                                        />
                                    </div>
                                    <div className="sliderImg">
                                        <img
                                            src={process.env.PUBLIC_URL + "/Stories/slider10.jpg"}
                                            alt="img"
                                        />
                                        <p className="text-center fontsize_none">र 16000</p>
                                    </div>
                                    <div className="sliderImg">
                                        <img
                                            src={process.env.PUBLIC_URL + "/Stories/slider11.jpg"}
                                            alt="img"
                                        />
                                    </div>
                                    <div className="sliderImg">
                                        <img
                                            src={process.env.PUBLIC_URL + "/Stories/slider12.jpg"}
                                            alt="img"
                                        />
                                    </div>
                                </Slider>
                            </div>
                        </div>
                    </div>



                    {/* Third slider  */}


                    <div
                        className="row"
                        style={{
                            marginBottom: "3rem",
                            overflowX: "hidden",
                        }}
                    >
                        <div className="col-xl-11 mx-auto">
                            <div className="slickslider">
                                <Slider {...settings}>
                                    <div className="sliderImg">
                                        <img
                                            src={process.env.PUBLIC_URL + "/Stories/slider14.jpg"}
                                            alt="img"
                                        />
                                    </div>
                                    <div className="sliderImg">
                                        <img
                                            src={process.env.PUBLIC_URL + "/Stories/slider13.jpg"}
                                            alt="img"
                                        />
                                    </div>

                                    <div className="sliderImg">
                                        <img
                                            src={process.env.PUBLIC_URL + "/Stories/slider10.jpg"}
                                            alt="img"
                                        />
                                    </div>
                                    <div className="sliderImg">
                                        <img
                                            src={process.env.PUBLIC_URL + "/Stories/slider4.jpg"}
                                            alt="img"
                                        />
                                        <p className="text-center fontsize_none">र 16000</p>
                                    </div>
                                    <div className="sliderImg">
                                        <img
                                            src={process.env.PUBLIC_URL + "/Stories/slider5.jpg"}
                                            alt="img"
                                        />
                                    </div>
                                    <div className="sliderImg">
                                        <img
                                            src={process.env.PUBLIC_URL + "/Stories/slider6.jpg"}
                                            alt="img"
                                        />
                                    </div>
                                </Slider>
                            </div>
                        </div>
                    </div>



                    {/* Fourth slider  */}

                    <div
                        className="row"
                        style={{
                            marginBottom: "3rem",
                            overflowX: "hidden",
                        }}
                    >
                        <div className="col-xl-11 mx-auto">
                            <div className="slickslider">
                                <Slider {...settings}>
                                    <div className="sliderImg">
                                        <img
                                            src={process.env.PUBLIC_URL + "/Stories/slider11.jpg"}
                                            alt="img"
                                        />
                                    </div>
                                    <div className="sliderImg">
                                        <img
                                            src={process.env.PUBLIC_URL + "/Stories/slider9.jpg"}
                                            alt="img"
                                        />
                                    </div>

                                    <div className="sliderImg">
                                        <img
                                            src={process.env.PUBLIC_URL + "/Stories/slider13.jpg"}
                                            alt="img"
                                        />
                                    </div>
                                    <div className="sliderImg">
                                        <img
                                            src={process.env.PUBLIC_URL + "/Stories/slider4.jpg"}
                                            alt="img"
                                        />
                                        <p className="text-center fontsize_none">र 16000</p>
                                    </div>
                                    <div className="sliderImg">
                                        <img
                                            src={process.env.PUBLIC_URL + "/Stories/slider8.jpg"}
                                            alt="img"
                                        />
                                    </div>
                                    <div className="sliderImg">
                                        <img
                                            src={process.env.PUBLIC_URL + "/Stories/slider2.jpg"}
                                            alt="img"
                                        />
                                    </div>
                                </Slider>
                            </div>
                        </div>
                    </div>


                    <div className="row my-5 ">
                        <div className="col-xs-11  col-md-6 ">
                            <div className="sec_img_div">
                                <img
                                    src={process.env.PUBLIC_URL + "/Stories/stories32.jpg"}
                                    className="thirdstories_img"
                                />
                            </div>
                        </div>

                        <div className="col-xs-11  col-md-6 d-flex justify-content-center">
                            <div className="sec_h2_div">
                                <h2 className="sec_h2 text-center">
                                    For this setting Manish uses his favorite, traditional Kansa
                                    dinnerware, made using the age-old technique of hand-beating.
                                    He pairs it with contemporary bone china crockery designs from
                                    Rosabagh & Oceana collections. 24 carat gold detailing of fine
                                    china complements the sheen of Kansa thalis and the whimsical
                                    motifs of tropical flowers, birds and butterflies evoke a
                                    sense of nostalgia and romance. Together they set the mood for
                                    an evening of joy and laughter with loved ones.
                                </h2>
                            </div>
                        </div>
                    </div>

                    <h1 className="fourth_h1">SHOP SAREE COLLECTIONS</h1>

                    <div className="row">
                        <div className="col-lg-4 col-sm-11">
                            <div className="bw_effect_div">
                                <img
                                    src={process.env.PUBLIC_URL + "/Stories/stories33.jpg"}
                                    className="fourthstories_img bw_effect"
                                />
                                <h2>KANSA</h2>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-11">
                            <div className="bw_effect_div">
                                <img
                                    src={process.env.PUBLIC_URL + "/Stories/stories34.jpg"}
                                    className="fourthstories_img bw_effect"
                                />
                                <h2>ROSAB</h2>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-11">
                            <div className="bw_effect_div">
                                <img
                                    src={process.env.PUBLIC_URL + "/Stories/stories35.jpg"}
                                    className="fourthstories_img bw_effect"
                                />
                                <h2>OCEANA</h2>
                            </div>
                        </div>
                    </div>


                </div>
            </section>



            <Footer />
        </>
    );
};

export default ThirdStories;
