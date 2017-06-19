import Color from "cesium/Source/Core/Color";
import Cartesian3 from "cesium/Source/Core/Cartesian3";
import defined from "cesium/Source/Core/defined";
import CallbackProperty from "cesium/Source/DataSources/CallbackProperty";

export function pulse(viewer, lng, lat, multiplyColor) {
  pulseSingle(viewer, lng, lat, multiplyColor);
  setTimeout(() => {
    pulseSingle(viewer, lng, lat, multiplyColor);
  }, 1000);
  setTimeout(() => {
    pulseSingle(viewer, lng, lat, multiplyColor);
  }, 2000);
  setTimeout(() => {
    pulseSingle(viewer, lng, lat, multiplyColor);
  }, 3000);
  setTimeout(() => {
    pulseSingle(viewer, lng, lat, multiplyColor);
  }, 4000);
}

function pulseSingle(viewer, lng, lat, multiplyColor) {
  const duration = 4000;
  const rate = 250;

  const circle = viewer.entities.add({
    position: Cartesian3.fromDegrees(lng, lat),
    billboard: {
      image: require("../../public/circle.svg"),
      width: 20,
      height: 20,
      scale: expand(rate),
      color: fadeOut(duration, multiplyColor)
    }
  });
  setTimeout(() => {
    viewer.entities.remove(circle);
  }, duration);
};

function expand(rate) {
  const start = performance.now();
  return new CallbackProperty((time, scale) => {
    if (!defined(scale)) {
      scale = 1.0;
    }
    const now = performance.now();
    const t = now - start;
    return scale + t / rate;
  }, false);
}

function fadeOut(duration, multiplyColor) {
  const start = performance.now();
  return new CallbackProperty((time, color) => {
    const now = performance.now();
    const t = now - start;
    let alpha = 1.0 - t / duration;
    if (alpha < 0) alpha = 0;
    const baseColor = new Color(1.0, 1.0, 1.0, alpha);
    const result = {};
    Color.multiply(baseColor, multiplyColor, result);
    return result;
  }, false);
}
