import { connect } from 'react-redux';
import LocalInfo from '../components/LocalInfo';

const mapStateToProps = (state, ownProps) => {
  return {
    selectedContent: state.selectedContent,
    nearbyContent: ownProps.nearbyContent
  };
};

export default connect(mapStateToProps)(LocalInfo);
