import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const spotlightResponsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 7
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5
    },
    tablet: {
      breakpoint: { max: 1024, min: 500 },
      items: 5
    },
    mobile: {
      breakpoint: { max: 500, min: 300 },
      items: 4
    }
};

const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 500 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 500, min: 300 },
      items: 1
    }
};

const MultiCarousel = (props) => {
  return (
    <Carousel
        swipeable={true}
        draggable={true}
        showDots={false}
        responsive={props.source=='spotlight'?spotlightResponsive:responsive}
        infinite={false}
        autoPlay={false}
        transitionDuration={500}
        itemclassName="carousel-item-padding-40-px"
        arrows={props.source=='spotlight'?false:true}
    >
        {props.children}
    </Carousel>
  )
}

export default MultiCarousel;