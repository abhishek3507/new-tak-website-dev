import CommonCategory from "../components/Category";
import AxiosInstance from "../store/axios-interceptor";
import "@fontsource/mukta";
import axios from "axios";
import HomeHeadTag from "../components/Common/HomeHeadTag";
import { useRouter } from "next/router";

const Index = ({ data, category, channels, currentChannelId }) => {
  const router=useRouter();
  return (
    <>
    <HomeHeadTag sefUrl={'home'} url={process.env.NEXT_PUBLIC_WEBSITE_URL+router.asPath}></HomeHeadTag>
    <CommonCategory data={data} category={category} channels={channels} currentChannelId={currentChannelId} />;
    </>
  ) 
};

export default Index;

export const getServerSideProps = async (ctx) => {
  //console.log(ctx);
  const category = "all";
  let currentChannelId = 0;

  //* based on category fetch data
  let channels = [];
  const responseChannel = await AxiosInstance.get("/getMenu");
  if (
    responseChannel &&
    responseChannel.data &&
    responseChannel.data.length > 0
  ) {
    channels = responseChannel.data.filter(
      (channel) =>
        channel?.ranking != 0 &&
        channel?.id != "62a6f9eafdc5caf53558f510" &&
        (channel?.id != "62a6f9eafdc5caf53558f4fc" ||
          channel?.title == "News Mo")
    );
    //console.log(channels);
    //dispatch(actions.fetchList(filteredData))
  }

  return {
    props: {
      data: [],
      category,
      channels,
      currentChannelId,
    },
  };
};
