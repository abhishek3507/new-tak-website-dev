import dynamic from 'next/dynamic';
import React from 'react'
import ShareItem from '../../utils/shareItem';
import { Spinner } from '../../utils/Spinner';

const LivePlayer = dynamic(() => import("./LivePlayer"), {
    ssr: false,
    loading: () => <Spinner />
});

const LiveNews = ({ currentLiveStream, allLiveStreams }) => {

    const shareToWhatsapp = (url) => {
        ShareItem.shareLiveStreamToWhatsapp(url);
    }

    return (
        <>
            {currentLiveStream.notFound === false ? (
                <section id="live-video-section" className="">
                    <div className="live-card-div item container">
                        <div className="card news-card live-card">
                            <div className="card-body">
                                <div id="videoDiv">
                                    <LivePlayer url={currentLiveStream.data?.live_stream_url}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container bgwhite px-2 py-2 live-video-container">
                        <div className="row">
                            <div className="col-10">
                                <div className="live-strem-details">
                                    <h2>
                                        <span>{currentLiveStream.data?.event_title}</span>
                                    </h2>
                                </div>
                            </div>
                            <div className="col-2 live-strem-details share-live-icon">
                                <img src="/assets/images/live-share-icon.png" alt="Share" onClick={()=>shareToWhatsapp(currentLiveStream.data?.live_stream_url)} />
                            </div>
                        </div>
                        {
                            allLiveStreams?.data?.length > 1 ? (
                            <>
                            <div className="row">
                            <div className="col-12">
                                <div className="live-stream-list live-strem-details">
                                    {
                                        allLiveStreams.data.map((livestream,index)=>(
                                        <div className="live-stream-card">
                                        <img
                                            src={livestream?.thumbnail?livestream?.thumbnail:'/assets/images/default-bg.jpg'}
                                            alt="Thumbnail"
                                            loading='lazy'
                                            onError={(e)=>e.target.src='/assets/images/default-bg.jpg'}
                                        />
                                        {
                                            livestream?.event_id === currentLiveStream.data?.event_id && (
                                        <div className="live-overlay">
                                            <img
                                                src="/assets/images/icons/pause.png"
                                                alt="Pause"
                                                width="10%"
                                            />
                                        </div>
                                            )
                                        }
                                    </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                            </>) : ''
                        }

                        <div className="row">
                            <div className="col-12">
                                <ul className="nav nav-pills nav-pills-underline">
                                    <li className="nav-item">
                                        <a
                                            className="nav-link active"
                                            data-toggle="tab"
                                            href="#live-chat"
                                        >
                                            Live Chat
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" data-toggle="tab" href="#social">
                                            {"currentLiveStream?.event_tab"}
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="tab-content">
                            <div className="row tab-pane active show" id="live-chat"></div>

                            <div className="row tab-pane fade" id="social">
                                <div className="col-12 paddingLeftRight10px">
                                    <div
                                        className="arena-embed-widget"
                                        data-publisher="tv-today-network"
                                        data-type="social-wall"
                                        data-showtitle="false"
                                        data-lang="en-gb"
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            ) : (
                <section id="live-video-section">
                    <div className="container bgwhite">
                        <div className="row no-live-stream">
                            <div className="col-12" style={{textAlign: 'center'}}>
                                <br />
                                <h1>{"live.no_live"}</h1>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};

export default LiveNews