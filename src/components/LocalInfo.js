import React, { Component } from "react";
import getLocalInfo from "../gMapsAPI/gMapsAPI";

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
    getLocalInfo(this.lng, this.lat).then(res => {
      this.setState({
        results: res
      });
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
          <p style={{ color: "white" }}>{this.state.results.country}</p>
          <p style={{ color: "white" }}>{this.state.results.state}</p>
          <p style={{ color: "white" }}>{this.state.results.district}</p>
          <p style={{ color: "white" }}>{this.state.results.date}</p>
        </div>
      );
    } else {
      return null;
    }
  }
}
