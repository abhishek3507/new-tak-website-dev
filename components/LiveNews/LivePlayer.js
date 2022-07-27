import videojs from "video.js";
import "video.js/dist/video-js.css";
import { useEffect, useRef } from "react";

const LivePlayer = ({ url }) => {

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
        if (videoElement.current) {
            const player = videojs(videoElement.current, videoJsOptions, () => {
            });

            videoPlayer.current = player;
            player.src({ src: url, type: "application/x-mpegURL" });
            player.load();
            player.play();
        }
    };

    useEffect(() => {
        if (videoElement.current && url) {
            playButton(url);
        }
    }, [url]);


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
}

export default LivePlayer;