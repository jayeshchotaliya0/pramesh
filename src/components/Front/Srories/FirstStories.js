import React from "react";
import Footer from "../Footer";
import Navbar from "../Navbar";

const FirstStories = () => {
  return (
    <>
      <Navbar />

      <section className="stories" style={{ overflowX: "hidden" }}>
        <div className="row img firstStories justify-content-center main">
          <div className="col-11 firststories_div">
            <h1>Bosporus</h1>
            <h3>7 Posts</h3>
          </div>

          <div className="col-xs-11  col-md-6 my-3">
            <div>
              <img
                src={process.env.PUBLIC_URL + "/Stories/rosa.jpg"}
                className="firststories_img"
              />
            </div>
          </div>

          <div className="col-xs-11  col-md-6 my-3">
            <div>
              <img
                src={process.env.PUBLIC_URL + "/Stories/goodearth5.jpg"}
                className="firststories_img"
              />
            </div>
          </div>

          <div className="col-xs-11  col-md-6 my-3">
            <div>
              <img
                src={process.env.PUBLIC_URL + "/Stories/goodearth6.jpg"}
                className="firststories_img"
              />
            </div>
          </div>

          <div className="col-xs-11  col-md-6 my-3">
            <div>
              <img
                src={process.env.PUBLIC_URL + "/Stories/goodearth7.jpg"}
                className="firststories_img"
              />
            </div>
          </div>
          <div className="col-xs-11  col-md-6 my-3">
            <div>
              <img
                src={process.env.PUBLIC_URL + "/Stories/goodearth8.jpg"}
                className="firststories_img"
              />
            </div>
          </div>
          <div className="col-xs-11  col-md-6 my-3">
            <div>
              <img
                src={process.env.PUBLIC_URL + "/Stories/goodearth9.jpg"}
                className="firststories_img"
              />
            </div>
          </div>
          <div className="col-xs-11  col-md-6 my-3">
            <div>
              <img
                src={process.env.PUBLIC_URL + "/Stories/goodearth10.jpg"}
                className="firststories_img"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default FirstStories;
