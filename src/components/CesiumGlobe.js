import React, {Component} from "react";


import Viewer from "cesium/Source/Widgets/Viewer/Viewer";
import BingMapsImageryProvider from "cesium/Source/Scene/BingMapsImageryProvider";
import CesiumTerrainProvider from "cesium/Source/Core/CesiumTerrainProvider";

import dotenv from 'dotenv';
dotenv.config();

const BING_MAPS_URL = "//dev.virtualearth.net";
const BING_MAPS_KEY = "Ao8A_lsleN-M7elUZmPiMO0B0XkPBctzSPF7MCvoOTW7HmXLFR8KhqOsZymj_q7-";
const STK_TERRAIN_URL = "//assets.agi.com/stk-terrain/world";

export default class CesiumGlobe extends Component {
    state = {viewerLoaded : false}

    componentDidMount() {
        const imageryProvider = new BingMapsImageryProvider({
            url : BING_MAPS_URL,
            key : BING_MAPS_KEY,
        });

        const terrainProvider = new CesiumTerrainProvider({
            url : STK_TERRAIN_URL
        });

        this.viewer = new Viewer(this.cesiumContainer, {
            animation : false,
            baseLayerPicker : false,
            fullscreenButton : false,
            geocoder : false,
            homeButton : false,
            infoBox : false,
            sceneModePicker : false,
            selectionIndicator : true,
            timeline : false,
            navigationHelpButton : false,
            scene3DOnly : true,
            imageryProvider,
            terrainProvider,
        });

        // Force immediate re-render now that the Cesium viewer is created
        this.setState({viewerLoaded : true});
    }

    componentWillUnmount() {
        if(this.viewer) {
            this.viewer.destroy();
        }
    }

    renderContents() {
        const {viewerLoaded} = this.state;
        let contents = null;

        if(viewerLoaded) {
            contents = (
                <span>
                	
                </span>
            );
        }

        return contents;
    }

    render() {
        const containerStyle = {
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'fixed',
            display : "flex",
            alignItems : "stretch",
        };

        const widgetStyle = {
            flexGrow : 2
        }

        const contents = this.renderContents();

        return (
            <div className="cesiumGlobeWrapper" style={containerStyle}>
                <div
                    className="cesiumWidget"
                    ref={ element => this.cesiumContainer = element }
                    style={widgetStyle}
                >
                	{contents}
                </div>
            </div>
        );
    }
}