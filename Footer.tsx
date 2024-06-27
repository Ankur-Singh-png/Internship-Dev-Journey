import "./Footer.css"
import React from "react"
import ShareFeedback from "../Feedback/ShareFeedback"
import { WorkspaceStore } from '../../context/Workspace';
import { TrainingContactus, TrainingNewsletter, TrainingFooter } from "../../constants/constants";

/**
 * Footer Component contains all the elements of the Footer Section 
 */

const Footer = () => {
    const [showFeedback, setShowFeedback] = React.useState(false);

    /**
     * handleContactButtonClick function takes onclick event to open FeedBack form
     */

    const handleContactButtonClick = () => {
        setShowFeedback(true);
    };

    const closeFBPane = () => {
        setShowFeedback(false);
    };
    return (
        <>
            <div className="main-footer" style={{ backgroundImage: `url(${TrainingFooter})` }}>
                <div className="text-label">
                    <div className="division1">
                    </div>
                    <div className="division2">
                        <p className="explore">explore what's new gnrm newsletter</p>
                        <p className="words">Please click on the below button to download the GNRM Newsletter</p>
                        <div className="footer-logo">
                            <a href={TrainingNewsletter} target="_blank" title="Download the Latest PDF">Download the latest PDF</a>
                        </div>
                    </div>
                </div>
                <div className="contact-us" >
                    <div className="part1">©️ pepsiCo 2023 </div>
                    <div
                        className="contact-us-button"
                        onClick={handleContactButtonClick}
                        tabIndex={0}
                        onKeyPress={(event) => {
                            if (event.key === "Enter" || event.key === " ") {
                                handleContactButtonClick();
                            }
                        }}
                    >
                        <img src={TrainingContactus} alt="Contact-Us" title="Contact-Us" />
                        <div className="part2"> contact us </div>
                    </div>
                    <WorkspaceStore>
                        <div id="flex-root" className="debug">
                            <div style={{ display: showFeedback ? "block" : "none" }}>
                                <ShareFeedback closeFBPane={closeFBPane} displayState={showFeedback} />
                            </div>
                        </div>
                    </WorkspaceStore>
                </div>
            </div>
        </>
    )
}
export default Footer;
