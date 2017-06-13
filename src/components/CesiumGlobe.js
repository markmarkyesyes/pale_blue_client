import React from "react";

import Viewer from "cesium/Source/Widgets/Viewer/Viewer";
import BingMapsImageryProvider
  from "cesium/Source/Scene/BingMapsImageryProvider";
import CesiumTerrainProvider from "cesium/Source/Core/CesiumTerrainProvider";

const BING_MAPS_URL = "//dev.virtualearth.net";
const BING_MAPS_KEY =
  "Ao8A_lsleN-M7elUZmPiMO0B0XkPBctzSPF7MCvoOTW7HmXLFR8KhqOsZymj_q7-";
const STK_TERRAIN_URL = "//assets.agi.com/stk-terrain/world";

import DotCollection from './DotCollection';

export default class CesiumGlobe extends React.Component {
  state = { viewerLoaded: false };

  componentDidMount() {
    const imageryProvider = new BingMapsImageryProvider({
      url: BING_MAPS_URL,
      key: BING_MAPS_KEY
    });

    const terrainProvider = new CesiumTerrainProvider({
      url: STK_TERRAIN_URL
    });

    this.viewer = new Viewer(this.cesiumContainer, {
      animation: false,
      baseLayerPicker: false,
      fullscreenButton: false,
      geocoder: false,
      homeButton: false,
      infoBox: false,
      sceneModePicker: false,
      selectionIndicator: true,
      timeline: false,
      navigationHelpButton: false,
      scene3DOnly: true,
      navigationInstructionsInitiallyVisible: false,
      skyAtmosphere: false,
      creditContainer: "credits",
      imageryProvider,
      terrainProvider,
    });

    this.viewer.scene.screenSpaceCameraController.maximumZoomDistance = 25000000;

    // Force immediate re-render now that the Cesium viewer is created
    this.setState({ viewerLoaded: true });
  }

  componentWillUnmount() {
    if (this.viewer) {
      this.viewer.destroy();
    }
  }

  renderContents() {
    const { viewerLoaded } = this.state;
    let contents = null;

    if (viewerLoaded) {
      const { scene } = this.viewer;

      contents = (
        <span>
          <DotCollection scene={scene} />
        </span>
      );
    }

    return contents;
  }

  render() {
    const containerStyle = {
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "stretch"
    };

    const widgetStyle = {
      flexGrow: 2
    };

    const contents = this.renderContents();

    return (
      <div className="cesiumGlobeWrapper" style={containerStyle}>
        <div
          className="cesiumWidget"
          ref={element => (this.cesiumContainer = element)}
          style={widgetStyle}
        >
          {contents}
        </div>
      </div>
    );
  }
}
