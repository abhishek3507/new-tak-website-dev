import { useRouter } from "next/router";
import CommonCategory from "../../components/Category";
import HomeHeadTag from "../../components/Common/HomeHeadTag";
import AxiosInstance from "../../store/axios-interceptor";

const index = ({ data, category, channels, currentChannelId }) => {
  const router=useRouter();
  return (
    <>
    <HomeHeadTag sefUrl={category} url={process.env.NEXT_PUBLIC_WEBSITE_URL+router.asPath}></HomeHeadTag>
    <CommonCategory
      data={data}
      currentChannelId={currentChannelId}
      category={category}
      channels={channels}
    />
    </>
  );
};

export default index;

export const getServerSideProps = async (ctx) => {
  try {
    const { category } = ctx.params; // your fetch function here
    //console.log(category);
    let currentChannel = category;
    let currentChannelId = "";
    if (category === "/") {
      currentChannel = "all";
      currentChannelId = 0;
    }

    //* based on category fetch data
    let channels = [];
    const response = await AxiosInstance.get("/getMenu");
    if (response && response.data && response.data.length > 0) {
      channels = response.data.filter((channel) => {
        if (channel?.sef_url == category) {
          currentChannelId = channel?.id;
        }
        return (
          channel?.ranking != 0 &&
          channel?.id != "62a6f9eafdc5caf53558f510" &&
          (channel?.id != "62a6f9eafdc5caf53558f4fc" ||
            channel?.title == "News Mo")
        );
      });

      //console.log(channels);
      //dispatch(actions.fetchList(filteredData))
    } else {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        data: [],
        category: currentChannel,
        currentChannelId,
        channels,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};
