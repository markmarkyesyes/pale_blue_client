import React from "react";
import socket from "../websockets";
import Color from "cesium/Source/Core/Color";
import Cartesian3 from "cesium/Source/Core/Cartesian3";
import defined from "cesium/Source/Core/defined";
import CallbackProperty from "cesium/Source/DataSources/CallbackProperty";

class NewContentAnimationContainer extends React.Component {
  ////
  constructor() {
    super();
    socket.on("new content", content => {
      console.log("new content");
      this.pulse(content.lng, content.lat);
      setTimeout(() => {
        this.pulse(content.lng, content.lat);
      }, 500);
      setTimeout(() => {
        this.pulse(content.lng, content.lat);
      }, 1000);
    });
  }
  ////
  expand = rate => {
    const start = performance.now();
    return new CallbackProperty((time, scale) => {
      if (!defined(scale)) {
        scale = 1.0;
      }
      const now = performance.now();
      const t = now - start;
      return scale + t / rate;
    }, false);
  };
  ////
  fadeOut = duration => {
    const start = performance.now();
    return new CallbackProperty((time, color) => {
      const now = performance.now();
      const t = now - start;
      let alpha = 1.0 - t / duration;
      if (alpha < 0) alpha = 0;
      return new Color(1.0, 1.0, 1.0, alpha);
    }, false);
  };
  ////
  pulse = (lng, lat) => {
    const duration = 4000;
    const rate = 250;

    const circle = this.props.viewer.entities.add({
      position: Cartesian3.fromDegrees(lng, lat),
      billboard: {
        image: require("../../public/circle.svg"),
        width: 20,
        height: 20,
        scale: this.expand(rate),
        color: this.fadeOut(duration)
      }
    });
    setTimeout(() => {
      this.props.viewer.entities.remove(circle);
    }, duration);
  };
  ////
  render() {
    return null;
  }
}

export default NewContentAnimationContainer;
