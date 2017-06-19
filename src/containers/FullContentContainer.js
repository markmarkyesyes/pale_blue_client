import React from 'react';
import { connect } from 'react-redux';
import FullContent from '../components/content/FullContent';
import { submitLike } from '../actions/submitLike';

const mapStateToProps = (state, ownProps) => {
  return {
    userLocation: state.userLocation.data,
    userId: localStorage.getItem("user_id"),
    selectedContent: ownProps.selectedContent,
    closeContent: ownProps.closeContent
  };
};

const mapDispatchToProps = dispatch => {
  return {
    submitLike: like => submitLike(like)
  };
};

class FullContentContainer extends React.Component {
  render() {
    return <FullContent {...this.props} />;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FullContentContainer);
