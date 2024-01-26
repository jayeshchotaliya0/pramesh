import React from "react";
import Footer from "../Footer";
import Navbar from "../Navbar";

const SecondStories = () => {
  return (
    <>
      <Navbar />
      <section className="stories flex-column" style={{ overflowX: "hidden" }}>
        {/* Repeat one time  */}

        <div className="row img secondStories  main">
          <div className="row">
            <div className="col-xs-11  col-md-6 ">
              <div>
                <img
                  src={process.env.PUBLIC_URL + "/Stories/goodearth2.jpg"}
                  alt=""
                  className="firststories_img"
                />
              </div>
            </div>

            <div className="col-xs-11  col-md-6 ">
              <div className="hand_div px-4">
                <h1>Handpicked Gifts</h1>
                <p>
                  Pramesh presents a series of recommendations guest curated by
                  ultimate tastemakers to simplify your last-minute gifting
                  needs. Handpicked luxury for every mood, every personality.
                </p>
              </div>
            </div>
          </div>

          <h1 className="sec_h1">
            Handpicked gifts by Sanjay Garg <br />
            <em> for the eclectic collectors </em>
          </h1>

          {/* Second section ***************************************************************** */}

          <div className="row">
            <div className="col-xs-11  col-md-6 ">
              <div className="sec_img_div">
                <img
                  src={process.env.PUBLIC_URL + "/Stories/stories2.jpg"}
                  alt=""
                  className="secstories_img"
                />
              </div>
            </div>

            <div className="col-xs-11  col-md-6 ">
              <div className="sec_h2_div">
                <h2 className="sec_h2">
                  "A gift should not only be about what the receiver likes, it
                  should also have a bit of you in it to capture a special
                  memory or shared moment."
                </h2>
              </div>
            </div>
          </div>

          {/* third section ********************************* */}

          <div className="row my-5">
            <div className="col-xs-11  col-md-6 ">
              <div className="third_h2_div">
                <h2 className="third_h2">
                  A selection of bespoke objects from the Good Earth universe
                  curated through Sanjay Garg’s unique Indian aesthetic.
                </h2>
                <h2 className="third_h2">
                  Made by master craftsmen, these artisanal objects represent a
                  unique harmony of old and new through their contemporary
                  interpretation of traditional crafts. Timeless gifts for the
                  champions of design, each object is illustrative of the
                  vibrant heritage of India through the story it tells.
                </h2>
              </div>
            </div>

            <div className="col-xs-11  col-md-6 ">
              <div className="third_img_div">
                <img
                  src={process.env.PUBLIC_URL + "/Stories/stories5.jpg"}
                  alt=""
                  className="thirdstories_img"
                />
              </div>
            </div>
          </div>

          {/* fourth section ************************* */}

          <div className=" row m-none customstories ">
            <div className=" col-xl-2 col-md-6 ">
              <div>
                <img
                  src={process.env.PUBLIC_URL + "/Stories/stories3.jpg"}
                  alt=""
                  className="fourth_img"
                />
              </div>
            </div>
            <div className=" col-xl-2 col-md-6 ">
              <div>
                <img
                  src={process.env.PUBLIC_URL + "/Stories/stories15.jpg"}
                  alt=""
                  className="fourth_img"
                />
              </div>
            </div>
            <div className=" col-xl-2 col-md-6 ">
              <div>
                <img
                  src={process.env.PUBLIC_URL + "/Stories/stories25.jpg"}
                  alt=""
                  className="fourth_img"
                />
              </div>
            </div>
            <div className=" col-xl-2 col-md-6 ">
              <div>
                <img
                  src={process.env.PUBLIC_URL + "/Stories/stories24.jpg"}
                  alt=""
                  className="fourth_img"
                />
              </div>
            </div>
            <div className=" col-xl-2 col-md-6 ">
              <div>
                <img
                  src={process.env.PUBLIC_URL + "/Stories/stories21.jpg"}
                  alt=""
                  className="fourth_img"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Repaeat second time  */}

        <div className="row img secondStories  main">
          <h1 className="sec_h1">
            Handpicked gifts by Sanjay Garg <br />
            <em> for the eclectic collectors </em>
          </h1>

          {/* Second section ***************************************************************** */}

          <div className="row">
            <div className="col-xs-11  col-md-6 ">
              <div className="sec_img_div">
                <img
                  src={process.env.PUBLIC_URL + "/Stories/stories7.jpg"}
                  alt=""
                  className="secstories_img"
                />
              </div>
            </div>

            <div className="col-xs-11  col-md-6 ">
              <div className="sec_h2_div">
                <h2 className="sec_h2">
                  "A gift should not only be about what the receiver likes, it
                  should also have a bit of you in it to capture a special
                  memory or shared moment."
                </h2>
              </div>
            </div>
          </div>

          {/* third section ********************************* */}

          <div className="row my-5">
            <div className="col-xs-11  col-md-6 ">
              <div className="third_h2_div">
                <h2 className="third_h2">
                  A selection of bespoke objects from the Good Earth universe
                  curated through Sanjay Garg’s unique Indian aesthetic.
                </h2>
                <h2 className="third_h2">
                  Made by master craftsmen, these artisanal objects represent a
                  unique harmony of old and new through their contemporary
                  interpretation of traditional crafts. Timeless gifts for the
                  champions of design, each object is illustrative of the
                  vibrant heritage of India through the story it tells.
                </h2>
              </div>
            </div>

            <div className="col-xs-11  col-md-6 ">
              <div className="third_img_div">
                <img
                  src={process.env.PUBLIC_URL + "/Stories/stories23.jpg"}
                  alt=""
                  className="thirdstories_img"
                />
              </div>
            </div>
          </div>

          {/* fourth section ************************* */}

          <div className=" row customstories m-none">
            <div className=" col-xl-2 col-md-6 ">
              <div>
                <img
                  src={process.env.PUBLIC_URL + "/Stories/stories3.jpg"}
                  alt=""
                  className="fourth_img"
                />
              </div>
            </div>
            <div className=" col-xl-2 col-md-6 ">
              <div>
                <img
                  src={process.env.PUBLIC_URL + "/Stories/stories15.jpg"}
                  alt=""
                  className="fourth_img"
                />
              </div>
            </div>
            <div className=" col-xl-2 col-md-6 ">
              <div>
                <img
                  src={process.env.PUBLIC_URL + "/Stories/stories25.jpg"}
                  alt=""
                  className="fourth_img"
                />
              </div>
            </div>
            <div className=" col-xl-2 col-md-6 ">
              <div>
                <img
                  src={process.env.PUBLIC_URL + "/Stories/stories24.jpg"}
                  alt=""
                  className="fourth_img"
                />
              </div>
            </div>
            <div className=" col-xl-2 col-md-6 ">
              <div>
                <img
                  src={process.env.PUBLIC_URL + "/Stories/stories21.jpg"}
                  alt=""
                  className="fourth_img"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Reapeat third time  */}

        <div className="row img secondStories  main">
          <h1 className="sec_h1">
            Handpicked gifts by Sanjay Garg <br />
            <em> for the eclectic collectors </em>
          </h1>

          {/* Second section ***************************************************************** */}

          <div className="row">
            <div className="col-xs-11  col-md-6 ">
              <div className="sec_img_div">
                <img
                  src={process.env.PUBLIC_URL + "/Stories/stories12.jpg"}
                  alt=""
                  className="secstories_img"
                />
              </div>
            </div>

            <div className="col-xs-11  col-md-6 ">
              <div className="sec_h2_div">
                <h2 className="sec_h2">
                  "A gift should not only be about what the receiver likes, it
                  should also have a bit of you in it to capture a special
                  memory or shared moment."
                </h2>
              </div>
            </div>
          </div>

          {/* third section ********************************* */}

          <div className="row my-5">
            <div className="col-xs-11  col-md-6 ">
              <div className="third_h2_div">
                <h2 className="third_h2">
                  A selection of bespoke objects from the Good Earth universe
                  curated through Sanjay Garg’s unique Indian aesthetic.
                </h2>
                <h2 className="third_h2">
                  Made by master craftsmen, these artisanal objects represent a
                  unique harmony of old and new through their contemporary
                  interpretation of traditional crafts. Timeless gifts for the
                  champions of design, each object is illustrative of the
                  vibrant heritage of India through the story it tells.
                </h2>
              </div>
            </div>

            <div className="col-xs-11  col-md-6 ">
              <div className="third_img_div">
                <img
                  src={process.env.PUBLIC_URL + "/Stories/stories8.jpg"}
                  alt=""
                  className="thirdstories_img"
                />
              </div>
            </div>
          </div>

          {/* fourth section ************************* */}

          <div className=" row customstories m-none">
            <div className=" col-xl-2 col-md-6 ">
              <div>
                <img
                  src={process.env.PUBLIC_URL + "/Stories/stories3.jpg"}
                  alt=""
                  className="fourth_img"
                />
              </div>
            </div>
            <div className=" col-xl-2 col-md-6 ">
              <div>
                <img
                  src={process.env.PUBLIC_URL + "/Stories/stories15.jpg"}
                  alt=""
                  className="fourth_img"
                />
              </div>
            </div>
            <div className=" col-xl-2 col-md-6 ">
              <div>
                <img
                  src={process.env.PUBLIC_URL + "/Stories/stories25.jpg"}
                  alt=""
                  className="fourth_img"
                />
              </div>
            </div>
            <div className=" col-xl-2 col-md-6 ">
              <div>
                <img
                  src={process.env.PUBLIC_URL + "/Stories/stories24.jpg"}
                  alt=""
                  className="fourth_img"
                />
              </div>
            </div>
            <div className=" col-xl-2 col-md-6 ">
              <div>
                <img
                  src={process.env.PUBLIC_URL + "/Stories/stories21.jpg"}
                  alt=""
                  className="fourth_img"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Repeat fourth time  */}

        <div className="row img secondStories  main">
          <h1 className="sec_h1">
            Handpicked gifts by Sanjay Garg <br />
            <em> for the eclectic collectors </em>
          </h1>

          {/* Second section ***************************************************************** */}

          <div className="row">
            <div className="col-xs-11  col-md-6 ">
              <div className="sec_img_div">
                <img
                  src={process.env.PUBLIC_URL + "/Stories/stories17.jpg"}
                  alt=""
                  className="secstories_img"
                />
              </div>
            </div>

            <div className="col-xs-11  col-md-6 ">
              <div className="sec_h2_div">
                <h2 className="sec_h2">
                  "A gift should not only be about what the receiver likes, it
                  should also have a bit of you in it to capture a special
                  memory or shared moment."
                </h2>
              </div>
            </div>
          </div>

          {/* third section ********************************* */}

          <div className="row my-5">
            <div className="col-xs-11  col-md-6 ">
              <div className="third_h2_div">
                <h2 className="third_h2">
                  A selection of bespoke objects from the Good Earth universe
                  curated through Sanjay Garg’s unique Indian aesthetic.
                </h2>
                <h2 className="third_h2">
                  Made by master craftsmen, these artisanal objects represent a
                  unique harmony of old and new through their contemporary
                  interpretation of traditional crafts. Timeless gifts for the
                  champions of design, each object is illustrative of the
                  vibrant heritage of India through the story it tells.
                </h2>
              </div>
            </div>

            <div className="col-xs-11  col-md-6 ">
              <div className="third_img_div">
                <img
                  src={process.env.PUBLIC_URL + "/Stories/stories18.jpg"}
                  alt=""
                  className="thirdstories_img"
                />
              </div>
            </div>
          </div>

          {/* fourth section ************************* */}

          <div className=" row customstories m-none">
            <div className=" col-xl-2 col-md-6 ">
              <div>
                <img
                  src={process.env.PUBLIC_URL + "/Stories/stories3.jpg"}
                  alt=""
                  className="fourth_img"
                />
              </div>
            </div>
            <div className=" col-xl-2 col-md-6 ">
              <div>
                <img
                  src={process.env.PUBLIC_URL + "/Stories/stories15.jpg"}
                  alt=""
                  className="fourth_img"
                />
              </div>
            </div>
            <div className=" col-xl-2 col-md-6 ">
              <div>
                <img
                  src={process.env.PUBLIC_URL + "/Stories/stories25.jpg"}
                  alt=""
                  className="fourth_img"
                />
              </div>
            </div>
            <div className=" col-xl-2 col-md-6 ">
              <div>
                <img
                  src={process.env.PUBLIC_URL + "/Stories/stories24.jpg"}
                  alt=""
                  className="fourth_img"
                />
              </div>
            </div>
            <div className=" col-xl-2 col-md-6 ">
              <div>
                <img
                  src={process.env.PUBLIC_URL + "/Stories/stories21.jpg"}
                  alt=""
                  className="fourth_img"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Repeat fifth time  */}

        <div className="row img secondStories  main">
          <h1 className="sec_h1">
            Handpicked gifts by Sanjay Garg <br />
            <em> for the eclectic collectors </em>
          </h1>

          {/* Second section ***************************************************************** */}

          <div className="row">
            <div className="col-xs-11  col-md-6 ">
              <div className="sec_img_div">
                <img
                  src={process.env.PUBLIC_URL + "/Stories/stories22.jpg"}
                  alt=""
                  className="secstories_img"
                />
              </div>
            </div>

            <div className="col-xs-11  col-md-6 ">
              <div className="sec_h2_div">
                <h2 className="sec_h2">
                  "A gift should not only be about what the receiver likes, it
                  should also have a bit of you in it to capture a special
                  memory or shared moment."
                </h2>
              </div>
            </div>
          </div>

          {/* third section ********************************* */}

          <div className="row my-5">
            <div className="col-xs-11  col-md-6 ">
              <div className="third_h2_div">
                <h2 className="third_h2">
                  A selection of bespoke objects from the Good Earth universe
                  curated through Sanjay Garg’s unique Indian aesthetic.
                </h2>
                <h2 className="third_h2">
                  Made by master craftsmen, these artisanal objects represent a
                  unique harmony of old and new through their contemporary
                  interpretation of traditional crafts. Timeless gifts for the
                  champions of design, each object is illustrative of the
                  vibrant heritage of India through the story it tells.
                </h2>
              </div>
            </div>

            <div className="col-xs-11  col-md-6 ">
              <div className="third_img_div">
                <img
                  src={process.env.PUBLIC_URL + "/Stories/stories23.jpg"}
                  alt=""
                  className="thirdstories_img"
                />
              </div>
            </div>
          </div>

          {/* fourth section ************************* */}

          <div className=" row customstories m-none">
            <div className=" col-xl-2 col-md-6 ">
              <div>
                <img
                  src={process.env.PUBLIC_URL + "/Stories/stories3.jpg"}
                  alt=""
                  className="fourth_img"
                />
              </div>
            </div>
            <div className=" col-xl-2 col-md-6 ">
              <div>
                <img
                  src={process.env.PUBLIC_URL + "/Stories/stories15.jpg"}
                  alt=""
                  className="fourth_img"
                />
              </div>
            </div>
            <div className=" col-xl-2 col-md-6 ">
              <div>
                <img
                  src={process.env.PUBLIC_URL + "/Stories/stories25.jpg"}
                  alt=""
                  className="fourth_img"
                />
              </div>
            </div>
            <div className=" col-xl-2 col-md-6 ">
              <div>
                <img
                  src={process.env.PUBLIC_URL + "/Stories/stories24.jpg"}
                  alt=""
                  className="fourth_img"
                />
              </div>
            </div>
            <div className=" col-xl-2 col-md-6 ">
              <div>
                <img
                  src={process.env.PUBLIC_URL + "/Stories/stories21.jpg"}
                  alt=""
                  className="fourth_img"
                />
              </div>
            </div>
          </div>
        </div>

        {/* repeat sixth time  */}

        <div className="row img secondStories  main">
          <h1 className="sec_h1">
            Handpicked gifts by Sanjay Garg <br />
            <em> for the eclectic collectors </em>
          </h1>

          {/* Second section ***************************************************************** */}

          <div className="row">
            <div className="col-xs-11  col-md-6 ">
              <div className="sec_img_div">
                <img
                  src={process.env.PUBLIC_URL + "/Stories/stories26.jpg"}
                  alt=""
                  className="secstories_img"
                />
              </div>
            </div>

            <div className="col-xs-11  col-md-6 ">
              <div className="sec_h2_div">
                <h2 className="sec_h2">
                  "A gift should not only be about what the receiver likes, it
                  should also have a bit of you in it to capture a special
                  memory or shared moment."
                </h2>
              </div>
            </div>
          </div>

          {/* third section ********************************* */}

          <div className="row my-5">
            <div className="col-xs-11  col-md-6 ">
              <div className="third_h2_div">
                <h2 className="third_h2">
                  A selection of bespoke objects from the Good Earth universe
                  curated through Sanjay Garg’s unique Indian aesthetic.
                </h2>
                <h2 className="third_h2">
                  Made by master craftsmen, these artisanal objects represent a
                  unique harmony of old and new through their contemporary
                  interpretation of traditional crafts. Timeless gifts for the
                  champions of design, each object is illustrative of the
                  vibrant heritage of India through the story it tells.
                </h2>
              </div>
            </div>

            <div className="col-xs-11  col-md-6 ">
              <div className="third_img_div">
                <img
                  src={process.env.PUBLIC_URL + "/Stories/stories27.jpg"}
                  alt=""
                  className="thirdstories_img"
                />
              </div>
            </div>
          </div>

          {/* fourth section ************************* */}

          <div className=" row customstories m-none">
            <div className=" col-xl-2 col-md-6 ">
              <div>
                <img
                  src={process.env.PUBLIC_URL + "/Stories/stories3.jpg"}
                  alt=""
                  className="fourth_img"
                />
              </div>
            </div>
            <div className=" col-xl-2 col-md-6 ">
              <div>
                <img
                  src={process.env.PUBLIC_URL + "/Stories/stories15.jpg"}
                  alt=""
                  className="fourth_img"
                />
              </div>
            </div>
            <div className=" col-xl-2 col-md-6 ">
              <div>
                <img
                  src={process.env.PUBLIC_URL + "/Stories/stories25.jpg"}
                  alt=""
                  className="fourth_img"
                />
              </div>
            </div>
            <div className=" col-xl-2 col-md-6 ">
              <div>
                <img
                  src={process.env.PUBLIC_URL + "/Stories/stories24.jpg"}
                  alt=""
                  className="fourth_img"
                />
              </div>
            </div>
            <div className=" col-xl-2 col-md-6 ">
              <div>
                <img
                  src={process.env.PUBLIC_URL + "/Stories/stories21.jpg"}
                  alt=""
                  className="fourth_img"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Reapeat seventh  time  */}

        <div className="row img secondStories  main">
          <h1 className="sec_h1">
            Handpicked gifts by Sanjay Garg <br />
            <em> for the eclectic collectors </em>
          </h1>

          {/* Second section ***************************************************************** */}

          <div className="row">
            <div className="col-xs-11  col-md-6 ">
              <div className="sec_img_div">
                <img
                  src={process.env.PUBLIC_URL + "/Stories/stories29.jpg"}
                  alt=""
                  className="secstories_img"
                />
              </div>
            </div>

            <div className="col-xs-11  col-md-6 ">
              <div className="sec_h2_div">
                <h2 className="sec_h2">
                  "A gift should not only be about what the receiver likes, it
                  should also have a bit of you in it to capture a special
                  memory or shared moment."
                </h2>
              </div>
            </div>
          </div>

          {/* third section ********************************* */}

          <div className="row my-5">
            <div className="col-xs-11  col-md-6 ">
              <div className="third_h2_div">
                <h2 className="third_h2">
                  A selection of bespoke objects from the Good Earth universe
                  curated through Sanjay Garg’s unique Indian aesthetic.
                </h2>
                <h2 className="third_h2">
                  Made by master craftsmen, these artisanal objects represent a
                  unique harmony of old and new through their contemporary
                  interpretation of traditional crafts. Timeless gifts for the
                  champions of design, each object is illustrative of the
                  vibrant heritage of India through the story it tells.
                </h2>
              </div>
            </div>

            <div className="col-xs-11  col-md-6 ">
              <div className="third_img_div">
                <img
                  src={process.env.PUBLIC_URL + "/Stories/stories30.jpg"}
                  alt=""
                  className="thirdstories_img"
                />
              </div>
            </div>
          </div>

          {/* fourth section ************************* */}

          <div className=" row customstories m-none">
            <div className=" col-xl-2 col-md-6 ">
              <div>
                <img
                  src={process.env.PUBLIC_URL + "/Stories/stories31.jpg"}
                  alt=""
                  className="fourth_img"
                />
              </div>
            </div>
            <div className=" col-xl-2 col-md-6 ">
              <div>
                <img
                  src={process.env.PUBLIC_URL + "/Stories/stories15.jpg"}
                  alt=""
                  className="fourth_img"
                />
              </div>
            </div>
            <div className=" col-xl-2 col-md-6 ">
              <div>
                <img
                  src={process.env.PUBLIC_URL + "/Stories/stories25.jpg"}
                  alt=""
                  className="fourth_img"
                />
              </div>
            </div>
            <div className=" col-xl-2 col-md-6 ">
              <div>
                <img
                  src={process.env.PUBLIC_URL + "/Stories/stories24.jpg"}
                  alt=""
                  className="fourth_img"
                />
              </div>
            </div>
            <div className=" col-xl-2 col-md-6 ">
              <div>
                <img
                  src={process.env.PUBLIC_URL + "/Stories/stories21.jpg"}
                  alt=""
                  className="fourth_img"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default SecondStories;
