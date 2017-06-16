import React from "react";
import getLocalInfo from "../geonames/geonames";
import _ from "lodash";
let debouncedGetLocalInfo = _.debounce(getLocalInfo, 300);

export default function LocalInfo(nearbyContent) {
  if (!nearbyContent[0]) {
    return null;
  }
  let lng = nearbyContent[0].lng || null;
  let lat = nearbyContent[0].lat || null;
  let results = debouncedGetLocalInfo(lng, lat);
  console.log(results);
  return (
    <div
      style={{
        position: "fixed",
        bottom: "3%",
        left: "3%",
        zIndex: "99999"
      }}>
      <h1>{results}</h1>
    </div>
  );
}
