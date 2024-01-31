import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import "../../../css/home.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";
import Footer from "../Footer";
import { Link } from "react-router-dom";
import  getEnvironment  from '../../../components/environment';
import axios from "axios";

const Stories = () => {
  const {apiUrl} = getEnvironment(); 
  const [story, setStory] = useState([]);
  var settings = {
    dots: false,
    cssEase: "linear",
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
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



  const storyData = async () => {
    const StoriesArray = await axios.get(`${apiUrl}/stories`);
    if (StoriesArray?.data?.data) {
      setStory(StoriesArray?.data?.data);
    }
  };
  useEffect(() => {
    storyData();
  }, []);


  const StoriesArray = useSelector((state) => state.MainMiniallstoriesdata.AllstoriesdataArray);
  // **************First  Stage *************************
  var vStories1_image = story.vStories1_image;
  var vStories1_Title = story.vStories1_Title;
  var vStories1_Desc = story.vStories1_Desc;
  // ************** Second Stage *************************
  var vSecond_image1 = story.vSecond_image1;
  var vSecond_image2 = story.vSecond_image2;
  var vSecond_image3 = story.vSecond_image3;
  // ************** Third Stage *************************
  var vVideo_Link1 = story.vVideo_Link1;
  var vVideo_Link2 = story.vVideo_Link2;
  // var vVideo_Link3 = StoriesArray.vVideo_Link3;
  // var vVideo_Link4 = StoriesArray.vVideo_Link4;
  // ************** Four Stage *************************
  var vSecond_image = story.vSecond_image;
  var vSecond_Title = story.vSecond_Title;
  var vSecond_Desc = story.vSecond_Desc;

  return (
    <>
      <Navbar />
      <section
        className="stories one container"
        style={{ overflowX: "hidden" }}
      >
        <div className="main mt-5">
          <div className="row justify-content-center mb-5">
            <div className="strLeft col-xl-6 col-lg-9 col-md-9 col-sm-8 col-9 mx-auto ">
              <Link to="/FirstStories">
                <img src={vStories1_image} alt="good Earth" />
              </Link>
            </div>
            <div className="strRight col-xl-5 col-lg-9  col-md-9 col-sm-7  col-9 mx-auto ">
              <div>
                <h1>{vStories1_Title}</h1>
                <p>{vStories1_Desc}</p>
              </div>
            </div>
          </div>

          <div className="row img justify-content-center">
            <div className="col-xl-6  col-lg-9 col-md-9 col-sm-8 col-9 mx-auto">
              <Link to="/SecondStories">
                <img src={vSecond_image1} alt="" />
              </Link>
            </div>
            <div className="col-xl-6 col-lg-9 col-md-9 col-sm-8 col-9 mx-auto">
              <Link to="/ThirdStories">
                <img src={vSecond_image2} alt="good Earth" />
              </Link>
            </div>
          </div>

          <div className="row img justify-content-center my-5">
            <div className="col-xl-12   col-lg-12 col-md-12 col-sm-12 col-12 mx-auto">
              <Link to="/FourthStories">
                <img src={vSecond_image3} alt="good Earth" id="wide" />
              </Link>
            </div>
          </div>

          <h1 className="text-center mb-5">
            'PEHCHAAN' | PRAMESH DOCUMENTARY FILMS
          </h1>

          <div className="row eye mt-5">
            <div className="col-xl-6  col-lg-6 col-md-12 col-sm-12 col-12 mx-auto text-center">
              <iframe
                width="100%"
                height="350"
                src={vVideo_Link1}
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
              {/* <h1>Babu Rao Trailer </h1> */}
              {/* <h3>LEARN MORE</h3> */}
            </div>
            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12  col-12 mx-auto text-center">
              <iframe
                width="100%"
                height="350"
                src={vVideo_Link2}
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>

              {/* <h1>Babu Rao Trailer </h1> */}
              {/* <h3>LEARN MORE</h3> */}
            </div>
          </div>

          <div className="row eye mt-5">
            <div className="col-xl-6  col-lg-6 col-md-12 col-sm-12 col-12 mx-auto text-center">
              <iframe
                width="100%"
                height="350"
                src={vVideo_Link1}
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
              {/* <h1>Babu Rao Trailer </h1> */}
              {/* <h3>LEARN MORE</h3> */}
            </div>
            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12  col-12 mx-auto text-center">
              <iframe
                width="100%"
                height="350"
                src={vVideo_Link2}
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>

              {/* <h1>Babu Rao Trailer </h1> */}
              {/* <h3>LEARN MORE</h3> */}
            </div>
          </div>
          <div className="line"></div>

          <h1 className="text-center mb-5">
            TIMELESS: A LIFETIME OF RELATIONSHIPS{" "}
          </h1>

          <div className="row p-4 mt-5">
            <div className="strLeft col-xl-7 col-lg-9 col-md-9 col-sm-8 col-9 mx-auto mx-auto">
              <Link to="/FifthStories">
                <img src={vSecond_image} alt="good Earth"  />
              </Link>
            </div>
            <div className="strRight col-xl-5 col-lg-9 col-md-9 col-sm-7 col-9 mx-auto ">
              <div>
                <h1>{vSecond_Title}</h1>
                <p>{vSecond_Desc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <div className="row" style={{ background: "#fff", marginBottom: "3rem", overflowX: "hidden" }}>
                <div className="col-xl-11 mx-auto">
                    <div className="slickslider">
                        <Slider {...settings}>
                            <div className="sliderImg">
                                <img
                                    src={process.env.PUBLIC_URL + "/Images/festive3.png"}
                                    alt="img"
                                />
                                <h3 className="text-center">New Panjabi Sarees</h3>
                                <p className="text-center">र 16000</p>
                            </div>
                            <div className="sliderImg">
                                <img
                                    src={process.env.PUBLIC_URL + "/Images/festive2.png"}
                                    alt="img"
                                />
                                <h3 className="text-center">New Panjabi Sarees</h3>
                                <p className="text-center">र 16000</p>
                            </div>

                            <div className="sliderImg">
                                <img
                                    src={process.env.PUBLIC_URL + "/Images/festive1.png"}
                                    alt="img"
                                />
                                <h3 className="text-center">New Panjabi Sarees</h3>
                                <p className="text-center">र 16000</p>
                            </div>
                            <div className="sliderImg">
                                <img
                                    src={process.env.PUBLIC_URL + "/Images/festive4.png"}
                                    alt="img"
                                />
                                <h3 className="text-center">New Panjabi Sarees</h3>
                                <p className="text-center">र 16000</p>
                            </div>
                            <div className="sliderImg">
                                <img
                                    src={process.env.PUBLIC_URL + "/Images/festive2.png"}
                                    alt="img"
                                />
                                <h3 className="text-center">New Panjabi Sarees</h3>
                                <p className="text-center">र 16000</p>
                            </div>
                            <div className="sliderImg">
                                <img
                                    src={process.env.PUBLIC_URL + "/Images/festive1.png"}
                                    alt="img"
                                />
                                <h3 className="text-center">New Panjabi Sarees</h3>
                                <p className="text-center">र 16000</p>
                            </div>
                        </Slider>
                    </div>
                </div>
            </div> */}

      <Footer />
    </>
  );
};

export default Stories;
