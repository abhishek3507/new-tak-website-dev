import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useDispatch, useSelector } from "react-redux";
import AxiosInstance from "../../store/axios-interceptor";
import voteSlice from "../../store/vote/voteSlice";
import MultiCarousel from "../MultiCarousel/MultiCarousel";

const Vote = (props) => {
  const voteList = useSelector((state) => state.vote.vote_list);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState(false);
  const dispatch = useDispatch();
  const { actions } = voteSlice;

  useEffect(() => {
    if (props.data) {
      setIsLoading(true);
      dispatch(actions.fetchVoteList(props.data.news));
      setIsLoading(false);
    }
    if (props.error) {
      setServerError(true);
    }
  }, []);

  const checkPoll = async (
    e,
    pollId,
    otherOption,
    videoId,
    option,
    pollQuestion,
    newsTitle
  ) => {
    const response = await AxiosInstance.post("/user-poll", {
      selected_option: e.target.value,
      other_option: [otherOption],
      options: "FIRST",
      poll_id: pollId,
      vod_id: videoId,
    });

    if (response && response.data.channel.err.status == false) {
      let total =
        +response.data.channel.poll.total_for_option1 +
        +response.data.channel.poll.total_for_option2;
      let option1Percentage = (
        (+response.data.channel.poll.total_for_option1 / total) *
        100
      ).toFixed(1);
      let option2Percentage = (
        (+response.data.channel.poll.total_for_option2 / total) *
        100
      ).toFixed(1);
      document.getElementById("pollQuestionDiv_" + videoId).style.display =
        "none";
      document.getElementById("pollResultDiv_" + videoId).style.display =
        "block";
      if (option == "option1") {
        document.getElementById(
          "pollResultPercentageOption1_" + videoId
        ).style.backgroundColor = "red";
        document.getElementById(
          "pollResultPercentageOption1_" + videoId
        ).style.color = "white";
      } else {
        document.getElementById(
          "pollResultPercentageOption2_" + videoId
        ).style.backgroundColor = "red";
        document.getElementById(
          "pollResultPercentageOption2_" + videoId
        ).style.color = "white";
      }
      document.getElementById(
        "pollResultPercentageOption1_" + videoId
      ).children[0].textContent = option1Percentage;
      document.getElementById(
        "pollResultPercentageOption2_" + videoId
      ).children[0].textContent = option2Percentage;
    } else {
      setIsLoading(false);
    }
  };

  return (
    <>
      {serverError ? (
        <div>Server Error ! </div>
      ) : (
        <div className="paddingTopBottom10px" id="vote-section">
          <div className="spotlite-carouse-heading pb-2">
            <h3>
              <FormattedMessage
                defaultMessage="Vote"
                id="discover_vote"
              ></FormattedMessage>
            </h3>
          </div>
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              <MultiCarousel source="vote">
                {voteList.map((video, index) => (
                  <div className="vote-news-slider pb-4" key={index}>
                    <Link passHref href={`/${video?.sitemap_sef_url}?s=vote-0`}>
                      <a>
                        <div className="read-card item">
                          <div className="card news-card">
                            <div className="card-body">
                              <div
                                id={`imageDiv_${video?.n_video[0]?.v_id}`}
                                className="thumbnails"
                              >
                                <img
                                  className="card-img-top"
                                  src={
                                    video?.n_video[0].n_largest_app_image
                                      ? video?.n_video[0].n_largest_app_image
                                      : "/assets/images/default-bg.jpg"
                                  }
                                  alt="Poll"
                                  onError={(e) =>
                                    (e.target.src =
                                      "/assets/images/default-bg.jpg")
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </a>
                    </Link>
                    <div className="voting-question">
                      <div className="voting-question-content">
                        <br />
                        <p id="video-title">{video?.n_title}</p>
                        <p id="poll-question">
                          {video?.n_video[0]?.poll?.title}
                        </p>
                        <br />
                        <div
                          id={`pollQuestionDiv_${video?.n_video[0]?.v_id}`}
                          className="text-center pollQuestion"
                        >
                          <div className="btn-group-toggle">
                            <label className="btn vote-button mb-3 border-right-0">
                              <input
                                type="radio"
                                style={{ visibility: "hidden" }}
                                name="poll_option"
                                value={video?.n_video[0]?.poll?.option_1}
                                onClick={(e) =>
                                  checkPoll(
                                    e,
                                    video?.n_video[0]?.poll?.id,
                                    video?.n_video[0]?.poll?.option_2,
                                    video?.n_video[0]?.v_id,
                                    "option1",
                                    video?.n_video[0]?.poll?.title,
                                    video?.n_title
                                  )
                                }
                              />
                              {video?.n_video[0]?.poll?.option_1}
                            </label>
                            <label className="btn vote-button mb-3">
                              <input
                                type="radio"
                                style={{ visibility: "hidden" }}
                                name="poll_option"
                                value={video?.n_video[0]?.poll?.option_2}
                                onClick={(e) =>
                                  checkPoll(
                                    e,
                                    video?.n_video[0]?.poll?.id,
                                    video?.n_video[0]?.poll?.option_1,
                                    video?.n_video[0]?.v_id,
                                    "option2",
                                    video?.n_video[0]?.poll?.title,
                                    video?.n_title
                                  )
                                }
                              />
                              {video?.n_video[0]?.poll?.option_2}
                            </label>
                          </div>
                        </div>
                        <div
                          id={`pollResultDiv_${video?.n_video[0]?.v_id}`}
                          className="text-center pollResult"
                          style={{ display: "none" }}
                        >
                          <div className="btn-group-toggle">
                            <label
                              className="mb-3 border-right-0 pollResultBlock"
                              id={`pollResultPercentageOption1_${video?.n_video[0]?.v_id}`}
                            >
                              {video?.n_video[0]?.poll?.option_1} (<span></span>
                              )
                            </label>
                            <label
                              className="mb-3 pollResultBlock"
                              id={`pollResultPercentageOption2_${video?.n_video[0]?.v_id}`}
                            >
                              {video?.n_video[0]?.poll?.option_2} (<span></span>
                              )
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </MultiCarousel>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Vote;
