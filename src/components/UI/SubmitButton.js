import React from "react";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";

const style = {
  marginRight: 20
};

const SubmitButton = ({ handleClick }) => {
  return (
    <div>
      <FloatingActionButton mini={true} style={style} onTouchTap={handleClick}>
        <ContentAdd />
      </FloatingActionButton>
    </div>
  );
};

export default SubmitButton;
