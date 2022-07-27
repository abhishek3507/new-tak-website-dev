import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpotlightList } from '../../store/spotlight/spotlightAction';
import spotlightSlice from '../../store/spotlight/spotlightSlice';
import { SpinnerWithContainer } from '../../utils/Spinner';

const Spotlight = (props) => {
  const spotlightList = useSelector((state) => state.spotlight.spotlight_list);
  const [displayedSpotlightList, setDisplayedSpotlightList] = useState(spotlightList);
  const isLoading = useSelector((state) => state.spotlight.isLoading);
  const [serverError, setServerError] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const dispatch = useDispatch();
  const { actions } = spotlightSlice;

  useEffect(() => {
    // if(spotlightList?.length == 0){
    //     dispatch(actions.fetchListStart());
    //     dispatch(fetchSpotlightList());
    // }
    if (props.data && props.data.length > 0) {
      dispatch(actions.fetchListStart());
      dispatch(actions.fetchList(props.data));
    }
    if (props.error) {
      setServerError(true);
    }
  }, []);

  useEffect(() => {
    if (searchInput == '') {
      setDisplayedSpotlightList(spotlightList);
    } else {
      setDisplayedSpotlightList(spotlightList.filter(spotlight => spotlight?.author_name.toLowerCase().includes(searchInput.toLowerCase())))
    }
  }, [spotlightList, searchInput]);

  const onSearchInput = (e) => {
    setSearchInput(e.target.value);
  }

  return (
    <>
      <Head>
        <title>Tak Anchor, Tak News Anchor, News Anchor Tak | Tak.Live</title>
        <meta name="description" content="Tak Anchors – Ajit Singh, Anuradha Tanwar, Rohit Kaushik, Rishi Raj, Mansi Kumari, Rakshita Misra, Kirti Rajora, Aayush Mishra, VARNITA VAJPAYEE, Shreya Bahuguna, Rashika and more." />
        <meta property="og:type" content="tak.live" />
        <meta property="og:site_name" content="Tak" />
        <meta property="og:title" content="Tak Anchor, Tak News Anchor, News Anchor Tak | Tak.Live" />
        <meta property="og:description" content="Tak Anchors – Ajit Singh, Anuradha Tanwar, Rohit Kaushik, Rishi Raj, Mansi Kumari, Rakshita Misra, Kirti Rajora, Aayush Mishra, VARNITA VAJPAYEE, Shreya Bahuguna, Rashika and more." />
        <meta property="og:url" content="https://www.tak.live/spotlight/anchor/all" />
        <meta property="og:image" content="https://www.tak.live/assets/images/header-logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="Tak" />
        <meta name="twitter:creator" content="@tak" />
        <meta name="twitter:url" content="https://www.tak.live/spotlight/anchor/all" />
        <meta name="twitter:title" content="Tak Anchor, Tak News Anchor, News Anchor Tak | Tak.Live" />
        <meta name="twitter:description" content="Tak Anchors – Ajit Singh, Anuradha Tanwar, Rohit Kaushik, Rishi Raj, Mansi Kumari, Rakshita Misra, Kirti Rajora, Aayush Mishra, VARNITA VAJPAYEE, Shreya Bahuguna, Rashika and more." />
        <meta name="twitter:image" content="https://www.tak.live/assets/images/header-logo.png" />
        <meta itemProp="name" content="Tak" />
        <meta itemProp="mainEntityOfPage" content="https://www.tak.live" />
        <meta itemProp="url" content="https://www.tak.live/spotlight/anchor/all" />
        <meta itemProp="headline" content="Tak Anchor, Tak News Anchor, News Anchor Tak | Tak.Live" />
        <meta itemProp="description" content="Tak Anchors – Ajit Singh, Anuradha Tanwar, Rohit Kaushik, Rishi Raj, Mansi Kumari, Rakshita Misra, Kirti Rajora, Aayush Mishra, VARNITA VAJPAYEE, Shreya Bahuguna, Rashika and more." />
        <link rel="canonical" href="https://www.tak.live/spotlight/anchor/all" />
      </Head>
      {
        serverError ? (<div>Server Error ! </div>) : (
          <>
            {isLoading ? (
              <SpinnerWithContainer />
            ) : (
              <div className="minimum-height  container text-center background-color-white">
                <div className="row">
                  <div className="col-12 paddingTopBottom10px paddingLeftRight10px">
                    <div className="search-input mb-3">
                      <div className="input-group">
                        <span className="input-group-append">
                          <div className="input-group-text border-right-0">
                            <img
                              src="/assets/images/icons/search_icon_grey.png"
                              alt="Search Icon"
                            />
                          </div>
                        </span>
                        <input
                          className="form-control py-2 border-left-0 border"
                          type="text"
                          id="search-input"
                          value={searchInput}
                          onChange={onSearchInput}
                        />
                        <span className="clear-text">
                          <img
                            src="/assets/images/icons/clear_text.png"
                            alt="Clear"
                            onClick={() => setSearchInput('')}
                          />
                        </span>
                      </div>
                    </div>
                    <div className="spotlight-container paddingLeftRight10px">
                      <div className="row">
                        {displayedSpotlightList.map((spotlight) => (
                          <div className="col-lg-3 col-md-3 col-sm-4 col-6 spotlight-col" key={spotlight?.id}>
                            <div className="spotlight-box">
                              <a href={`/spotlight/anchor/${spotlight?.sef_url ? spotlight?.sef_url : spotlight?.id}/all`}>
                                <div className="spotlight-cards">
                                  <img
                                    src={
                                      spotlight?.profile_image
                                        ? spotlight?.profile_image
                                        : "/assets/images/default-profile.png"
                                    }
                                    alt="Spotlight Profile Image"
                                    onError={(e) => e.target.src = '/assets/images/default-profile.png'}
                                  />
                                </div>
                                <p>{spotlight?.author_name}</p>
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )
      }
    </>
  );
}

export default Spotlight;