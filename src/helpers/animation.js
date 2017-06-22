import Color from "cesium/Source/Core/Color";
import Cartesian3 from "cesium/Source/Core/Cartesian3";
import defined from "cesium/Source/Core/defined";
import CallbackProperty from "cesium/Source/DataSources/CallbackProperty";
import StripeMaterialProperty from "cesium/Source/DataSources/StripeMaterialProperty";
import StripeOrientation from "cesium/Source/DataSources/StripeOrientation";

export function pulse(viewer, lng, lat, multiplyColor, times = 0) {
  for (let i = 0; i <= times; i++) {
    setTimeout(() => {
      pulseSingle(viewer, lng, lat, multiplyColor);
    }, i * 1000);
  }
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

export function fadeOut(duration, multiplyColor) {
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

// for rendering polylines
export function drawLine(startEntity, endEntity, like, duration) {
  const startTime = performance.now();
  return new CallbackProperty((time, result) => {
    if (!defined(result)) {
      result = [];
    }
    const now = performance.now();
    const start = startEntity.position.getValue(time, result[0]);
    const end = endEntity.position.getValue(time, result[1]);
    const t = Math.min(1.0, (now - startTime) / duration);
    Slerp(start, end, t, end);

    result[0] = start;
    result[1] = end;
    result.length = 2;
    return result;
  }, false);
}

export function distanceBetween(pos1, pos2) {
  return Cartesian3.distance(pos1, pos2);
}

// spherical interpolation to prevent line from moving when globe is rotated
function Slerp(start, end, t, result) {
  const result1 = new Cartesian3();
  const result2 = new Cartesian3();
  const result3 = new Cartesian3();
  const theta = Cartesian3.angleBetween(start, end);
  Cartesian3.multiplyByScalar(start, Math.sin((1-t)*theta), result1);
  Cartesian3.multiplyByScalar(end, Math.sin(t*theta), result2);
  Cartesian3.add(result1, result2, result3);
  Cartesian3.divideByScalar(result3, Math.sin(theta), result);
  return result;
}

export function fadedLine(startColor, endColor) {
  return new StripeMaterialProperty({
    evenColor: endColor,
    oddColor: startColor,
    repeat: 1,
    offset: 0.5,
    orientation: StripeOrientation.VERTICAL
  });
}
