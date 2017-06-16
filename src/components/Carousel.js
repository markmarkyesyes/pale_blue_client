import React from 'react';
import Slider from 'react-slick';
import Text from './content/Text';
import Image from './content/Image';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const slideStyle={
  backgroundColor: 'white',
  width: '100px',
  height: '100px',
  marginRight: '1rem',
  overflow: 'hidden'
};

const config = {
  adaptiveHeight: true,
  arrows: false,
  dots: false,
  infinite: true,
  lazyLoad: true,
  slidesToShow: 3,
  swipeToSlide: true,
};

export default function Carousel(contentFound, nearbyContent) {

  if (!contentFound) return null;

  const slides = nearbyContent.map(dot => {
    switch (dot.contentType) {
      case "text":
        return (
          <div style={slideStyle} key={dot._id}>
            <Text data={dot.data} />
          </div>
        );
      case "image":
        return (
          <div style={slideStyle} key={dot._id}>
            <Image data={dot.data} />
          </div>
        )
      default:
        return null;
    }
  });

  return (
    <div style={{
      position: 'fixed',
      top: 70,
      left: 0,
      zIndex: 99999,
      width: '100%'
    }}>
      <Slider {...config}>
        {slides}
      </Slider>
    </div>
  );
}
