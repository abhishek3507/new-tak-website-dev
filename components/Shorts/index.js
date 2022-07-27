import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { fetchShortsListAction } from "../../store/shorts/shortsAction";
import dayjs from "dayjs";
import { useSwipeable } from "react-swipeable";
import Head from "next/head";
import shortsSlice from "../../store/shorts/shortsSlice";
import shareItem from "../../utils/shareItem";
import { getFormatedTitle } from "../../utils/common";
import VideoHeadTag from "../Common/VideoHeadTag";
import { getMetaKeywordsFromArray } from "../../utils/common";

const VideoPlayer = dynamic(() => import("./ShortsPlayer"), {
  ssr: false,
});

const Shorts = ({ listOfShorts, currentShort }) => {
  const [video, setVideo] = useState({});
  const [hide, setHide] = useState(false);
  const [pause, setPause] = useState(false);
  const [muted, setMuted] = useState(true);

  const router = useRouter();

  const [hideNext, setHideNext] = useState(false);
  const [hidePrev, setHidePrev] = useState(false);
  const [page, setPage] = useState(2);
  const [limit, setLimit] = useState(5);
  const [tabHasFocus, setTabHasFocus] = useState(true);

  const { actions } = shortsSlice;
  const dispatch = useDispatch();

  const shortsList = useSelector((state) => state.shorts.shortsList);

  useEffect(() => {
    if (listOfShorts) {
      dispatch(actions.setInitialShortsList(listOfShorts));
    }
  }, []);

  useEffect(() => {
    if (Object.keys(video).length > 0) {
      //console.log(video);
      router.push(`/${video.sitemap_sef_url}`, "", { shallow: true });
    }
  }, [hide, video]);

  
  useEffect(() => {
    const handleFocus = () => {
      console.log('Tab has focus');
      setTabHasFocus(true);
      setPause(false)
    };

    const handleBlur = () => {
      console.log('Tab lost focus');
      setTabHasFocus(false);
      setPause(true)
    };

    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
    };
  }, [tabHasFocus]);

  const pausePlayVideo = (val) => {
    setPause(val);
  };

  const handlers = useSwipeable({
    onSwipedUp: (e) => {
      //console.log("previous", e);
      handleNext(video);
    },
    onSwipedDown: (e) => {
      //console.log("next", e);
      handlePrevious(video);
    },
    onTap: () => {
      setMuted(false);
      pausePlayVideo(!pause);
    },
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  const handleNext = (current) => {
    // console.log("first");
    setMuted(false);
    pausePlayVideo(false);
    if (Object.keys(video).length === 0) {
      if (current.n_id !== shortsList[0].n_id) {
        setVideo(shortsList[0]);
      } else {
        setVideo(shortsList[1]);
      }
      setHide(true);
    } else if (Object.keys(video).length > 0) {
      //console.log(shortsList);
      let index = shortsList.findIndex((shrt) => shrt.n_id === current.n_id);
      //console.log(index);
      if (index !== -1 && index < shortsList.length - 1) {
        //* filter out currentShort from list
        if (currentShort.n_id === shortsList[index + 1].n_id) {
          if (shortsList[index + 2]) {
            setVideo(shortsList[index + 2]);
          }
        } else {
          setVideo(shortsList[index + 1]);
        }
        //* load more logic
        let diff = shortsList.length - 1 - index;
        //console.log("diff=", diff, shortsList.length - 1);
        if (diff <= 5) {
          //console.log("loadmore");
          dispatch(fetchShortsListAction(page, limit));
          setPage(page + 1);
        }
        //setHideNext(false);
      }
    }
  };

  const handlePrevious = (current) => {
    //console.log("prev", current);
    setMuted(false);
    pausePlayVideo(false);
    if (Object.keys(video).length > 0) {
      let index = shortsList.findIndex((shrt) => shrt.n_id === current.n_id);
      //console.log(index);
      if (index !== -1 && index >= 1) {
        setVideo(shortsList[index - 1]);
        //setHidePrev(false);
      }
      if (index === 0) {
        if (currentShort.n_id !== shortsList[0].n_id) {
          setVideo(currentShort);
          setHide(false);
        }
      }
    }
  };

  const shareShort = (data) => {
    shareItem.shareToWhatsapp(
      data.sitemap_sef_url,
      "shorts",
      data.n_id,
      getFormatedTitle(data.n_title)
    );
  };

  const videoObject1 = {
    title: currentShort.v_title
      ? currentShort.v_title + " | Tak Live Video"
      : "Tak Live: Short Video News, Latest News Streaming, Watch Breaking News",
    description: currentShort.v_meta_desc
      ? "Watch " +
        currentShort.v_meta_desc +
        " video news. Stay updated with latest video news only on Tak!"
      : "Watch latest breaking news on sports, politics, crime, fitness, sahitya, entertainment and regional videos online with Tak.Live.",
    url:
      process.env.NEXT_PUBLIC_WEBSITE_URL +
      "/" +
      currentShort.v_sitemap_sef_url,
    thumbnailUrl: currentShort.v_largest_app_image
      ? currentShort.v_largest_app_image
      : "https://www.tak.live/assets/images/header-logo.png",
    keywords: currentShort?.v_meta_keyword
      ? getMetaKeywordsFromArray(currentShort?.v_meta_keyword)
      : "Tak, Tak Live Video, Short Video News, Latest News, Breaking News",
    uploadDate: currentShort.v_updated_datetime
      ? currentShort.v_updated_datetime.split(" ").join("T")
      : new Date().getFullYear() +
        "-" +
        (new Date().getMonth() + 1) +
        "-" +
        new Date().getDate() +
        "T" +
        new Date().getHours() +
        ":" +
        new Date().getMinutes() +
        ":" +
        new Date().getSeconds() +
        "+00:00",
    duration: currentShort.v_duration
      ? "PT" + currentShort.v_duration.split(":").join("M") + "S"
      : "00:00",
    videoUrl: currentShort.v_url,
    videoSchema: true,
  };
  const videoObject2 = {
    title: video.n_title
      ? video.n_title + " | Tak Live Video"
      : "Tak Live: Short Video News, Latest News Streaming, Watch Breaking News",
    description: video.meta_desc
      ? "Watch " +
        video.meta_desc +
        " video news. Stay updated with latest video news only on Tak!"
      : "Watch latest breaking news on sports, politics, crime, fitness, sahitya, entertainment and regional videos online with Tak.Live.",
    url: process.env.NEXT_PUBLIC_WEBSITE_URL + "/" + video.sitemap_sef_url,
    thumbnailUrl: video.n_largest_app_image
      ? video.n_largest_app_image
      : "https://www.tak.live/assets/images/header-logo.png",
    keywords: video?.meta_keyword
      ? video?.meta_keyword
      : "Tak, Tak Live Video, Short Video News, Latest News, Breaking News",
    uploadDate: video.n_updated_datetime
      ? video.n_updated_datetime.split(" ").join("T")
      : new Date().getFullYear() +
        "-" +
        (new Date().getMonth() + 1) +
        "-" +
        new Date().getDate() +
        "T" +
        new Date().getHours() +
        ":" +
        new Date().getMinutes() +
        ":" +
        new Date().getSeconds() +
        "+00:00",
    duration:
      video?.n_video && video?.n_video[0]?.v_duration
        ? "PT" + video?.n_video[0]?.v_duration.split(":").join("M") + "S"
        : "00:00",
    videoUrl: video?.n_share_link,
    videoSchema: true,
  };
  console.log(video);

  return (
    <>
      {hide === false && <VideoHeadTag videoObj={videoObject1} />}
      {hide && <VideoHeadTag videoObj={videoObject2} />}
      <section id="shorts">
        {hide === false && (
          <div {...handlers} className="container bg-white">
            <div className="row short-container">
              <div className="col-12 video-col">
                <div className="video-container" id="videoContainer">
                  {currentShort &&
                    currentShort?.n_video &&
                    currentShort?.n_video[0]?.v_url && (
                      <VideoPlayer
                        url={currentShort?.n_video[0]?.v_url}
                        dispose={hide}
                        pauseVideo={pause}
                        muted={muted}
                      />
                    )}
                </div>

                <div id="video-date-div">
                  <span className="day">
                    {dayjs(currentShort.n_updated_datetime).format("DD MMM YY")}
                  </span>
                  &nbsp;
                  <span className="dot">.</span>&nbsp;
                  <span className="time">
                    {dayjs(currentShort.n_updated_datetime).format("hh:mm")}
                  </span>
                </div>
                <div className="overlay">
                  <h6>{currentShort?.n_title}</h6>
                </div>
                <div
                  className="play-icon"
                  style={
                    pause === false ? { display: "none" } : { display: "block" }
                  }
                >
                  <button className="btn">
                    <img
                      src="/assets/images/icons/play_white.png"
                      className="fa fa-play"
                      alt="Play"
                    />
                  </button>
                </div>
                <div
                  className="unmute-icon"
                  style={
                    muted === true ? { display: "block" } : { display: "none" }
                  }
                >
                  <div>
                    <img src="/assets/images/icons/unmute.png" alt="Unmute" />
                  </div>
                </div>
                <div className="swipe-up" style={{ display: "block" }}>
                  <div>
                    <img src="/assets/images/swipe-up.gif" alt="Swipe Up" />
                    <br />
                    <span>SWIPE UP</span>
                  </div>
                </div>
                <div className="swipe-button-icon">
                  {/* <img
                    src="/assets/images/icons/up-arrow.png"
                    alt="Image swipe icon"
                    className="swipe-top"
                  /> */}
                  <img
                    src="/assets/images/icons/down-arrow.png"
                    alt="Image swipe icon"
                    className="swipe-bottom"
                    onClick={() => handleNext(currentShort)}
                  />
                </div>
                {/* <div
                  className="swipe-top-hover-div"
                  onClick={() => handlePrevious(currentShort)}
                >
                  <span id="previous-hover">Previous</span>
                </div> */}
                <div
                  className="swipe-bottom-hover-div"
                  onClick={() => handleNext(currentShort)}
                >
                  <span id="next-hover">Next</span>
                </div>
                <div
                  className="share-icon"
                  onClick={() => shareShort(currentShort)}
                >
                  <img
                    className="share-bottom"
                    src="/assets/images/share-icon.gif"
                    alt="Share"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        {hide && Object.keys(video).length > 0 && (
          <div {...handlers} className="container bg-white">
            <div className="row short-container">
              <div className="col-12 video-col">
                <div className="video-container" id="videoContainer">
                  {video && video?.n_video && video?.n_video[0]?.v_url && (
                    <VideoPlayer
                      url={video?.n_video[0]?.v_url}
                      dispose={hide}
                      pauseVideo={pause}
                      muted={muted}
                    />
                  )}
                </div>

                <div id="video-date-div">
                  <span className="day">
                    {dayjs(video.n_updated_datetime).format("DD MMM YY")}
                  </span>
                  &nbsp;
                  <span className="dot">.</span>&nbsp;
                  <span className="time">
                    {dayjs(video.n_updated_datetime).format("hh:mm")}
                  </span>
                </div>
                <div className="overlay">
                  <h6>{video?.n_title}</h6>
                </div>
                <div
                  className="play-icon"
                  style={
                    pause === false ? { display: "none" } : { display: "block" }
                  }
                >
                  <button className="btn">
                    <img
                      src="/assets/images/icons/play_white.png"
                      className="fa fa-play"
                      alt="Play"
                    />
                  </button>
                </div>
                <div
                  className="unmute-icon"
                  style={
                    muted === true ? { display: "block" } : { display: "none" }
                  }
                >
                  <div>
                    <img src="/assets/images/icons/unmute.png" alt="Unmute" />
                  </div>
                </div>
                <div className="swipe-up" style={{ display: "block" }}>
                  <div>
                    <img src="/assets/images/swipe-up.gif" alt="Swipe Up" />
                    <br />
                    <span>SWIPE UP</span>
                  </div>
                </div>
                <div className="swipe-button-icon">
                  <img
                    src="/assets/images/icons/up-arrow.png"
                    alt="Image swipe icon"
                    onClick={() => handlePrevious(video)}
                    className="swipe-top"
                  />

                  <img
                    src="/assets/images/icons/down-arrow.png"
                    alt="Image swipe icon"
                    className="swipe-bottom"
                    onClick={() => handleNext(video)}
                  />
                </div>
                <div
                  className="swipe-top-hover-div"
                  onClick={() => handlePrevious(video)}
                >
                  <span id="previous-hover">Previous</span>
                </div>
                <div
                  className="swipe-bottom-hover-div"
                  onClick={() => handleNext(video)}
                >
                  <span id="next-hover">Next</span>
                </div>
                <div className="share-icon" onClick={() => shareShort(video)}>
                  <img
                    className="share-bottom"
                    src="/assets/images/share-icon.gif"
                    alt="Share"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Shorts;
