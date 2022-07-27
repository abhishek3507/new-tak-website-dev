import videojs from "video.js";
import "video.js/dist/video-js.css";
import { useEffect, useRef } from "react";

const VideoPlayer = ({ url, playNext = null }) => {
  const videoPlayer = useRef();
  const videoElement = useRef();

  const videoJsOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    preload: "auto",
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
      data-vjs-player
      ref={videoElement}
      data-setup='{"fluid": true}'
      controls
      preload="auto"
      className="video-js vjs-default-skin vjs-16-9 vjs-big-play-centered"
    />
  );
};

export default VideoPlayer;
