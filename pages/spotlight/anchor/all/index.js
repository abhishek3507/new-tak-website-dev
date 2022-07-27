import React from 'react';
import { useDispatch } from 'react-redux';
import Spotlight from '../../../../components/Spotlight/spotlight';
import AxiosInstance from '../../../../store/axios-interceptor';
import { GET_ALL_ANCHORS } from '../../../../store/spotlight/spotlightCRUD';
import spotlightSlice from '../../../../store/spotlight/spotlightSlice';

const SpotlightPage = ({data,error}) => {
  return (
    <Spotlight data={data} serverError={error} />
  )
}

export async function getServerSideProps() {
  try {
    const response = await AxiosInstance.get(GET_ALL_ANCHORS);
    if (response && response.data) {
      let filteredData = response.data.filter(spotlight => spotlight.id !== '62a6f9eafdc5caf53558f510');
      return { props: { data: filteredData, error: false } }
    } else if (response && response.data && response.data.length <= 0) {
      return { props: { data: [], error: false } }
    } else {
      return { props: { error: true } }
    }
  } catch (error) {
    console.log(error);
    return { props: { error: true } }
  }

}

export default SpotlightPage;