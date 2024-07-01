import React from "react"
import "./NavBar.css"
import { GNRMlogo, FAQ, TrainingHome, TrainingNavBar } from "../../constants/constants"
import { faExternalLinkAlt, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

/**
 * Navbar Component contains all the elements of the top Navigation Bar
 */
const Navbar = (props) => {
    return (
        <>
            <nav className="main-nav" style={{ backgroundImage: `url(${TrainingNavBar})` }}>
                <div className="left-side">
                    <img src={GNRMlogo} className="logos" alt="GNRMlogo"></img>
                    <div className="vertical-line"></div>
                    <div className="training">
                        <p> Training </p>
                    </div>
                </div>
                <div className="buttons right-side">
                    <a href="#" target="_new" className="question hide-faq">
                        <img src={FAQ} alt="FAQ"></img>
                    </a>
                    <div onClick={() => { props.toggleTrainingPage(false) }} className="Home" tabIndex={11}>
                        <img src={TrainingHome} alt="Home" title="Navigate to Home Page"></img>
                    </div>
                </div>
            </nav>
        </>
    );
};
export default Navbar;
