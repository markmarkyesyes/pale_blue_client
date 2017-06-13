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

    this.success = this.success.bind(this);
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

  error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  success(pos) {
    const crd = pos.coords;
    const lat = crd.latitude;
    const lng = crd.longitude;

    const position = Cartesian3.fromDegrees(lng, lat);

    this.dot = this.dots.add({
      position,
      color: Color.DEEPSKYBLUE
    });
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(this.success, this.error);
    // const position = Cartesian3.fromDegrees(lng, lat);

    // this.dot = this.dots.add({
    //   position,
    //   color: Color.DEEPSKYBLUE
    // });
  }

  render() {
    return null;
  }
}
