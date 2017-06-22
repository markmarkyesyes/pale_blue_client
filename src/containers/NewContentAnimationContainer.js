import React from "react";
import socket from "../websockets";
import Color from "cesium/Source/Core/Color";
import { pulse } from '../helpers/animation';

const pulseTimes = 4;
const multiplyColor = Color.GOLD;

class NewContentAnimationContainer extends React.Component {
  componentDidMount() {
    socket.on("new content", this.newContentPulse);
  }

  componentWillUnmount() {
    socket.removeListener("new content", this.newContentPulse);
  }

  newContentPulse = content => {
    const { viewer } = this.props;
    pulse(viewer, content.lng, content.lat, multiplyColor, pulseTimes);
  }

  render() {
    return null;
  }
}

export default NewContentAnimationContainer;
