import { connect } from 'react-redux';
import Camera from '../components/Camera';
import { setCameraLocation } from '../actions/camera';

const mapStateToProps = (state, ownProps) => {
  return {
    userLocation: ownProps.userLocation,
    viewer: ownProps.viewer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCameraLocation: location => {
      dispatch(setCameraLocation(location));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Camera);
