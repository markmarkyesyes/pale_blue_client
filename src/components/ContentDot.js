import React from 'react';
import Color from 'cesium/Source/Core/Color';
import Cartesian3 from 'cesium/Source/Core/Cartesian3';

export default class ContentDot extends React.Component {
  componentDidMount() {
    const { dots, ...dot } = this.props;

    if (dots) {
      this.dot = dots.add({
        id: { ...dot },
        position: Cartesian3.fromDegrees(dot.lng, dot.lat),
        color: Color.GOLD
      });
    }
  }

  componentWillUnmount() {
    const { dots } = this.props;

    if (dots && !dots.isDestroyed() && this.dot) {
      dots.remove(this.dot);
    }
  }

  render() {
    return null;
  }
}
