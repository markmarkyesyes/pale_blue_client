import React from "react";
import Slider from "react-slick";
import Text from "./content/Text";
import Image from "./content/Image";
import SlideWrapper from './content/SlideWrapper';
import FullContentContainer from '../containers/FullContentContainer';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const config = {
  arrows: false,
  centerMode: true,
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
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        centerMode: true,
      }
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 5,
        centerMode: true,
      }
    }
  ],
  slidesToShow: 7,
  swipeToSlide: true,
  useCSS: true
};

const slideStyle = {
  height: 120
};

export default class Carousel extends React.Component {
  state = { selectedContent: null };

  componentDidMount() {
    document.addEventListener("keydown", this.handleEscape, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleEscape);
  }

  componentWillReceiveProps(newProps) {
    this.closeContent();
  }

  selectContent = content => {
    this.setState({ selectedContent: content });
  }

  closeContent = () => {
    this.setState({ selectedContent: null });
  }

  handleEscape = e => {
    if (e.keyCode === 27) this.closeContent();
  }

  render() {
    const { contentFound, nearbyContent } = this.props;
    const { selectedContent } = this.state;

    if (!contentFound) return null;

    const slides = nearbyContent.map(dot => {
      switch (dot.contentType) {
        case "text":
          return (
            <div style={slideStyle} key={dot._id}>
              <SlideWrapper selectContent={this.selectContent} dot={dot}>
                <Text data={dot.data} />
              </SlideWrapper>
            </div>
          );
        case "image":
          return (
            <div style={slideStyle} key={dot._id}>
              <SlideWrapper selectContent={this.selectContent} dot={dot}>
                <Image data={dot.data} />
              </SlideWrapper>
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
        <FullContentContainer
          selectedContent={selectedContent}
          closeContent={this.closeContent}
        />
      </div>
    );

  }
}
