import React from "react";
import socket from "../websockets";
import Color from "cesium/Source/Core/Color";
import { pulse } from '../helpers/animation';

const multiplyColor = Color.GOLD;

class NewContentAnimationContainer extends React.Component {
  constructor(props) {
    super(props);

    const { viewer } = props;

    socket.on("new content", content => {
      pulse(viewer, content.lng, content.lat, multiplyColor);
    });
  }

  render() {
    return null;
  }
}

export default NewContentAnimationContainer;
