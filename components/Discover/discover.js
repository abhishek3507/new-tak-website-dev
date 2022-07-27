import React, { useEffect } from 'react'
import Vote from '../Vote/vote';
import SpotlightCarousel from '../Spotlight/SpotlightCarousel';
import Head from 'next/head';
import BreakingNewsCarousel from '../BreakingNewsCarousel/BreakingNewsCarousel';
import LiveNewsCarousel from '../LiveNewsCarousel/LiveNewsCarousel';


const Discover = ({data}) => {

    // useEffect(() => {
    //     clevertapAnalytics.pushEvent('screen_view_app',{
    //         'screen_name':'Discover',
    //         'device_type':'web'
    //       });
    //     clevertapAnalytics.pushEvent('discover_tab_click',{
    //         'device_type':'web'
    //     });
    // }, [])
    

  return (
      <>
          <Head>
              <title>Discover News Videos, Discover Short Video News Online | Tak.Live</title>
              <meta name="description" content="Discover Shorts - Discover short news on sports, politics, crime, fitness, life, entertainment and many more at Tak.Live." />
              <meta property="og:type" content="tak.live" />
              <meta property="og:site_name" content="Tak" />
              <meta property="og:title" content="Discover News Videos, Discover Short Video News Online | Tak.Live" />
              <meta property="og:description" content="Discover Shorts - Discover short news on sports, politics, crime, fitness, life, entertainment and many more at Tak.Live." />
              <meta property="og:url" content="https://www.tak.live/discover" />
              <meta property="og:image" content="https://www.tak.live/assets/images/header-logo.png" />
              <meta name="twitter:card" content="summary_large_image" />
              <meta name="twitter:site" content="Tak" />
              <meta name="twitter:creator" content="@tak" />
              <meta name="twitter:url" content="https://www.tak.live/discover" />
              <meta name="twitter:title" content="Discover News Videos, Discover Short Video News Online | Tak.Live" />
              <meta name="twitter:description" content="Discover Shorts - Discover short news on sports, politics, crime, fitness, life, entertainment and many more at Tak.Live." />
              <meta name="twitter:image" content="https://www.tak.live/assets/images/header-logo.png" />
              <meta itemProp="name" content="Tak" />
              <meta itemProp="mainEntityOfPage" content="https://www.tak.live" />
              <meta itemProp="url" content="https://www.tak.live/discover" />
              <meta itemProp="headline" content="Discover News Videos, Discover Short Video News Online | Tak.Live" />
              <meta itemProp="description" content="Discover Shorts - Discover short news on sports, politics, crime, fitness, life, entertainment and many more at Tak.Live." />
              <link rel="canonical" href="https://www.tak.live/discover" />
          </Head>
          <div className="minimum-height container margin-top-75px background-color-white">
              <SpotlightCarousel></SpotlightCarousel>
              {
                  data.breaking.error ? ('') : (
                      <BreakingNewsCarousel data={data.breaking.data} error={data.breaking.error}></BreakingNewsCarousel>
                  )
              }
              {
                  data.live.error ? ('') : (
                      <LiveNewsCarousel data={data.live.data} error={data.live.error}></LiveNewsCarousel>
                  )
              }
              {
                  data.vote.error ? ('') : (
                      <Vote data={data.vote.data} error={data.vote.error}></Vote>
                  )
              }
          </div>
      </>
  )
}

export default Discover;