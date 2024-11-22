import React from "react"
import { useState } from "react";
import Navbar from "./NavBar";
import Ban from "./banner";
import Mid from "./video-tour"
import QuickTraining from "./Training";
import Footer from "./Footer";
import searchBarData from "./userContext";

    /**
     * Every Component is called and rendered here
     */

const TrainingSection = (props) => {
    const [search, setSearch] = useState("");

    return (
        <div style={{ position: 'absolute', top: 0, width: '100%' }}>
            <Navbar toggleTrainingPage={props.toggleTrainingPage} />
            <searchBarData.Provider value={{ search, setSearch }} >
                <Ban />
                <Mid />
                <QuickTraining />
            </searchBarData.Provider>
            <Footer />
        </div>
    )
};
export default TrainingSection;
