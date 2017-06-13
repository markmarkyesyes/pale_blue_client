import React from 'react';
import EntityCollection from 'cesium/Source/Scene/PointPrimitiveCollection';
import UserDot from './UserDot';
import ContentDot from './ContentDot';


export default class DotCollection extends React.Component {
  constructor(props) {
    super(props);

    this.dots = new PointPrimitiveCollection();

    const { scene } = this.props;

    if (scene) {
      scene.primitives.add(this.dots);
    }
  }

  componentWillUnmount() {
    const { dots } = this;

    if (!dots.isDestroyed()) {
      dots.destroy();
    }

    const { scene } = this.props;

    if (scene && !scene.isDestroyed() && scene.primitives) {
      scene.primitives.remove(dots);
    }
  }

  render() {
    const { userLocation, dotsList } = this.props;

    const renderedDots = dotsList.map(dot => (
      <ContentDot
        {...dot}
        dots={this.dots}
        key={dot.contentId}
      />
    ));

    return (
      <span>
        <UserDot
          userLocation={userLocation}
          dots={this.dots}
        />
        {renderedDots}
      </span>
    );
  }
}
