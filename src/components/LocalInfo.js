import React, { Component } from "react";
import getLocalInfo from "../gMapsAPI/gMapsAPI";

const pStyle = {
  margin: "2px 0",
  color: "#00BFFF"
};

export default class LocalInfo extends Component {
  state = { results: null };

  componentWillReceiveProps(nextProps, oldProps) {
    if (!nextProps.nearbyContent.length) {
      this.setState({ results: null });
      return;
    }

    const { lng, lat } = nextProps.selectedContent || nextProps.nearbyContent[0];

    getLocalInfo(lng, lat).then(results => this.setState({ results }));
  }

  render() {
    if (this.state.results) {
      return (
        <div
          style={{
            position: "fixed",
            bottom: "15px",
            left: "15px",
            zIndex: "99999"
          }}>
          <p style={pStyle}>{this.state.results.district}</p>
          <p style={pStyle}>{this.state.results.state}</p>
          <p style={pStyle}>{this.state.results.country}</p>
          <p style={pStyle}>{this.state.results.date}</p>
        </div>
      );
    } else {
      return null;
    }
  }
}
