import React from "react";
import Reticle from "./Reticle";
import LocalInfoContainer from "../containers/LocalInfoContainer";
import CarouselContainer from "../containers/CarouselContainer";

const ContentDisplay = ({ nearbyContent }) => {
  const contentFound = !!nearbyContent.length;
  return (
    <div>
      <LocalInfoContainer nearbyContent={nearbyContent} />
      <Reticle contentFound={contentFound} />
      <CarouselContainer contentFound={contentFound} nearbyContent={nearbyContent} />
    </div>
  );
};

export default ContentDisplay;
