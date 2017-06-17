import React from "react";
import Slider from "react-slick";
import Text from "./content/Text";
import Image from "./content/Image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const config = {
  arrows: false,
  centerMode: true,
  centerPadding: "15px",
  dots: false,
  focusOnSelect: true,
  infinite: false,
  lazyLoad: false,
  responsive: [
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        centerMode: true,
        centerPadding: "15px"
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        centerMode: true,
        centerPadding: "15px"
      }
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 5,
        centerMode: true,
        centerPadding: "15px"
      }
    }
  ],
  slidesToShow: 7,
  swipeToSlide: true,
  useCSS: true
};

function numberOfSlides(nearbyContent) {
  if (nearbyContent.length <= 3) return nearbyContent.length;
  return 4;
}

const slideStyle = {
  height: 120
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
        );
      default:
        return null;
    }
  });

  return (
    <div
      style={{
        position: "fixed",
        top: 75,
        left: 0,
        zIndex: 99999,
        width: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.5)"
      }}
    >
      <Slider {...config}>
        {slides}
      </Slider>
    </div>
  );
}
