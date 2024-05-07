import React from 'react'

const ScrollToTop = () => {

    // const [isActive, setIsButtonActive] = React.useState(false);

    // window.addEventListener("scroll", () => {
    //     if (window.scrollY > 700) {
    //         setIsButtonActive(true);
    //     } else {
    //         setIsButtonActive(false);
    //     }
    // });

    // const top = () => window.scrollTo({ top: 0, behavior: "smooth" });

    const handleWhatsAppClick = () => {
        window.open('https://wa.me/+919978944051', '_blank');
    };


    return (
        <>
            {/* <button id="backToTop" className={`${isActive ? "show" : "hidden"}`} onClick={top}>
                <i className="fa fa-chevron-up" aria-hidden="true"></i>
            </button> */}

            <button id="backToTop1" onClick={handleWhatsAppClick}>
                <img alt='IconImage' src={process.env.PUBLIC_URL + "/Images/icon/1.png"} />
            </button>

        </>
    )
}

export default ScrollToTop
