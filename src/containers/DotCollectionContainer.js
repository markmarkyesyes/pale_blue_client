import React from 'react';
import { connect } from "react-redux";

import DotCollection from "../components/DotCollection";
import { getDots } from "../actions/getDots";

const mapStateToProps = (state, ownProps) => {
  console.log(state);
  return {
    dotsList: state.dotsList.data,
    dataSources: ownProps.dataSources,
    userLocation: ownProps.userLocation
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getDots: () => {
      dispatch(getDots());
    }
  };
};

class DotCollectionContainer extends React.Component {
  componentDidMount() {
    this.props.getDots();
  }

  render() {
    return <DotCollection {...this.props} />
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DotCollectionContainer);
