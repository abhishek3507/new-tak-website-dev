import React from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import { useEffect, useRef } from "react";

const VideoPlayer = ({
  url,
  playNext = null,
  muted = false,
  pauseVideo = null,
}) => {
  const videoPlayer = useRef();
  const videoElement = useRef();

  const videoJsOptions = {
    autoplay: false,
    controls: false,
    responsive: true,
    fluid: true,
    preload: "auto",
    loop: true,
    aspectRatio: "9:16",
  };

  const playButton = (url) => {
    //let videoElement = videoElement.current;
    //console.log(typeof videoElement, videoElement);
    if (videoElement.current) {
      const player = videojs(videoElement.current, videoJsOptions, () => {
        console.log("player is ready");
      });

      videoPlayer.current = player;
      player.src({ src: url, type: "application/x-mpegURL" });
      player.load();
      player.play();
    }
  };

  useEffect(() => {
    //console.log(videoPlayer.current);
    if (videoElement.current && url) {
      //currentUrl.current=url;
      playButton(url);
    }
  }, [url]);

  useEffect(() => {
    //console.log("pause-p", pauseVideo, videoPlayer.current);
    if (videoPlayer.current) {
      if (pauseVideo === false) {
        videoPlayer.current.play();
      } else {
        videoPlayer.current.pause();
      }
    }
  }, [pauseVideo]);

  if (playNext && videoPlayer.current) {
    videoPlayer.current.on("ended", () => {
      //console.log("url=", url, "rec=", recommendations);
      //videoPlayer.current.reset();
      playNext();
    });
  }

  //console.log(recommendations);
  return (
    <video
      id="currentVideo"
      className="video-js video vjs-9-16 vjs-default-skin vjs-big-play-centered"
      data-vjs-player
      ref={videoElement}
      data-setup='{"fluid": true}'
      nocontrols="true"
      preload="auto"
      disablePictureInPicture
      playsInline
      muted={muted}
    />
  );
};

export default VideoPlayer;
