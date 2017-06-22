import React, { Component } from "react";
import getLocalInfo from "../gMapsAPI/gMapsAPI";

const pStyle = {
  margin: "2px 0",
  color: "#00BFFF"
};

function selectedLocationChanged(nextProps, oldProps) {
  if (!nextProps.selectedContent && !oldProps.selectedContent) {
    return false;
  }
  return (nextProps.selectedContent && !oldProps.selectedContent) ||
         (!nextProps.selectedContent && oldProps.selectedContent) ||
         (nextProps.selectedContent.lng !== oldProps.selectedContent.lng) ||
         (nextProps.selectedContent.lat !== oldProps.selectedContent.lat);
}

function nearbyLocationChanged(nextProps, oldProps) {
  if (!nextProps.nearbyContent && !oldProps.nearbyContent) {
    return false;
  }
  return (nextProps.nearbyContent[0] && !oldProps.nearbyContent[0]) ||
         (!nextProps.nearbyContent[0] && oldProps.nearbyContent[0]) ||
         (nextProps.nearbyContent[0].lng !== oldProps.nearbyContent[0].lng) ||
         (nextProps.nearbyContent[0].lat !== oldProps.nearbyContent[0].lat);
}

export default class LocalInfo extends Component {
  state = { results: null };

  componentWillReceiveProps(nextProps) {
    if (!nextProps.nearbyContent.length) {
      this.setState({ results: null });
      return;
    }

    if (!selectedLocationChanged(nextProps, this.props) &&
        !nearbyLocationChanged(nextProps, this.props)) {
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
