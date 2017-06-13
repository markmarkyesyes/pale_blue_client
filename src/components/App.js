import React from "react";
import CesiumGlobe from "./CesiumGlobe";
import Authentication from "./UI/Authentication";

export default class App extends React.Component {
  render() {

    const containerStyle = {
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      position: 'fixed'
    };

    return (
      <div style={containerStyle}>
        <div id="credits" />
        <CesiumGlobe />
        <div style={{position: 'fixed', top: 10, left: 10}}>
          <Authentication />
        </div>
      </div>
    );
  }
}
