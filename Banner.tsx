import React from "react"
import { useContext } from "react"
import "./banner.css"
import searchBarData from "./userContext"
import { TrainingSearch, TrainingBanner } from "../../constants/constants"

/**
 * 
 * Ban Component contains all the elements of the Banner Section
 */

const Ban = () => {
    const { search, setSearch } = useContext(searchBarData);

    const handleInputChange = ({ target: { value } }) => {
        setSearch(value);
    }

    return (
        <>
            <div className="main-sec" style={{ backgroundImage: `url(${TrainingBanner})` }}>
                <p className="welcome"> WELCOME TO <br /> <span className="global">Global Net Revenue Management Analytics Hub</span></p>
                <div className="searchbar">
                    <img src={TrainingSearch} alt="searchIcon" className="searchicon" />
                    <input placeholder="Search content in Training Section..." type="text" value={search} onChange={handleInputChange} />
                </div>
                <p className="discover">Discover the GNRM Analytics Hub Training Section in a new way!</p>
            </div>
        </>
    );
}

export default Ban;
