import React from 'react';
import { connect } from 'react-redux';
import App from '../components/App';
import { getUserLocation } from '../actions/userLocation';
import socket from "../websockets";

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
    this.props.getUserLocation();
    window.addEventListener('beforeunload', this.handleWindowClose);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.handleWindowClose);
  }

  handleWindowClose(){
    console.log("CLOSING!");
    let closeInfo = {
      userId: localStorage.getItem("user_id"),
      time: Date.now()
    }
    socket.emit('closing browser', closeInfo);
    window.removeEventListener('beforeunload', this.handleWindowClose);
  } 

  render() {
    return <App {...this.props} />
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer);
