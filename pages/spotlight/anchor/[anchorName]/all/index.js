import React from 'react';
import { SpotlightAnchor } from '../../../../../components/Spotlight/SpotlightAnchor';
import AxiosInstance from '../../../../../store/axios-interceptor';

const SpotlightAnchorPage = ({data,error}) => {
  return (
    <SpotlightAnchor data={data} error={error} />
  )
}

export async function getServerSideProps(ctx){
    try {
        const {params} = ctx;
        const {anchorName} = params;
        const response =  await AxiosInstance.get('/videosByAnchor/'+anchorName+'/0/10');
        if(response && response.status){
            return { props: { data: response.data, error : false} };
        }else{
            return { props:{error : true} }
        }
    } catch (error) {
        console.log(error);
        return { props:{error : true} }
    }
} 

export default SpotlightAnchorPage;