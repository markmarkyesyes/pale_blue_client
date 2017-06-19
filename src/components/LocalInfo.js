import React, { Component } from "react";
import getLocalInfo from "../geonames/geonames";
import _ from "lodash";
let debouncedGetLocalInfo = _.debounce(getLocalInfo, 100);

export default class LocalInfo extends Component {
  constructor() {
    super();
    this.lng = null;
    this.lat = null;
    this.state = {
      results: null
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.nearbyContent[0]) {
      return;
    }
    this.lng = nextProps.nearbyContent[0].lng;
    this.lat = nextProps.nearbyContent[0].lat;
    debouncedGetLocalInfo(this.lng, this.lat).then(res => {
      this.setState(
        {
          results: res
        },
        () => {
          console.log("in promise resolution", res);
        }
      );
    });
  }

  render() {
    if (this.state.results) {
      return (
        <div
          style={{
            position: "fixed",
            bottom: "3%",
            left: "3%",
            zIndex: "99999"
          }}>
          <h1 style={{ color: "white" }}>{this.state.results}</h1>
        </div>
      );
    } else {
      return null;
    }
  }
}
