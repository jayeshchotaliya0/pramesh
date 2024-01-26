import React, { useState, useEffect } from "react";
import Footer from "../Footer";
import Navbar from "../Navbar";
import axios from "axios";


const FirstStories = () => 
{
   
    const [FirstPageImage, setFirstPageImage] = useState([]);

    var answer = window.location.href;
    const answer_array = answer.split("/");

    if (answer_array[2] == "localhost:3000") {
        var url = "http://localhost/pramesh/backend/api/firstpage_all_image_get";
    } else {
        var url = "https://prameshsilks.com/backend/api/firstpage_all_image_get";
    }

    const mainNavbar = async () => {
        const Firstpage_data = await axios.get(url).catch((err) => {
            
        });

        if (Firstpage_data.data.data) {
            setFirstPageImage(Firstpage_data.data.data);
        }

    };

    useEffect(() => {
        mainNavbar();
    }, []);

    
    return (
        <>
            <Navbar />

            <section className="stories" style={{ overflowX: "hidden" }}>
                <div className="row img firstStories justify-content-center main">
                    <div className="col-11 firststories_div">
                        <h1>Bosporus</h1>
                        <h3>{FirstPageImage.length } Posts</h3>
                    </div>
                    {
                        FirstPageImage.map(function(img,index)
                        {
                            return <div className="col-xs-11  col-md-6 my-3">
                                <div> <img src={img.vImage} className="firststories_img" />
                                </div>
                            </div>
                        })
                    }

                   

                    {/* <div className="col-xs-11  col-md-6 my-3">
                        <div> <img src={process.env.PUBLIC_URL + "/Images/rosa.jpg"} className="firststories_img"/>
                        </div>
                    </div> */}

                    {/* <div className="col-xs-11  col-md-6 my-3">
                        <div >
                            <img
                                src={process.env.PUBLIC_URL + "/Images/rosa.jpg"}
                                className="firststories_img"
                            />
                        </div>
                    </div>

                    <div className="col-xs-11  col-md-6 my-3">
                        <div >
                            <img
                                src={process.env.PUBLIC_URL + "/Images/rosa.jpg"}
                                className="firststories_img"
                            />
                        </div>
                    </div> */}


                </div>
            </section>

            <Footer />
        </>
    );
};

export default FirstStories;
