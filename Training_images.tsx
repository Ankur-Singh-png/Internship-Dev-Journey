import React from "react"
import { useState, useRef, useEffect, useContext } from "react";
import searchBarData from "./userContext";
import "./TrainingImage.css";
import { playbtn } from "../../constants/constants";

    /**
     * Trainingimages is Component of Videos tiles present in Quick Training Bytes
     */

function Trainingimages(props) {
  const [activeVideoIndex, setActiveVideoIndex] = useState(null);
  const [vidindex, setvidIndex] = useState("0");
  const vidRef = useRef(null);
  const {search} = useContext (searchBarData);
  const [previousDid, setprevDid] = useState("");
  const [previousVid, setprevVid] = useState("");

    /**
     * This useEffect is used different unique video reference for every video in Quick Training Bytes 
     */

  useEffect(() => {
    vidRef.current = vidindex;
  }, [vidindex]);

    /**
     * This useEffect is used to reset controls on switching tabs in Quick Training 
     */

  useEffect(() => {
    if ((previousVid !== "")) {
      const filteredElements = document.querySelectorAll(".video-container");
      filteredElements.forEach((e: HTMLElement) => {
        e.style.setProperty("display", "flex");
      });
      setActiveVideoIndex(null);
    }
  }, [props.cate]);

    /**
     * playVideo function is used to play the selected video and pause the previous video(if any).
     */

  const playVideo = (vidId, divId, category, event) => {
    event.preventDefault();
    const ele = document.getElementById(vidId) as HTMLVideoElement;
    setvidIndex(category);
    if (vidRef && vidRef.current) {
      if (previousVid !== "") {
        const previousEle: HTMLMediaElement = document.querySelector('#' + previousVid);
        previousEle?.pause();
        document.getElementById(previousDid)?.style.setProperty("display", "flex");
      }
      document.getElementById(divId)?.style.setProperty("display", "none");
      ele?.play();
      setprevDid(divId);
      setprevVid(ele.id);
      setActiveVideoIndex(vidId);
    }
  };

if (props.urls.length > 0) {
    const trainingimages = props.urls.map((url, index) => {
      const divId = props.cate.replace(/ +/g, "") + index;
      const category = props.cate.replace(/ +/g, "");
      const vidId = "vid" + divId;
      return (
        <div className="main-container">
          <li key={index}>
            <video
              ref={vidRef}
              id={vidId}
              className="vid-img"
              src={url.replace(/[?#].*$/, "")}
              controls={activeVideoIndex === vidId}
              poster={props?.thumbnail[index]?.replace(/[?#].*$/, "")}
              title="video player"
              picture-in-picture="true"
              tabIndex={0}
              onKeyPress={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  playVideo(vidId, divId, category, event);
                }
              }}
            ></video>

            <div className="video-container" id={divId}>
              <img
                className="play-btn"
                src={playbtn}
                alt="play"
                title="Play Video"
                tabIndex={0}
                onClick={(event) => playVideo(vidId, divId, category,event)}
                onKeyPress={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    playVideo(vidId, divId, category, event);
                  }
                }}
              />
              <p>{props.description[index]}</p>
            </div>
          </li>
        </div>
      );
    });
    return (
      <div>
        <ul className="video-list" onScroll={(event) => props.handleScroll(event)}>{trainingimages}</ul>
      </div>
    );
  } else {
    return <div></div>;
  }
}
export default Trainingimages;

