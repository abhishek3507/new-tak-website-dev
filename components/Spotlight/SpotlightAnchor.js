import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import spotlightSlice from '../../store/spotlight/spotlightSlice';
import { Breadcrumb } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import InfiniteScroll from "react-infinite-scroll-component";
import AxiosInstance from "../../store/axios-interceptor";
import { SpinnerWithContainer } from "../../utils/Spinner";
import Head from "next/head";
import Link from "next/link";

export const SpotlightAnchor = (props) => {
  // const {actions} = spotlightSlice;
  const spotlightList = useSelector((state) => state.spotlight.spotlight_list);
  const [anchorVideoList, setAnchorVideoList] = useState([]);
  const [anchorDetails, setAnchorDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const dispatch = useDispatch();
  const [anchorStateParams, setAnchorStateParams] = useState({
    startPage: 10,
    endPage: 20,
    endOfAnchorVideoList: false,
  });

  useEffect(() => {
    if (!props.error) {
      // dispatch(actions.fetchListStart());
      setIsLoading(true);
      setAnchorDetails(props.data.anchor[0]);
      setAnchorVideoList(props.data.video);
      // dispatch(actions.fetchAnchorVideoList(props.data.video));
      setIsLoading(false);
    }
  }, []);

  const fetchData = async () => {
    const response = await AxiosInstance.get(
      "/videosByAnchor/" +
        anchorDetails?.sef_url +
        "/" +
        anchorStateParams.startPage +
        "/" +
        anchorStateParams.endPage
    );
    if (
      response &&
      response.status &&
      response.data.video &&
      response.data.video?.length > 0
    ) {
      response.data.video.forEach((video) => {
        setAnchorVideoList((prevState) => [...prevState, video]);
      });
      setAnchorStateParams((prevState) => ({
        ...prevState,
        startPage: prevState.startPage + 10,
        endPage: prevState.endPage + 10,
      }));
    } else {
      setAnchorStateParams((prevState) => ({
        ...prevState,
        endOfAnchorVideoList: true,
      }));
    }
  };

  return (
    <>
      <Head>
        <title>{`${props.data.anchor[0].author_name} - Watch all video stories with anchor ${props.data.anchor[0].author_name} | Tak.Live`}</title>
        <meta
          name="description"
          content={`${props.data.anchor[0].author_name} - ${props.data.anchor[0].full_description}`}
        />
        <meta property="og:type" content="tak.live" />
        <meta property="og:site_name" content="Tak" />
        <meta
          property="og:title"
          content={`${props.data.anchor[0].author_name} - Watch all video stories with anchor ${props.data.anchor[0].author_name} | Tak.Live`}
        />
        <meta
          property="og:description"
          content={`${props.data.anchor[0].author_name} - ${props.data.anchor[0].full_description}`}
        />
        <meta
          property="og:url"
          content={`https://www.tak.live/spotlight/anchor/${props.data.anchor[0].sef_url}/all`}
        />
        <meta
          property="og:image"
          content="https://www.tak.live/assets/images/header-logo.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="Tak" />
        <meta name="twitter:creator" content="@tak" />
        <meta
          name="twitter:url"
          content={`https://www.tak.live/spotlight/anchor/${props.data.anchor[0].sef_url}/all`}
        />
        <meta
          name="twitter:title"
          content={`${props.data.anchor[0].author_name} - Watch all video stories with anchor ${props.data.anchor[0].author_name} | Tak.Live`}
        />
        <meta
          name="twitter:description"
          content={`${props.data.anchor[0].author_name} - ${props.data.anchor[0].full_description}`}
        />
        <meta
          name="twitter:image"
          content="https://www.tak.live/assets/images/header-logo.png"
        />
        <meta itemProp="name" content="Tak" />
        <meta itemProp="mainEntityOfPage" content="https://www.tak.live" />
        <meta
          itemProp="url"
          content={`https://www.tak.live/spotlight/anchor/${props.data.anchor[0].sef_url}/all`}
        />
        <meta
          itemProp="headline"
          content={`${props.data.anchor[0].author_name} - Watch all video stories with anchor ${props.data.anchor[0].author_name} | Tak.Live`}
        />
        <meta
          itemProp="description"
          content={`${props.data.anchor[0].author_name} - ${props.data.anchor[0].full_description}`}
        />
        <link
          rel="canonical"
          href={`https://www.tak.live/spotlight/anchor/${props.data.anchor[0].sef_url}/all`}
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                item: {
                  "@id": "https://www.tak.live/spotlight/anchor/all",
                  name: "Spotlight",
                },
              },
              {
                "@type": "ListItem",
                position: 2,
                item: {
                  "@id": `https://www.tak.live/spotlight/anchor/${props.data.anchor[0].sef_url}/all`,
                  name: `${props.data.anchor[0].author_name}`,
                },
              },
            ],
          })}
        </script>
      </Head>
      <div className="minimum-height container background-color-white spotlight-all-container">
        {props.error ? (
          "Server Error"
        ) : (
          <>
            {isLoading ? (
              <SpinnerWithContainer />
            ) : (
              <>
                <Breadcrumb>
                  <Breadcrumb.Item href="/">
                    <FormattedMessage
                      defaultMessage="Spotlight"
                      id="footer_spotlight"
                    />
                  </Breadcrumb.Item>
                  <Breadcrumb.Item active>
                    {anchorDetails?.author_name}
                  </Breadcrumb.Item>
                </Breadcrumb>
                <div className="row">
                  <div className="col-12 anchor-header ">
                    <div className="row">
                      <div className="col-12 m-auto bg-danger">
                        <div className="view-user-profile mt-1">
                          <div className="view-user-profile-left">
                            <div className="view-profile-pic-box">
                              <div className="view-profile-avator d-none">
                                S
                              </div>
                              <div className="view-profile-img">
                                <img
                                  src={
                                    anchorDetails?.profile_image
                                      ? anchorDetails?.profile_image
                                      : "assets/images/default-profile.png"
                                  }
                                  onError={(e) =>
                                    (e.target.src =
                                      "/assets/images/default-profile.png")
                                  }
                                  className="img-lg rounded-circle"
                                  alt="Image"
                                />
                              </div>
                            </div>
                            <div className="user-name user-name mt-4 pb-2">
                              <h4 className="text-light">
                                {anchorDetails?.author_name}
                              </h4>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 m-auto">
                        <div className="user-dicription mt-1 mb-4">
                          <p className="view-user-bio mb-0">
                            {anchorDetails?.full_description}
                          </p>
                        </div>
                      </div>
                    </div>
                    <br />
                    <div
                      style={
                        anchorDetails?.full_description?.length <= 0
                          ? { margin: "1.75rem auto 0px" }
                          : { margin: "auto" }
                      }
                    >
                      <div className="user-all-story-headding mt-1">
                        <h3>
                          <FormattedMessage
                            defaultMessage="All Stories"
                            id="spotlight_all_stories"
                          ></FormattedMessage>
                        </h3>
                      </div>
                    </div>
                  </div>

                  {anchorVideoList.length > 0 ? (
                    <div className="all-story-container">
                      <div className="col-12 col-sm-12 m-auto infinite-scroll-section-spotlight">
                        <div>
                          <InfiniteScroll
                            dataLength={anchorVideoList.length}
                            next={fetchData}
                            hasMore={true}
                          >
                            <div className="row paddingTopBottom10px">
                              {anchorVideoList.map((video, index) => (
                                <div className="col-6" key={index}>
                                  {console.log(video)}
                                  <Link
                                    passHref
                                    href={`/${video.sitemap_sef_url}?s=anchor-${video.anchor_id}-0`}
                                  >
                                    <a style={{ color: "#212529" }}>
                                      <div className="story-grid-card">
                                        <div className="story-grid-card-box">
                                          <img
                                            className="news-cover-img"
                                            src={
                                              video?.large_image
                                                ? video?.large_image
                                                : "/assets/images/default-bg.jpg"
                                            }
                                            alt="Story-Thumbnail"
                                            onError={(e) =>
                                              (e.target.src =
                                                "/assets/images/default-bg.jpg")
                                            }
                                          />
                                        </div>
                                      </div>
                                      <div className="mb-3 anchor-video-title">
                                        {video.video_title ? (
                                          <h3>{video?.video_title}</h3>
                                        ) : (
                                          ""
                                        )}
                                      </div>
                                    </a>
                                  </Link>
                                </div>
                              ))}
                            </div>
                          </InfiniteScroll>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="all-story-container"
                      style={{ width: "100%", textAlign: "center" }}
                    >
                      <div className="col-12 paddingTopBottom10px paddingLeftRight10px">
                        <h5>
                          <FormattedMessage
                            defaultMessage="No Story"
                            id="spotlight_no_story"
                          ></FormattedMessage>
                        </h5>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};
