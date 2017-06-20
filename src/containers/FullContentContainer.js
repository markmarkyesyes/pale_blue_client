import React from 'react';
import { connect } from 'react-redux';
import FullContent from '../components/content/FullContent';
import { submitLike } from '../actions/submitLike';
import { selectContent, closeContent } from '../actions/selectedContent';

const mapStateToProps = (state, ownProps) => {
  return {
    userLocation: state.userLocation.data,
    selectedContent: state.selectedContent,
    userId: localStorage.getItem("user_id")
  };
};

const mapDispatchToProps = dispatch => {
  return {
    submitLike: like => dispatch(submitLike(like)),
    selectContent: content => dispatch(selectContent(content)),
    closeContent: () => dispatch(closeContent())
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
