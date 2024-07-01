import React from "react"
import { useEffect, useState, useContext } from 'react';
import "./Training.css"
import { getDataFromSharePointList } from '../../utility/utility';
import searchBarData from "./userContext";
import { DashboardName, QTB_left, QTB_right } from '../../constants/constants';
import Videotrainingimage from "./Training_images";

/**
 *  QuickTraining Component contains every element of Quick Training Bytes Section
 */

const QuickTraining = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    let [isAtStart, setIsAtStart] = useState(true);
    let [isAtEnd, setIsAtEnd] = useState(true);
    const [data, setData] = useState([]);
    const [tableListData, setTableListData] = useState([]);
    const [urls, setUrls] = useState([]);
    const [description, setDescription] = useState([]);
    const [thumbnail, setThumbnail] = useState([]);
    const [cate, setCate] = useState("");
    const { search, setSearch } = useContext(searchBarData);
    let url2 = undefined;
    let desc2 = undefined;
    let thum2 = undefined;
    /**
     * getUrls function extracts video url link from selected video data list
     * @param filterTableItems It the filtered video list which is extracted from complete video list after selecting a tab.
     * @returns Function is used to pass the url of the of the videos in a specific selected tab.
     */

    const getUrls = (filterTableItems) => {
        const VideoUrl = filterTableItems.map(VideoUrl => VideoUrl.Link.Url);
        return VideoUrl;
    }

    /**
     * getDescription function extracts video description from selected video data list
     * @param filterTableItems It the filtered video list which is extracted from complete video list after selecting a tab.
     * @returns Function is used to pass the description of the of the videos in a specific selected tab.
     */

    const getDescription = (filterTableItems) => {
        const Description = filterTableItems.map(Description => Description.Dashboardnamespace);
        return Description;
    }

    /**
     * getThumbnail function extracts video thumbnail from selected video data list
     * @param filterTableItems It the filtered video list which is extracted from complete video list after selecting a tab.
     * @returns Function is used to pass the thumbnail of the of the videos in a specific selected tab.
     */

    const getThumbnail = (filterTableItems) => {
        const Thumbnail = filterTableItems.map(Thumbnail => Thumbnail.Thumbnail);
        return Thumbnail;
    }

    /**
     * getTableData function fetches data from the API calls, creates a new video data list according to the selected(active) tab
     * tableList contains Title,Link,Dashboardnamespace,Thumbnail of all videos
     * uniqueTitle contains the active tab's title
     * correspondingTableList contains the filtered video list according to item title that is according to uniqueTitle
     * This function is called when webpage is loaded in order to filter video list according to the first active default element.
     */

    const getTableData = async () => {
        let fields = `Title,Link,Dashboardnamespace,Thumbnail`;
        const tableList = await getDataFromSharePointList(DashboardName, fields);
        setTableListData(tableList);
        const uniqueTitle = new Set(tableList.map(TabName => TabName.Title));
        const uniqueTitleArray = Array.from(uniqueTitle);
        setData(uniqueTitleArray);
        const correspondingTableList = tableList.filter((item) => item.Title === uniqueTitleArray[0]);
        setUrls(getUrls(correspondingTableList))
        setDescription(getDescription(correspondingTableList))
        setThumbnail(getThumbnail(correspondingTableList))
        handleTabSwitch();
        setCate(uniqueTitleArray[0] as string);
    }

    /** 
     * useEffect calls getTabledata to filter video list according to the active element whenever page renders or loads.
     */

    useEffect(() => {
        getTableData();
    }, []);

    /** 
     * useEffect hook sets up an event listener to track scroll position changes in a container element with the class .video-list, updating isAtStart and isAtEnd states accordingly.
     */

    const handleTabSwitch = () => {
        const scrollContainer = document.querySelector('.video-list');
        if (scrollContainer) {
            const isAtStart = scrollContainer.scrollLeft === 0;
            const isAtEnd = (scrollContainer.scrollLeft + scrollContainer.clientWidth) >= scrollContainer.scrollWidth;
            setIsAtStart(isAtStart);
            setIsAtEnd(isAtEnd);
        }
    };

    useEffect(() => {
        handleTabSwitch();
    }, [urls, tableListData, search]);

    /** 
     * useEffect to handle scroll activation and deactivation.
     */
    const handleScroll = (event: MouseEvent) => {
        const scrollContainer = event.target as HTMLElement;
        if (scrollContainer) {
            const isAtStart = scrollContainer.scrollLeft === 0;
            const isAtEnd = (scrollContainer.scrollLeft + scrollContainer.clientWidth) >= scrollContainer.scrollWidth;
            setIsAtStart(isAtStart);
            setIsAtEnd(isAtEnd);
        }
    };

    function scrolll() {
        var left = document.querySelector(".video-list");
        left.scrollBy(17 * window.innerWidth / 100, 0);
        handleTabSwitch();
    }

    function scrollr() {
        var right = document.querySelector(".video-list");
        right.scrollBy(-17 * window.innerWidth / 100, 0);
        handleTabSwitch();
    }

    const toggleActive = (index) => {
        setActiveIndex(index);
    };

    return (
        <>
            <div className="quick-container">
                <div className="heading">quick training bytes</div>
                <div className='crt'>
                    <div className='list-container'>
                        <ul className='list'>
                            {data.length === 0 ? (
                            <p className="no-data">NO DATA FOUND!</p>
                            ) : (
                            data.map((ele, index) => {
                                if (search === '') {
                                    const correspondingTableList = tableListData.filter((item) => item.Title === ele);
                                    return (
                                        <li key={index}
                                            tabIndex={0}
                                            className={index === activeIndex ? 'active' : ''}
                                            onClick={() => {
                                                toggleActive(index);
                                                setUrls(getUrls(correspondingTableList));
                                                setDescription(getDescription(correspondingTableList))
                                                setThumbnail(getThumbnail(correspondingTableList))
                                                setCate(ele)
                                            }}
                                            onKeyPress={(event) => {
                                                if (event.key === "Enter" || event.key === ' ') {
                                                    toggleActive(index);
                                                    setUrls(getUrls(correspondingTableList));
                                                    setDescription(getDescription(correspondingTableList))
                                                    setThumbnail(getThumbnail(correspondingTableList))
                                                    setCate(ele)
                                                }
                                            }}
                                            title={ele}
                                        >
                                            {ele}
                                        </li>
                                    )
                                }
                                else {
                                    const correspondingTableList = tableListData.filter((article) => {
                                        return search.toLowerCase() === '' ? article : article.Dashboardnamespace.toLowerCase().includes(search.toLowerCase());
                                    });
                                    const matchingLength = correspondingTableList?.length;
                                    if (matchingLength === 0) {
                                        isAtEnd = true;
                                        isAtStart = true;
                                    }
                                    url2 = (getUrls(correspondingTableList));
                                    desc2 = (getDescription(correspondingTableList))
                                    thum2 = (getThumbnail(correspondingTableList))
                                    return (
                                        <li key={index}
                                            onClick={() => {
                                                toggleActive(index);
                                                setSearch('');
                                            }}
                                        >
                                            {ele}
                                        </li>
                                    )
                                }
                            })
                            )}
                        </ul>
                    </div>
                </div>
                <div className='controllr' style={{ visibility: (isAtEnd && isAtStart) ? 'hidden' : 'visible' }}>
                    <img 
                    src={QTB_right} 
                    alt="rightbtn" 
                    title="Scroll left"
                    onClick={scrollr} 
                    style={{ filter: isAtStart ? 'grayscale(100%)' : 'none' }} 
                    tabIndex={0}
                    onKeyPress={(event) => {
                        if (event.key === "Enter" || event.key === ' ') {
                            scrollr();
                        }
                    }}
                    />
                    <img 
                    src={QTB_left} 
                    alt="leftbtn" 
                    title="Scroll right"
                    onClick={scrolll} 
                    style={{ filter: isAtEnd ? 'grayscale(100%)' : 'none' }} 
                    tabIndex={0}
                    onKeyPress={(event) => {
                        if (event.key === "Enter" || event.key === ' ') {
                            scrolll();
                        }
                    }}
                    />
                </div>
                <Videotrainingimage urls={search === '' ? urls : url2} description={search === '' ? description : desc2} thumbnail={search === '' ? thumbnail : thum2} cate={cate} handleScroll={handleScroll} />
            </div>
        </>
    )
}
export default QuickTraining;
