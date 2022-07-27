import { saveAs } from "file-saver";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import MultiCarousel from "../MultiCarousel/MultiCarousel";
import shareItem from "../../utils/shareItem";

const BreakingNewsCarousel = (props) => {
  const [serverError, setServerError] = useState(false);
  const [breakingVideoList, setBreakingVideoList] = useState([]);

  useEffect(() => {
    if (props.data.video && props.data.video?.length > 0) {
      setBreakingVideoList(props.data.video);
    }
  }, []);

  let download = (link, title, id) => {
    saveAs(link, title + ".mp4");
    // clevertap.event.push('video_downloaded',{
    //     "news_id":id,
    //     "news_title":title,
    //     "device_type":"web"
    // });
  };

  let share = (sefUrl, source, title, id) => {
    shareItem.shareToWhatsapp(sefUrl, source, title, id);
    // clevertap.event.push('card_share',{
    //     "news_id":id,
    //     "news_title":title,
    //     "device_type":"web"
    // });
  };

  return (
    <>
      {serverError ? (
        <h1>Server Error</h1>
      ) : (
        <div className="paddingTop10px">
          <div className="spotlite-carouse-heading">
            <h3>
              <FormattedMessage
                defaultMessage="Breaking For You"
                id="discover_breaking_for_you"
              ></FormattedMessage>
            </h3>
          </div>
          <div id="breakingNewsCarousel" className="pt-2">
            <MultiCarousel source="breaking-news">
              {breakingVideoList.map((breakingVideo, index) => (
                <div className="read-card item" key={index}>
                  <div className="card news-card">
                    <Link
                      passHref
                      href={`/${breakingVideo?.sitemap_sef_url}?s=breaking-0-0`}
                    >
                      <a>
                        <div className="card-body thumbnails">
                          <img
                            className="card-img-top"
                            src={
                              breakingVideo?.large_image
                                ? breakingVideo?.large_image
                                : "/assets/images/default-bg.jpg"
                            }
                            alt="Breaking Video"
                            onError={(e) =>
                              (e.target.src = "/assets/images/default-bg.jpg")
                            }
                          />
                        </div>
                      </a>
                    </Link>
                    <div className="card-footer">
                      <button
                        className="btn download-kare-btn"
                        onClick={() =>
                          download(
                            breakingVideo?.v_download_url,
                            breakingVideo?.video_title,
                            breakingVideo?.video_id
                          )
                        }
                      >
                        <img
                          src="/assets/images/icons/download.png"
                          alt="Download"
                        />
                        <FormattedMessage
                          defaultMessage="Download"
                          id="download"
                        ></FormattedMessage>
                      </button>
                      <button
                        className="btn share-kare-btn"
                        onClick={() =>
                          share(
                            breakingVideo?.sitemap_sef_url,
                            "video",
                            breakingVideo?.video_title,
                            breakingVideo?.video_id
                          )
                        }
                      >
                        <a>
                          <img
                            src="/assets/images/icons/share.png"
                            alt="Share"
                          />
                          <FormattedMessage
                            defaultMessage="Share"
                            id="share"
                          ></FormattedMessage>
                        </a>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </MultiCarousel>
          </div>
        </div>
      )}
    </>
  );
};

export default BreakingNewsCarousel;
