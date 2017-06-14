import React, { Component } from "react";
import SubmitButton from "./SubmitButton";
import SubmitForm from "./SubmitForm";
import { Dialog } from "material-ui";
import { connect } from "react-redux";
import { submitDot } from "../../actions/submitDot";

const inputStyle = {
  textAlign: "left",
  display: "block",
  margin: "0.5rem 0",
  width: "100%"
};

const buttonStyle = {
  margin: "1rem 0",
  width: "100%",
  textTransform: "uppercase"
};


class SubmitContent extends Component {
  constructor() {
    super();

    this.state = {
      open: false
    };
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
    this.props.submitDot(content);
    this.handleClose();
  };

  render() {
    return (
      <div>
        <SubmitButton handleClick={this.handleClick} />
        <Dialog
          title="Make a Post!"
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          style={{ textAlign: "center" }}>
          <SubmitForm 
            handleSubmit={this.handleSubmit}
            userLocation={this.props.userLocation}
            inputStyle={inputStyle}
            buttonStyle={buttonStyle}
          />
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userLocation: state.userLocation,   
  };
};

const mapDispatchToProps = dispatch => {
  return {
    submitDot: content => {
      dispatch(submitDot(content));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubmitContent);
