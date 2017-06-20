import React from "react";
import RaisedButton from "material-ui/RaisedButton";

const style = {
  margin: 12
};

export default function Logout({ handleLogout }) {
  if (localStorage.getItem("token") && localStorage.getItem("user_id")) {
    return (
      <RaisedButton
        label="Logout"
        primary={true}
        style={style}
        onTouchTap={handleLogout}
      />
    );
  } else {
    return null;
  }
}
