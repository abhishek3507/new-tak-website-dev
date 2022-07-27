import React from 'react'
import Discover from '../../components/Discover/discover';
import AxiosInstance from '../../store/axios-interceptor';

const DiscoverPage = ({data}) => {
  return (
    <Discover data={data}/>
  )
}

export async function getServerSideProps(ctx){
  let propsData = {};
    try {
      let obj;
      const response = await AxiosInstance.get('/poll-listing/0/50');
      if(response && response.status){
        // propsData.push({'vote':{data:response.data,error:false}});
        obj = {
          vote:{
            data:response.data,
            error:false
          }
        }
        propsData = {...propsData,...obj};
      }else{
        obj = {
          vote:{
            error:true
          }
        }
        propsData = {...propsData,...obj};
      }
    } catch (error) {
      console.log(error);
      obj = {
        vote:{
          error:true
        }
      }
      propsData = {...propsData,...obj};
    }

    try {
      let obj;
      const response = await AxiosInstance.get('/getBreakingVideos/0/10/0');
      if(response && response.status && response.data.video && response.data.video?.length>0){
        obj={
          breaking:{
            data:response.data,
            error:false
          }
        }
        propsData = {...propsData,...obj};
      }else{
        obj={
          breaking:{
            error:true
          }
        }
        propsData = {...propsData,...obj};
      }
    } catch (error) {
      obj={
        breaking:{
          error:true
        }
      }
      propsData = {...propsData,...obj};
    }

    try {
      let obj;
      const response = await AxiosInstance.post('/event_listing',{cat_id:""});
      if(response && response.status && response.data.Event && response.data.Event?.length>0){
        obj={
          live:{
            data:response.data.Event,
            error:false
          }
        }
        propsData = {...propsData,...obj};
      }else{
        obj={
          live:{
            error:true
          }
        }
        propsData = {...propsData,...obj};
      }
    } catch (error) {
      obj={
        live:{
          error:true
        }
      }
      propsData = {...propsData,...obj};
    }

    return { props: { data: propsData} };
}

export default DiscoverPage;