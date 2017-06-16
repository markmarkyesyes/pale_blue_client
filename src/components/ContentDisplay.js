import React from 'react';
import Reticle from './Reticle';

const ContentDisplay = ({nearbyContent}) => {

  const contentFound = !!nearbyContent.length;

  return (
    <div>
      {Reticle(contentFound)}

      
    </div>
  );
};

export default ContentDisplay;
