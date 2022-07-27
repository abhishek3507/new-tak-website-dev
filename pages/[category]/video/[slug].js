import VideoHeadTag from "../../../components/Common/VideoHeadTag";
import VideoDetail from "../../../components/VideoDetail";
import AxiosInstance from "../../../store/axios-interceptor";
import { getMetaKeywordsFromArray } from "../../../utils/common";

const index = ({ data }) => {

  const videoObject = {
    title:data.v_title?data.v_title+' | Tak Live Video':'Tak Live: Short Video News, Latest News Streaming, Watch Breaking News',
      description:data.v_meta_desc?'Watch '+data.v_meta_desc+' video news. Stay updated with latest video news only on Tak!':'Watch latest breaking news on sports, politics, crime, fitness, sahitya, entertainment and regional videos online with Tak.Live.',
      url:process.env.NEXT_PUBLIC_WEBSITE_URL+'/'+data.v_sitemap_sef_url,
      thumbnailUrl: data.v_largest_app_image?data.v_largest_app_image:'https://www.tak.live/assets/images/header-logo.png',
      keywords: data.v_meta_keyword?getMetaKeywordsFromArray(data.v_meta_keyword):'Tak, Tak Live Video, Short Video News, Latest News, Breaking News',
      uploadDate: data.v_updated_datetime?data.v_updated_datetime.split(' ').join('T'):new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate()+'T'+new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()+'+00:00',
      duration:data.v_duration?'PT'+data.v_duration.split(':').join('M')+'S':'00:00',
      videoUrl:data.v_url,
      videoSchema:true

  }

  return (
    <>
    <VideoHeadTag videoObj={videoObject}></VideoHeadTag>
    <VideoDetail data={data} />
    </>
  ) 
};

export default index;

export const getServerSideProps = async (ctx) => {
  try {
    const { category, slug } = ctx.params;
    const { s } = ctx.query;
    // console.log(category, slug, s);

    //* fetch video detail
    let data = {};
    let response = await AxiosInstance.get(`/story/${category}/${slug}/video`);
    //console.log(response);
    if (response && response.data && response.data.length > 0) {
      //console.log(response.data);
      data = response.data[0];
    } else {
      return {
        notFound: true,
      };
    }
    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};
