import Head from 'next/head';
import React from 'react';

const VideoHeadTag = ({videoObj}) => {
  return (
    <Head>
        <title>{videoObj.title}</title>
        <meta name="description" content={videoObj.description} />
        <meta property="og:type" content="tak.live" />
        <meta property="og:site_name" content="Tak" />
        <meta property="og:title" content={videoObj.title} />
        <meta property="og:description" content={videoObj.description} />
        <meta property="og:url" content={videoObj.url} />
        <meta property="og:image" content='https://www.tak.live/assets/images/header-logo.png' />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="Tak" />
        <meta name="twitter:creator" content="@tak" />
        <meta name="twitter:url" content={videoObj.url} />
        <meta name="twitter:title" content={videoObj.title} />
        <meta name="twitter:description" content={videoObj.description} />
        <meta name="twitter:image" content='https://www.tak.live/assets/images/header-logo.png' />
        <meta itemProp="name" content="Tak" />
        <meta itemProp="mainEntityOfPage" content="https://www.tak.live" />
        <meta itemProp="url" content={videoObj.url} />
        <meta itemProp="headline" content={videoObj.title} />
        <meta itemProp="description" content={videoObj.description} />
        <link rel="canonical" href={videoObj.url} />
        {
            videoObj?.keywords? <meta name="keywords" content={videoObj.keywords} /> : ''
        }
        {
            videoObj?.videoSchema? (
                <script class="structured-video-data" type="application/ld+json">
                    {
                        JSON.stringify(
                            {"@context":"https://schema.org",
                            "@type":"VideoObject",
                            "name":`${videoObj.title}`,
                            "description":`${videoObj.description}`,
                            "thumbnailUrl":`${videoObj.thumbnailUrl}`,
                            "uploadDate":`${videoObj.uploadDate}`,
                            "contentUrl":`${videoObj.videoUrl}`,
                            "embedUrl":`${videoObj.url}`,
                            "duration":`${videoObj.duration}`}
                        )
                    }
                    </script>
            ) : ''
        }
    </Head>
  )
}

export default VideoHeadTag;