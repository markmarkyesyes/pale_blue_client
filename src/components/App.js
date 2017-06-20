import React from "react";
import CesiumGlobe from "./CesiumGlobe";
import SubmitContent from "./UI/SubmitContent";
import DemoDialog from "./DemoDialog";
import Logout from "./UI/Logout";

const containerStyle = {
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  position: "fixed"
};

export default class App extends React.Component {
  handleLogout = () => {
    console.log("in handleclick");
    localStorage.removeItem("user_id");
    localStorage.removeItem("token");
    location.reload();
  };

  render() {
    const { userLocation } = this.props;
    if (!userLocation) return null;
    return (
      <div style={containerStyle}>
        <div id="credits" />
        <CesiumGlobe userLocation={userLocation} />
        <div style={{ position: "fixed", width: 40, top: 15, right: 15 }}>
          <SubmitContent />
        </div>
        <div
          style={{
            position: "fixed",
            width: 60,
            top: 5,
            right: 115,
            zIndex: "99999"
          }}>
          <Logout handleLogout={this.handleLogout} />
          <DemoDialog />
        </div>
      </div>
    );
  }
}
