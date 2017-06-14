import React from 'react';
import Color from 'cesium/Source/Core/Color';
import Cartesian3 from 'cesium/Source/Core/Cartesian3';

export default class ContentDot extends React.Component {
  componentDidMount() {
    const { dots, dotObject } = this.props;

    if (dots) {
      this.dot = dots.entities.add({
        id: dotObject.contentId,
        point: {
          pixelSize: 6,
          color: Color.GOLD
        },
        position: Cartesian3.fromDegrees(dotObject.lng, dotObject.lat),
        properties: dotObject
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
