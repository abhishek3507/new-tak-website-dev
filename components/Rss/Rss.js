import React from 'react';

const Rss = () => {

  let channelSections = [
    { name:'news-tak', sef_name:'news-tak'},
    { name:'sports-tak', sef_name:'sports-tak'},
    { name:'crime-tak', sef_name:'crime-tak'},
    { name:'bharat-tak', sef_name:'bharat-tak'},
    { name:'biz-tak', sef_name:'biz-tak'},
    { name:'up-tak', sef_name:'up-tak'},
    { name:'bihar-tak', sef_name:'bihar-tak'},
    { name:'life-tak', sef_name:'life-tak'},
    { name:'sahitya-tak', sef_name:'sahitya-tak'},
    { name:'fit-tak', sef_name:'fit-tak'},
    { name:'mumbai-tak', sef_name:'mumbai-tak'},
    { name:'mp-tak', sef_name:'mp-tak'},
    { name:'astro-tak', sef_name:'astro-tak'},
    { name:'dilli-tak', sef_name:'dilli-tak'},
    { name:'rajasthan-tak', sef_name:'rajasthan-tak'},
    { name:'gujarat-tak', sef_name:'gujarat-tak'},
    { name:'punjab-tak', sef_name:'punjab-tak'},
    { name:'haryana-tak', sef_name:'haryana-tak'},
    { name:'uttarakhand-tak', sef_name:'uttarakhand-tak'},
    { name:'karnataka-tak', sef_name:'karnataka-tak'},
    { name:'short-videos', sef_name:'short-videos'}
  ];

  return (
    <section id="rss">
    <div className="minimum-height container margin-top-75px background-color-white paddingTopBottom10px">
        <div className="row">
            <div className="col-12 paddingLeftRight10px">
                <p>
                    Tak offers you RSS feeds, for all its channel sections so that you won't even miss a single story. 
                    RSS feeds are files in the XML format which are used by clients, also known as desktop aggregators and RSS readers, to pull the latest updated information from the websites that offer them.
                </p>
            </div>
        </div>
        <h4>Channel Section Feeds</h4>
        <div className="row paddingLeftRight10px channel-section-feeds">
          {
            channelSections.map((channel,index)=>(
              <div className="col-4 paddingTopBottom10px" key={index}>
                <img src="/assets/images/icons/rss-filled.png" alt="RSS Icon" /> &nbsp;&nbsp;
                <a href={'https://www.tak.live/rss/'+channel?.sef_name+'/video.xml'} target="_blank">{channel?.name}</a>
            </div>
            ))
          }
        </div>
    </div>
</section>
  )
}

export default Rss;