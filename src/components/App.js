import React from "react";
import CesiumGlobe from "./CesiumGlobe";
import Authentication from "./UI/Authentication";

export default class App extends React.Component {
  render() {
    return (
      <div>
        <div id="credits" />
        <CesiumGlobe />
        <Authentication />
      </div>
    );
  }
}
