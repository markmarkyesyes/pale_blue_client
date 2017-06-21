import React from "react";
import socket from "../websockets";
import Color from "cesium/Source/Core/Color";
import Cartesian3 from "cesium/Source/Core/Cartesian3";
import defined from "cesium/Source/Core/defined";
import CallbackProperty from "cesium/Source/DataSources/CallbackProperty";
import { pulse } from '../helpers/animation';

const multiplyColor = Color.SALMON;

class LikeAnimation extends React.Component {
  constructor(props) {
  	super();
    this.renderLike = this.renderLike.bind(this);
    socket.on("new like", this.renderLike);

    this.state = {
      demoLines: []
    };

    socket.on("finish demo", () => {
      this.removeDemoLines();
    })

    this.addDemoLine = this.addDemoLine.bind(this);
    this.removeDemoLines = this.removeDemoLines.bind(this);
  }

  componentWillReceiveProps(newProps) {
  	if (newProps.likesList.length !== this.props.likesList.length) {
	  	newProps.likesList.forEach((like) => {
	  		this.renderLike(like);
	  	});
  	}
  }

  addDemoLine(line) {
    this.setState({
      demoLines: [...this.state.demoLines, line]
    })
  }

  removeDemoLines() {
    this.state.demoLines.forEach((line) => {
      this.props.viewer.entities.remove(line);
    })
  }

  componentWillUnmount() {
    socket.removeListener("new like", this.handleNewLike);
  }

  renderLike(like) {
    pulse(this.props.viewer, like.fromLng, like.fromLat, multiplyColor);
		const startPos = Cartesian3.fromDegrees(like.fromLng, like.fromLat);
		const endPos = Cartesian3.fromDegrees(like.toLng, like.toLat);
	  let line = this.props.viewer.entities.add({
	    polyline: {
	      positions: this.drawLine(startPos, endPos, like),
	      material: Color.SALMON
	    }
	  });
	  if (like.demoId) {
	  	this.addDemoLine(line);
	  }	  
  }

	drawLine(startPos, endPos, like) {
	  // render polylines - distance / velocity is render time for the line animation
	  const velocity = 500;
	  const duration = this.distanceBetween(startPos, endPos) / velocity;

	  const startEntity = this.props.viewer.entities.add({
	    position: startPos,
	    point: {
        pixelSize: 4,
	      color: Color.SALMON
	    }
	  });

	  const endEntity = this.props.viewer.entities.add({
	    position: endPos,
	    point: {
        pixelSize: 4,
	      color: Color.SALMON
	    }
	  });

	  if (like.demoId) {
	  	this.addDemoLine(startEntity);
	  	this.addDemoLine(endEntity);
	  }

	  const startTime = performance.now();
	  return new CallbackProperty((time, result) => {
	    if (!defined(result)) {
	      result = [];
	    }
	    const now = performance.now();
	    const start = startEntity.position.getValue(time, result[0]);
	    const end = endEntity.position.getValue(time, result[1]);
	    const t = Math.min(1.0, (now - startTime) / duration);
	    this.Slerp(start, end, t, end);

	    result[0] = start;
	    result[1] = end;
	    result.length = 2;
	    return result;
	  }, false);
	}

	distanceBetween(pos1, pos2) {
	  return Cartesian3.distance(pos1, pos2);
	}

	// spherical interpolation to prevent line from moving when globe is rotated
	Slerp(start, end, t, result) {
	  const result1 = new Cartesian3();
	  const result2 = new Cartesian3();
	  const result3 = new Cartesian3();
	  const theta = Cartesian3.angleBetween(start, end);
	  Cartesian3.multiplyByScalar(start, Math.sin((1-t)*theta), result1);
	  Cartesian3.multiplyByScalar(end, Math.sin(t*theta), result2);
	  Cartesian3.add(result1, result2, result3);
	  Cartesian3.divideByScalar(result3, Math.sin(theta), result);
	  return result;
	}

  ////
  render() {
    return null;
  }
}

export default LikeAnimation;
