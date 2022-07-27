import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Breadcrumb } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import {fetchChannelList} from '../../store/channel-list/channelListAction';
import { useRouter } from 'next/router';
import { Spinner } from '../../utils/Spinner';
import Head from 'next/head';
import Script from 'next/script';


const ChannelPreference = () => {

    const [isLoading,setIsLoading] = useState(false);
    const allChannelList =  useSelector((state)=>state.channelList.channel_list);

    const dispatch = useDispatch();

    const [userPreferenceChannelIds,setUserPreferenceChannelIds]= useState([]);
    const [userPreferenceChannelList,setUserPreferenceChannelList]=useState([]);
    const [preferenceChannelList,setPreferenceChannelList] = useState([]);
    const [channelPrefChanged,setChannelPrefChanged]=useState(false);

    const router = useRouter();

    useEffect(()=>{
        if(allChannelList?.length==0){
            dispatch(fetchChannelList());
        }

        if(localStorage.getItem('userChannelPreference')){
            let ids=localStorage.getItem('userChannelPreference');
            setUserPreferenceChannelIds(JSON.parse(ids)?.ids)
        }else{
            setUserPreferenceChannelIds([]);
        }

    },[]);

    useEffect(()=>{
        getUserChannelPreference();
    },[allChannelList]);

    useEffect(()=>{
        let uPrefIds=[];
        userPreferenceChannelList.forEach((channel) => {
          uPrefIds.push(channel?.id);
        });
        if(JSON.stringify(uPrefIds) == JSON.stringify(userPreferenceChannelIds)){
            setChannelPrefChanged(false);
        }
    },[userPreferenceChannelList]);

    useEffect(()=>{
        getUserChannelPreference();
    },[userPreferenceChannelIds])

    const getUserChannelPreference = () => {
        setIsLoading(true);
        setPreferenceChannelList([]);
        setUserPreferenceChannelList([]);
        if(userPreferenceChannelIds?.length>0){
            allChannelList.forEach((channel)=>{
              if(userPreferenceChannelIds?.indexOf(channel?.id)>-1){
                setUserPreferenceChannelList((state)=>[...state,{...channel,pref:true}]);
                setPreferenceChannelList((state)=>[...state,{...channel,pref:true}]);
              }else{
                setPreferenceChannelList((state)=>[...state,{...channel,pref:false}]);
              }
            });
        }else{
            allChannelList.forEach((channel)=>{
            setPreferenceChannelList((state)=>[...state,{...channel,pref:false}]);
            });
        }
        setIsLoading(false);
    }

    const onChannelClick = (id,index)=>{
        let flag=false;
        if(channelPrefChanged == false){
            setChannelPrefChanged(true);
        }
        if(preferenceChannelList?.length>0){
          preferenceChannelList.forEach((channel,i) => {
            if(channel?.id == id){
              userPreferenceChannelList.forEach((preference) => {
                if(preference?.id == id){
                  flag=true;
                  let index = userPreferenceChannelList.indexOf(preference);
                setUserPreferenceChannelList((state)=>state.filter((value,i)=>i!==index));
                  (document.getElementById('div_'+channel?.id)?.childNodes[0]).setAttribute('src',channel?.unselected_image);
                }
              });
              if(!flag){
                setUserPreferenceChannelList((state)=>[...state,channel]);
                (document.getElementById('div_'+channel?.id)?.childNodes[0]).setAttribute('src',channel?.selected_image);
              }
            }
          });     
        }else{
          preferenceChannelList.forEach((channel,i) => {
            if(channel?.id == id){
            setUserPreferenceChannelList((state)=>[...state,channel]);
              (document.getElementById('div_'+channel?.id)?.childNodes[0]).setAttribute('src',channel?.selected_image);
            }
          });
        }
      }


      const onSelectAll = (e)=>{
        if(channelPrefChanged===false){
            setChannelPrefChanged(true);
        }
        if(e.target.checked){
            setUserPreferenceChannelList([]);
          preferenceChannelList.forEach((channel) => {
            setUserPreferenceChannelList((state)=>[...state,channel]);
            (document.getElementById('div_'+channel?.id)?.childNodes[0]).setAttribute('src',channel?.selected_image);
          });
        }else{
        setUserPreferenceChannelList([]);
          preferenceChannelList.forEach((channel) => {
            (document.getElementById('div_'+channel?.id)?.childNodes[0]).setAttribute('src',channel?.unselected_image);
          });
        }
    }

    const onConfirm = (e)=>{
        setIsLoading(true);
        e.preventDefault();
        let userChannelIds=[];
        if(userPreferenceChannelList?.length>0){
          userPreferenceChannelList.forEach((channel,i)=>{
            userChannelIds.push(channel.id);
            localStorage.setItem(
                'userChannelPreference',
                JSON.stringify(
                  {
                    'ids':userChannelIds,
                  })
              );
              let userObj={};
              allChannelList.forEach((channel)=>{
              let channelId = channel.id;
              if(userPreferenceChannelIds.indexOf(channelId)>-1){
                userObj[channel?.title] = 'Yes'
              }else{
                userObj[channel?.title] = 'No'
              }
              })
            //   clevertap.onUserLogin.push({
            //     "Site": userObj
            //   });
            //   clevertap.event.push('channel_subscribe',{
            //     ...userObj,
            //     "device_type":"web"
            //   });
            //   analytics.logEvent('channel_subscribe',{
            //     ...userObj,
            //     "device_type":"web"
            //   });
            router.push('/');
          })
        }else{
          localStorage.removeItem('userChannelPreference');
          let userObj={};
          allChannelList.forEach((channel)=>{
          userObj[channel?.title] = 'No'
          })
        //   clevertap.onUserLogin.push({
        //   "Site": userObj
        //   });
        //   clevertap.event.push('channel_subscribe',{
        //     ...userObj,
        //     "device_type":"web"
        //   });
        //   analytics.logEvent('channel_subscribe',{
        //     ...userObj,
        //     "device_type":"web"
        //   });
            router.push('/');
        }
        setIsLoading(false);
      }


  return (
    <>
    <Head>
        <title>Preferences | Tak.Live</title>
        <meta name="description" content="Select your preferences like news, sports, crime, business, entertainment, fitness and regional news of your choice | Tak.Live" />
        <meta property="og:type" content="tak.live" />
        <meta property="og:site_name" content="Tak" />
        <meta property="og:title" content="Preferences | Tak.Live" />
        <meta property="og:description" content="Select your preferences like news, sports, crime, business, entertainment, fitness and regional news of your choice | Tak.Live" />
        <meta property="og:url" content="https://www.tak.live/preferences" />
        <meta property="og:image" content="https://www.tak.live/assets/images/header-logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="Tak" />
        <meta name="twitter:creator" content="@tak" />
        <meta name="twitter:url" content="https://www.tak.live/preferences" />
        <meta name="twitter:title" content="Preferences | Tak.Live" />
        <meta name="twitter:description" content="Select your preferences like news, sports, crime, business, entertainment, fitness and regional news of your choice | Tak.Live" />
        <meta name="twitter:image" content="https://www.tak.live/assets/images/header-logo.png" />
        <meta itemProp="name" content="Tak" />
        <meta itemProp="mainEntityOfPage" content="https://www.tak.live" />
        <meta itemProp="url" content="https://www.tak.live/preferences" />
        <meta itemProp="headline" content="Preferences | Tak.Live" />
        <meta itemProp="description" content="Select your preferences like news, sports, crime, business, entertainment, fitness and regional news of your choice | Tak.Live" />
        <link rel="canonical" href="https://www.tak.live/preferences" />
        <script type='application/ld+json'>
        {
          JSON.stringify(
            {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"https://www.tak.live","name":"Home"}},{"@type":"ListItem","position":2,"item":{"@id":"https://www.tak.live/preferences","name":"Select Channel"}}]}
            )
        }
        </script>
    </Head>
    
    {
        isLoading?(<Spinner/>):(
<section id="preference">
            <div className="minimum-height container background-color-white">
            <Breadcrumb>
        <Breadcrumb.Item href="/">
          <FormattedMessage defaultMessage="Home" id="footer_home" />
        </Breadcrumb.Item>
        <Breadcrumb.Item active>
          <FormattedMessage defaultMessage="Select Channel" id="header_preference" />
        </Breadcrumb.Item>
      </Breadcrumb>

      <div className="row">
            <div className="col-10 preference-panal text-left d-flex">
                <h1>
                    <FormattedMessage defaultMessage="Select Your Preference" id="preference_select_preference"></FormattedMessage>
                </h1>
            </div>
            <div className="col-12 paddingLeftRight10px select-all ml-2">
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" value="" onClick={(e)=>onSelectAll(e)}/>
                    <label className="form-check-label">
                      <span>
                        <FormattedMessage defaultMessage="Select All" id="preference_select_all"></FormattedMessage>
                        </span> 
                    </label>
                  </div>
            </div>
        </div>
        <div className="row">
            {
                preferenceChannelList?.map((channel,index)=>(
                <div className="col-6 paddingLeftRight10px mt-4 mb-2" key={index} onClick={()=>onChannelClick(channel?.id,index)}>
                <div className="channel-name-img" id={'div_'+channel?.id}>
                    <img src={channel.pref==true?channel.selected_image:channel.unselected_image} alt="Channel Icon" />
                </div>
                </div>
                ))
            }
        </div>
        {
            channelPrefChanged===true?(
                <span className="paddingLeftRight10px save-div">
                <span className="preference-confirm text-center my-4">
                    <button className="btn save-btn px-4" onClick={onConfirm}>
                        <FormattedMessage defaultMessage="Save" id="preference_save"></FormattedMessage>
                    </button>
                </span>
                </span>
            ):(<></>)
        }

            </div>

        </section>
        )
    }
    </>
  )
}

export default ChannelPreference;