
import React from "react";
import Reticle from "./Reticle";
import LocalInfo from "./LocalInfo";
import Carousel from './Carousel';

const ContentDisplay = ({ nearbyContent }) => {
  const contentFound = !!nearbyContent.length;

  return (
    <div>
      <LocalInfo nearbyContent={nearbyContent} />
      <Reticle contentFound={contentFound} />
      <Carousel contentFound={contentFound} nearbyContent={nearbyContent} />
    </div>
  );
};

export default ContentDisplay;
