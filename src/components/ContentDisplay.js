import React from "react";
import Reticle from "./Reticle";
import LocalInfo from "./LocalInfo";

const ContentDisplay = ({ nearbyContent }) => {
  const contentFound = !!nearbyContent.length;

  return (
    <div>
      {Reticle(contentFound)}
      <LocalInfo nearbyContent={nearbyContent} />
    </div>
  );
};

export default ContentDisplay;
