import React from 'react';
import { connect } from "react-redux";

import LikeAnimation from "../components/LikeAnimation";
import { getLikes } from "../actions/getLikes";

const mapStateToProps = (state, ownProps) => {
  return {
    likesList: state.likesList.startingLikes,
    viewer: ownProps.viewer,
    userId: state.session.data._id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getLikes: () => {
      dispatch(getLikes());
    }
  };
};

class LikeAnimationContainer extends React.Component {
  componentDidMount() {
    if (this.props.userId) {
      this.props.getLikes();
    }
  }

  componentWillReceiveProps(newProps) {
    if (this.props.userId !== newProps.userId) {
      this.props.getLikes();
    }
  }  

  render() {
    return <LikeAnimation {...this.props} />
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LikeAnimationContainer);