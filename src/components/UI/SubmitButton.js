import React from "react";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";

const style = {
  width: "100%",
  height: "100%"
};

const SubmitButton = ({ handleClick }) => {
  return (
    <FloatingActionButton style={style} onTouchTap={handleClick}>
      <ContentAdd />
    </FloatingActionButton>
  );
};

export default SubmitButton;
