import AxiosInstance from "../../../store/axios-interceptor";
import Shorts from "../../../components/Shorts";
import axios from "axios";
import { getCookie } from "cookies-next";
//import VideoHeadTag from "../../../components/Common/VideoHeadTag";

const index = ({ listOfShorts, currentShort }) => {
  return (
    <>
      <Shorts listOfShorts={listOfShorts} currentShort={currentShort} />
    </>
  );
};

export default index;

export const getServerSideProps = async (ctx) => {
  try {
    const { category, slug } = ctx.params;
    const { req, res } = ctx;
    console.log(category, slug);

    let currentShort = {};
    let currentShortObj = {};
    let listOfShorts = [];

    let response = await AxiosInstance.get(`/story/${category}/${slug}/shorts`);
    //console.log("story= ", response.data);

    if (response && response.data && response.data.length > 0) {
      //console.log(response.data);
      currentShort = response.data[0];
    } else {
      return {
        notFound: true,
      };
    }

    let watched = getCookie("watched-shorts", { req, res });
    watched = watched ? JSON.parse(watched) : [];
    console.log("watched-shorts=", watched);

    let response2 = await axios({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_ML_BASE_URL}/recommendationsShorts`,
      data: {
        watched: watched ? watched : [],
        limit: 5,
        page: 1,
      },
    });

    if (
      response2 &&
      response2.data &&
      response2.data.news &&
      response2.data.news.length > 0
    ) {
      listOfShorts = response2.data.news;
    }

    currentShortObj = {
      ...currentShort,
      meta_desc: currentShort.v_meta_desc,
      meta_keyword: currentShort.v_meta_keyword,
      meta_title: currentShort.v_meta_title,
      n_description: currentShort.v_short_desc_withhtml,
      sitemap_sef_url: currentShort.v_sitemap_sef_url,
      updated_datetime: currentShort.v_updated_datetime,
      n_title: currentShort.v_title,
      n_largest_app_image: currentShort.v_largest_app_image,
      n_id: currentShort.v_id,
      n_pcategory_name: currentShort.v_pcategory_title,
      n_pcategory_icon: currentShort.v_pcategory_icon,
      n_pcategory_id: currentShort.v_pcategory_id,
      n_share_url: currentShort.v_share_url,
      n_download_url: currentShort.v_download_url,
      n_video: [
        {
          v_title: currentShort.v_title,
          v_duration: currentShort.v_duration,
          v_url: currentShort.v_url,
          v_updated_datetime: currentShort.v_updated_datetime,
          v_share_url: currentShort.v_share_url,
          v_download_url: currentShort.v_download_url,
          v_ratio: currentShort.v_id,
          v_id: currentShort.v_id,
        },
      ],
    };

    return {
      props: {
        listOfShorts,
        currentShort: currentShortObj,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};
