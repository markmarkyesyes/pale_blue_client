import { connect } from 'react-redux';
import Carousel from '../components/Carousel';
import { selectContent, closeContent } from '../actions/selectedContent';

const mapStateToProps = (state, ownProps) => {
  return {
    contentFound: ownProps.contentFound,
    nearbyContent: ownProps.nearbyContent
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectContent: content => dispatch(selectContent(content)),
    closeContent: () => dispatch(closeContent())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Carousel);
