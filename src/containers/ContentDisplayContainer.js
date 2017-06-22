import { connect } from 'react-redux';
import ContentDisplay from '../components/ContentDisplay';
import Cartesian3 from 'cesium/Source/Core/Cartesian3';
import { createSelector } from 'reselect';

const getCameraLocation = state => state.camera.location;
const getDotsList = state => state.dotsList.data;
const getRadius = (state, ownProps) => ownProps.scene.camera.positionCartographic.height / 10;

const selectComputedData = createSelector(
  [getCameraLocation, getDotsList, getRadius],
  (cameraLocation, dotsList, radius) => {
    if (!cameraLocation || !dotsList) {
      return [];
    }
    return dotsList.filter(dot => {
      const dotLocation = Cartesian3.fromDegrees(dot.lng, dot.lat);
      return distanceBetween(cameraLocation, dotLocation) < radius;
    });
  }
)

function distanceBetween(location1, location2) {
  return Cartesian3.distance(location1, location2);
}

function nearbyContent(cameraLocation, dotsList, radius) {
  if (!cameraLocation || !dotsList) {
    return [];
  }
  return dotsList.filter(dot => {
    const dotLocation = Cartesian3.fromDegrees(dot.lng, dot.lat);
    return distanceBetween(cameraLocation, dotLocation) < radius;
  });
}

const mapStateToProps = (state, ownProps) => {
  // const cameraLocation = state.camera.location;
  // const dotsList = state.dotsList.data;
  // const { scene } = ownProps;
  //
  // const height = scene.camera.positionCartographic.height;
  // const radius = height / 10;
  return {
    nearbyContent: selectComputedData(state, ownProps)
  };
}

export default connect(
  mapStateToProps
)(ContentDisplay);
