import { FormattedMessage } from "react-intl";
import { saveAs } from "file-saver";
import shareItem from "../../utils/shareItem";
import dynamic from "next/dynamic";
import { Spinner } from "../../utils/Spinner";

const VideoPlayer = dynamic(() => import("./VideoPlayer"), {
  ssr: false,
  loading: () => <Spinner />
});

const VideoCard = ({ video, playNext = null }) => {
  //console.log(video);

  const shareToWhatsapp = (id, title, sefUrl, source) => {
    shareItem.shareToWhatsapp(sefUrl, source, title, id);
  };

  return (
    <section id="read-story">
      <div className="read-card item container">
        <div className="card news-card">
          <div className="card-body">
            <div id="videoDiv">
              <VideoPlayer url={video.v_url} playNext={playNext} />
            </div>
          </div>
          <div className="py-2 col-12 paddingLeftRight10px">
            <div>
              <h1>{video.v_title}</h1>
            </div>
            <div>
              <h3>
                <div
                  dangerouslySetInnerHTML={{
                    __html: video.v_short_desc_withhtml,
                  }}
                />
              </h3>
            </div>
          </div>
          <div className="card-footer">
            <button
              onClick={() => {
                saveAs(`${video?.v_download_url}`, `${video.v_title}.mp4`);
              }}
              className="btn download-kare-btn"
            >
              <img src="/assets/images/icons/download.png" />
              <FormattedMessage id="download" defaultMessage="Download" />
            </button>
            <button
              onClick={() =>
                shareToWhatsapp(
                  video?.v_id,
                  video?.v_title,
                  video?.v_sitemap_sef_url,
                  "video"
                )
              }
              className="btn share-kare-btn"
            >
              <a>
                <img src="/assets/images/icons/share.png" />
                <FormattedMessage id="share" defaultMessage="Share" />
              </a>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoCard;
