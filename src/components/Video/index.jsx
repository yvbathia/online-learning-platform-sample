/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import PlayLogo from "../../Images/play.png";
import s from "./Video.module.scss";
import ActivityContext from "../../ActivityContext";

const propTypes = {
  urls: PropTypes.array.isRequired
};

const Video = ({ urls }) => {
  const [isPlay, setIsPLay] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [videoUrls, setVideoUrls] = useState([]);
  const [videoThumbnails, setVideoThumbnails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addActivity } = useContext(ActivityContext);
  useEffect(() => {
    async function fetchData() {
      let videoUrlSet = [];
      let videoThumbnailSet = [];
      for (let i = 0; i < urls.length; i++) {
        const data = await fetch(
          `https://vimeo.com/api/oembed.json?url=${urls[i].url}`
        );
        const response = await data.json();
        videoUrlSet.push(`https://player.vimeo.com/video/${response.video_id}`);
        videoThumbnailSet.push(response.thumbnail_url);
      }
      setIsLoading(false);
      setVideoUrls(videoUrlSet);
      setVideoThumbnails(videoThumbnailSet);
      setIsPLay(false);
    }
    fetchData();
  }, [urls]);

  return (
    <div className={s.root}>
      {isPlay && (
        <div className={s.video}>
          <iframe
            className={s.iframe}
            src={`${videoUrls[currentIndex]}${isPlay ? "?autoplay=1" : ""}`}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="video"
          />
        </div>
      )}
      {!isPlay && !isLoading && (
        <div className={s.imageContainer}>
          <div className={s.thumbnail}>
            <img src={videoThumbnails[currentIndex]} alt="thumbnail" />
          </div>
          <div className={s.play}>
            <button
              onClick={() => {
                setIsPLay(true);
                addActivity({
                  "Watching video": videoUrls[currentIndex],
                  time: Date.now()
                });
              }}
            >
              <img className={s.img} src={PlayLogo} alt="play" />
            </button>
          </div>
          <div className={s.thumbnails}>
            {videoThumbnails.map((element, index) => (
              <img
                key={index}
                src={element}
                alt="thumbnail"
                onClick={() => {
                  setCurrentIndex(index);
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

Video.propTypes = propTypes;
export default Video;
