import React from 'react'

const ScrollToTop = () => {

    const [isActive, setIsButtonActive] = React.useState(false);

    window.addEventListener("scroll", () => {
        if (window.scrollY > 700) {
            setIsButtonActive(true);
        } else {
            setIsButtonActive(false);
        }
    });

    const top = () => window.scrollTo({ top: 0, behavior: "smooth" });

    return (
        <>
            <button
                id="backToTop"
                className={`${isActive ? "show" : "hidden"}`}
                onClick={top}
            >
                <i className="fa fa-chevron-up" aria-hidden="true"></i>
            </button>
        </>
    )
}

export default ScrollToTop
