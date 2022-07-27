import Link from 'next/link';
import React, { useState,useEffect } from 'react';
import MultiCarousel from '../MultiCarousel/MultiCarousel';

const LiveNewsCarousel = (props) => {

    const [liveVideoList, setLiveVideoList] = useState([]);

    useEffect(() => {
        if (props.data && props.data?.length > 0) {
            setLiveVideoList(props.data)
        }
    }, [])

    return (
        <>
        {
            liveVideoList?.length>0 && (
                <div >
            <div id="livenews" className="read-card">
                <MultiCarousel
                    source="live-news"
                >
                    {
                        liveVideoList.map((video, index) => (
                            <div className="read-card item" key={index}>
                                <div className="card news-card">
                                    <div className="card-body thumbnails">
                                    <Link passHref href={'/live-video?str='+video?.event_id}>
                                        <img className="card-img-top" src={video?.thumbnail ? video?.thumbnail : '/assets/images/default-bg.jpg'}
                                            alt="Live section" onError={(e) => e.target.src = '/assets/images/default-bg.jpg'} />
                                    </Link>
                                    </div>
                                    <div id="carousel-live-gif">
                                        <div>
                                            <img src="/assets/images/live.gif" alt="Live Gif" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }

                </MultiCarousel>
            </div>

        </div>
            )
        }
        </>
    )
}

export default LiveNewsCarousel;