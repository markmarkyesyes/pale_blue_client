import React from 'react';
import Color from 'cesium/Source/Core/Color';
import Cartesian3 from 'cesium/Source/Core/Cartesian3';

export default class UserDot extends React.Component {
  componentDidMount() {
    const { dots, userLocation } = this.props;

    if (dots) {
      this.dot = dots.entities.add({
        id: "user",
        point: {
          pixelSize: 6,
          color: Color.DEEPSKYBLUE
        },
        position: Cartesian3.fromDegrees(userLocation.lng, userLocation.lat)
      });
    }
  }

  componentWillUnmount() {
    const { dots } = this.props;

    if (dots && this.dot) {
      dots.entities.remove(this.dot);
    }
  }

  render() {
    return null;
  }
}
