import React, { Component } from "react";
import { connect } from "react-redux";
import { Dialog } from "material-ui";

import RaisedButton from "material-ui/RaisedButton";
import DemoForm from "./DemoForm";

import { submitDot } from "../actions/submitDot";
import { cleanDemoDots } from "../actions/getDots";
import { regUser, logout } from "../actions/sessionActions";

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

    socket.on("finish demo", () => {
      this.props.cleanDemoDots();
    })
  }

  startDemo = () => {
    this.setState({ demoRunning: true });
  }

  endDemo = () => {
    this.setState({ demoRunning: false });
    socket.emit("end demo");
    localStorage.removeItem("user_id");
    localStorage.removeItem("token");
    this.props.logout();    
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
          <p>
            {" "}This application is meant to interact with other users. While it's in alpha stage, you can try it out with this demo.{" "}
          </p>
          <p>
            {" "}When you enter a message and submit, you will be logged in as a demo user, and imaginary content will be created in real time. Other than this content, everything else stays the same, so you can use the application as you normally would.{" "}
          </p>
          <p>
            {" "}The simulation will run for 2 minutes, and you can stop it anytime with the Stop button.{" "}
          </p>
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
    },
    cleanDemoDots: () => {
      dispatch(cleanDemoDots());
    },
    logout: () => {
      dispatch(logout());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DemoDialog);