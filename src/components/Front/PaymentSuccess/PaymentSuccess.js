import React from "react";
import "../../../css/home.css";
import { Link } from 'react-router-dom';
import ConfettiGenerator from "confetti-js";


const PaymentSuccess = () => {
    React.useEffect(() => {
        const confettiSettings = { "target": "my-canvas", "max": "200", "size": "1.5", "animate": true, "props": ["circle", "square", "triangle", "line"], "colors": [[165, 104, 246], [230, 61, 135], [0, 199, 228], [253, 214, 126]], "clock": "35", "rotate": true, "width": "1920", "height": "900", "start_from_edge": false, "respawn": true };

        const confetti = new ConfettiGenerator(confettiSettings);
        confetti.render();

        return () => confetti.clear();
    }, [])


    return (
        <>
            <div className="pyro">
                <canvas id="my-canvas"></canvas>

                <div className="wrap">
                    <div className="img">
                        <img
                            src={process.env.PUBLIC_URL + "/Images/Payment.svg"}
                            alt="payment successfull"
                        />
                    </div>
                    <h1>Your Payment is Successfull <i className="far fa-check-circle"></i></h1>
                    <a href="/"> <button className="home"> <i className="fas fa-arrow-left"></i> Back to Home</button> </a>
                </div>
            </div>
        </>
    );
};

export default PaymentSuccess;
