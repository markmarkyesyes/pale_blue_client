import React from 'react';
import CustomDataSource from 'cesium/Source/DataSources/CustomDataSource';
// import EntityCollection from 'cesium/Source/DataSources/EntityCollection';
import UserDot from './UserDot';
import ContentDot from './ContentDot';

export default class DotCollection extends React.Component {
  constructor(props) {
    super(props);

    this.dots = new CustomDataSource("dotCollection");

    const { dataSources } = this.props;

    if (dataSources) {
      dataSources.add(this.dots);
    }
  }

  componentWillUnmount() {
    const { dots } = this;
    const { dataSources } = this.props;

    if (dataSources && !dataSources.isDestroyed()) {
      dataSources.remove(dots, true);
    }
  }

  render() {
    const { dots } = this;
    const { userLocation, dotsList } = this.props;

    const renderedDots = dotsList.map(dotObject => (
      <ContentDot
        dotObject={dotObject}
        dots={dots}
        key={dotObject.contentId}
      />
    ));

    return (
      <span>
        <UserDot
          userLocation={userLocation}
          dots={dots}
        />
        {renderedDots}
      </span>
    );
  }
}
