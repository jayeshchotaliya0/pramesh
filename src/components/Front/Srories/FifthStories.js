import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";

const FifthStories = () => {
  return (
    <>
      <Navbar />
      <section className="stories fifthPage flex-column">
        <div
          className="row img secondStories  main"
          style={{ overflowX: "hidden" }}
        >
          <div className="row">
            <div className=" col-xl-6 col-lg-10  col-xs-10  col-12 mx-auto">
              <div>
                <img
                  src={process.env.PUBLIC_URL + "/Stories/goodearth2.jpg"}
                  className="firststories_img"
                />
              </div>
            </div>

            <div className=" col-xl-6 col-lg-10  col-xs-11  col-12 mx-auto">
              <div className="hand_div">
                <h1>Jodhpur: Must-Visits In The Royal City</h1>
                <p>
                  It is in the twisting alleyways of Jodhpur that the magic of
                  the Blue City truly comes alive.
                </p>
              </div>
            </div>

            <h1 className="fourth_h1">
              As you wander, you may glimpse the whirring of everyday life
              behind the shuttered blue doors and worn indigo facades, and take
              in each shade of cool blue tempered with a warm toffee-tone
              palette.{" "}
            </h1>

            <div className="row my-5 grey">
              <div className="col-xl-6  col-lg-10  col-xs-10  col-12  mx-auto d-flex justify-content-center">
                <div className="fourth_h2_div">
                  <h1>Toorji Ka Jhalra</h1>

                  <h2 className="fourth_h2 ">
                    Toorji Ka Jhalra (Toorji’s Stepwell) is a rosy-red sandstone
                    stepwell built in the early 18th century by Maharaja Abhay
                    Singh’s wife. Restored after years of neglect under the
                    brand new JDH project that seeks to replenish Jodhpur’s
                    stunning cultural legacy, this stepwell is where our new
                    Silk Route-inspired shop is located. A stone's throw from
                    the ramparts of Mehrangarh fort, its undulating chevron-like
                    stairs bring back the old-world charm of Jodhpur royalty
                  </h2>
                </div>
              </div>

              <div className="col-xl-6  col-lg-10  col-xs-10  col-12  mx-auto  ">
                <div className=" fifth_img_div sec_img_div">
                  <div
                    id="carouselExampleControls1"
                    className="w-90 carousel slide"
                    data-ride="carousel"
                    // data-interval="false"    // to turn off the automatic sliding
                  >
                    <div className="carousel-inner overflow-hidden">
                      <div className="carousel-item active">
                        <img
                          src={process.env.PUBLIC_URL + "/Stories/mahal1.jpg"}
                          className="fifthstories_img"
                        />
                      </div>
                      <div className="carousel-item">
                        <img
                          src={process.env.PUBLIC_URL + "/Stories/mahal2.jpg"}
                          className="fifthstories_img"
                        />
                      </div>
                      <div className="carousel-item">
                        <img
                          src={process.env.PUBLIC_URL + "/Stories/mahal3.jpg"}
                          className="fifthstories_img"
                        />
                      </div>
                    </div>
                    <a
                      className="carousel-control-prev"
                      href="#carouselExampleControls1"
                      role="button"
                      data-slide="prev"
                    >
                      <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="sr-only">Previous</span>
                    </a>
                    <a
                      className="carousel-control-next"
                      href="#carouselExampleControls1"
                      role="button"
                      data-slide="next"
                    >
                      <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="sr-only">Next</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="row my-5 w-100 mx-auto">
              <div className="col-xs-12  col-12 ">
                <div className=" fifth_img_div ">
                  <div
                    id="carouselExampleControls2"
                    className="carousel slide"
                    data-ride="carousel"
                  >
                    <div className="carousel-inner overflow-hidden">
                      <div className="carousel-item active">
                        <img
                          src={process.env.PUBLIC_URL + "/Stories/mahal4.jpg"}
                          className="fourthstories_img"
                        />
                      </div>

                      <div className="carousel-item">
                        <img
                          src={process.env.PUBLIC_URL + "/Stories/mahal4.jpg"}
                          className="fourthstories_img"
                        />
                      </div>
                    </div>
                    <a
                      className="carousel-control-prev"
                      href="#carouselExampleControls2"
                      role="button"
                      data-slide="prev"
                    >
                      <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="sr-only">Previous</span>
                    </a>
                    <a
                      className="carousel-control-next"
                      href="#carouselExampleControls2"
                      role="button"
                      data-slide="next"
                    >
                      <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="sr-only">Next</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <h1 className="fourth_h1">Mehrangarh Fort </h1>
            <p className="fourth_p">
              In the heart of Rajasthan lies a citadel of the sun: Mehrangarh
              Fort. Commissioned by Maharaja Man Singh (Jodhpur's last
              independent ruler), its impressive structure is a composite of
              architectural styles determined by each centuries’ ruler. The
              fort's heritage museum houses a fantastic collection of costumes,
              palanquins and paintings and magnificent restorations of four
              period rooms.{" "}
            </p>

            <div className="row w-100 mx-auto">
              <div className="col-xl-6  col-lg-10  col-xs-10  col-12  mx-auto ">
                <div>
                  <img
                    src={process.env.PUBLIC_URL + "/Stories/mahal5.jpg"}
                    className="firststories_img"
                  />
                </div>
              </div>
              <div className="col-xl-6  col-lg-10  col-xs-10  col-12  mx-auto ">
                <div>
                  <img
                    src={process.env.PUBLIC_URL + "/Stories/mahal6.jpg"}
                    className="firststories_img"
                  />
                </div>
              </div>
            </div>

            <h1 className="fourth_h1">
              "A palace that might have been built by titans but coloured by the
              morning sun."{" "}
            </h1>

            <div className="row my-5 grey">
              <div className="col-xl-6  col-lg-10  col-xs-10  col-12  mx-auto  d-flex justify-content-center">
                <div className="fourth_h2_div">
                  <h1>Balsamand Palace</h1>

                  <h2 className="fourth_h2 ">
                    A beautiful summer palace with the lapping waters of the
                    Balsamand lake and surrounded by lush green gardens is where
                    we're heading next in Jodhpur. Built in 1159 AD by the
                    city's rulers as a reservoir to supply the city of Mandore,
                    Balsamand Lake is now a sunny picnic-spot shaded by mango,
                    papaya, pomegranate, guava and plum trees. It was only in
                    the 17th century that the Balsamand Palace was added to the
                    scenic spot, its waterways and landscaped gardens inspired
                    by the Mughal concept of a pleasure palace overlooking a
                    paradise garden.
                  </h2>
                </div>
              </div>

              <div className="col-xl-6  col-lg-10  col-xs-10  col-12  mx-auto ">
                <div className=" fifth_img_div sec_img_div">
                  <div
                    id="carouselExampleControls4"
                    className="w-90 carousel slide"
                    data-ride="carousel"
                  >
                    <div className="carousel-inner overflow-hidden">
                      <div className="carousel-item active">
                        <img
                          src={process.env.PUBLIC_URL + "/Stories/mahal7.jpg"}
                          className="fifthstories_img"
                        />
                      </div>
                      <div className="carousel-item">
                        <img
                          src={process.env.PUBLIC_URL + "/Stories/mahal8.jpg"}
                          className="fifthstories_img"
                        />
                      </div>
                      <div className="carousel-item">
                        <img
                          src={process.env.PUBLIC_URL + "/Stories/mahal9.jpg"}
                          className="fifthstories_img"
                        />
                      </div>
                    </div>
                    <a
                      className="carousel-control-prev"
                      href="#carouselExampleControls4"
                      role="button"
                      data-slide="prev"
                    >
                      <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="sr-only">Previous</span>
                    </a>
                    <a
                      className="carousel-control-next"
                      href="#carouselExampleControls4"
                      role="button"
                      data-slide="next"
                    >
                      <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="sr-only">Next</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <h1 className="fourth_h1">Mandore Gardens </h1>
            <p className="fourth_p">
              Tucked away to the north of the city is Jodhpur's Mandore Gardens,
              an ancient space that was once home to Jodhpur’s Maharajas.
              Abandoned for many decades, its majestic cenotaphs rise above the
              trees, each distinctive from the next, a medley of red sandstone
              against green foliage.{" "}
            </p>

            <div className="row my-5  mx-auto">
              <div className="col-xs-12  col-12 ">
                <div className=" fifth_img_div ">
                  <div
                    id="carouselExampleControls5"
                    className="custom carousel slide"
                    data-ride="carousel"
                  >
                    <div className="carousel-inner overflow-hidden">
                      <div className="carousel-item active">
                        <img
                          src={process.env.PUBLIC_URL + "/Stories/mahal10.jpg"}
                          className="fourthstories_img  w-100"
                        />
                      </div>

                      <div className="carousel-item">
                        <img
                          src={process.env.PUBLIC_URL + "/Stories/mahal11.jpg"}
                          className="fourthstories_img  w-100"
                        />
                      </div>
                      <div className="carousel-item">
                        <img
                          src={process.env.PUBLIC_URL + "/Stories/mahal12.jpg"}
                          className="fourthstories_img  w-100"
                        />
                      </div>
                    </div>
                    <a
                      className="carousel-control-prev"
                      href="#carouselExampleControls5"
                      role="button"
                      data-slide="prev"
                    >
                      <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="sr-only">Previous</span>
                    </a>
                    <a
                      className="carousel-control-next"
                      href="#carouselExampleControls5"
                      role="button"
                      data-slide="next"
                    >
                      <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="sr-only">Next</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h1 className="fourth_h1">
            Raas, Jodhpur’s First Luxury Boutique Hotel{" "}
          </h1>
          <p className="fourth_p">
            {" "}
            you’re looking for an oasis of luxury set in a haveli, look no
            further than Raas, Jodhpur’s first luxury boutique hotel. This
            18th-century haveli, authentically restored in lime mortar and
            sandstone, is a mix of architectural styles. Rajasthani latticed
            facades go hand in hand with its functional elements, marrying
            craftsmanship with contemporary design, and of course, the most
            majestic views of Mehrangarh Fort swiftly at sunset.
          </p>

          <div className="row my-5 w-100 mx-auto">
            <div className="col-xs-12  col-12 ">
              <div className=" fifth_img_div ">
                <div
                  id="carouselExampleControls6"
                  className="carousel slide"
                  data-ride="carousel"
                >
                  <div className="carousel-inner overflow-hidden">
                    <div className="carousel-item active">
                      <img
                        src={process.env.PUBLIC_URL + "/Stories/mahal13.jpg"}
                        className="fourthstories_img"
                      />
                    </div>

                    <div className="carousel-item">
                      <img
                        src={process.env.PUBLIC_URL + "/Stories/mahal14.jpg"}
                        className="fourthstories_img"
                      />
                    </div>
                    <div className="carousel-item">
                      <img
                        src={process.env.PUBLIC_URL + "/Stories/mahal15.jpg"}
                        className="fourthstories_img"
                      />
                    </div>
                    <div className="carousel-item">
                      <img
                        src={process.env.PUBLIC_URL + "/Stories/mahal16.jpg"}
                        className="fourthstories_img"
                      />
                    </div>
                  </div>
                  <a
                    className="carousel-control-prev"
                    href="#carouselExampleControls6"
                    role="button"
                    data-slide="prev"
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="sr-only">Previous</span>
                  </a>
                  <a
                    className="carousel-control-next"
                    href="#carouselExampleControls6"
                    role="button"
                    data-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="sr-only">Next</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="row my-5 grey">
            <div className="col-xl-6  col-lg-10  col-xs-10  col-12  mx-auto d-flex justify-content-center">
              <div className="fourth_h2_div">
                <h1>Umaid Bhawan Palace</h1>

                <h2 className="fourth_h2 ">
                  A gorgeous duet of sandstone and marble makes up the stunning
                  interiors of one of the world’s most beautiful hotels, the
                  Umaid Bhawan Palace in Jodhpur. Designed by British architect
                  Henry Vaughan Lanchester, the palace is a symphony of
                  architectural elements characteristic of the Indo-Deco style
                  popular in the ‘30s and ‘40s, infused with the essence of
                  Indian craftsmanship.
                </h2>
              </div>
            </div>

            <div className="col-xl-6  col-lg-10  col-xs-10  col-12  mx-auto  ">
              <div className=" fifth_img_div sec_img_div">
                <div
                  id="carouselExampleControls7"
                  className="w-90 carousel slide"
                  data-ride="carousel"
                >
                  <div className="carousel-inner overflow-hidden">
                    <div className="carousel-item active">
                      <img
                        src={process.env.PUBLIC_URL + "/Stories/mahal18.jpg"}
                        className="fifthstories_img"
                      />
                    </div>
                    <div className="carousel-item">
                      <img
                        src={process.env.PUBLIC_URL + "/Stories/mahal19.jpg"}
                        className="fifthstories_img"
                      />
                    </div>
                  </div>
                  <a
                    className="carousel-control-prev"
                    href="#carouselExampleControls7"
                    role="button"
                    data-slide="prev"
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="sr-only">Previous</span>
                  </a>
                  <a
                    className="carousel-control-next"
                    href="#carouselExampleControls7"
                    role="button"
                    data-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="sr-only">Next</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default FifthStories;
