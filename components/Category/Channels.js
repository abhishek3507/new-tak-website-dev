import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Link from "next/link";
import { useDispatch } from "react-redux";
import channelListSlice from "../../store/channel-list/channelListSlice";
import { useEffect } from "react";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 500 },
    items: 5,
  },
  mobile: {
    breakpoint: { max: 500, min: 300 },
    items: 4,
  },
};

const Channels = ({ category, channels, currentChannelId }) => {
  //console.log(channels);
  const { actions } = channelListSlice;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.fetchList(channels));
  }, []);

  return (
    <section className="bg-white py-2 channel-header">
      <div className="container">
    
        <Carousel
          swipeable={true}
          draggable={true}
          showDots={false}
          responsive={responsive}
          infinite={false}
          autoPlay={false}
          transitionDuration={500}
          itemclassName="px-2"
          arrows={true}
          //customRightArrow={<CustomRightArrow  />}
          //   customLeftArrow={<CustomLeft />}
          //removeArrowOnDeviceType={["mobile"]}
        >
          <div key={0}>
            <Link href="/" passHref>
              <a>
                <img
                  className="carousel-channels"
                  src={
                    category === "all"
                      ? "/assets/images/tak-active.png"
                      : "/assets/images/tak-inactive.png"
                  }
                  alt="tak"
                />
              </a>
            </Link>
          </div>
          {channels?.map((channel) => (
            <div key={channel.id}>
              <Link passHref href={`/${channel.sef_url}`}>
                <a>
                  <img
                    className="carousel-channels"
                    src={
                      category === channel.sef_url
                        ? channel.default_image
                        : channel.inactive_image
                    }
                    alt={channel.title}
                  />
                </a>
              </Link>
            </div>
          ))}
        </Carousel>
       
      </div>
    </section>
  );
};

export default Channels;
