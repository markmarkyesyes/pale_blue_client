import { connect } from "react-redux";

import DotCollection from "../components/DotCollection";
import { getDots } from "../actions/getDotsActions";

const dotsList = {
  data: [
    {
      lng: -76.2760,
      lat: 56.4906,
      contentId: "1",
      contentType: "text/image/audio",
      content: "text/url"
    },
    {
      lng: -69.1736,
      lat: 45.4511,
      contentId: "2",
      contentType: "text/image/audio",
      content: "text/url"
    }
  ]
};

const mapStateToProps = (state, ownProps) => {
  return {
    dotsList: dotsList.data,
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DotCollection);
