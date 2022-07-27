import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import channelSlice from "../../store/channel/channelSlice";
import {
  fetchChannelBreakingData,
  fetchChannelData,
  fetchDefaultChannelData,
  fetchEditorialData,
  fetchLiveStreamsData,
} from "../../store/channel/channelAction";
import { SpinnerWithContainer } from "../../utils/Spinner";
import channelListSlice from "../../store/channel-list/channelListSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import videojs from "video.js";
import "video.js/dist/video-js.css";

import Channel from "./Channels";
import RecommendationCard from "../RecommendationCard";
import EditorialCard from "../EditorialCard";
import BreakingCard from "../BreakingCard";
import { currentDateTime, getFormatedTitle, getFormattedSefUrl } from "../../utils/common";
import { useRouter } from "next/router";
import HeadTag from "../Common/HomeHeadTag";
import LiveNewsCarousel from "../LiveNewsCarousel/LiveNewsCarousel";


const Index = ({ category = "all", channels, currentChannelId }) => {
  const { actions } = channelSlice;
  const { actions: channelListActions } = channelListSlice;
  const isLoading = useSelector((state) => state.channel.isLoading);

  //List fetched from API
  const editorialList = useSelector((state) => state.channel.editorial);
  const breakingList = useSelector((state) => state.channel.breaking);
  const recommendationHomeList = useSelector(
    (state) => state.channel.recommendationHome
  );
  const recommendationOtherChannelList = useSelector(
    (state) => state.channel.recommendationOtherChannel
  );
  const liveList = useSelector((state)=>state.channel.live);

  //List fetched from local storage
  const [editorialLocalStorage,setEditorialLocalStorage]=useState([]);
  const [breakingLocalStorage,setBreakingLocalStorage]=useState([]);
  const [recommendationLocalStorage,setRecommedationLocalStorage]=useState([]);

  const error = useSelector((state) => state.channel.error);
  const [takPage, setTakPage] = useState(2);
  const [channelPage, setChannelPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [endOfList, setEndOfList] = useState(false);

  const [currentVideoDetails,setCurrentVideoDetails] = useState('')

  const videoPlayer = useRef();

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(()=>{
    if(localStorage.editorial){
      let editorialLocalStorage=JSON.parse(localStorage.editorial);
      setEditorialLocalStorage(editorialLocalStorage);
    }

    if(localStorage.recommendation){
      let recommendationLocalStorage=JSON.parse(localStorage.recommendation);
      setRecommedationLocalStorage(recommendationLocalStorage);
    }

    if(localStorage.breaking){
      let breakingLocalStorage = JSON.parse(localStorage.breaking);
      setBreakingLocalStorage(breakingLocalStorage);
    }
  },[])

  useEffect(() => {
    dispatch(actions.resetList());
    dispatch(actions.fetchListStart());
    dispatch(channelListActions.setCurrentChannel(currentChannelId));
    if (category === "all") {
      dispatch(fetchLiveStreamsData(''));
      dispatch(fetchEditorialData());
      dispatch(fetchDefaultChannelData(takPage, limit, []));
      setCurrentVideoDetails('');
      setTakPage((prevState) => prevState + 1);
    } else {
      dispatch(fetchLiveStreamsData(currentChannelId));
      dispatch(fetchChannelBreakingData(currentChannelId));
      dispatch(fetchChannelData(currentChannelId, channelPage, limit, []));
      setCurrentVideoDetails('');
      setChannelPage((prevState) => prevState + 1);
    }
  }, [category]);

  const fetchData = async () => {
    if (category === "all") {
      dispatch(fetchDefaultChannelData(takPage, limit, []));
      setTakPage((prevState) => prevState + 1);
    } else {
      dispatch(fetchChannelData(currentChannelId, channelPage, limit, []));
      setChannelPage((prevState) => prevState + 1);
    }
  };

  const videoJsOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    preload: "auto",
    controlBar: {
      pictureInPictureToggle: false,
      nodownload: true,
      noplaybackrate: true,
    },
  };

  
  const playButton = (id, element, url, source, ratio, title, description, thumbnail, sefUrl, channelId, channelName) => {
    //* pause current running video
    //console.log(videoPlayer?.current, videoPlayer?.current?.paused());
    if (videoPlayer.current) {
      videoPlayer.current.removeClass("show");
      videoPlayer.current.pause();
      videoPlayer.current.reset();
    }

    //* show all cards thumbnail
    let imageDiv = document.querySelectorAll(".thumbnails");
    imageDiv.forEach((el) => {
      el.style.display = "block";
      //console.log(el.children);
      if (el?.children[0]) {
        el.children[0].style.display = "block";
      }
    });

    //* remove new click card thumbnail
    //console.log(element);
    element.style.display = "none";

    //* show new video player and play video
    let fetchedVideoElement = element.closest(".card").children[0].children[1];
    //console.log(fetchedVideoElement);
    fetchedVideoElement.style.display = "block !important";
    const player = videojs(fetchedVideoElement, videoJsOptions, () => {
      console.log("player is ready");
    });

    videoPlayer.current = player;
    player.src({ src: url, type: "application/x-mpegURL" });
    player.addClass("show");
    player.load();
    player.play().then((e) => {
      if (player.paused()) {
        player.reset();
      }
    });

    if(source == 'editorial'){
      editorialLocalStorage.forEach((editorial)=>{
        if(editorial.news_id == id){
          editorial.news_watch_time=currentDateTime();
          editorial.video_status = 'played';
          localStorage.setItem('editorial',JSON.stringify(editorialLocalStorage));
        }
      });
    }

    if(source == 'recommendation'){
      recommendationLocalStorage.forEach((recommendation)=>{
        if(recommendation.news_id == id){
          recommendation.news_watch_time=currentDateTime();
          recommendation.video_status = 'played';
          localStorage.setItem('recommendation',JSON.stringify(recommendationLocalStorage));
        }
      });
    }

    if(source == 'breaking'){
      breakingLocalStorage.forEach((breaking)=>{
        if(breaking.news_id == id){
          breaking.news_watch_time=currentDateTime();
          breaking.video_status = 'played';
          localStorage.setItem('breaking',JSON.stringify(breakingLocalStorage));
        }
      });
    }

    if(sefUrl){
      window.history.replaceState(null,null,'/'+sefUrl);
      setCurrentVideoDetails({
        title:title?title+' | Tak Live Video':'Tak Live: Short Video News, Latest News Streaming, Watch Breaking News',
        description:description?'Watch '+description+' video news. Stay updated with latest video news only on Tak!':'Watch latest breaking news on sports, politics, crime, fitness, sahitya, entertainment and regional videos online with Tak.Live.',
        url:process.env.NEXT_PUBLIC_WEBSITE_URL+'/'+sefUrl,
        thumbnailUrl: thumbnail?thumbnail:'https://www.tak.live/assets/images/header-logo.png'
      });
    }

  };

  const navigateToVideoPage=(title,id,sefUrl)=>{
    let reqTitle=getFormatedTitle(title);
    let otherChannelUrl = window.location.href.split('/').slice(-1)[0].includes('-tak');
    if(otherChannelUrl){
      if(sefUrl){
        let categoryAndSef = getFormattedSefUrl(sefUrl);
        router.push({
          pathname:'/'+categoryAndSef[0]+'/video/'+categoryAndSef[1],
          query:{s:window.location.href.split('/').slice(-1)[0]+'-'+channelId}
        });
      }else{
        router.push({
          pathname:'/video/watch-'+reqTitle+'-'+id,
          query:{s:window.location.href.split('/').slice(-1)[0]+'-'+channelId}
        })
      }
    }else{
      if(sefUrl){
        let categoryAndSef = getFormattedSefUrl(sefUrl);
        router.push('/'+categoryAndSef[0]+'/video/'+categoryAndSef[1]);
      }else{
        router.push('/video/watch-'+reqTitle+'-'+id);
      }
    }
  }



  return (
    <>
    {/* <HeadTag sefUrl={category} url={process.env.NEXT_PUBLIC_WEBSITE_URL+router.asPath} videoObject={currentVideoDetails}></HeadTag> */}
      <section>
      <Channel
        category={category}
        channels={channels}
        currentChannelId={currentChannelId}
      />
      <section id="home">
        <div className="bg-white container minimum-height paddingTopBottom10px">
          <>
            {isLoading && <SpinnerWithContainer />}

            {currentChannelId === 0 && (
              <>
              {
                isLoading===false && liveList?.length>0 && <LiveNewsCarousel data={liveList}/>
              }
                {isLoading === false && editorialList?.length > 0 && (
                  <>
                    {editorialList?.map((content) => (
                      <div key={content.video_id} className="py-2">
                        <EditorialCard
                          content={content}
                          playButton={playButton}
                        />
                      </div>
                    ))}
                  </>
                )}

                {isLoading === false && recommendationHomeList?.length > 0 && (
                  <InfiniteScroll
                    dataLength={recommendationHomeList.length}
                    next={fetchData}
                    hasMore={true}
                  >
                    {recommendationHomeList?.map((content) => (
                      <div key={content.n_id} className="py-2">
                        <RecommendationCard
                          content={content}
                          playButton={playButton}
                        />
                      </div>
                    ))}
                  </InfiniteScroll>
                )}
              </>
            )}

            {currentChannelId !== 0 && (
              <>
              {
                isLoading===false && liveList?.length>0 && currentChannelId==liveList[0].category_id && <LiveNewsCarousel data={liveList}/>
              }
                {isLoading === false && breakingList?.length > 0 && (
                  <>
                    {breakingList?.map((content) => (
                      <div key={content.video_id} className="py-2">
                        <BreakingCard
                          content={content}
                          playButton={playButton}
                        />
                      </div>
                    ))}
                  </>
                )}

                {isLoading === false &&
                  recommendationOtherChannelList?.length > 0 && (
                    <InfiniteScroll
                      dataLength={recommendationOtherChannelList.length}
                      next={fetchData}
                      hasMore={true}
                    >
                      {recommendationOtherChannelList?.map((content) => (
                        <div key={content.n_id} className="py-2">
                          <RecommendationCard
                            content={content}
                            playButton={playButton}
                          />
                        </div>
                      ))}
                    </InfiniteScroll>
                  )}
              </>
            )}

            {isLoading &&
              error &&
              error.length > 0 &&
              (recommendationHomeList?.length <= 0 ||
                recommendationOtherChannelList?.length <= 0) && (
                <div>Server Error !</div>
              )}
          </>
        </div>
      </section>
    </section>
    </>
  );
};

export default Index;
