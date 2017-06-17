import React from 'react';
import Reticle from './Reticle';
import Carousel from './Carousel';

const ContentDisplay = ({nearbyContent}) => {

  const contentFound = !!nearbyContent.length;

  return (
    <div>
      {Reticle(contentFound)}
      {Carousel(contentFound, nearbyContent)}
    </div>
  );
};

export default ContentDisplay;
