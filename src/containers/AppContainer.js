import React from 'react';
import {connect} from 'react-redux';
import App from '../components/App';
import { getUserLocation } from '../actions/userLocation';

const mapStateToProps = (state, ownProps) => {
  return {
    userLocation: state.userLocation.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserLocation: () => {
    	dispatch(getUserLocation());
    }
  };
};

class AppContainer extends React.Component {

  componentDidMount() {
    const { getUserLocation } = this.props;
    getUserLocation();
  }

  render() {
    return <App {...this.props} />
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer);
