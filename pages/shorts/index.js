import React from "react";
import axios from "axios";
import { getCookie } from "cookies-next";

const ShortsPage = () => {
  return <></>;
};

export default ShortsPage;

export const getServerSideProps = async (ctx) => {
  try {
    const { req, res } = ctx;

    let watched = getCookie("watched-shorts", { req, res });
    watched = watched ? JSON.parse(watched) : [];
    console.log("watched-shorts=", watched);

    let response = await axios({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_ML_BASE_URL}/recommendationsShorts`,
      data: {
        watched: watched ? watched : [],
        limit: 1,
        page: 1,
      },
    });

    //console.log(response.data);
    if (
      response &&
      response.data &&
      response.data.news &&
      response.data.news.length > 0
    ) {
      let firstData = response.data.news[0];
      //console.log(firstData.sitemap_sef_url);

      if (firstData) {
        return {
          redirect: {
            destination: "/" + firstData.sitemap_sef_url,
            permanent: false,
          },
        };
      } else {
        return {
          notFound: true,
        };
      }
    } else {
      return {
        notFound: true,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};
