import React from 'react';

const borderWidth = 7;
const DEEPSKYBLUE = '#00BFFF';
const GOLD = "#FFD700";

function getRadiusByViewportSize() {
  const desktopRadius = window.innerHeight / 7.5;
  const mobileRadius = window.innerWidth / 7.5;
  if (window.innerHeight < window.innerWidth) {
    return desktopRadius;
  } else {
    return mobileRadius;
  }
}

export default class Reticle extends React.Component {
  state = { radius: getRadiusByViewportSize() };

  componentDidMount() {
    window.addEventListener("resize", this.recalculateRadius);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.recalculateRadius);
  }

  recalculateRadius = () => {
    const radius = getRadiusByViewportSize();
    this.setState({ radius });
  };

  render() {
    const { contentFound } = this.props;
    const { radius } = this.state;

    const borderColor = contentFound ? GOLD : DEEPSKYBLUE;

    return (
      <div style={{
        pointerEvents: 'none',
        position: 'fixed',
        top: '50%',
        left: '50%',
        marginLeft: -radius,
        marginTop: -radius,
        width: radius * 2 - borderWidth * 2,
        height: radius * 2 - borderWidth * 2,
        borderRadius: '50%',
        borderStyle: 'double',
        borderWidth,
        borderColor,
        zIndex: '99999'
      }}
      />
    );
  }
}
