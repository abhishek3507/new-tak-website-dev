import React,{useEffect} from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch,useSelector } from 'react-redux';
import { fetchSpotlightList } from '../../store/spotlight/spotlightAction';
import spotlightSlice from '../../store/spotlight/spotlightSlice';
import MultiCarousel from '../MultiCarousel/MultiCarousel';

const SpotlightCarousel = () => {

    const spotlightList = useSelector((state)=>state.spotlight.spotlight_list);
    const isLoading = useSelector((state)=>state.spotlight.isLoading);
    const dispatch = useDispatch();
    const {actions} = spotlightSlice;

    useEffect(() => {
        if(spotlightList?.length == 0){
            dispatch(actions.fetchListStart());
            dispatch(fetchSpotlightList());
        }
    }, []);

  return (
      <div className="paddingTopBottom10px">
      <div className="spotlite-carouse-heading pb-2">
        <h3>
            <FormattedMessage defaultMessage="Spotlight" id="discover_spotlight"></FormattedMessage>
        </h3>
        </div>
          <MultiCarousel
              source="spotlight"
          >
            {
                spotlightList.map((spotlight,index)=>(
                <div className="spotlight-box item" key={index}>
                  <a href={`/spotlight/anchor/${spotlight?.sef_url?spotlight?.sef_url:spotlight?.id}/all`} >
                      <div className="spotlight-cards">
                          <img
                              src={spotlight?.profile_image?spotlight?.profile_image:'/assets/images/default-profile.png'}
                              alt="Spotlight Profile Image"
                              onError={(e) => e.target.src = '/assets/images/default-profile.png'} />
                      </div>
                      <p>{spotlight?.author_name}</p>
                  </a>
              </div>
                ))
            }
          </MultiCarousel>
      </div>
  )
}

export default SpotlightCarousel