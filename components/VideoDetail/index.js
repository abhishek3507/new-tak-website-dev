import VideoCard from "./VideoCard";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRecommendation,
  fetchChannelRecommendation,
  fetchAnchorRecommendation,
  fetchPollRecommendation,
  fetchBreakingRecommendation,
} from "../../store/video/videoAction";
import { Spinner } from "../../utils/Spinner";
import videoSlice from "../../store/video/videoSlice";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

import InfiniteScroll from "react-infinite-scroll-component";
import Link from "next/link";
import { getMetaKeywordsFromArray } from "../../utils/common";
import { getFormatedTitle } from "../../utils/common";

import HeadTag from "../Common/HomeHeadTag";

const index = ({ data }) => {
  const router = useRouter();
  //const [videoData, setVideoData] = useState(data);
  const [anchorData, setAnchorData] = useState([]);
  const { actions } = videoSlice;
  //const [showCurrentVideo, setShowCurrentVideo] = useState(false);
  const [anchorDataSkip, setAnchorDataSkip] = useState(0);
  const [videoObject, setVideoObject] = useState("");

  const recommendations = useSelector((state) => state.video.recommendations);
  const anchorRecommendations = useSelector(
    (state) => state.video.anchorRecommendations
  );
  const anchorHasMoreData = useSelector(
    (state) => state.video.anchorHasMoreData
  );

  const breakingRecommendations = useSelector(
    (state) => state.video.breakingRecommendations
  );

  const isLoading = useSelector((state) => state.video.isLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.fetchListStart());
    if (router.isReady) {
      const { s, category, slug } = router.query;
      setVideoObject({
        title: data.v_title
          ? data.v_title + " | Tak Live Video"
          : "Tak Live: Short Video News, Latest News Streaming, Watch Breaking News",
        description: data.v_meta_desc
          ? "Watch " +
            data.v_meta_desc +
            " video news. Stay updated with latest video news only on Tak!"
          : "Watch latest breaking news on sports, politics, crime, fitness, sahitya, entertainment and regional videos online with Tak.Live.",
        url: process.env.NEXT_PUBLIC_WEBSITE_URL + "/" + data.v_sitemap_sef_url,
        thumbnailUrl: data.v_largest_app_image
          ? data.v_largest_app_image
          : "https://www.tak.live/assets/images/header-logo.png",
        keywords: data.v_meta_keyword
          ? getMetaKeywordsFromArray(data.v_meta_keyword)
          : "Tak, Tak Live Video, Short Video News, Latest News, Breaking News",
        uploadDate: data.v_updated_datetime
          ? data.v_updated_datetime.split(" ").join("T")
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
        duration: data.v_duration
          ? "PT" + data.v_duration.split(":").join("M") + "S"
          : "00:00",
        videoUrl: data.v_url,
        videoSchema: true,
      });
      if (!s) {
        //* redirect from home
        dispatch(fetchRecommendation());
      }
      if (s) {
        let tmp = s.split("-");
        if (tmp[0] === "vote") {
          dispatch(fetchPollRecommendation(0, 50));
        }
        if (tmp[0] === "breaking") {
          //dispatch(fetchRecommendation(1, 10, source, tmp[3]));
          dispatch(fetchBreakingRecommendation(0, 10));
        }
        if (tmp[0] === "anchor") {
          dispatch(fetchAnchorRecommendation(anchorDataSkip, 10, tmp[1]));
          setAnchorDataSkip(10);
        }
        if (tmp[1] === "tak") {
          //console.log(tmp[2]);
          dispatch(fetchChannelRecommendation(1, 10, tmp[2]));
        }
      }
    }
  }, []);

  useEffect(() => {
    if (anchorRecommendations && anchorRecommendations.length > 0) {
      setAnchorData([...anchorRecommendations]);
    }
  }, [anchorRecommendations]);

  useEffect(() => {
    if (recommendations && recommendations.length > 0) {
      let index = recommendations.findIndex((cnt) => {
        //console.log(cnt.n_id == data.v_id, cnt.n_id, data.v_id);
        return cnt.n_id == data.v_id;
      });
      //console.log(index);
      if (index === -1) {
        //setShowCurrentVideo(true);
        //console.log(data, recommendations[1]);
        let payload = {
          meta_desc: data.v_meta_desc,
          meta_keyword: data.v_meta_keyword,
          meta_title: data.v_meta_title,
          n_description: data.v_short_desc_withhtml,
          sitemap_sef_url: data.v_sitemap_sef_url,
          updated_datetime: data.v_updated_datetime,
          n_title: data.v_title,
          n_largest_app_image: data.v_largest_app_image,
          n_id: data.v_id,
          n_pcategory_name: data.v_pcategory_title,
          n_pcategory_icon: data.v_pcategory_icon,
          n_pcategory_id: data.v_pcategory_id,
          n_share_url: data.v_share_url,
          n_download_url: data.v_download_url,
          n_video: [
            {
              v_title: data.v_title,
              v_duration: data.v_duration,
              v_url: data.v_url,
              v_updated_datetime: data.v_updated_datetime,
              v_share_url: data.v_share_url,
              v_download_url: data.v_download_url,
              v_ratio: data.v_id,
              v_id: data.v_id,
            },
          ],
        };
        dispatch(actions.addToRecommendation(payload));
      }
    }
  }, [recommendations]);

  const fetchMoreAnchorVideos = () => {
    const { s, category, slug } = router.query;
    //console.log(s);
    if (s) {
      let tmp = s.split("-");
      if (tmp[0] === "anchor") {
        dispatch(fetchAnchorRecommendation(anchorDataSkip, 10, tmp[1]));
      }

      setAnchorDataSkip(anchorDataSkip + 10);
    }
  };

  //console.log(router);
  const playNext = async () => {
    console.log("ended");
    //* play next video from playlist
    if (recommendations && recommendations.length > 0) {
      let index = await recommendations.findIndex((cnt) => {
        //console.log(cnt.n_id, data.v_id);
        return cnt.n_id == data.v_id;
      });
      console.log(index);
      if (index !== -1 && index < recommendations.length - 1) {
        let content = recommendations[index + 1];

        router.push(
          `${
            content?.sitemap_sef_url
              ? "/" + content?.sitemap_sef_url
              : "/video/watch-" +
                getFormatedTitle(content?.n_title) +
                "-" +
                content?.n_id
          }`
        );
      }
    }
  };

  return (
    <>
      {/* <HeadTag videoObject={videoObject}></HeadTag> */}
      <section
        id="videoPage"
        className="bg-white minimum-height paddingBottom10px"
      >
        <section>
          <VideoCard video={data} playNext={playNext} />
        </section>
        <section className="container bgwhite py-2 video-container">
          <div className="row">
            <div className="col-12 paddingLeftRight10px">
              <div className="similar-story">
                {isLoading && <Spinner />}
                {isLoading === false && recommendations?.length > 0 && (
                  <InfiniteScroll
                    dataLength={recommendations.length}
                    next={() => {}}
                    hasMore={false}
                  >
                    {recommendations?.map((content, index) => (
                      <Link
                        key={index}
                        passHref
                        href={`${
                          content?.sitemap_sef_url
                            ? "/" + content?.sitemap_sef_url
                            : "/video/watch-" +
                              getFormatedTitle(content?.n_title) +
                              "-" +
                              content?.n_id
                        }`}
                      >
                        <a>
                          <div className="similar-story-card">
                            <div className="similar-story-card-img">
                              <img
                                src={`${
                                  content?.n_largest_app_image
                                    ? content?.n_largest_app_image
                                    : content?.n_large_image
                                    ? content?.n_large_image
                                    : "assets/images/default-bg.jpg"
                                }`}
                                onError={({ currentTarget }) => {
                                  currentTarget.onerror = null;
                                  currentTarget.src =
                                    "/assets/images/default-bg.jpg";
                                }}
                                loading="lazy"
                              />
                              {content.n_id === data.v_id && (
                                <div className="overlay">Now Playing</div>
                              )}
                            </div>
                            <div className="similar-story-card-text">
                              <h6>
                                {content?.n_video &&
                                content?.n_video[0]?.v_title
                                  ? content?.n_video[0]?.v_title
                                  : content?.v_title}
                              </h6>
                              <div className="download-date-time">
                                <div className="download-time">
                                  <img src="/assets/images/icons/play.png" />
                                  &nbsp; Watch&nbsp;|&nbsp;
                                  <span>
                                    {content?.n_video && content?.n_video[0]
                                      ? content?.n_video[0]?.v_duration
                                      : content?.v_duration}
                                  </span>
                                  &nbsp;<span>Mins</span>
                                </div>
                                <div className="download-date">
                                  <span className="day">
                                    {dayjs(content?.published_At).format(
                                      "DD MMM YY"
                                    )}
                                  </span>
                                  &nbsp;<span className="dot">.</span>&nbsp;
                                  <span className="time">
                                    {dayjs(content.published_At).format(
                                      "hh:mm"
                                    )}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </a>
                      </Link>
                    ))}
                  </InfiniteScroll>
                )}
                {isLoading === false && anchorData?.length > 0 && (
                  <InfiniteScroll
                    dataLength={anchorData.length}
                    next={fetchMoreAnchorVideos}
                    hasMore={anchorHasMoreData}
                  >
                    {anchorData?.map((content, index) => (
                      <Link
                        key={index}
                        passHref
                        href={`${
                          content?.sitemap_sef_url
                            ? "/" + content?.sitemap_sef_url
                            : "/video/watch-" +
                              getFormatedTitle(content?.n_title) +
                              "-" +
                              content?.n_id
                        }`}
                      >
                        <a>
                          <div className="similar-story-card">
                            <div className="similar-story-card-img">
                              <img
                                src={`${
                                  content?.large_image
                                    ? content?.large_image
                                    : "assets/images/default-bg.jpg"
                                }`}
                                onError={({ currentTarget }) => {
                                  currentTarget.onerror = null;
                                  currentTarget.src =
                                    "/assets/images/default-bg.jpg";
                                }}
                                loading="lazy"
                              />

                              {content.video_id === data.v_id && (
                                <div className="overlay">Now Playing</div>
                              )}
                            </div>
                            <div className="similar-story-card-text">
                              <h6>{content?.video_title}</h6>
                              <div className="download-date-time">
                                <div className="download-time">
                                  <img src="/assets/images/icons/play.png" />
                                  &nbsp; Watch&nbsp;|&nbsp;
                                  <span>{content?.file_duration}</span>
                                  &nbsp;<span>Mins</span>
                                </div>
                                <div className="download-date">
                                  <span className="day">
                                    {dayjs(content?.published_At).format(
                                      "DD MMM YY"
                                    )}
                                  </span>
                                  &nbsp;<span className="dot">.</span>&nbsp;
                                  <span className="time">
                                    {dayjs(content.published_At).format(
                                      "hh:mm"
                                    )}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </a>
                      </Link>
                    ))}
                  </InfiniteScroll>
                )}
                {isLoading === false && breakingRecommendations?.length > 0 && (
                  <InfiniteScroll
                    dataLength={breakingRecommendations.length}
                    next={() => {}}
                    hasMore={false}
                  >
                    {breakingRecommendations?.map((content, index) => (
                      <Link
                        key={index}
                        passHref
                        href={`${
                          content?.sitemap_sef_url
                            ? "/" + content?.sitemap_sef_url
                            : "/video/watch-" +
                              getFormatedTitle(content?.n_title) +
                              "-" +
                              content?.n_id
                        }`}
                      >
                        <a>
                          <div className="similar-story-card">
                            <div className="similar-story-card-img">
                              <img
                                src={`${
                                  content?.large_image
                                    ? content?.large_image
                                    : "assets/images/default-bg.jpg"
                                }`}
                                onError={({ currentTarget }) => {
                                  currentTarget.onerror = null;
                                  currentTarget.src =
                                    "/assets/images/default-bg.jpg";
                                }}
                                loading="lazy"
                              />

                              {content.video_id === data.v_id && (
                                <div className="overlay">Now Playing</div>
                              )}
                            </div>
                            <div className="similar-story-card-text">
                              <h6>{content?.video_title}</h6>
                              <div className="download-date-time">
                                <div className="download-time">
                                  <img src="/assets/images/icons/play.png" />
                                  &nbsp; Watch&nbsp;|&nbsp;
                                  <span>{content?.file_duration}</span>
                                  &nbsp;<span>Mins</span>
                                </div>
                                <div className="download-date">
                                  <span className="day">
                                    {dayjs(content?.published_At).format(
                                      "DD MMM YY"
                                    )}
                                  </span>
                                  &nbsp;<span className="dot">.</span>&nbsp;
                                  <span className="time">
                                    {dayjs(content.published_At).format(
                                      "hh:mm"
                                    )}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </a>
                      </Link>
                    ))}
                  </InfiniteScroll>
                )}
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default index;
