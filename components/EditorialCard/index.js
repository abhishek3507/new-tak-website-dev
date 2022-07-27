import { FormattedMessage } from "react-intl";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/router";
import { saveAs } from "file-saver";
import shareItem from "../../utils/shareItem";

const index = ({ content, playButton }) => {
  const shareToWhatsapp = (id, title, sefUrl, source) => {
    shareItem.shareToWhatsapp(sefUrl, source, title, id);
  };

  const router = useRouter();
  let source =
    Object.keys(router.query).length === 0
      ? `home`
      : `${router.query?.category}-${content.n_pcategory_id}`;

  let link =
    source == "home"
      ? `/${content.sitemap_sef_url}`
      : `/${content.sitemap_sef_url}?s=${source}`;

  return (
    <div className="paddingBottom10px read-card">
      <div className="card news-card">
        <div className="card-body">
          <div
            className="thumbnails"
            onClick={(e) =>
              playButton(
                content?.video_id,
                e.target,
                content?.v_url,
                "editorial",
                "16:9",
                content?.video_title,
                content?.meta_desc,
                content?.large_image,
                content?.sitemap_sef_url,
                content?.video_pcategory_id,
                content?.video_pcategory_name
              )
            }
            id={content?.video_id}
          >
            <img
              className="card-img-top"
              src={content.large_image}
              alt={content.meta_title}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = "/assets/images/default-bg.jpg";
              }}
              loading="lazy"
            />
            <div class="news-play-button" style={{pointerEvents:'none'}}>
                <button className="btn"
                ><img src="/assets/images/play.png"
                  className="fa fa-play" /></button>
            </div>

            {/* <div className="news-play-button">
              <button className="btn">
                <img src="assets/images/play.png" className="fa fa-play" />
              </button>
            </div> */}
            {/* <div id="video-date-div">
              <span className="day">
                {dayjs(content.published_date).format("DD MMM YY")}
              </span>
              &nbsp;
              <span className="dot">.</span>&nbsp;
              <span className="time">
                {dayjs(content.published_date).format("hh:mm")}
              </span>
            </div> */}
            <div id="video-duration-div" onClick={(e)=>{e.preventDefault()}}>
              <span>{content.file_duration}</span>
            </div>
          </div>
          <video
            data-vjs-player
            data-setup='{"fluid": true}'
            controls
            preload="auto"
            controlsList="nodownload noplaybackrate"
            disablePictureInPicture
            className="video-js video-player vjs-default-skin vjs-16-9 vjs-big-play-centered"
          />
        </div>
        {/* <div className="pt-2 px-4 video-title">
          <div>
            <Link passHref href={link}>
              <a>
                <h3>{content.video_title}</h3>
              </a>
            </Link>
          </div>
        </div> */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="pt-2 px-3 video-title">
                <div>
                  <Link passHref href={link}>
                    <a>
                      <h3>{content.video_title}</h3>
                    </a>
                  </Link>
                </div>
              </div>
            <div style={{ display: 'flex' }}>
              <button
                href={`${content?.v_download_url}`}
                onClick={() => {
                  saveAs(
                    `${content?.v_download_url}`,
                    `${content.video_title}.mp4`
                  );
                }}
                className="btn download-kare-btn btn-footer"
              >
                <img src="/assets/images/icons/download.png" />
                {/* <FormattedMessage id="download" defaultMessage="Download" /> */}
              </button>
              <button
                className="btn share-kare-btn btn-footer"
                onClick={() =>
                  shareToWhatsapp(
                    editorial?.video_id,
                    editorial?.video_title,
                    editorial?.sitemap_sef_url,
                    "editorial"
                  )
                }
              >
                <a>
                  <img src="/assets/images/icons/share.png" />
                  {/* <FormattedMessage id="share" defaultMessage="Share" /> */}
                </a>
              </button>
            </div>
          </div>
          <div className="pt-2 px-3">
              <span className="day">
                {dayjs(content.published_date).format("DD MMM YY")}
              </span>
              &nbsp;
              <span className="dot">.</span>&nbsp;
              <span className="time">
                {dayjs(content.published_date).format("hh:mm")}
              </span>
            </div>
        <div className="card-footer">
          {/* <button
            href={`${content?.v_download_url}`}
            onClick={() => {
              saveAs(`${content.v_download_url}`, `${content.video_title}.mp4`);
            }}
            className="btn download-kare-btn"
          >
            <img src="/assets/images/icons/download.png" />
            <FormattedMessage id="download" defaultMessage="Download" />
          </button>
          <button
            className="btn share-kare-btn"
            onClick={() =>
              shareToWhatsapp(
                editorial?.video_id,
                editorial?.video_title,
                editorial?.sitemap_sef_url,
                "editorial"
              )
            }
          >
            <a>
              <img src="/assets/images/icons/share.png" />
              <FormattedMessage id="share" defaultMessage="Share" />
            </a>
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default index;