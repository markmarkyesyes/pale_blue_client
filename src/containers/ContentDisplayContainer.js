import { connect } from 'react-redux';
import ContentDisplay from '../components/ContentDisplay';
import Cartesian3 from 'cesium/Source/Core/Cartesian3';
import Color from 'cesium/Source/Core/Color';

function distanceBetween(location1, location2) {
  return Cartesian3.distance(location1, location2);
}

function nearbyContent(cameraLocation, dotsList, radius) {
  if (!cameraLocation || !dotsList) {
    return [];
  }

  const content = dotsList.filter(dot => {
    const dotLocation = Cartesian3.fromDegrees(dot.lng, dot.lat);
    return distanceBetween(cameraLocation, dotLocation) < radius;
  });

  console.log(content);
  return content;
}

const mapStateToProps = (state, ownProps) => {
  const cameraLocation = state.camera.location;
  const dotsList = state.dotsList.data;
  const { scene, viewer } = ownProps;

  const height = scene.camera.positionCartographic.height;
  const radius = height / 10;

  viewer.entities.add({
    ellipse: {
      semiMajorAxis: radius,
      semiMinorAxis: radius,
      material: Color.WHITE.withAlpha(0.2),
      outline: Color.WHITE,
      height: 0
    },
    position: cameraLocation
  });

  return {
    content: nearbyContent(cameraLocation, dotsList, radius)
  };
}

export default connect(
  mapStateToProps
)(ContentDisplay);
