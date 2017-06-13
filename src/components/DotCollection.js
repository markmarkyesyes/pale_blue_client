import React from 'react';
import Color from 'cesium/Source/Core/Color';
import Cartesian3 from 'cesium/Source/Core/Cartesian3';
import PointPrimitiveCollection from 'cesium/Source/Scene/PointPrimitiveCollection';

export default class DotCollection extends React.Component {
  constructor(props) {
    super(props);

    this.dots = new PointPrimitiveCollection();

    const { scene } = this.props;

    if (scene) {
      scene.primitives.add(this.dots);
    }
  }

  componentWillUnmount() {
    const { dots } = this;

    if (!dots.isDestroyed()) {
      dots.destroy();
    }

    const { scene } = this.props;

    if (scene && !scene.isDestroyed() && scene.primitives) {
      scene.primitives.remove(dots);
    }
  }

  componentDidMount() {
    const lng = -71.2760;
    const lat = 42.4906;
    const position = Cartesian3.fromDegrees(lng, lat);

    this.dot = this.dots.add({
      position,
      color: Color.DEEPSKYBLUE
    });
  }

  render() {
    return null;
  }
}
