import {connect} from 'react-redux';

import DotCollection from '../components/DotCollection';
import { getDotLocations } from '../actions/getDotsActions';

const mapStateToProps = (state, ownProps) => {
  return {
    dotsList: state.dotsList.data,
    scene: ownProps.scene
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