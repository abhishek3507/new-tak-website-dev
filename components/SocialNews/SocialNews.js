import Head from 'next/head';
import Script from 'next/script';
import React from 'react';

const SocialNews = () => {
    return (
        <>
            <Head>
                <title>Social News Videos, Watch Social Short Video News Online | Tak.Live</title>
                <meta name="description" content="Social News Videos - Watch Social Videos Online Today and stay updated at Tak.Live." />
                <meta property="og:type" content="tak.live" />
                <meta property="og:site_name" content="Tak" />
                <meta property="og:title" content="Social News Videos, Watch Social Short Video News Online | Tak.Live" />
                <meta property="og:description" content="Social News Videos - Watch Social Videos Online Today and stay updated at Tak.Live." />
                <meta property="og:url" content="https://www.tak.live/social-news" />
                <meta property="og:image" content="https://www.tak.live/assets/images/header-logo.png" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="Tak" />
                <meta name="twitter:creator" content="@tak" />
                <meta name="twitter:url" content="https://www.tak.live/social-news" />
                <meta name="twitter:title" content="Social News Videos, Watch Social Short Video News Online | Tak.Live" />
                <meta name="twitter:description" content="Social News Videos - Watch Social Videos Online Today and stay updated at Tak.Live." />
                <meta name="twitter:image" content="https://www.tak.live/assets/images/header-logo.png" />
                <meta itemprop="name" content="Tak" />
                <meta itemprop="mainEntityOfPage" content="https://www.tak.live" />
                <meta itemprop="url" content="https://www.tak.live/social-news" />
                <meta itemprop="headline" content="Social News Videos, Watch Social Short Video News Online | Tak.Live" />
                <meta itemprop="description" content="Social News Videos - Watch Social Videos Online Today and stay updated at Tak.Live." />
                <link rel="canonical" href="https://www.tak.live/social-news" />
                <script src='https://go.arena.im/public/js/arena.widget.embed.lib.js'>
                </script>
            </Head>
            <section id="social-news">
                <div className="paddingTopBottom10px minimum-height container margin-top-75px background-color-white">
                    <div className="row">
                        <div className="col-12 paddingLeftRight10px">
                            <div className="arena-embed-widget" data-publisher="tv-today-network" data-type="social-wall" data-showtitle="false" data-lang="en-gb" data-timeline="THmAthV"></div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SocialNews;