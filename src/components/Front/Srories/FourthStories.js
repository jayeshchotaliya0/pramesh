import React from "react";
import Footer from "../Footer";
import Navbar from "../Navbar";

const FourthStories = () => {
  return (
    <>
      <Navbar />
      <section
        className="stories fourthPage flex-column"
        style={{ overflowX: "hidden" }}
      >
        <div className="row img secondStories  main">
          <div className="row">
            <div className="  col-xl-12  col-md-11 ">
              <div className="fourth_img_div">
                <img
                  src={process.env.PUBLIC_URL + "/Stories/stories4.jpg"}
                  className="fourthstories_img"
                />
              </div>
            </div>
          </div>

          <div className="fourthstories_div">
            <h1>Mithai - The Joy Of Festivities </h1>
            <p>
              With the festive season around the corner, parts of India are
              already preparing for Janmashtami - the Hindu festival celebrating
              the birth of lord Krishna.{" "}
            </p>
            <p>
              While this year, celebrations might be more home-bound and
              in-spirit, the auspicious prasada must not be missed - traditional
              sweets first offered to god, and then distributed amongst family
              members as blessings.
            </p>
            <p>
              A delectable spread of laddoos, petha, panjiri and ghewar are
              customary offerings on Janmashtami. Join us as we celebrate
              traditional Indian sweets that have delighted us through
              generations, along with a selection of more contemporary,
              healthier choices! Each of these is best enjoyed with a generous
              dose of cheer and nostalgia!{" "}
            </p>
          </div>

          {/* First Slider  */}

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
                <div
                  id="carouselExampleControls1"
                  className="carousel slide"
                  data-ride="carousel"
                >
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <img
                        src={process.env.PUBLIC_URL + "/Stories/mSlider1.jpg"}
                        className="fourthstories_img"
                      />
                    </div>
                    <div className="carousel-item">
                      <img
                        src={process.env.PUBLIC_URL + "/Stories/mSlider2.jpg"}
                        className="fourthstories_img"
                      />
                    </div>
                    <div className="carousel-item">
                      <img
                        src={process.env.PUBLIC_URL + "/Stories/mSlider3.jpg"}
                        className="fourthstories_img"
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

          <div className="fourthstories_div">
            <p>
              Sandesh, literally translating to “a message”, got its name from
              the traditional Indian practice of sending boxes of sweets as
              gifts, to friends and family. The more serendipitous version of
              Bengal’s favourite sweetmeat came from an 18th century milkman who
              was left with curdled, unsold milk. He would strain the curdled
              milk, mix some molasses, which was widely available in the
              hinterlands of Bengal, resulting in a paste called makha, the
              prelude to today’s Sandesh.
            </p>
            <p>
              The Portuguese introduced the concept of cheese-based sweets to us
              which encompassed ‘chhena’, the key ingredient of Sandesh. Other
              versions of cheese-based Indian mithai include Chamcham, a simple
              combination of cottage cheese, sugar and water, and the ever
              popular Rasgulla, another renowned Bengali specialty, made with
              boiled milk and dipped in sugar syrup.
            </p>
            <p>
              As you bite into the soft centre of these mithais, and their
              familiar sweetness oozes into your mouth, it’s strangely
              fulfilling. For some, it’s the feeling of coming home.
            </p>
          </div>

          {/* Second Slider  */}

          <div className="row my-5">
            <div className="col-xs-11  col-md-6 ">
              <div className="sec_img_div">
                <div
                  id="carouselExampleControls2"
                  className="carousel slide"
                  data-ride="carousel"
                >
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <img
                        src={process.env.PUBLIC_URL + "/Stories/mSlider4.jpg"}
                        className="fourthstories_img"
                      />
                    </div>
                    <div className="carousel-item">
                      <img
                        src={process.env.PUBLIC_URL + "/Stories/mSlider5.jpg"}
                        className="fourthstories_img"
                      />
                    </div>
                    <div className="carousel-item">
                      <img
                        src={process.env.PUBLIC_URL + "/Stories/mSlider6.jpg"}
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

            <div className="col-xs-11  col-md-6 d-flex justify-content-center">
              <div className="sec_h2_div">
                <h2 className="sec_h2 text-center">
                  Dates have been a staple food of the Middle East for thousands
                  of years. Considered the "fruit of heaven" in Emirati culture,
                  dates have traditionally been known to provide sustenance to
                  the people of the desert.
                </h2>
              </div>
            </div>
          </div>

          <div className="fourthstories_div">
            <p>
              During Ramadan, a date is the first food to pass one’s lips, after
              the sun goes down. Dates are generally accompanied by another
              delicacy, Baklava, the iconic crispy puff pastry steeped in
              centuries-old history. The Greek Baklava is traditionally made
              with thirty-three layers of dough, each of which represents a year
              of the life of Christ.
            </p>
            <p>
              As cultural peripheries blur, middle eastern delicacies like Dates
              and Baklava have found their way into gift boxes, invites and
              dinner tables in India. Loaded with nutritional benefits, dates
              are a great alternative to traditional Indian sweets for more
              mindful eaters and along with Baklava, add a contemporary twist to
              festive spreads.
            </p>
            <p>
              If you’re looking to gift your loved ones a gourmet version of
              regular dates, look for Date Burfis or stuffed Medjool Dates that
              have an amber-hued flesh and a chewy and moist texture.
            </p>
          </div>

          {/* Third Slider  */}

          <div className="row my-5">
            <div className="col-xs-11  col-md-6 d-flex justify-content-center">
              <div className="sec_h2_div">
                <h2 className="sec_h2 text-center">
                  Laddoos of all varieties are the mainstay of traditional
                  festive treats that have been relished across India. They
                  permeate every celebration and herald good news - weddings,
                  festivals, just the simple joy of achieving good grades or
                  even being offered at temples on auspicious occasions!
                </h2>
              </div>
            </div>

            <div className="col-xs-11  col-md-6 ">
              <div className="sec_img_div">
                <div
                  id="carouselExampleControls3"
                  className="carousel slide"
                  data-ride="carousel"
                >
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <img
                        src={process.env.PUBLIC_URL + "/Stories/mSlider7.jpg"}
                        className="fourthstories_img"
                      />
                    </div>
                    <div className="carousel-item">
                      <img
                        src={process.env.PUBLIC_URL + "/Stories/mSlider8.jpg"}
                        className="fourthstories_img"
                      />
                    </div>
                    <div className="carousel-item">
                      <img
                        src={process.env.PUBLIC_URL + "/Stories/mSlider9.jpg"}
                        className="fourthstories_img"
                      />
                    </div>
                  </div>
                  <a
                    className="carousel-control-prev"
                    href="#carouselExampleControls3"
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
                    href="#carouselExampleControls3"
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

          <div className="fourthstories_div">
            <p>
              Considered the “king of Indian sweets”, the quintessential
              Motichoor laddoo is an age-old household favourite! A combination
              of two words - ‘moti’ meaning pearls, and ‘choor’ meaning powdered
              - this saffron-hued laddoo also happens to be lord Ganesha’s
              favourite sweet and is commonly distributed on Ganesh Chaturthi.
            </p>
            <p>
              Originally, a favorite of the Marwari community, delectable
              Motichoor laddoos were made at home by Rajasthani women, weeks
              before Diwali, in anticipation of festive gifting and feasts. As
              Marwari business families assimilated in different parts of India,
              boondi laddoos were absorbed by most culinary cultures.
            </p>
            <p>
              As we get more mindful of the calories in our mithais, gourmet
              sweet brands are introducing contemporary variants of traditional
              Indian sweets, made with natural ingredients and sweeteners, like
              the delicious Pink Coconut Laddoo from Khoya Mithai and Gur
              Chini’s gourmet Wild Rose Petal Gulkand Laddoo, perfect for a
              diversified dessert spread and evolved palates.
            </p>
          </div>

          {/* Fourth  Slider  */}

          <div className="row my-5">
            <div className="col-xs-11  col-md-6 ">
              <div className="sec_img_div">
                <div
                  id="carouselExampleControls4"
                  className="carousel slide"
                  data-ride="carousel"
                >
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <img
                        src={process.env.PUBLIC_URL + "/Stories/mSlider1.jpg"}
                        className="fourthstories_img"
                      />
                    </div>
                    <div className="carousel-item">
                      <img
                        src={process.env.PUBLIC_URL + "/Stories/mSlider3.jpg"}
                        className="fourthstories_img"
                      />
                    </div>
                    <div className="carousel-item">
                      <img
                        src={process.env.PUBLIC_URL + "/Stories/mSlider5.jpg"}
                        className="fourthstories_img"
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

            <div className="col-xs-11  col-md-6 d-flex justify-content-center">
              <div className="sec_h2_div">
                <h2 className="sec_h2 text-center">
                  A savan (monsoon) special, Ghewar is fondly known as the
                  ‘Pride of Rajasthan’. Savoured during festivals like Teej,
                  Makar Sankranti, and Raksha Bandhan, the most prominent
                  characteristic of this traditional sweet is its round shape
                  and honeycomb texture, hinting to the sweetness that lies
                  within. As per customary rituals of Teej, Ghevar is sent as a
                  gift, by the parents of newly married daughters, as a blessing
                  for her long and happy married life.
                </h2>
              </div>
            </div>
          </div>

          <div className="fourthstories_div">
            <p>
              Traditional sweet shops of Rajasthan take pride in mastering the
              unique technique of preparing the perfectly crisp yet porous
              Ghewar.
            </p>
            <p>
              After being deep-fried to perfection, the dessert is drenched with
              sugar syrup, and is typically garnished with thickened milk
              (rabri), silver varak and chopped nuts such as almonds or
              pistachios for additional flavour and crunch!
            </p>
            <p>
              If you’re looking to gift your loved ones a gourmet version of
              regular dates, look for Date Burfis or stuffed Medjool Dates that
              have an amber-hued flesh and a chewy and moist texture.
            </p>
          </div>

          {/* Fifth Slider  */}

          <div className="row my-5">
            <div className="col-xs-11  col-md-6 d-flex justify-content-center">
              <div className="sec_h2_div">
                <h2 className="sec_h2 text-center">
                  A curation of India’s sweets would be incomplete without
                  Mathura’s famed Pedas. Found in every local sweet shop in
                  Mathura the simple and humble Peda is the choice of sweet
                  during Krishna Janmashtami festivities. Prepared with just a
                  handful of ingredients - khoya, milk and sugar and enhanced
                  with traditional flavourings of cardamom and saffron - the
                  comforting creaminess of pedas makes them a favourite amongst
                  the young and old alike.
                </h2>
              </div>
            </div>

            <div className="col-xs-11  col-md-6 ">
              <div className="sec_img_div">
                <div
                  id="carouselExampleControls5"
                  className="carousel slide"
                  data-ride="carousel"
                >
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <img
                        src={process.env.PUBLIC_URL + "/Stories/mSlider2.jpg"}
                        className="fourthstories_img"
                      />
                    </div>
                    <div className="carousel-item">
                      <img
                        src={process.env.PUBLIC_URL + "/Stories/mSlider8.jpg"}
                        className="fourthstories_img"
                      />
                    </div>
                    <div className="carousel-item">
                      <img
                        src={process.env.PUBLIC_URL + "/Stories/mSlider6.jpg"}
                        className="fourthstories_img"
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

          <div className="fourthstories_div">
            <p>
              Originally from Uttar Pradesh, this popular Indian mithai
              eventually found its way in every region of the country. From the
              caramel-coloured Mathura Peda, to Karnataka’s Dharwad Peda to the
              Kandi Peda made in Satara, Maharashtra, this petite delicacy has
              been reinterpreted in many ways.
            </p>
            <p>
              Originally, a favorite of the Marwari community, delectable
              Motichoor laddoos were made at home by Rajasthani women, weeks
              before Diwali, in anticipation of festive gifting and feasts. As
              Marwari business families assimilated in different parts of India,
              boondi laddoos were absorbed by most culinary cultures.
            </p>
            <p>
              But what remains unchanged is the signature soft and pliable
              texture of the peda, which is achieved by roasting the mawa in
              sugar syrup and further hand-mixing until it reaches the desired
              softness. You can now also find organically made varieties of the
              traditional Peda at contemporary mithai shops for your next
              festive spread.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default FourthStories;
