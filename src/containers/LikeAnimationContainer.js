import React from 'react';
import { connect } from "react-redux";

import LikeAnimation from "../components/LikeAnimation";
import { getLikes } from "../actions/getLikes";

const mapStateToProps = (state, ownProps) => {
  return {
    likesList: state.likesList.startingLikes,
    viewer: ownProps.viewer,
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
    this.props.getLikes();
  }

  render() {
    return <LikeAnimation {...this.props} />
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LikeAnimationContainer);