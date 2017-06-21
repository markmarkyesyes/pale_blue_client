import React, { Component } from "react";
import { connect } from "react-redux";
import { Dialog } from "material-ui";

import RaisedButton from "material-ui/RaisedButton";
import DemoForm from "./DemoForm";

import { submitDot } from "../actions/submitDot";
import { regUser } from "../actions/sessionActions";

import socket from "../websockets";

const inputStyle = {
  textAlign: "left",
  display: "block",
  margin: "0.5rem 0",
  width: "100%"
};

const buttonStyle = {
  margin: "1rem 0",
  textTransform: "uppercase"
};


class DemoDialog extends Component {
  constructor() {
    super();

    this.state = {
      open: false,
      demoRunning: false,
    };
  }

  startDemo = () => {
    this.setState({ demoRunning: true });
  }

  endDemo = () => {
    this.setState({ demoRunning: false });
    socket.emit("end demo");
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  handleSubmit = (content) => {
    this.props.submitDot(content, true);
    this.handleClose();
  }


  render() {
    return (
      <div>
        <RaisedButton
		      label={this.state.demoRunning ? "Stop" : "Demo"}
		      primary={true}
		      onTouchTap={this.state.demoRunning ? this.endDemo : this.handleClick}
		    />
        <Dialog
          title="Type a text message and start the demo!"
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          style={{ textAlign: "center" }}
        >
         <DemoForm
            regUser={this.props.regUser}
            handleSubmit={this.handleSubmit}
            inputStyle={inputStyle}
            buttonStyle={buttonStyle}
            userLocation={this.props.userLocation}
            startDemo={this.startDemo}
          />
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userLocation: state.userLocation.data,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    regUser: () => {
      dispatch(regUser(`${Date.now()}@gmail.com`, "password"));
    },
    submitDot: (content, demo) => {
      dispatch(submitDot(content, demo));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DemoDialog);