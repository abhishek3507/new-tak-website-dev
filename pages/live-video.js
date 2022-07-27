import React from 'react'
import LiveNews from '../components/LiveNews/LiveNews';
import AxiosInstance from '../store/axios-interceptor';

const LiveVideoPage = ({data}) => {
  return (
    <LiveNews currentLiveStream={data.currentLiveStream} allLiveStreams={data.allLiveStreams} />
  )
}

export default LiveVideoPage;

export const getServerSideProps = async (ctx)=>{
    let propsData={};
    let obj;
    try {
        const {str} = ctx.query
        let response = await AxiosInstance.post('event_detail',{
            event_id:str
        });
    if (response && response.data && response.data.Event.length > 0) {
      obj = {
        currentLiveStream:{
            data : response.data.Event[0],
            notFound:false
        }
      }
      propsData = {...propsData,...obj};
    } else {
        obj = {
            currentLiveStream:{
                notFound:true
            }
        }
        propsData = {...propsData,...obj};
    }
  } catch (error) {
    obj = {
        currentLiveStream:{
            notFound:true
        }
    }
    propsData = {...propsData,...obj};
  }

  try {
    let response = await AxiosInstance.post('event_listing',{
        cat_id:''
    });
    if (response && response.data && response.data.Event.length > 0) {
        obj = {
          allLiveStreams:{
              data : response.data.Event,
              notFound:false
          }
        }
        propsData = {...propsData,...obj};
      } else {
          obj = {
            allLiveStreams:{
                  notFound:true
              }
          }
          propsData = {...propsData,...obj};
      }
  } catch (error) {
    obj = {
        allLiveStreams:{
              notFound:true
          }
      }
    propsData = {...propsData,...obj};
  }

  return { props: { data: propsData} };

}