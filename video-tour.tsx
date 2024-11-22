import React from "react"
import { useState, useRef} from "react"
import "./video-tour.css"
import Table from "./document_table"
import { VTrectangle, Video1thumbnail, Video2thumbnail, playbtn, BackgroundImage, VTvideo1, VTvideo2, TrainingListLink  } from "../../constants/constants"

const Mid = () => {
  const [iscontrol1, setcontrol1] = useState(false);
  const [iscontrol2, setcontrol2] = useState(false);
  const videoRef1 = useRef(null)
  const videoRef2 = useRef(null)

  const video1Description = "Quick Tour of GNRM portal";
  const video2Description = "Quick Tour of Global filter";

  /**
   * Mid Component contains all the elements for Video Tour Section 
   */

  return (
    <>
      <div className="main-body" style={{ backgroundImage: `url(${BackgroundImage})` }}>
        <p className="head">NEW HERE? LET'S GIVE YOU QUICK TOUR!</p>
        <div className="partition">
          <div className="videos">
            <span>Videos </span>
            <img src={VTrectangle} alt="rectangle" />
            <div className="row">
              <div className="col">
                <div className="contain"
                >
                  {!iscontrol1 && <div style={{ position: "absolute", backgroundColor: "black", opacity: "0.3", width: "100%", height: "100%", zIndex: "1", borderRadius: "12px" }} ></div>}
                  <video className="vid-img" 
                  ref={videoRef1} 
                  src={VTvideo1} 
                  title="video player" 
                  muted 
                  picture-in-picture={"true"} 
                  poster={Video1thumbnail} 
                  controls={iscontrol1} 
                  tabIndex={0}
                  onKeyPress={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      setcontrol1(!iscontrol1)
                      setcontrol2(false)
                      videoRef1.current.play()
                      videoRef2.current.pause()
                    }
                  }}
                  />
                  <img 
                  src={playbtn} 
                  alt="play" 
                  title="Play Video"
                  className={iscontrol1 ? "" : "playbutton"} onClick={() => {
                    setcontrol1(!iscontrol1)
                    setcontrol2(false)
                    videoRef1.current.play()
                    videoRef2.current.pause()
                  }} />
                  <p className={iscontrol1 ? "" : "qt"}>{video1Description}</p>
                </div>
                <div className="contain"
                >
                  {!iscontrol2 && <div style={{ position: "absolute", backgroundColor: "black", opacity: "0.3", width: "100%", height: "100%", zIndex: "1", borderRadius: "12px" }} ></div>}
                  <video 
                  className="vid-img" 
                  ref={videoRef2} 
                  src={VTvideo2} 
                  title="video player" 
                  muted 
                  picture-in-picture={"true"} 
                  poster={Video2thumbnail} 
                  controls={iscontrol2} 
                  tabIndex={0}
                  onKeyPress={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      setcontrol2(!iscontrol2)
                      setcontrol1(false)
                      videoRef2.current.play()
                      videoRef1.current.pause()
                    }
                  }}
                  />
                  <img 
                  src={playbtn} 
                  alt="play" 
                  title="Play Video"
                  className={iscontrol2 ? "" : "playbutton"} onClick={() => {
                    setcontrol2(!iscontrol2)
                    setcontrol1(false)
                    videoRef2.current.play()
                    videoRef1.current.pause()
                  }} />
                  <p className={iscontrol2 ? "" : "qt"}>{video2Description}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="documents" style={{ marginTop: "4.15%" }}>
            <span>Documents </span>
            <img src={VTrectangle} alt="rectangle" />
            <br />
            <div className="table"><Table /></div>
            <div className="viewall">
              <a href={TrainingListLink} target="_blank" title="View All">View All</a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Mid;
