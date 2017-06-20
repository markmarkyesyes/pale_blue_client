import React from 'react';
import CustomDataSource from 'cesium/Source/DataSources/CustomDataSource';
import UserDot from './UserDot';
import ContentDot from './ContentDot';
import socket from "../websockets";

export default class DotCollection extends React.Component {
  constructor(props) {
    super(props);

    this.dots = new CustomDataSource("dotCollection");

    const { dataSources } = this.props;

    if (dataSources) {
      dataSources.add(this.dots);
    }

    this.state = {
      demoDots: []
    };

    socket.on("finish demo", () => {
      console.log("starting remove dots");
      this.removeDemoDots();
    })

    this.addDemoDot = this.addDemoDot.bind(this);
  }

  addDemoDot(dot) {
    this.setState({
      demoDots: [...this.state.demoDots, dot]
    })
  }

  removeDemoDots() {

    this.state.demoDots.forEach((dot) => {
      this.dots.entities.remove(dot);
    })
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
        key={dotObject._id}
        addDemoDot={this.addDemoDot}
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
