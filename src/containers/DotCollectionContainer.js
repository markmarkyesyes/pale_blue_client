import {connect} from 'react-redux';

import DotCollection from '../components/DotCollection';
import { getDotLocations } from '../actions/getDotsActions';

const dotsList = {
  data: [
    {
      lng: -71.2760,
      lat: 42.4906,
      contentId: 1,
      contentType: "text/image/audio",
      content: "text/url"
    }
  ]
}

const mapStateToProps = (state, ownProps) => {
  return {
    dotsList: dotsList.data,
    scene: ownProps.scene,
    userLocation: ownProps.userLocation
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getDotLocations: () => {
    	dispatch(getDotLocations());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DotCollection);
