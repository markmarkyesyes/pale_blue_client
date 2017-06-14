import { connect } from 'react-redux';
import ContentDisplay from '../components/ContentDisplay';

function nearbyContent(cameraLocation, dotsList) {
  if (!cameraLocation || !dotsList) {
    return [];
  }

}

const mapStateToProps = state => {
  const cameraLocation = state.camera.location;
  const dotsList = state.dotsList.data;

  return {
    content: nearbyContent(cameraLocation, dotsList)
  };
}

export default connect(
  mapStateToProps
)(ContentDisplay);
